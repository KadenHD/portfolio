export default {
  // The prerender package maps /en to en/index.html. A trailing slash here
  // would incorrectly create en-/index.html. Public links use /en/.
  routes: ["/", "/en"],
  flatOutput: false,
  outDir: "static-pages",
  serveDir: "dist",
  buildCommand: "npm run build",
  viewport: { width: 1440, height: 1000 },
};
