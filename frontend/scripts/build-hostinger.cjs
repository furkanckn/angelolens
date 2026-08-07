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
 * Static hosting cannot execute Next.js middleware. This root page performs the
 * same first-visit locale choice in the browser: saved choice → IP country →
 * browser language → English.
 */
const hostingerLocaleIndex = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>Angelo Lens</title>
  <style>
    html,body{height:100%;margin:0;background:#f4f0e8}
    body{display:grid;place-items:center;color:#27231f;font:14px system-ui,sans-serif}
  </style>
  <script>
    (function () {
      var supported = ["en", "tr", "de", "it", "ru", "ar", "fa"];
      var arabicCountries = ["SA","AE","QA","KW","BH","OM","JO","LB","IQ","EG","MA","DZ","TN","LY","SY","PS","YE","SD","SO","MR","DJ","KM"];
      var finished = false;

      function isSupported(locale) {
        return supported.indexOf(locale) !== -1;
      }

      function countryToLocale(country) {
        var code = String(country || "").trim().toUpperCase();
        if (code === "TR") return "tr";
        if (code === "DE") return "de";
        if (code === "IT") return "it";
        if (code === "RU") return "ru";
        if (code === "IR") return "fa";
        if (arabicCountries.indexOf(code) !== -1) return "ar";
        return "en";
      }

      function browserLocale() {
        var languages = navigator.languages || [navigator.language || "en"];
        for (var i = 0; i < languages.length; i += 1) {
          var locale = String(languages[i]).toLowerCase().split("-")[0];
          if (isSupported(locale)) return locale;
        }
        return "en";
      }

      function savedLocale() {
        var match = document.cookie.match(/(?:^|;\\s*)NEXT_LOCALE=([^;]+)/);
        var locale = match ? decodeURIComponent(match[1]).toLowerCase() : "";
        return isSupported(locale) ? locale : "";
      }

      function go(locale) {
        if (finished) return;
        finished = true;
        var selected = isSupported(locale) ? locale : "en";
        var secure = location.protocol === "https:" ? "; Secure" : "";
        document.cookie = "NEXT_LOCALE=" + selected + "; Max-Age=31536000; Path=/; SameSite=Lax" + secure;
        location.replace("/" + selected + "/" + location.search + location.hash);
      }

      var saved = savedLocale();
      if (saved) {
        go(saved);
        return;
      }

      var fallback = browserLocale();
      var controller = typeof AbortController === "function" ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (controller) controller.abort();
        go(fallback);
      }, 1500);

      fetch("https://ipapi.co/country_code/", {
        headers: { Accept: "text/plain" },
        signal: controller ? controller.signal : undefined
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Geo lookup failed");
          return response.text();
        })
        .then(function (country) {
          clearTimeout(timer);
          go(countryToLocale(country));
        })
        .catch(function () {
          clearTimeout(timer);
          go(fallback);
        });
    })();
  </script>
  <noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript>
</head>
<body aria-live="polite">Angelo Lens</body>
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
