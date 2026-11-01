const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const output = path.join(root, "dist");
fs.rmSync(output, { recursive: true, force: true });

const apps = [
  ["client-web", "order"],
  ["business-pos", "pos"],
  ["analytics", "analytics"],
];

for (const [sourceName, routeName] of apps) {
  const source = path.join(root, "apps", sourceName, "dist-realtime");
  const destination = path.join(output, routeName);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing build output: ${source}`);
  }
  fs.cpSync(source, destination, { recursive: true });
  fs.copyFileSync(
    path.join(destination, "realtime.html"),
    path.join(destination, "index.html")
  );
}

fs.writeFileSync(
  path.join(output, "index.html"),
  '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/order/"></head><body><a href="/order/">MasaFlow</a></body></html>'
);
