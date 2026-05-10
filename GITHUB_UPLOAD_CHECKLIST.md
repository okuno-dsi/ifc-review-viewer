# GitHub Upload Checklist

Use this checklist before making the repository public.

## Do Not Upload Project Data

The repository must not include copyrighted BIM/CAD/project files.

Blocked by `.gitignore`:

- `*.ifc`, `*.ifczip`
- `*.rvt`, `*.rfa`, `*.rte`, `*.rft`
- `*.nwd`, `*.nwc`
- `*.dwg`, `*.dxf`
- Office/PDF files and archives that may contain project information

The folders below are placeholders only:

- `DISTRIBUTABLE_PACKAGE/IFC/`
- `DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/`

Keep the README files in those folders, but do not commit IFC files.

## Preflight Commands

```bash
npm ci
npm audit
npm run build
node --check app.js
git status --short
git check-ignore -v DISTRIBUTABLE_PACKAGE/IFC/*.ifc
git check-ignore -v DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/*.ifc
git ls-files | rg -i '\.(ifc|ifczip|rvt|rfa|rte|rft|nwd|nwc|dwg|dxf|pdf|xls|xlsx|doc|docx|ppt|pptx|zip|7z|rar)$'
```

The final `git ls-files` command should return no files.

## Suggested First Push

Create an empty GitHub repository, then run:

```bash
git init -b main
git add .
git status --short
git commit -m "Initial public IFC review viewer"
git remote add origin https://github.com/okuno-dsi/ifc-review-viewer.git
git push -u origin main
```

Adjust the remote URL if the GitHub repository name is different.
