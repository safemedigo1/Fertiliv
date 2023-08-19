const { createServer } = require("http");
const { parse } = require("url");
const { join } = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    // Serve static files from the public directory
    console.log(pathname, "PATHNAMEZ");
    console.log(parsedUrl, "PATHNAMEZ");
    if (pathname.startsWith("/uploads")) {
      const filePath = join(__dirname, "public", pathname);

      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
