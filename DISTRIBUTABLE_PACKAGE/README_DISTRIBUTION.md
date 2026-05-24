# IFC Review Viewer Distribution Package

This folder contains files that can be distributed to reviewers. IFC folders are placeholders in the public source repository; add IFC or ST-Bridge files only when redistribution has been approved by the project owner.

## Open the Viewer

Open this file in a modern browser:

```text
IFCReviewViewer_Standalone.html
```

No server, account, cloud storage, desktop plugin, or installed BIM application is required.

## IFC / ST-Bridge File Locations

Main IFC files:

```text
DISTRIBUTABLE_PACKAGE/IFC/
```

Linked IFC files:

```text
DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/
```

ST-Bridge files:

```text
DISTRIBUTABLE_PACKAGE/ST_BRIDGE/
```

`IFC_LINK/` is only an organizational folder. The browser cannot automatically scan that folder without a user file-selection action, so linked IFC files must still be added manually from the viewer.

IFC files are ignored by Git in this repository and should not be uploaded to GitHub unless they are explicitly approved public sample data.
ST-Bridge `.stb` or `.xml` files are also project model data and should be handled the same way.

Recommended workflow:

1. Open the main IFC from `IFC/`.
2. Add linked IFC files from `IFC/IFC_LINK/`, or add ST-Bridge `.stb` / `.xml` files for structural review.
3. Use the pop-out category, level, and clipping controls to inspect the model.
4. Review elements, the whole loaded model, or departments/areas and write comments in the browser.
5. Export comments or view states as JSON when sharing review results.
6. Use `コメント埋込IFC書出` when a review IFC copy with embedded comments is needed. The browser downloads a new IFC file and does not overwrite the original.

IFC colors are displayed when the IFC file includes exported material/style information.
ST-Bridge files are displayed as simplified structural geometry for review: columns, beams, braces, slabs, walls, footings, and piles are generated from the public XML data.

Keyboard shortcuts:

- `W` / `A` / `S` / `D`: move forward / left / backward / right
- `Z` / `X`: move down / up
- `Q` / `E`: rotate view left / right
- `T` / `G`: look up / down
- `H`: reset to a horizontal eye-level view
- Hold `Shift` for large steps, or `Shift` + `Alt` for fine steps
- `F`: fit all
- `C`: open clipping and enable the clip box
- `L`: toggle level guide lines
- `M`: start or stop point-to-point measurement
- `Esc`: cancel measurement or clear selection

## Included Viewer Files

- `IFCReviewViewer_Standalone.html`
- `LICENSE`
- `THIRD_PARTY_NOTICES.md`
- `IFC/`
- `ST_BRIDGE/`
