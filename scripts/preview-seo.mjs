import http from "node:http";
import { access, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { site } from "../src/lib/seo.js";

const defaultDirectory = fileURLToPath(
  new URL("../static-pages/", import.meta.url),
);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};

// Only the HTTP preview is adapted. Canonicals, hreflang, bundles and release
// files keep their production URLs. No preview address is written to disk.
export function previewHtml(html, origin) {
  const localOrigin = new URL(origin).origin;
  return html.replace(/<meta\b[^>]*>/g, (tag) => {
    if (!/(?:property="og:image"|name="twitter:image")/.test(tag)) return tag;
    return tag.replace(/content="([^"]*)"/, (attribute, value) => {
      const image = new URL(value, site.origin);
      if (
        image.origin !== site.origin ||
        !/^\/images\/social-(fr|en)\.png$/.test(image.pathname)
      )
        return attribute;
      return `content="${localOrigin}${image.pathname}${image.search}"`;
    });
  });
}

export function createPreviewServer({ directory = defaultDirectory } = {}) {
  const root = path.resolve(directory);
  return http.createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Robots-Tag", "noindex, nofollow");
    response.setHeader("X-Content-Type-Options", "nosniff");
    const send = (status, body, type = "text/plain; charset=utf-8") => {
      response.writeHead(status, { "Content-Type": type });
      response.end(request.method === "HEAD" ? undefined : body);
    };
    if (!["GET", "HEAD"].includes(request.method)) {
      response.setHeader("Allow", "GET, HEAD");
      send(405, "Method not allowed");
      return;
    }
    try {
      const origin = new URL(`http://${request.headers.host}`).origin;
      const pathname = decodeURIComponent(
        new URL(request.url, origin).pathname,
      );
      if (pathname.split("/").some((part) => part.startsWith("."))) {
        send(404, "Not found");
        return;
      }
      let file = path.resolve(root, `.${pathname}`);
      if (!file.startsWith(root + path.sep) && file !== root) {
        send(404, "Not found");
        return;
      }
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(308, {
            Location: `${pathname}/${new URL(request.url, origin).search}`,
          });
          response.end();
          return;
        }
        file = path.join(file, "index.html");
      }
      if (
        !(await realpath(file)).startsWith((await realpath(root)) + path.sep)
      ) {
        send(404, "Not found");
        return;
      }
      const body = await readFile(file);
      const extension = path.extname(file);
      send(
        200,
        extension === ".html"
          ? previewHtml(body.toString("utf8"), origin)
          : body,
        contentTypes[extension] || "application/octet-stream",
      );
    } catch (error) {
      if (["ENOENT", "ENOTDIR"].includes(error.code)) {
        const body = await readFile(path.join(root, "404.html")).catch(
          () => "Not found",
        );
        send(404, body, "text/html; charset=utf-8");
      } else if (
        error instanceof URIError ||
        error.code === "ERR_INVALID_URL"
      ) {
        send(400, "Invalid URL");
      } else {
        send(500, "Preview unavailable");
      }
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({
    options: {
      host: { type: "string", default: "127.0.0.1" },
      port: { type: "string", default: "5175" },
    },
  });
  for (const file of ["index.html", "en/index.html"]) {
    await access(path.join(defaultDirectory, file)).catch(() => {
      throw new Error(
        "Pages prérendues absentes : exécuter npm run prerender.",
      );
    });
  }
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 1024 || port > 65535)
    throw new Error("Port invalide.");
  const server = createPreviewServer();
  server.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  server.listen(port, values.host, () => {
    console.log(
      `Prévisualisation SEO : http://${values.host}:${port}/ et /en/`,
    );
    console.log(
      "Pages prérendues ; images OG/Twitter locales ; production inchangée.",
    );
  });
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => server.close());
}
