/**
 * Hostinger static build:
 * - temporarily disables middleware (unsupported with output: 'export')
 * - runs next build with HOSTINGER_EXPORT=1
 * - copies `out/` → `public_html/` (upload this folder's contents to Hostinger public_html)
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const mw = path.join(root, "middleware.ts");
const mwBak = path.join(root, "middleware.ts.hostingerbak");
const outDir = path.join(root, "out");
const publicHtml = path.join(root, "public_html");

/** Livewire only — no root splash / locale gate. */
const hostingerHtaccess = `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^livewire(?:/.*)?$ panel/index.php [L,QSA]
</IfModule>

<IfModule mod_headers.c>
    <Files "index.html">
        Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
        Header set Pragma "no-cache"
        Header set Expires "0"
    </Files>
</IfModule>
`;

function restoreMiddleware() {
  if (fs.existsSync(mwBak)) {
    fs.renameSync(mwBak, mw);
  }
}

process.on("exit", restoreMiddleware);
process.on("SIGINT", () => {
  restoreMiddleware();
  process.exit(1);
});

if (fs.existsSync(mw)) {
  fs.renameSync(mw, mwBak);
  console.log("Hostinger: middleware temporarily disabled for static export");
}

const build = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, HOSTINGER_EXPORT: "1" },
  shell: process.platform === "win32",
});

if (build.status !== 0) {
  restoreMiddleware();
  process.exit(build.status ?? 1);
}

if (!fs.existsSync(outDir)) {
  console.error("Expected Next.js export folder `out/` was not created.");
  restoreMiddleware();
  process.exit(1);
}

fs.rmSync(publicHtml, { recursive: true, force: true });
fs.cpSync(outDir, publicHtml, { recursive: true });

// Serve the Turkish homepage at / with no splash, redirect, or geo/locale gate.
const trIndex = path.join(publicHtml, "tr", "index.html");
if (!fs.existsSync(trIndex)) {
  console.error("Expected tr/index.html was not created by the static export.");
  restoreMiddleware();
  process.exit(1);
}
fs.copyFileSync(trIndex, path.join(publicHtml, "index.html"));
fs.writeFileSync(path.join(publicHtml, ".htaccess"), hostingerHtaccess, "utf8");

console.log("");
console.log("✓ Hostinger static build ready:");
console.log(`  ${publicHtml}`);
console.log("  → Upload EVERYTHING inside public_html/ into Hostinger's public_html");
console.log("");

restoreMiddleware();
