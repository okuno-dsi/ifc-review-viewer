# GitHub Release Checklist

Use this checklist before publishing the OpenBIM Advanced viewer.

## Repository

- Publish the source repository without IFC, ST-Bridge, Revit, DWG, PDF, Office, or other project files.
- Keep `node_modules/` out of Git. Recreate dependencies with `npm ci`.
- Keep release ZIP files out of Git. Attach them to GitHub Releases instead.
- Keep `vendor/web-ifc.wasm` and `vendor/ifc-runtime.js` because the standalone/local viewer needs the bundled IFC runtime.

## Verification

```bash
npm ci
npm run check
npm run check:publish
npm audit --audit-level=high
npm run build
```

## Suggested Release Assets

- `IFCReviewViewer_Standalone.html`
- `DISTRIBUTABLE_PACKAGE_OpenBIM_Advanced_v0.2.0.zip`

## Notes

This project is an OpenBIM-only viewer and reviewer for public formats: IFC and ST-Bridge. It does not include Revit-derived private package data, MCP, A2A, server APIs, account systems, or cloud upload workflows.
