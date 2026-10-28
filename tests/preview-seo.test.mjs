import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { once } from "node:events";
import { createPreviewServer } from "../scripts/preview-seo.mjs";
import { canonicalUrl, seoHead } from "../src/lib/seo.js";
import { siteRoutes } from "../src/i18n/routing.js";

test("SEO preview serves distinct static languages and local share images without changing release files", async () => {
  const directory = await mkdtemp(
    path.join(tmpdir(), "portfolio-seo-preview-"),
  );
  const root = path.join(directory, "site");
  const pages = {};
  const image = await readFile(
    new URL("../public/images/social-en.png", import.meta.url),
  );
  let server;
  try {
    await mkdir(path.join(root, "en"), { recursive: true });
    await mkdir(path.join(root, "images"));
    for (const { locale, page, pathname } of siteRoutes) {
      pages[pathname] =
        `<html lang="${locale}"><head>${seoHead(locale, page)}</head><body><h1>${page}</h1></body></html>`;
      await mkdir(path.join(root, pathname), { recursive: true });
      await writeFile(
        path.join(root, pathname, "index.html"),
        pages[pathname],
      );
      await writeFile(path.join(root, `images/social-${locale}.png`), image);
    }
    await writeFile(
      path.join(root, "404.html"),
      "<h1>Page introuvable / Page not found</h1>",
    );
    await writeFile(path.join(root, ".env"), "PRIVATE_FIXTURE");
    await writeFile(path.join(directory, "outside.txt"), "PRIVATE_FIXTURE");
    await symlink(
      path.join(directory, "outside.txt"),
      path.join(root, "linked.txt"),
    );
    server = createPreviewServer({ directory: root });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const origin = `http://127.0.0.1:${server.address().port}`;
    for (const { locale, page, pathname: url } of siteRoutes) {
      const response = await fetch(origin + url);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
      const html = await response.text();
      assert.ok(html.includes(`<html lang="${locale}">`));
      assert.ok(
        html.includes(`rel="canonical" href="${canonicalUrl(locale, page)}"`),
      );
      assert.ok(html.includes(`hreflang="en" href="${canonicalUrl("en", page)}"`));
      for (const attribute of ['property="og:image"', 'name="twitter:image"']) {
        assert.ok(
          html.includes(
            `${attribute} content="${origin}/images/social-${locale}.png?v=7"`,
          ),
        );
      }
      const asset = await fetch(`${origin}/images/social-${locale}.png?v=7`);
      assert.equal(asset.status, 200);
      assert.equal(asset.headers.get("content-type"), "image/png");
      assert.deepEqual(Buffer.from(await asset.arrayBuffer()), image);
      assert.equal(
        await readFile(
          path.join(root, url, "index.html"),
          "utf8",
        ),
        pages[url],
      );
    }
    const redirect = await fetch(origin + "/en?source=test", {
      redirect: "manual",
    });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get("location"), "/en/?source=test");
    const head = await fetch(origin + "/en/", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
    const missing = await fetch(origin + "/missing/");
    assert.equal(missing.status, 404);
    assert.ok((await missing.text()).includes("Page not found"));
    for (const pathname of ["/.env", "/linked.txt", "/%2e%2e%2foutside.txt"]) {
      const response = await fetch(origin + pathname);
      assert.equal(response.status, 404);
      assert.ok(!(await response.text()).includes("PRIVATE_FIXTURE"));
    }
  } finally {
    if (server?.listening)
      await new Promise((resolve) => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});
