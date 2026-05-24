# IFC Review Viewer Advanced

IFC Review Viewer Advanced is an OpenBIM-only version of the browser BIM review viewer.

It is intentionally limited to public, redistributable model formats:

- IFC `.ifc`
- ST-Bridge `.stb`
- ST-Bridge XML `.xml`

This folder does not include converted Revit package data, Revit-derived scene JSON, RVT files, MCP interfaces, A2A gateway UI, server APIs, account systems, or cloud upload workflows.

## Screenshots

![IFC Review Viewer Advanced workspace](docs/screenshots/ss01.png)

![IFC Review Viewer Advanced review tools](docs/screenshots/ss02.png)

## Purpose

この派生版は、内部評価用ビューアから Revit データ依存と内部連携機能を取り除き、公開可能な IFC / ST-Bridge 専用ビューアとして整理したものです。

目的は、既存の IFC Review Viewer の上位版に見える形で、次の実務機能を提供することです。

- ブラウザだけで IFC と ST-Bridge を読み込む
- 複数モデルを重ねて表示する
- IFC / ST-Bridge ごとに表示、色、透明度、座標補正を調整する
- カテゴリ別、レベル別に表示を切り替える
- クリッピング、属性色分け、スペース表示、室内視点移動、計測、コメント、視点復元を行う
- 要素、建物全体、部門・範囲に対するレビューコメントを JSON で交換する
- 指摘を Findings として記録し、BCFZIP として書き出す

## What Was Removed

The following internal review-package functions are not part of this OpenBIM edition:

- converted Revit scene data such as `scene.json`, `attributes.json`, and `package-data.js`
- Revit package manifests and link-package manifests
- RVT / RFA / DWG / PDF / Office project files
- internal review return queues and owner write tokens
- MCP, A2A, or specialist-agent gateway interfaces
- Review Hub HTTP server endpoints

## Quick Start

Open `IFCReviewViewer_Standalone.html` directly in a modern browser, or run the development page:

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:8080/`.

For distribution, use:

```text
DISTRIBUTABLE_PACKAGE/IFCReviewViewer_Standalone.html
```

## Model File Locations

Main IFC files:

```text
DISTRIBUTABLE_PACKAGE/IFC/
```

Linked or discipline-specific IFC files:

```text
DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/
```

ST-Bridge files:

```text
DISTRIBUTABLE_PACKAGE/ST_BRIDGE/
```

Browsers cannot automatically scan these folders from a normal local HTML file. Select each IFC or ST-Bridge file from the viewer UI.

## Build

```bash
npm install
npm run build
```

The build recreates:

- `vendor/ifc-runtime.js`
- `IFCReviewViewer_Standalone.html`

After building, copy the standalone file into `DISTRIBUTABLE_PACKAGE/` before packaging.

## GitHub Publication Checks

Before publishing, run:

```bash
npm ci
npm run check
npm run check:publish
npm audit --audit-level=high
npm run build
```

`npm run check:publish` fails if IFC, ST-Bridge, Revit, DWG, PDF, Office, archive, or XML project data files are present in the repository tree. Release ZIP files are intentionally kept out of Git and should be attached to GitHub Releases instead.

Suggested release assets:

- `IFCReviewViewer_Standalone.html`
- `DISTRIBUTABLE_PACKAGE_OpenBIM_Advanced_v0.2.0.zip`

## License

This project is MIT licensed. Bundled third-party runtime components remain under their respective licenses, especially `web-ifc` under MPL-2.0. See `THIRD_PARTY_NOTICES.md`.
