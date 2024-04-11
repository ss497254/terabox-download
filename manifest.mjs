/** @type {chrome.runtime.ManifestV3} */
export const manifest = {
  name: "terabox-download",
  short_name: "terabox-download",
  description: "terabox-download",
  version: "1.0.0",
  manifest_version: 3,
  icons: {
    16: "public/icon16.png",
    32: "public/icon32.png",
    48: "public/icon48.png",
    128: "public/icon128.png",
    256: "public/icon256.png",
  },
  permissions: ["tabs", "webRequest", "scripting"],
  content_scripts: [
    {
      matches: ["*://*.4funbox.com/*", "*://*.terabox.com/*", "*://*.terabox.app/*", "*://*.teraboxapp.com/*"],
      js: ["./content-script.js"],
      run_at: "document_start",
    },
  ],
};
