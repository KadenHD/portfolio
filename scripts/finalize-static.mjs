import { copyFile, writeFile, access } from "node:fs/promises";

// react-static-prerender copies assets but deliberately excludes HTML files.
await copyFile(
  new URL("../dist/404.html", import.meta.url),
  new URL("../static-pages/404.html", import.meta.url),
);
await writeFile(new URL("../static-pages/.nojekyll", import.meta.url), "");
for (const path of [
  "index.html",
  "en/index.html",
  "site.webmanifest",
  "en/site.webmanifest",
  "images/social-fr.png",
  "images/social-en.png",
  "favicon.svg",
  "favicon.ico",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
]) {
  await access(new URL(`../static-pages/${path}`, import.meta.url));
}
