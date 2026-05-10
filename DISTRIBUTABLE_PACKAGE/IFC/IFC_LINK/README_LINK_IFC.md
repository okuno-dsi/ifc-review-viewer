# Linked IFC Folder

Place approved distributable secondary IFC files in this folder when you want to keep them separate from the main IFC.

Do not commit project IFC files to GitHub unless the project owner has explicitly approved public redistribution. This repository ignores `*.ifc` files by default.

This folder is for organization only. Because the viewer runs as a local browser-only app, it cannot automatically read every file in this folder. Add these IFC files manually with the viewer's file picker or by drag and drop.

Examples:

```text
DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/Structure.ifc
DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/MEP.ifc
DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/Site.ifc
```

Load these files after the main IFC when reviewing multiple IFC models together.
