import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { seoHead, canonicalUrl, metadata, site } from "../src/lib/seo.js";
import { locales, localePaths } from "../src/i18n/routing.js";

export function sitemapXml() {
  const alternates = [...locales, "x-default"]
    .map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${canonicalUrl(locale === "x-default" ? "fr" : locale)}" />`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${locales.map((locale) => `  <url>\n    <loc>${canonicalUrl(locale)}</loc>\n${alternates}\n  </url>`).join("\n")}
</urlset>\n`;
}

export async function generateSite() {
  const root = new URL("../", import.meta.url);
  const template = await readFile(new URL("index.html", root), "utf8");
  if (
    !template.includes("<!-- seo:start -->") ||
    !template.includes("<!-- seo:end -->")
  )
    throw new Error("Missing SEO markers in index.html");
  await writeFile(
    new URL("index.html", root),
    template.replace(
      /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
      `<!-- seo:start -->\n    ${seoHead("fr")}\n    <!-- seo:end -->`,
    ),
  );
  await writeFile(new URL("public/sitemap.xml", root), sitemapXml());
  await writeFile(
    new URL("public/robots.txt", root),
    `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`,
  );
  for (const locale of locales) {
    const directory = new URL(`public${localePaths[locale]}`, root);
    await mkdir(directory, { recursive: true });
    await writeFile(
      new URL("site.webmanifest", directory),
      JSON.stringify(
        {
          name: `${site.name} - ${metadata[locale].role}`,
          short_name: site.name,
          lang: locale,
          start_url: localePaths[locale],
          scope: "/",
          icons: [192, 512].map((size) => ({
            src: `/android-chrome-${size}x${size}.png?v=5`,
            sizes: `${size}x${size}`,
            type: "image/png",
          })),
          theme_color: "#091638",
          background_color: "#ffffff",
          display: "browser",
        },
        null,
        2,
      ) + "\n",
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await generateSite();
