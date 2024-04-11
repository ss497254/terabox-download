import esbuild from "esbuild";
import fs from "fs";
import { manifest } from "./manifest.mjs";

function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  for (const file of fs.readdirSync(src)) {
    fs.copyFileSync(src + file, dest + file);
  }
}

function writeManifest(path) {
  fs.writeFileSync(path, JSON.stringify(manifest));
}

esbuild.buildSync({
  minify: true,
  bundle: true,
  entryPoints: ["src/index.ts"],
  loader: { ".css": "text" },
  outfile: "build/content-script.js",
});

writeManifest("./build/manifest.json");
copyFolder("./public/", "./build/public/");
