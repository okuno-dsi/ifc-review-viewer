import esbuild from "esbuild";
import { readFile, writeFile } from "node:fs/promises";

const [indexHtml, styles, wasmBytes] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("vendor/web-ifc.wasm")
]);

const bundle = await esbuild.build({
  entryPoints: ["app.js"],
  bundle: true,
  format: "iife",
  target: "es2020",
  platform: "browser",
  write: false
});

const script = bundle.outputFiles[0].text.replaceAll("</script", "<\\/script");
const wasmDataUri = `data:application/octet-stream;base64,${wasmBytes.toString("base64")}`;
const standaloneScripts = [
  "<script>",
  `window.IFC_REVIEW_WASM_DATA_URI = ${JSON.stringify(wasmDataUri)};`,
  "</script>",
  "<script>",
  script,
  "</script>"
].join("\n");

const standaloneHtml = indexHtml
  .replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${styles}\n</style>`)
  .replace('<script type="module" src="./app.js"></script>', standaloneScripts);

await writeFile("IFCReviewViewer_Standalone.html", standaloneHtml, "utf8");
