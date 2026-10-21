import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoHead } from "../src/lib/seo.js";
import { socialCardHtml } from "../scripts/social-card-template.mjs";

const publicDirectory = new URL("../public/", import.meta.url);
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
function pngSize(png) {
  assert.ok(
    png.subarray(0, 8).equals(signature),
    "Expected a valid PNG header",
  );
  return [png.readUInt32BE(16), png.readUInt32BE(20)];
}

test("Share previews have the declared social dimensions and distinct languages", async () => {
  const [fr, en, legacy] = await Promise.all(
    ["images/social-fr.png", "images/social-en.png", "preview.png"].map(
      (file) => readFile(new URL(file, publicDirectory)),
    ),
  );
  assert.deepEqual(pngSize(fr), [1200, 630]);
  assert.deepEqual(pngSize(en), [1200, 630]);
  assert.ok(!fr.equals(en), "English must not point to a French image");
  assert.ok(
    legacy.equals(fr),
    "Legacy preview must use the current French artwork",
  );
  for (const locale of ["fr", "en"])
    assert.ok(seoHead(locale).includes(`social-${locale}.png?v=7`));
});

test("Favicon, home screen icons and ICO fallbacks have the required sizes", async () => {
  for (const [filename, size] of [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["apple-touch-icon.png", 180],
    ["android-chrome-192x192.png", 192],
    ["android-chrome-512x512.png", 512],
  ]) {
    assert.deepEqual(
      pngSize(await readFile(new URL(filename, publicDirectory))),
      [size, size],
    );
  }
  const ico = await readFile(new URL("favicon.ico", publicDirectory));
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + 16 * index;
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    assert.ok(offset + length <= ico.length);
    assert.deepEqual(pngSize(ico.subarray(offset, offset + length)), [
      size,
      size,
    ]);
  }
  const svg = await readFile(new URL("favicon.svg", publicDirectory), "utf8");
  assert.ok(svg.includes('viewBox="0 0 64 64"'));
  assert.ok(!svg.includes("<text"), "SVG must not rely on installed fonts");
  assert.ok(
    !/https?:\/\//.test(svg.replace("http://www.w3.org/2000/svg", "")),
    "Favicon must have no external resources",
  );
});

test("Localized card templates keep the name, specialities and portrait source", () => {
  for (const locale of ["fr", "en"]) {
    const html = socialCardHtml({
      locale,
      font: "test-font",
      portrait: "test-portrait",
      icon: "test-icon",
    });
    for (const text of [
      "Pierre Clément",
      "Full-stack",
      "DevOps",
      "Architecture",
      "R&amp;D",
      "test-portrait",
    ])
      assert.ok(html.includes(text));
    assert.ok(html.includes(`<html lang="${locale}">`));
    assert.ok(html.includes(locale === "fr" ? "indépendant." : "engineer."));
    assert.ok(html.includes(`<span>${locale === "fr" ? "IA" : "AI"}</span>`));
  }
  assert.throws(() => socialCardHtml({ locale: "es" }));
});
