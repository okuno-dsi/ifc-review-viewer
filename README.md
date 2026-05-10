# IFC Review Viewer

ブラウザだけで IFC を開き、BIM モデルを確認し、要素単位でレビューできるオープンソースビューアです。

このプロジェクトの目的は **BIM ビューワの民主化** です。高価な専用環境や特定ベンダー製品に依存せず、発注者、行政、地方自治体、設計事務所、施工者、維持管理者、教育機関、個人事務所が、同じ IFC データを安全に確認できる状態を目指します。

IFC Review Viewer is a browser-only WebGL IFC viewer and lightweight review tool. It opens local `.ifc` files, lets reviewers select model elements, inspect basic IFC properties, write element, whole-building, and department/area comments, highlight commented elements, and exchange comments as JSON.

The project is intentionally limited to browser code: no desktop plugin, protocol bridge, server backend, account system, or cloud dependency is required.

## Why This Exists

日本で BIM を進めるには、BIM データを「作る人」だけでなく「確認する人」が安心して使えるビューアが必要です。IFC はその入口として最も中立的で、検証しやすく、公開しやすい形式です。

このビューアは、まず IFC ビューアとして公開し、次の価値を社会に示すことを狙います。

- データを外部サーバーへ送らず、手元のブラウザで確認できる
- オープンソースとして動作を検証できる
- 要素、建物全体、部門・範囲のレビュー記録を JSON として交換できる
- 特定の商用ソフトを持たない関係者も BIM レビューへ参加できる
- 将来的に、IFC 以外の変換済み BIM 表示データも同じレビュー体験で扱える

## Features

- Load IFC files directly in the browser
- Load multiple IFC files into the same WebGL scene
- Orbit, pan, zoom, and fit the model
- Toggle model visibility by loaded IFC file
- Toggle element visibility by IFC category/type
- Toggle element visibility by building storey when `IfcBuildingStorey` data is available
- Show a generated reference grid and level guide lines
- Use a mouse-resizable clipping box with numeric rotation or a simple clipping section plane
- Keep selected element information in a floating pane and open other panes as pop-outs
- Click an element to inspect IFC type, Express ID, GlobalId, name, tag, and other available properties
- Save comments against selected elements, the whole IFC model, or a department/area
- Show comments for the selected element and across the whole model
- Highlight elements that have comments
- Export and import review comments as JSON
- Run as a single standalone HTML file by opening it directly

## Public Trust Principles

- **Local-first**: IFC ファイルとコメントは原則として利用者の端末内で扱います。
- **Transparent**: 表示・レビュー・保存の仕組みを公開ソースで確認できます。
- **Open format first**: IFC と JSON を基本にし、長期保存と相互運用性を優先します。
- **No lock-in**: 特定のクラウド、アカウント、専用サーバーを必須にしません。
- **Review-oriented**: 単なる閲覧ではなく、要素に対する確認・指摘・合意形成を重視します。

## Quick Start

### Serverless Use

Open `IFCReviewViewer_Standalone.html` directly in a modern browser and choose an IFC file.

This public repository does not include IFC model files. Use your own IFC files, or add only files whose redistribution has been approved by the project owner.

Comments are saved in browser local storage for the same browser/profile. Use `コメント書出` and `コメント読込` to share or back up review comments.

Use `コメント埋込IFC書出` to download a copy of the active IFC with the viewer's review comments embedded. Browsers cannot overwrite the original local IFC file directly, so the original remains untouched.

### Development Server

```bash
npm install
npm run dev
```

Then open `http://127.0.0.1:8080/`.

## Build

```bash
npm install
npm run build
```

`npm run build` rebuilds:

- `vendor/ifc-runtime.js`
- `vendor/web-ifc.wasm`
- `IFCReviewViewer_Standalone.html`

## Project Structure

- `index.html`: modular browser entry
- `app.js`: viewer and reviewer application logic
- `styles.css`: UI styling
- `vendor/`: bundled IFC/WebGL runtime used by the modular entry
- `IFCReviewViewer_Standalone.html`: one-file, serverless distribution
- `scripts/`: build scripts

## Distributable Package

Files that can be handed to reviewers are collected here:

- `DISTRIBUTABLE_PACKAGE/IFCReviewViewer_Standalone.html`: standalone viewer
- `DISTRIBUTABLE_PACKAGE/IFC/`: placeholder folder for approved main IFC files
- `DISTRIBUTABLE_PACKAGE/IFC/IFC_LINK/`: placeholder folder for approved linked or discipline-specific IFC files
- `DISTRIBUTABLE_PACKAGE/LICENSE`: viewer license
- `DISTRIBUTABLE_PACKAGE/THIRD_PARTY_NOTICES.md`: third-party notices

IFC files are intentionally ignored by Git. Open the main IFC first, then add the linked IFC files from `IFC_LINK` when a federated review is needed.

## Roadmap

The public core will remain a simple, inspectable IFC viewer and reviewer. Extensions should be added in a way that keeps the core trustworthy.

- IFC property panels and search workflows
- Comment grouping, issue status, and review session summaries
- Open review exchange formats after the public core is stable
- Optional adapters for converted BIM display data, including data converted from authoring tools
- Public sample models and repeatable verification tests
- Accessibility, Japanese public-sector documentation, and deployment guides

## Notes

The standalone file is intentionally large because it embeds the JavaScript runtime and `web-ifc.wasm`. This avoids browser `file://` restrictions and lets the viewer run by double-clicking the HTML file.

IFC material colors are shown when they are exported into the IFC file as style/material information. Some IFC exports contain rich surface colors, while others contain only geometry and basic object data.

## License

MIT. See `LICENSE`.

Third-party runtime notices are listed in `THIRD_PARTY_NOTICES.md`.
