import { copyFile, writeFile, access, mkdir, rename, rmdir } from "node:fs/promises";
import { siteRoutes } from "../src/i18n/routing.js";

// react-static-prerender 1.3 flattens nested paths (en/legal-notice becomes
// en-legal-notice), even with flatOutput: false. Restore the public directory
// structure and remove the intermediate directory from the release artifact.
const output = new URL("../static-pages/", import.meta.url);
for (const { pathname } of siteRoutes) {
  const directory = pathname.slice(1, -1);
  const generatedDirectory = directory.replaceAll("/", "-");
  if (directory === generatedDirectory) continue;
  await mkdir(new URL(`${directory}/`, output), { recursive: true });
  await rename(
    new URL(`${generatedDirectory}/index.html`, output),
    new URL(`${directory}/index.html`, output),
  );
  await rmdir(new URL(`${generatedDirectory}/`, output));
}

// react-static-prerender copies assets but deliberately excludes HTML files.
await copyFile(
  new URL("../dist/404.html", import.meta.url),
  new URL("../static-pages/404.html", import.meta.url),
);
await writeFile(new URL("../static-pages/.nojekyll", import.meta.url), "");
for (const path of [
  ...siteRoutes.map(({ pathname }) => `${pathname.slice(1)}index.html`),
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
