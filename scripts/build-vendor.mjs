import esbuild from "esbuild";
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

await mkdir("vendor", { recursive: true });

const extensionFixPlugin = {
  name: "three-example-extension-fix",
  setup(build) {
    build.onResolve(
      { filter: /^three\/examples\/jsm\/utils\/BufferGeometryUtils$/ },
      () => ({
        path: require.resolve("three/examples/jsm/utils/BufferGeometryUtils.js")
      })
    );
  }
};

await esbuild.build({
  stdin: {
    sourcefile: "ifc-runtime-entry.js",
    resolveDir: process.cwd(),
    loader: "js",
    contents: `
      export * as THREE from "three";
      export { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
      export { IFCLoader } from "web-ifc-three/IFCLoader.js";
    `
  },
  bundle: true,
  format: "esm",
  target: "es2020",
  platform: "browser",
  outfile: "vendor/ifc-runtime.js",
  plugins: [extensionFixPlugin]
});

await copyFile(require.resolve("web-ifc/web-ifc.wasm"), "vendor/web-ifc.wasm");
