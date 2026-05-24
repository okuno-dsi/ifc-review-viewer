import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  ".vs",
  "node_modules"
]);

const blockedExtensions = new Set([
  ".ifc",
  ".ifczip",
  ".stb",
  ".rvt",
  ".rfa",
  ".rte",
  ".rft",
  ".nwd",
  ".nwc",
  ".dwg",
  ".dxf",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".xlsm",
  ".ppt",
  ".pptx",
  ".7z",
  ".rar",
  ".xml"
]);

const blockedFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const relative = path.relative(root, fullPath).replaceAll(path.sep, "/");

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await walk(fullPath);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (blockedExtensions.has(extension)) {
      const fileStat = await stat(fullPath);
      blockedFiles.push({ relative, size: fileStat.size });
    }
  }
}

await walk(root);

if (blockedFiles.length > 0) {
  console.error("Blocked project/model/document files were found:");
  for (const file of blockedFiles) {
    console.error(`- ${file.relative} (${file.size} bytes)`);
  }
  process.exit(1);
}

console.log("No blocked project/model/document files found.");
