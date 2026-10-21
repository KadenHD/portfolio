import { readFile, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
import { locales } from "../src/i18n/routing.js";
import { socialCardHtml } from "./social-card-template.mjs";

const publicDirectory = new URL("../public/", import.meta.url);
const [font, portrait, svg] = await Promise.all([
  readFile(new URL("fonts/manrope-variable.ttf", publicDirectory)),
  readFile(
    new URL("images/pierre-clement-portrait-relaxed.webp", publicDirectory),
  ),
  readFile(new URL("favicon.svg", publicDirectory), "utf8"),
]);

function icoFromPngs(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(({ png }) => png)]);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage();
  const pngs = [];
  for (const [size, filename] of [
    [16, "favicon-16x16.png"],
    [32, "favicon-32x32.png"],
    [48, null],
    [180, "apple-touch-icon.png"],
    [192, "android-chrome-192x192.png"],
    [512, "android-chrome-512x512.png"],
  ]) {
    // Apple applies its own corner mask. Other sizes retain transparent corners.
    const source = size === 180 ? svg.replace('rx="14"', 'rx="0"') : svg;
    const data = await page.evaluate(
      async ({ encodedSource, size }) => {
        const image = new Image();
        image.src = `data:image/svg+xml;base64,${encodedSource}`;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        canvas.getContext("2d").drawImage(image, 0, 0, size, size);
        return canvas.toDataURL("image/png").split(",")[1];
      },
      { encodedSource: Buffer.from(source).toString("base64"), size },
    );
    const png = Buffer.from(data, "base64");
    if (size <= 48) pngs.push({ size, png });
    if (filename) await writeFile(new URL(filename, publicDirectory), png);
  }
  await writeFile(new URL("favicon.ico", publicDirectory), icoFromPngs(pngs));
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  for (const locale of locales) {
    await page.setContent(
      socialCardHtml({
        locale,
        font: font.toString("base64"),
        portrait: portrait.toString("base64"),
        icon: Buffer.from(svg).toString("base64"),
      }),
      { waitUntil: "load" },
    );
    await page.evaluate(() => document.fonts.ready);
    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth > 1200 ||
        document.documentElement.scrollHeight > 630,
    );
    if (overflows) throw new Error(`Social card ${locale} exceeds 1200×630.`);
    await page.screenshot({
      path: new URL(`images/social-${locale}.png`, publicDirectory).pathname,
    });
  }
  // The original share URL remains a current French preview for old references.
  await writeFile(
    new URL("preview.png", publicDirectory),
    await readFile(new URL("images/social-fr.png", publicDirectory)),
  );
  console.log(
    "Generated SVG-based favicon exports, Apple/Android icons, and French/English 1200×630 social previews.",
  );
} finally {
  await browser.close();
}
