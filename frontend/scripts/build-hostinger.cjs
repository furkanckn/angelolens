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
 * Static hosting cannot execute Next.js middleware. This root page performs a
 * browser-side locale choice: saved cookie → browser language → English.
 * No third-party geo APIs (mobile Safari often fails those challenges).
 */
const hostingerLocaleIndex = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta name="theme-color" content="#0e0d0c">
  <title>Angelo Lens</title>
  <style>
    html,body{height:100%;margin:0;background:#0e0d0c}
    body{
      display:grid;place-items:center;color:#f7f4ef;
      font:400 14px/1.4 system-ui,-apple-system,sans-serif;
      background:
        radial-gradient(ellipse 70% 55% at 50% 42%, rgba(176,141,87,.18), transparent 62%),
        #0e0d0c;
    }
    .wrap{display:flex;flex-direction:column;align-items:center;gap:1.25rem;padding:2rem;text-align:center}
    .logo{width:min(200px,58vw);height:auto;opacity:.96}
    .rule{width:3.25rem;height:1px;background:linear-gradient(90deg,transparent,#d4b87a,#b08d57,transparent);opacity:.85}
    .mark{margin:0;letter-spacing:.38em;text-indent:.38em;text-transform:uppercase;font-size:.72rem;color:rgba(247,244,239,.78)}
    .bar{position:relative;width:min(9rem,42vw);height:1px;overflow:hidden;background:rgba(247,244,239,.12);border-radius:999px}
    .bar:after{content:"";position:absolute;inset:0 auto 0 0;width:40%;background:linear-gradient(90deg,transparent,#d4b87a,#b08d57,transparent);animation:scan 1.2s ease-in-out infinite}
    @keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}
    @media (prefers-reduced-motion:reduce){.bar:after{animation:none;width:100%;opacity:.5}}
  </style>
  <script>
    (function () {
      var supported = ["en", "tr", "de", "it", "ru", "ar", "fa"];
      var finished = false;

      function isSupported(locale) {
        return supported.indexOf(locale) !== -1;
      }

      function browserLocale() {
        var languages = navigator.languages || [navigator.language || "en"];
        for (var i = 0; i < languages.length; i += 1) {
          var locale = String(languages[i] || "").toLowerCase().split("-")[0];
          if (isSupported(locale)) return locale;
        }
        return "en";
      }

      function savedLocale() {
        try {
          var match = document.cookie.match(/(?:^|;\\s*)NEXT_LOCALE=([^;]+)/);
          var locale = match ? decodeURIComponent(match[1]).toLowerCase() : "";
          return isSupported(locale) ? locale : "";
        } catch (e) {
          return "";
        }
      }

      function go(locale) {
        if (finished) return;
        finished = true;
        var selected = isSupported(locale) ? locale : "en";
        try {
          var secure = location.protocol === "https:" ? "; Secure" : "";
          document.cookie = "NEXT_LOCALE=" + selected + "; Max-Age=31536000; Path=/; SameSite=Lax" + secure;
        } catch (e) {}
        var target = "/" + selected + "/" + (location.search || "") + (location.hash || "");
        try {
          location.replace(target);
        } catch (e) {
          location.href = target;
        }
      }

      var saved = savedLocale();
      if (saved) {
        go(saved);
        return;
      }

      // Instant, offline-safe choice — never wait on third-party geo APIs.
      go(browserLocale());
    })();
  </script>
  <noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript>
</head>
<body>
  <div class="wrap" aria-live="polite">
    <img class="logo" src="/images/brand/logo-white.png" width="200" height="48" alt="Angelo Lens">
    <div class="rule" aria-hidden="true"></div>
    <p class="mark">Angelo Lens</p>
    <div class="bar" aria-hidden="true"></div>
  </div>
</body>
</html>
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

// Root index now performs saved-locale / IP-country / browser-language detection.
console.log("");
console.log("✓ Hostinger static build ready:");
console.log(`  ${publicHtml}`);
console.log("  → Upload EVERYTHING inside public_html/ into Hostinger's public_html");
console.log("");

restoreMiddleware();
