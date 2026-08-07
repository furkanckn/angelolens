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

/**
 * Fallback only — production root should 302 via `.htaccess` (no JS).
 * Keep this page free of third-party fetches and free of sync redirects
 * that Safari sometimes treats as a failed navigation.
 */
const hostingerLocaleIndex = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta name="theme-color" content="#0e0d0c">
  <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="refresh" content="0;url=/tr/">
  <title>Angelo Lens</title>
  <style>
    html,body{height:100%;margin:0;background:#0e0d0c}
    body{
      display:grid;place-items:center;color:#f7f4ef;
      font:400 14px/1.45 system-ui,-apple-system,sans-serif;
      background:
        radial-gradient(ellipse 70% 55% at 50% 42%, rgba(176,141,87,.18), transparent 62%),
        #0e0d0c;
    }
    .wrap{display:flex;flex-direction:column;align-items:center;gap:1.1rem;padding:2rem;text-align:center}
    .logo{width:min(200px,58vw);height:auto;opacity:.96}
    .rule{width:3.25rem;height:1px;background:linear-gradient(90deg,transparent,#d4b87a,#b08d57,transparent);opacity:.85}
    .mark{margin:0;letter-spacing:.38em;text-indent:.38em;text-transform:uppercase;font-size:.72rem;color:rgba(247,244,239,.78)}
    .links{display:flex;flex-wrap:wrap;gap:.65rem;justify-content:center;margin:0;padding:0;list-style:none}
    .links a{
      color:#f7f4ef;text-decoration:none;letter-spacing:.12em;text-transform:uppercase;
      font-size:.68rem;border:1px solid rgba(247,244,239,.28);padding:.55rem .8rem;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <img class="logo" src="/images/brand/logo-white.png" width="200" height="48" alt="Angelo Lens">
    <div class="rule" aria-hidden="true"></div>
    <p class="mark">Angelo Lens</p>
    <ul class="links">
      <li><a href="/tr/">Türkçe</a></li>
      <li><a href="/en/">English</a></li>
      <li><a href="/de/">Deutsch</a></li>
      <li><a href="/it/">Italiano</a></li>
      <li><a href="/ru/">Русский</a></li>
      <li><a href="/ar/">العربية</a></li>
      <li><a href="/fa/">فارسی</a></li>
    </ul>
  </div>
</body>
</html>
`;

/** LiteSpeed/Apache: cookie → Accept-Language → /tr/ (primary market). */
const hostingerHtaccess = `<IfModule mod_rewrite.c>
    RewriteEngine On

    # Laravel Livewire assets live under /panel
    RewriteRule ^livewire(?:/.*)?$ panel/index.php [L,QSA]

    # Saved locale cookie
    RewriteCond %{HTTP_COOKIE} NEXT_LOCALE=(en|tr|de|it|ru|ar|fa) [NC]
    RewriteRule ^(index\\.html)?$ /%1/ [R=302,L]

    # Browser language (first match wins)
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*tr([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /tr/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*de([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /de/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*it([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /it/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*ru([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /ru/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*ar([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /ar/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*fa([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /fa/ [R=302,L]
    RewriteCond %{HTTP:Accept-Language} (^|,)\\s*en([,;_-]|$) [NC]
    RewriteRule ^(index\\.html)?$ /en/ [R=302,L]

    # Default for this market
    RewriteRule ^(index\\.html)?$ /tr/ [R=302,L]
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
fs.writeFileSync(path.join(publicHtml, "index.html"), hostingerLocaleIndex, "utf8");
fs.writeFileSync(path.join(publicHtml, ".htaccess"), hostingerHtaccess, "utf8");

console.log("");
console.log("✓ Hostinger static build ready:");
console.log(`  ${publicHtml}`);
console.log("  → Upload EVERYTHING inside public_html/ into Hostinger's public_html");
console.log("");

restoreMiddleware();
