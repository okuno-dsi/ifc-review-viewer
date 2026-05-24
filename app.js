import { THREE, OrbitControls, IFCLoader } from "./vendor/ifc-runtime.js";

const elements = {
  appShell: document.querySelector(".app-shell"),
  topbar: document.querySelector(".topbar"),
  canvas: document.getElementById("viewerCanvas"),
  dropZone: document.getElementById("dropZone"),
  emptyState: document.getElementById("emptyState"),
  statusBar: document.getElementById("statusBar"),
  cameraCoordinate: document.getElementById("cameraCoordinate"),
  spaceLabelLayer: document.getElementById("spaceLabelLayer"),
  measurementOverlaySvg: document.getElementById("measurementOverlaySvg"),
  currentSpaceOverlay: document.getElementById("currentSpaceOverlay"),
  fileInput: document.getElementById("ifcFileInput"),
  stbFileInput: document.getElementById("stbFileInput"),
  fileSummary: document.getElementById("fileSummary"),
  languageSelect: document.getElementById("languageSelect"),
  fitButton: document.getElementById("fitButton"),
  projectionModeSelect: document.getElementById("projectionModeSelect"),
  togglePropertyInfoButton: document.getElementById("togglePropertyInfoButton"),
  spacesButton: document.getElementById("spacesButton"),
  spaceNamesButton: document.getElementById("spaceNamesButton"),
  clearSelectionButton: document.getElementById("clearSelectionButton"),
  clearModelsButton: document.getElementById("clearModelsButton"),
  toggleCommentHighlightButton: document.getElementById("toggleCommentHighlightButton"),
  exportCommentsButton: document.getElementById("exportCommentsButton"),
  exportCommentedIfcButton: document.getElementById("exportCommentedIfcButton"),
  exportViewStateButton: document.getElementById("exportViewStateButton"),
  importCommentsInput: document.getElementById("importCommentsInput"),
  importViewStateInput: document.getElementById("importViewStateInput"),
  modelCount: document.getElementById("modelCount"),
  modelList: document.getElementById("modelList"),
  activeModelSettings: document.getElementById("activeModelSettings"),
  categoryList: document.getElementById("categoryList"),
  showAllCategoriesButton: document.getElementById("showAllCategoriesButton"),
  hideAllCategoriesButton: document.getElementById("hideAllCategoriesButton"),
  levelList: document.getElementById("levelList"),
  showAllLevelsButton: document.getElementById("showAllLevelsButton"),
  hideAllLevelsButton: document.getElementById("hideAllLevelsButton"),
  gridToggle: document.getElementById("gridToggle"),
  levelToggle: document.getElementById("levelToggle"),
  viewFovRange: document.getElementById("viewFovRange"),
  viewFovValue: document.getElementById("viewFovValue"),
  viewSizeRange: document.getElementById("viewSizeRange"),
  viewSizeValue: document.getElementById("viewSizeValue"),
  viewBrightnessRange: document.getElementById("viewBrightnessRange"),
  viewBrightnessValue: document.getElementById("viewBrightnessValue"),
  viewSaturationRange: document.getElementById("viewSaturationRange"),
  viewSaturationValue: document.getElementById("viewSaturationValue"),
  backgroundColorInput: document.getElementById("backgroundColorInput"),
  edgeToggle: document.getElementById("edgeToggle"),
  ifcEdgeToggle: document.getElementById("ifcEdgeToggle"),
  edgeOpacityRange: document.getElementById("edgeOpacityRange"),
  edgeOpacityValue: document.getElementById("edgeOpacityValue"),
  edgeThresholdRange: document.getElementById("edgeThresholdRange"),
  edgeThresholdValue: document.getElementById("edgeThresholdValue"),
  edgeColorInput: document.getElementById("edgeColorInput"),
  resetViewAppearanceButton: document.getElementById("resetViewAppearanceButton"),
  attributeColorEnabled: document.getElementById("attributeColorEnabled"),
  attributeColorTarget: document.getElementById("attributeColorTarget"),
  attributeColorName: document.getElementById("attributeColorName"),
  attributeColorValue: document.getElementById("attributeColorValue"),
  attributeColorMode: document.getElementById("attributeColorMode"),
  attributeColorInput: document.getElementById("attributeColorInput"),
  attributeUnmatchedOpacityRange: document.getElementById("attributeUnmatchedOpacityRange"),
  attributeUnmatchedOpacityValue: document.getElementById("attributeUnmatchedOpacityValue"),
  attributeShowOnly: document.getElementById("attributeShowOnly"),
  applyAttributeColorButton: document.getElementById("applyAttributeColorButton"),
  clearAttributeColorButton: document.getElementById("clearAttributeColorButton"),
  attributeColorStatus: document.getElementById("attributeColorStatus"),
  spaceInteriorEyeHeight: document.getElementById("spaceInteriorEyeHeight"),
  spaceInteriorSelect: document.getElementById("spaceInteriorSelect"),
  spaceInteriorMoveSelectedButton: document.getElementById("spaceInteriorMoveSelectedButton"),
  spaceInteriorMoveListedButton: document.getElementById("spaceInteriorMoveListedButton"),
  spaceInteriorSelectListedButton: document.getElementById("spaceInteriorSelectListedButton"),
  spaceInteriorResetHorizontalButton: document.getElementById("spaceInteriorResetHorizontalButton"),
  spaceInteriorStatus: document.getElementById("spaceInteriorStatus"),
  popoutToggleButtons: Array.from(document.querySelectorAll(".popout-toggle")),
  sectionToggle: document.getElementById("sectionToggle"),
  clipHandleToggle: document.getElementById("clipHandleToggle"),
  clipGuideToggleButton: document.getElementById("clipGuideToggleButton"),
  clipMode: document.getElementById("clipMode"),
  clipRotationInput: document.getElementById("clipRotationInput"),
  alignClipToModelButton: document.getElementById("alignClipToModelButton"),
  sectionAxis: document.getElementById("sectionAxis"),
  sectionRange: document.getElementById("sectionRange"),
  sectionValue: document.getElementById("sectionValue"),
  clipBoxControls: document.getElementById("clipBoxControls"),
  clipXMinRange: document.getElementById("clipXMinRange"),
  clipXMaxRange: document.getElementById("clipXMaxRange"),
  clipYMinRange: document.getElementById("clipYMinRange"),
  clipYMaxRange: document.getElementById("clipYMaxRange"),
  clipZMinRange: document.getElementById("clipZMinRange"),
  clipZMaxRange: document.getElementById("clipZMaxRange"),
  clipXMinValue: document.getElementById("clipXMinValue"),
  clipXMaxValue: document.getElementById("clipXMaxValue"),
  clipYMinValue: document.getElementById("clipYMinValue"),
  clipYMaxValue: document.getElementById("clipYMaxValue"),
  clipZMinValue: document.getElementById("clipZMinValue"),
  clipZMaxValue: document.getElementById("clipZMaxValue"),
  resetClipBoxButton: document.getElementById("resetClipBoxButton"),
  clipLevelFromSelect: document.getElementById("clipLevelFromSelect"),
  clipLevelToSelect: document.getElementById("clipLevelToSelect"),
  clipBottomOffsetInput: document.getElementById("clipBottomOffsetInput"),
  clipTopOffsetInput: document.getElementById("clipTopOffsetInput"),
  clipGridXFromSelect: document.getElementById("clipGridXFromSelect"),
  clipGridXToSelect: document.getElementById("clipGridXToSelect"),
  clipGridZFromSelect: document.getElementById("clipGridZFromSelect"),
  clipGridZToSelect: document.getElementById("clipGridZToSelect"),
  clipGridPaddingInput: document.getElementById("clipGridPaddingInput"),
  applySmartClipButton: document.getElementById("applySmartClipButton"),
  smartClipStatus: document.getElementById("smartClipStatus"),
  measurementModeSelect: document.getElementById("measurementModeSelect"),
  measurementDirectionSelect: document.getElementById("measurementDirectionSelect"),
  measureToggleButton: document.getElementById("measureToggleButton"),
  measurementUndoButton: document.getElementById("measurementUndoButton"),
  measurementClearSelectedButton: document.getElementById("measurementClearSelectedButton"),
  measurementClearButton: document.getElementById("measurementClearButton"),
  measurementStatus: document.getElementById("measurementStatus"),
  measurementResultList: document.getElementById("measurementResultList"),
  floatingSelectionPane: document.getElementById("floatingSelectionPane"),
  selectionPanePopoutButton: document.getElementById("selectionPanePopoutButton"),
  selectionPaneClearButton: document.getElementById("selectionPaneClearButton"),
  selectionSummary: document.getElementById("selectionSummary"),
  propertyList: document.getElementById("propertyList"),
  authorInput: document.getElementById("authorInput"),
  commentScope: document.getElementById("commentScope"),
  departmentField: document.getElementById("departmentField"),
  departmentInput: document.getElementById("departmentInput"),
  commentBody: document.getElementById("commentBody"),
  saveCommentButton: document.getElementById("saveCommentButton"),
  commentStatus: document.getElementById("commentStatus"),
  selectedCommentCount: document.getElementById("selectedCommentCount"),
  selectedCommentList: document.getElementById("selectedCommentList"),
  allCommentCount: document.getElementById("allCommentCount"),
  allCommentList: document.getElementById("allCommentList"),
  findingCount: document.getElementById("findingCount"),
  findingTitle: document.getElementById("findingTitle"),
  findingBody: document.getElementById("findingBody"),
  findingSeverity: document.getElementById("findingSeverity"),
  findingDiscipline: document.getElementById("findingDiscipline"),
  saveFindingButton: document.getElementById("saveFindingButton"),
  exportSelectedBcfButton: document.getElementById("exportSelectedBcfButton"),
  exportAllBcfButton: document.getElementById("exportAllBcfButton"),
  findingStatus: document.getElementById("findingStatus"),
  findingList: document.getElementById("findingList")
};

const COMMENT_STORAGE_PREFIX = "ifc-review-comments:";
const AUTHOR_STORAGE_KEY = "ifc-review-author";
const FINDING_STORAGE_KEY = "ifc-review-findings";
const EMBEDDED_COMMENTS_MARKER = "IFC_REVIEW_VIEWER_COMMENTS_BASE64";
const EMBEDDED_COMMENTS_END_MARKER = "IFC_REVIEW_VIEWER_COMMENTS_END";
const EMBEDDED_COMMENTS_PATTERN = /\/\*\s*IFC_REVIEW_VIEWER_COMMENTS_BASE64\s*([\s\S]*?)\s*IFC_REVIEW_VIEWER_COMMENTS_END\s*\*\//g;
const SELECTED_SUBSET_ID = "selected-element";
const COMMENT_SUBSET_ID = "comment-elements";
const VISIBLE_SUBSET_ID = "visible-filter";
const SPACE_SUBSET_ID = "space-overlay";
const SELECTED_SPACE_SUBSET_ID = "selected-space-overlay";
const ATTRIBUTE_COLOR_SUBSET_ID = "attribute-color-match";
const CATEGORY_COLOR_SUBSET_PREFIX = "category-color";
const SCENE_LAYER_MAIN = 0;
const SCENE_LAYER_OVERLAY = 1;
const SOURCE_IFC = "ifc";
const SOURCE_STB = "stb";
const UNCATEGORIZED_CATEGORY = "未分類";
const UNCATEGORIZED_LEVEL = "未分類";
const MEASUREMENT_MIN_DISTANCE = 0.0005;
const LANGUAGE_STORAGE_KEY = "ifc-review-language";
const SUPPORTED_LANGUAGES = ["ja", "en"];
const CATEGORY_COLOR_PALETTE = [
  0x0f6f78,
  0xc7472f,
  0x3f7f3d,
  0x7a5cc8,
  0xd08a1d,
  0x2f6fb0,
  0xbb4a7b,
  0x6d7f2f,
  0x2f8f7a,
  0x8a5a2b,
  0x536dfe,
  0x8f4c38
];
const MATERIAL_ORIGINALS = new WeakMap();
const STB_COLORS = {
  Columns: 0x3f6f93,
  Girders: 0x597aa6,
  Beams: 0x6f8aa8,
  Braces: 0xb85f32,
  Slabs: 0x8d96a2,
  Walls: 0x7a8372,
  Footings: 0x6d6256,
  Piles: 0x595f69,
  default: 0x7f9fb5
};

const I18N = {
  ja: {
    "app.title": "IFC Review Viewer Advanced",
    "ui.addIfc": "IFC を追加",
    "ui.addStb": "ST-Bridge を追加",
    "ui.fit": "全体表示",
    "view.projection": "投影方式",
    "view.perspective": "透視",
    "view.orthographic": "平行",
    "ui.propertyInfo": "情報表示",
    "ui.spaces": "スペース表示",
    "ui.spaceNames": "スペース名",
    "ui.clearSelection": "選択解除",
    "ui.popOut": "別窓",
    "ui.dockPane": "戻す",
    "ui.commentElements": "コメント要素",
    "ui.exportComments": "コメント書出",
    "ui.exportCommentedIfc": "コメント埋込IFC書出",
    "ui.exportViewState": "表示状態書出",
    "ui.importComments": "コメント読込",
    "ui.importViewState": "表示状態読込",
    "ui.clear": "全消去",
    "ui.ifc": "IFC",
    "ui.models": "モデル",
    "ui.displaySettings": "モデル表示設定",
    "ui.clip": "クリップ",
    "ui.measure": "計測",
    "ui.review": "レビュー",
    "ui.language": "言語",
    "ui.japanese": "日本語",
    "ui.english": "English",
    "ui.showAll": "全表示",
    "ui.hideAll": "全非表示",
    "ui.save": "保存",
    "ui.zoom": "ズーム",
    "ui.delete": "削除",
    "ui.settings": "設定",
    "ui.reset": "リセット",
    "ui.collapsePane": "ペインを畳む",
    "ui.expandPane": "ペインを広げる",
    "empty.title": "IFC / ST-Bridge ファイルをドロップまたは選択",
    "empty.body": "要素をクリックすると属性確認とコメント保存ができます。",
    "summary.noIfc": "IFC / ST-Bridge ファイルを読み込んでください",
    "summary.loaded": "{count} モデル / {size} / コメント {comments} 件",
    "info.noCoordinates": "座標 X:- / Y:- / Z:-",
    "info.coordinates": "座標 X:{x} / Y:{y} / Z:{z}",
    "panel.selection": "選択要素",
    "panel.loadedIfc": "読込 IFC",
    "panel.loadedModels": "読込モデル",
    "panel.categories": "カテゴリ表示",
    "panel.levels": "レベル表示",
    "panel.displayHelpers": "表示補助",
    "panel.modelAppearance": "モデル表示",
    "panel.modelDisplaySettings": "モデル表示設定",
    "panel.attributeColor": "属性色分け",
    "panel.spaceInterior": "スペース室内視点",
    "panel.clipping": "クリッピング",
    "panel.commentEditor": "コメント記入",
    "panel.selectedComments": "選択要素のコメント",
    "panel.allComments": "全コメント",
    "panel.findings": "指摘ボード",
    "filters.afterLoad": "モデル読込後に表示されます。",
    "display.grid": "基準グリッド",
    "display.levelLines": "レベル線",
    "display.categoryColors": "カテゴリ別色分け",
    "display.resetAppearance": "表示をリセット",
    "display.fov": "視野角: {value}°",
    "display.viewSize": "ビューサイズ: {value}%",
    "display.brightness": "明度: {value}%",
    "display.saturation": "彩度: {value}%",
    "display.background": "背景色",
    "edge.enabled": "エッジ線",
    "edge.ifcEnabled": "IFC エッジ生成",
    "edge.opacity": "エッジ濃度: {value}%",
    "edge.threshold": "エッジ角度: {value}°",
    "edge.color": "エッジ色",
    "clip.enabled": "クリッピング表示",
    "clip.handles": "ハンドル表示",
    "clip.hideGuide": "クリップ非表示",
    "clip.showGuide": "クリップ表示",
    "clip.mode": "方式",
    "clip.box": "ボックス",
    "clip.plane": "平面",
    "clip.rotation": "Z軸回転角",
    "clip.align": "建物方向",
    "clip.direction": "方向",
    "clip.horizontal": "水平",
    "clip.xDirection": "X 方向",
    "clip.zDirection": "Z 方向",
    "clip.resetBox": "ボックス全体",
    "clip.smartClip": "スマートクリップ",
    "clip.anyLevel": "レベル指定なし",
    "clip.anyGrid": "通り芯指定なし",
    "clip.levelFrom": "レベル From",
    "clip.levelTo": "レベル To",
    "clip.bottomOffsetMm": "下端オフセット mm",
    "clip.topOffsetMm": "上端オフセット mm",
    "clip.xFrom": "X 通り From",
    "clip.xTo": "X 通り To",
    "clip.zFrom": "Y 通り From",
    "clip.zTo": "Y 通り To",
    "clip.gridPaddingMm": "通り芯余白 mm",
    "clip.applySmart": "レベル/通り芯クリップを適用",
    "clip.smartApplied": "スマートクリップを適用しました。",
    "clip.noSmartTarget": "スマートクリップに使えるモデル範囲がありません。",
    "clip.positionEmpty": "位置: -",
    "clip.position": "位置: {value}",
    "clip.xMin": "X 最小",
    "clip.xMax": "X 最大",
    "clip.yMin": "Y 最小",
    "clip.yMax": "Y 最大",
    "clip.zMin": "Z 最小",
    "clip.zMax": "Z 最大",
    "measure.title": "寸法計測",
    "measure.mode": "方式",
    "measure.modeFaceToFace": "面-面距離",
    "measure.modePointToPoint": "点-点距離",
    "measure.direction": "方向",
    "measure.directionAuto": "自動",
    "measure.directionNormalPositive": "面法線 +",
    "measure.directionNormalNegative": "面法線 -",
    "measure.directionZPositive": "上方向",
    "measure.directionZNegative": "下方向",
    "measure.start": "計測開始",
    "measure.stop": "計測終了",
    "measure.clear": "クリア",
    "measure.clearSelected": "選択削除",
    "measure.undo": "戻す",
    "measure.statusIdle": "Mキーで計測を開始できます。",
    "measure.statusPickFirst": "1点目をクリックしてください。",
    "measure.statusPickSecond": "2点目をクリックしてください。",
    "measure.statusPickFirstFace": "1つ目の面をクリックしてください。",
    "measure.statusPickSecondFace": "2つ目の面をクリックしてください。",
    "measure.statusNoHit": "測定できる面が見つかりませんでした。",
    "measure.statusNotParallel": "面-面距離は平行な面同士で測定してください。平行でない場合は点-点距離を使ってください。",
    "measure.statusZeroDistance": "測定距離が 0 のため、結果を追加しませんでした。",
    "measure.statusCreated": "測定を追加しました。",
    "measure.statusCleared": "測定をクリアしました。",
    "measure.resultEmpty": "測定結果はありません。",
    "measure.resultTitle": "測定 {number}",
    "measure.resultMeta": "{mode} / {label}",
    "measure.shortcutStatus": "ショートカット: W/A/S/D=移動 / Z/X=上下 / Q/E=回転 / T/G=上下視線 / H=水平 / F=全体 / C=クリップ / L=レベル / M=計測 / Esc=解除",
    "space.current": "現在の空間",
    "space.none": "現在位置に判定可能な IFC 空間はありません。",
    "space.currentClickTitle": "クリックするとこのスペースの情報を表示します。",
    "space.enabled": "スペースを表示しました。",
    "space.disabled": "スペースを非表示にしました。",
    "space.namesEnabled": "スペース名を表示しました。",
    "space.namesDisabled": "スペース名を非表示にしました。",
    "space.selected": "{name} の情報を表示しました。",
    "spaceInterior.eyeHeight": "視点高さ mm",
    "spaceInterior.destination": "移動先スペース",
    "spaceInterior.selectPlaceholder": "スペースを選択",
    "spaceInterior.noSpaces": "スペースなし",
    "spaceInterior.moveSelected": "選択スペースへ移動",
    "spaceInterior.moveListed": "リストのスペースへ移動",
    "spaceInterior.selectListed": "リストを選択",
    "spaceInterior.resetHorizontal": "水平視線",
    "spaceInterior.statusEmpty": "IFC Space 読込後に移動できます。",
    "spaceInterior.statusMoved": "{name} の室内視点へ移動しました。",
    "spaceInterior.statusSelected": "{name} を選択しました。",
    "attribute.enabled": "有効",
    "attribute.target": "対象",
    "attribute.targetAll": "全要素",
    "attribute.targetSpaces": "スペースのみ",
    "attribute.name": "属性名",
    "attribute.namePlaceholder": "Name / Level / Category",
    "attribute.value": "値",
    "attribute.valuePlaceholder": "含む文字",
    "attribute.mode": "照合",
    "attribute.contains": "含む",
    "attribute.exact": "完全一致",
    "attribute.color": "色",
    "attribute.unmatchedOpacity": "未一致: {value}%",
    "attribute.showOnly": "一致する要素のみ表示",
    "attribute.apply": "属性色分けを適用",
    "attribute.clear": "解除",
    "attribute.processing": "属性を照合しています...",
    "attribute.applied": "属性色分けを適用しました。一致 {count} 件。",
    "attribute.cleared": "属性色分けを解除しました。",
    "attribute.needName": "属性名を入力してください。",
    "view.propertyInfoOn": "情報表示をオンにしました。",
    "view.propertyInfoOff": "情報表示をオフにしました。",
    "comment.author": "記入者",
    "comment.authorPlaceholder": "名前",
    "comment.scope": "対象",
    "comment.scopeElement": "選択要素",
    "comment.scopeModel": "建物全体",
    "comment.scopeDepartment": "部門・範囲",
    "comment.department": "部門・範囲名",
    "comment.departmentPlaceholder": "例: 意匠 / 構造 / 設備 / 1FL",
    "comment.body": "コメント",
    "comment.bodyPlaceholder": "レビューコメントを入力",
    "comment.none": "コメントはありません。",
    "finding.empty": "指摘はありません。",
    "finding.title": "件名",
    "finding.titlePlaceholder": "指摘タイトル",
    "finding.body": "内容",
    "finding.bodyPlaceholder": "指摘内容",
    "finding.severity": "重要度",
    "finding.severityCritical": "重大",
    "finding.severityHigh": "高",
    "finding.severityMedium": "中",
    "finding.severityLow": "低",
    "finding.severityInfo": "情報",
    "finding.discipline": "分野",
    "finding.disciplinePlaceholder": "意匠 / 構造 / 設備",
    "finding.save": "指摘を保存",
    "finding.exportSelectedBcf": "選択BCF",
    "finding.exportAllBcf": "全BCF",
    "finding.saved": "指摘を保存しました。",
    "finding.exported": "BCFZIPを書き出しました。",
    "finding.needBody": "指摘の件名または内容を入力してください。",
    "finding.noExport": "書き出す指摘がありません。",
    "comment.savedLocalSuffix": "ブラウザ保存",
    "comment.defaultAuthor": "anonymous",
    "comment.targetModel": "建物全体",
    "comment.targetDepartment": "部門・範囲",
    "selection.none": "未選択",
    "selection.ifcElement": "IFC 要素",
    "selection.stbElement": "ST-Bridge 部材",
    "model.none": "モデルは未読込です。",
    "model.noActive": "モデルを選択すると個別の表示設定を変更できます。",
    "model.elements": "{name} ({count} 要素)",
    "model.typeIfc": "IFC",
    "model.typeStb": "ST-Bridge",
    "model.selected": "選択中",
    "model.visible": "表示",
    "model.opacity": "不透明度: {value}%",
    "model.colorMode": "色表示",
    "model.colorOriginal": "元の色",
    "model.colorSingle": "単色",
    "model.colorCategory": "カテゴリ別",
    "model.colorLevel": "レベル別",
    "model.offset": "座標補正",
    "model.offsetX": "X 補正 (mm・平面左右)",
    "model.offsetY": "Y 補正 (mm・平面奥行)",
    "model.offsetZ": "Z 補正 (mm・高さ)",
    "model.tintColor": "表示色",
    "model.colorLegend": "色凡例",
    "model.categoryControls": "このモデルのカテゴリ表示",
    "model.levelControls": "このモデルのレベル表示",
    "model.noCategories": "このモデルにカテゴリ情報はありません。",
    "model.noLevels": "このモデルにレベル情報はありません。",
    "model.resetAppearance": "このモデルの表示をリセット",
    "filters.noCategories": "カテゴリはありません。",
    "filters.noLevels": "レベル情報はありません。",
    "label.uncategorized": "未分類",
    "property.file": "ファイル",
    "property.category": "カテゴリ",
    "property.level": "レベル",
    "status.idle": "待機中",
    "status.selectIfc": "IFC ファイルを選択してください。",
    "status.selectModel": "IFC または ST-Bridge ファイルを選択してください。",
    "status.parsingIfc": "IFC 解析中: {percent}%",
    "status.onlyIfc": "IFC ファイルだけを読み込めます。",
    "status.onlyOpenBim": "IFC または ST-Bridge XML ファイルだけを読み込めます。",
    "status.selectIfcExtension": "拡張子 .ifc のファイルを選択してください。",
    "status.selectStbExtension": "拡張子 .stb または .xml の ST-Bridge ファイルを選択してください。",
    "status.loadingFile": "{name} を読み込んでいます...",
    "status.loadingStb": "{name} の ST-Bridge 構造データを読み込んでいます...",
    "status.analyzingFile": "{name} のカテゴリとレベルを解析しています...",
    "status.loadedFile": "{name} を読み込みました。カテゴリ、レベル、クリッピングで表示を切り替えられます。",
    "status.loadedStb": "{name} を読み込みました。部材 {count} 件、階 {levels} 件を表示します。",
    "status.loadFailed": "IFC の読み込みに失敗しました: {message}",
    "status.stbLoadFailed": "ST-Bridge の読み込みに失敗しました: {message}",
    "status.analyzingCategory": "{name} のカテゴリ解析中: {completed}/{total}",
    "status.languageChanged": "表示言語を日本語に切り替えました。",
    "commentStatus.emptyBody": "コメント本文を入力してください。",
    "commentStatus.selectElement": "選択要素へのコメントは、先に要素を選択してください。",
    "commentStatus.selectCommentTarget": "コメント対象のモデルを選択してください。",
    "commentStatus.departmentRequired": "部門・範囲名を入力してください。",
    "commentStatus.saved": "保存しました。",
    "commentStatus.deleted": "コメントを削除しました。",
    "commentStatus.loadIfcFirst": "先にモデルファイルを読み込んでください。",
    "commentStatus.imported": "{count} 件のコメントを読み込みました。",
    "commentStatus.noImportMatch": "一致するモデルに読み込めるコメントがありません。",
    "commentStatus.importFailed": "コメント読込に失敗しました: {message}",
    "commentStatus.embeddedImported": "IFC 内のコメント {count} 件を読み込みました。",
    "commentStatus.ifcExported": "コメントを埋め込んだ IFC コピーを書き出しました。",
    "commentStatus.ifcExportFailed": "コメント埋込 IFC の書出に失敗しました: {message}",
    "viewState.exported": "表示状態を書き出しました。",
    "viewState.imported": "表示状態を復元しました。復元モデル {count} 件。",
    "viewState.importFailed": "表示状態読込に失敗しました: {message}",
    "viewState.restoreView": "視点復元",
    "panel.openInSeparateWindow": "{title} は別ウィンドウで開いています。",
    "panel.windowBlocked": "{title} の別ウィンドウを開けませんでした。ブラウザのポップアップ許可を確認してください。"
  },
  en: {
    "app.title": "IFC Review Viewer Advanced",
    "ui.addIfc": "Add IFC",
    "ui.addStb": "Add ST-Bridge",
    "ui.fit": "Fit All",
    "view.projection": "Projection",
    "view.perspective": "Perspective",
    "view.orthographic": "Orthographic",
    "ui.propertyInfo": "Properties",
    "ui.spaces": "Spaces",
    "ui.spaceNames": "Space Names",
    "ui.clearSelection": "Clear Selection",
    "ui.popOut": "Pop Out",
    "ui.dockPane": "Dock",
    "ui.commentElements": "Commented",
    "ui.exportComments": "Export Comments",
    "ui.exportCommentedIfc": "Export Commented IFC",
    "ui.exportViewState": "Export View",
    "ui.importComments": "Import Comments",
    "ui.importViewState": "Import View",
    "ui.clear": "Clear All",
    "ui.ifc": "IFC",
    "ui.models": "Models",
    "ui.displaySettings": "Model Display",
    "ui.clip": "Clip",
    "ui.measure": "Measure",
    "ui.review": "Review",
    "ui.language": "Language",
    "ui.japanese": "日本語",
    "ui.english": "English",
    "ui.showAll": "Show All",
    "ui.hideAll": "Hide All",
    "ui.save": "Save",
    "ui.zoom": "Zoom",
    "ui.delete": "Delete",
    "ui.settings": "Settings",
    "ui.reset": "Reset",
    "ui.collapsePane": "Collapse pane",
    "ui.expandPane": "Expand pane",
    "empty.title": "Drop or Select IFC / ST-Bridge Files",
    "empty.body": "Click an element to inspect properties and save comments.",
    "summary.noIfc": "Load IFC / ST-Bridge files to begin",
    "summary.loaded": "{count} models / {size} / {comments} comments",
    "info.noCoordinates": "Coord X:- / Y:- / Z:-",
    "info.coordinates": "Coord X:{x} / Y:{y} / Z:{z}",
    "panel.selection": "Selected Element",
    "panel.loadedIfc": "Loaded IFC",
    "panel.loadedModels": "Loaded Models",
    "panel.categories": "Categories",
    "panel.levels": "Levels",
    "panel.displayHelpers": "Display Helpers",
    "panel.modelAppearance": "Model Appearance",
    "panel.modelDisplaySettings": "Model Display Settings",
    "panel.attributeColor": "Attribute Color",
    "panel.spaceInterior": "Space Eye View",
    "panel.clipping": "Clipping",
    "panel.commentEditor": "Add Comment",
    "panel.selectedComments": "Selected Comments",
    "panel.allComments": "All Comments",
    "panel.findings": "Findings Board",
    "filters.afterLoad": "Shown after model files are loaded.",
    "display.grid": "Reference Grid",
    "display.levelLines": "Level Lines",
    "display.categoryColors": "Color by Category",
    "display.resetAppearance": "Reset Appearance",
    "display.fov": "Field of View: {value}°",
    "display.viewSize": "View Size: {value}%",
    "display.brightness": "Brightness: {value}%",
    "display.saturation": "Saturation: {value}%",
    "display.background": "Background Color",
    "edge.enabled": "Edges",
    "edge.ifcEnabled": "Generate IFC Edges",
    "edge.opacity": "Edge Strength: {value}%",
    "edge.threshold": "Edge Angle: {value}°",
    "edge.color": "Edge Color",
    "clip.enabled": "Enable Clipping",
    "clip.handles": "Show Handles",
    "clip.hideGuide": "Hide Clip UI",
    "clip.showGuide": "Show Clip UI",
    "clip.mode": "Mode",
    "clip.box": "Box",
    "clip.plane": "Plane",
    "clip.rotation": "Z Axis Rotation",
    "clip.align": "Building Direction",
    "clip.direction": "Direction",
    "clip.horizontal": "Horizontal",
    "clip.xDirection": "X Direction",
    "clip.zDirection": "Z Direction",
    "clip.resetBox": "Full Box",
    "clip.smartClip": "Smart Clip",
    "clip.anyLevel": "Any Level",
    "clip.anyGrid": "Any Grid",
    "clip.levelFrom": "Level From",
    "clip.levelTo": "Level To",
    "clip.bottomOffsetMm": "Bottom Offset mm",
    "clip.topOffsetMm": "Top Offset mm",
    "clip.xFrom": "X Grid From",
    "clip.xTo": "X Grid To",
    "clip.zFrom": "Y Grid From",
    "clip.zTo": "Y Grid To",
    "clip.gridPaddingMm": "Grid Padding mm",
    "clip.applySmart": "Apply Level/Grid Clip",
    "clip.smartApplied": "Smart clip applied.",
    "clip.noSmartTarget": "No model bounds are available for smart clipping.",
    "clip.positionEmpty": "Position: -",
    "clip.position": "Position: {value}",
    "clip.xMin": "X Min",
    "clip.xMax": "X Max",
    "clip.yMin": "Y Min",
    "clip.yMax": "Y Max",
    "clip.zMin": "Z Min",
    "clip.zMax": "Z Max",
    "measure.title": "Measurement",
    "measure.mode": "Mode",
    "measure.modeFaceToFace": "Face to Face",
    "measure.modePointToPoint": "Point to Point",
    "measure.direction": "Direction",
    "measure.directionAuto": "Auto",
    "measure.directionNormalPositive": "Face Normal +",
    "measure.directionNormalNegative": "Face Normal -",
    "measure.directionZPositive": "Up",
    "measure.directionZNegative": "Down",
    "measure.start": "Start Measure",
    "measure.stop": "Stop Measure",
    "measure.clear": "Clear",
    "measure.clearSelected": "Clear Selected",
    "measure.undo": "Undo",
    "measure.statusIdle": "Press M to start measurement.",
    "measure.statusPickFirst": "Click the first point.",
    "measure.statusPickSecond": "Click the second point.",
    "measure.statusPickFirstFace": "Click the first face.",
    "measure.statusPickSecondFace": "Click the second face.",
    "measure.statusNoHit": "No measurable face was found.",
    "measure.statusNotParallel": "Face-to-face measurement requires parallel faces. Use Point to Point for non-parallel faces.",
    "measure.statusZeroDistance": "Zero-distance measurements are ignored.",
    "measure.statusCreated": "Measurement added.",
    "measure.statusCleared": "Measurements cleared.",
    "measure.resultEmpty": "No measurements yet.",
    "measure.resultTitle": "Measurement {number}",
    "measure.resultMeta": "{mode} / {label}",
    "measure.shortcutStatus": "Shortcuts: W/A/S/D=move / Z/X=down/up / Q/E=yaw / T/G=pitch / H=level view / F=fit / C=clip / L=levels / M=measure / Esc=cancel",
    "space.current": "Current Space",
    "space.none": "No detectable IFC space at the current camera position.",
    "space.currentClickTitle": "Click to show this space in the property pane.",
    "space.enabled": "Spaces are visible.",
    "space.disabled": "Spaces are hidden.",
    "space.namesEnabled": "Space names are visible.",
    "space.namesDisabled": "Space names are hidden.",
    "space.selected": "Showing information for {name}.",
    "spaceInterior.eyeHeight": "Eye Height mm",
    "spaceInterior.destination": "Destination Space",
    "spaceInterior.selectPlaceholder": "Select a space",
    "spaceInterior.noSpaces": "No spaces",
    "spaceInterior.moveSelected": "Move to Selected Space",
    "spaceInterior.moveListed": "Move to Listed Space",
    "spaceInterior.selectListed": "Select Listed Space",
    "spaceInterior.resetHorizontal": "Level View",
    "spaceInterior.statusEmpty": "Load IFC Spaces to move inside them.",
    "spaceInterior.statusMoved": "Moved to {name}.",
    "spaceInterior.statusSelected": "Selected {name}.",
    "attribute.enabled": "Enabled",
    "attribute.target": "Target",
    "attribute.targetAll": "All Elements",
    "attribute.targetSpaces": "Spaces Only",
    "attribute.name": "Attribute",
    "attribute.namePlaceholder": "Name / Level / Category",
    "attribute.value": "Value",
    "attribute.valuePlaceholder": "Text to match",
    "attribute.mode": "Match",
    "attribute.contains": "Contains",
    "attribute.exact": "Exact",
    "attribute.color": "Color",
    "attribute.unmatchedOpacity": "Unmatched: {value}%",
    "attribute.showOnly": "Show matched elements only",
    "attribute.apply": "Apply Attribute Color",
    "attribute.clear": "Clear",
    "attribute.processing": "Matching attributes...",
    "attribute.applied": "Attribute color applied. Matched {count} elements.",
    "attribute.cleared": "Attribute color cleared.",
    "attribute.needName": "Enter an attribute name.",
    "view.propertyInfoOn": "Property popups enabled.",
    "view.propertyInfoOff": "Property popups disabled.",
    "comment.author": "Author",
    "comment.authorPlaceholder": "Name",
    "comment.scope": "Target",
    "comment.scopeElement": "Selected Element",
    "comment.scopeModel": "Whole Building",
    "comment.scopeDepartment": "Department / Area",
    "comment.department": "Department / Area",
    "comment.departmentPlaceholder": "e.g. Architecture / Structure / MEP / 1FL",
    "comment.body": "Comment",
    "comment.bodyPlaceholder": "Enter a review comment",
    "comment.none": "No comments.",
    "finding.empty": "No findings.",
    "finding.title": "Title",
    "finding.titlePlaceholder": "finding title",
    "finding.body": "Body",
    "finding.bodyPlaceholder": "finding body",
    "finding.severity": "Severity",
    "finding.severityCritical": "Critical",
    "finding.severityHigh": "High",
    "finding.severityMedium": "Medium",
    "finding.severityLow": "Low",
    "finding.severityInfo": "Info",
    "finding.discipline": "Discipline",
    "finding.disciplinePlaceholder": "Architecture / Structure / MEP",
    "finding.save": "Save Finding",
    "finding.exportSelectedBcf": "Selected BCF",
    "finding.exportAllBcf": "All BCF",
    "finding.saved": "Finding saved.",
    "finding.exported": "BCFZIP exported.",
    "finding.needBody": "Enter a finding title or body.",
    "finding.noExport": "No findings to export.",
    "comment.savedLocalSuffix": "saved in browser",
    "comment.defaultAuthor": "anonymous",
    "comment.targetModel": "Whole Building",
    "comment.targetDepartment": "Department / Area",
    "selection.none": "No selection",
    "selection.ifcElement": "IFC Element",
    "selection.stbElement": "ST-Bridge Member",
    "model.none": "No model files loaded.",
    "model.noActive": "Select a model to edit its display settings.",
    "model.elements": "{name} ({count} elements)",
    "model.typeIfc": "IFC",
    "model.typeStb": "ST-Bridge",
    "model.selected": "Selected",
    "model.visible": "Visible",
    "model.opacity": "Opacity: {value}%",
    "model.colorMode": "Color Mode",
    "model.colorOriginal": "Original",
    "model.colorSingle": "Single Color",
    "model.colorCategory": "By Category",
    "model.colorLevel": "By Level",
    "model.offset": "Coordinate Offset",
    "model.offsetX": "X Offset (mm, plan east/west)",
    "model.offsetY": "Y Offset (mm, plan north/south)",
    "model.offsetZ": "Z Offset (mm, height)",
    "model.tintColor": "Display Color",
    "model.colorLegend": "Color Legend",
    "model.categoryControls": "Categories for This Model",
    "model.levelControls": "Levels for This Model",
    "model.noCategories": "No category information for this model.",
    "model.noLevels": "No level information for this model.",
    "model.resetAppearance": "Reset This Model",
    "filters.noCategories": "No categories.",
    "filters.noLevels": "No level information.",
    "label.uncategorized": "Uncategorized",
    "property.file": "File",
    "property.category": "Category",
    "property.level": "Level",
    "status.idle": "Idle",
    "status.selectIfc": "Select IFC files.",
    "status.selectModel": "Select IFC or ST-Bridge files.",
    "status.parsingIfc": "Parsing IFC: {percent}%",
    "status.onlyIfc": "Only IFC files can be loaded.",
    "status.onlyOpenBim": "Only IFC or ST-Bridge XML files can be loaded.",
    "status.selectIfcExtension": "Select files with the .ifc extension.",
    "status.selectStbExtension": "Select ST-Bridge files with the .stb or .xml extension.",
    "status.loadingFile": "Loading {name}...",
    "status.loadingStb": "Loading ST-Bridge structural data from {name}...",
    "status.analyzingFile": "Analyzing categories and levels for {name}...",
    "status.loadedFile": "{name} loaded. Use categories, levels, and clipping to control visibility.",
    "status.loadedStb": "{name} loaded. Showing {count} members and {levels} levels.",
    "status.loadFailed": "Failed to load IFC: {message}",
    "status.stbLoadFailed": "Failed to load ST-Bridge: {message}",
    "status.analyzingCategory": "Analyzing categories for {name}: {completed}/{total}",
    "status.languageChanged": "Display language changed to English.",
    "commentStatus.emptyBody": "Enter a comment body.",
    "commentStatus.selectElement": "Select an element before saving an element comment.",
    "commentStatus.selectCommentTarget": "Select a target model for this comment.",
    "commentStatus.departmentRequired": "Enter a department or area name.",
    "commentStatus.saved": "Saved.",
    "commentStatus.deleted": "Comment deleted.",
    "commentStatus.loadIfcFirst": "Load a model file first.",
    "commentStatus.imported": "Imported {count} comments.",
    "commentStatus.noImportMatch": "No comments matched the loaded model files.",
    "commentStatus.importFailed": "Failed to import comments: {message}",
    "commentStatus.embeddedImported": "Imported {count} comments embedded in the IFC.",
    "commentStatus.ifcExported": "Exported an IFC copy with embedded comments.",
    "commentStatus.ifcExportFailed": "Failed to export commented IFC: {message}",
    "viewState.exported": "Exported view state.",
    "viewState.imported": "Restored view state for {count} model(s).",
    "viewState.importFailed": "Failed to import view state: {message}",
    "viewState.restoreView": "Restore View",
    "panel.openInSeparateWindow": "{title} is open in a separate window.",
    "panel.windowBlocked": "{title} window was blocked. Allow pop-ups in the browser and try again."
  }
};

const state = {
  renderer: null,
  scene: null,
  camera: null,
  perspectiveCamera: null,
  orthographicCamera: null,
  controls: null,
  raycaster: new THREE.Raycaster(),
  pointer: new THREE.Vector2(),
  ifcLoader: null,
  models: [],
  activeModelKey: "",
  selectedModelKey: "",
  selectedExpressID: null,
  selectedProperties: null,
  language: readStoredLanguage(),
  showCommentHighlights: true,
  showPropertyInfo: false,
  showGrid: true,
  showLevels: false,
  showSpaces: false,
  showSpaceNames: false,
  collapsedPanels: new Set(),
  panelWindows: new Map(),
  view: {
    projectionMode: "perspective",
    fov: 55,
    viewSize: 100,
    orthographicHeight: 20,
    brightness: 100,
    saturation: 100,
    backgroundColor: "#b8c6d0"
  },
  attributeColor: {
    enabled: false,
    target: "all",
    name: "",
    value: "",
    mode: "contains",
    color: "#ffb000",
    unmatchedOpacity: 35,
    showOnly: false,
    activeSignature: ""
  },
  findings: [],
  selectedFindingId: "",
  edges: {
    enabled: true,
    ifcEnabled: false,
    opacity: 65,
    threshold: 45,
    color: "#1f2933"
  },
  spaceLabels: {
    nodes: new Map(),
    lastUpdateAt: 0
  },
  referenceGrid: null,
  openPopouts: new Set(),
  currentSpaceSignature: "",
  layoutObserver: null,
  clipDrag: null,
  clipMenuAutoEnabled: false,
  section: {
    enabled: false,
    showHandles: true,
    showGuide: true,
    mode: "box",
    axis: "y",
    ratio: 50,
    rotationDeg: 0,
    smart: {
      levelFrom: "",
      levelTo: "",
      bottomOffsetMm: 0,
      topOffsetMm: 0,
      xFrom: "",
      xTo: "",
      zFrom: "",
      zTo: "",
      paddingMm: 0
    },
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    helper: null,
    planes: [],
    box: {
      xMin: 0,
      xMax: 100,
      yMin: 0,
      yMax: 100,
      zMin: 0,
      zMax: 100
    },
    boxHelper: null
  },
  measurement: {
    enabled: false,
    mode: "face-to-face",
    direction: "auto",
    pendingPoint: null,
    records: [],
    selectedRecordId: "",
    nextNumber: 1,
    group: null,
    status: ""
  },
  animationFrame: 0
};

const materials = {
  selected: new THREE.MeshBasicMaterial({
    color: 0xffc400,
    depthTest: false,
    transparent: true,
    opacity: 0.62
  }),
  commented: new THREE.MeshBasicMaterial({
    color: 0xd94d2b,
    depthTest: false,
    transparent: true,
    opacity: 0.36
  }),
  space: new THREE.MeshLambertMaterial({
    color: 0x2b78b8,
    depthTest: true,
    depthWrite: false,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  }),
  selectedSpace: new THREE.MeshLambertMaterial({
    color: 0xe8762e,
    depthTest: true,
    depthWrite: false,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  })
};

init();

function init() {
  initThree();
  initViewportLayout();
  initIfc();
  bindEvents();
  initCollapsiblePanels();
  if (elements.languageSelect) {
    elements.languageSelect.value = state.language;
  }
  applyLanguage();
  syncViewAppearanceControls();
  applyViewAppearance();
  syncEdgeControls();
  elements.authorInput.value = localStorage.getItem(AUTHOR_STORAGE_KEY) || "";
  state.findings = readStoredFindings();
  renderAll();
  setStatus(t("status.selectModel"));
  animate();
}

function initThree() {
  state.scene = new THREE.Scene();
  state.scene.background = new THREE.Color(0xb8c6d0);

  state.perspectiveCamera = new THREE.PerspectiveCamera(state.view.fov, 1, 0.1, 1000000);
  state.orthographicCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000000);
  state.camera = state.perspectiveCamera;
  state.camera.position.set(12, 10, 12);
  state.perspectiveCamera.position.copy(state.camera.position);
  state.orthographicCamera.position.copy(state.camera.position);
  state.perspectiveCamera.layers.set(SCENE_LAYER_MAIN);
  state.orthographicCamera.layers.set(SCENE_LAYER_MAIN);

  state.renderer = new THREE.WebGLRenderer({
    canvas: elements.canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
    precision: "highp"
  });
  state.renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2.5));
  state.renderer.outputEncoding = THREE.sRGBEncoding;
  state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  state.renderer.toneMappingExposure = 0.82;
  state.renderer.localClippingEnabled = true;

  state.controls = new OrbitControls(state.camera, elements.canvas);
  state.controls.enableDamping = true;
  state.controls.dampingFactor = 0.08;

  const ambient = new THREE.AmbientLight(0xffffff, 0.42);
  state.scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
  keyLight.position.set(8, 12, 10);
  state.scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xddefff, 0.18);
  fillLight.position.set(-10, 6, -8);
  state.scene.add(fillLight);

  updateReferenceGrid();
  resizeRenderer();
}

function initIfc() {
  state.ifcLoader = new IFCLoader();
  if (typeof window.IFC_REVIEW_WASM_DATA_URI === "string" &&
    window.IFC_REVIEW_WASM_DATA_URI.startsWith("data:application/octet-stream;base64,")) {
    state.ifcLoader.ifcManager.setWasmPath(`${window.IFC_REVIEW_WASM_DATA_URI}#`, true);
  } else {
    state.ifcLoader.ifcManager.setWasmPath("./vendor/");
  }
  state.ifcLoader.ifcManager.setOnProgress((event) => {
    if (!event || !event.total) {
      return;
    }
    const percent = Math.round((event.loaded / event.total) * 100);
    setStatus(t("status.parsingIfc", { percent }));
  });
}

function bindEvents() {
  elements.fileInput.addEventListener("change", () => {
    const files = Array.from(elements.fileInput.files || []);
    if (files.length > 0) {
      loadIfcFiles(files);
    }
    elements.fileInput.value = "";
  });

  elements.stbFileInput.addEventListener("change", () => {
    const files = Array.from(elements.stbFileInput.files || []);
    if (files.length > 0) {
      loadStbFiles(files);
    }
    elements.stbFileInput.value = "";
  });

  elements.importCommentsInput.addEventListener("change", () => {
    const file = elements.importCommentsInput.files && elements.importCommentsInput.files[0];
    if (file) {
      importComments(file);
    }
    elements.importCommentsInput.value = "";
  });

  elements.importViewStateInput.addEventListener("change", () => {
    const file = elements.importViewStateInput.files && elements.importViewStateInput.files[0];
    if (file) {
      importViewState(file);
    }
    elements.importViewStateInput.value = "";
  });

  elements.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    elements.dropZone.classList.add("is-dragover");
  });

  elements.dropZone.addEventListener("dragleave", () => {
    elements.dropZone.classList.remove("is-dragover");
  });

  elements.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.dropZone.classList.remove("is-dragover");
    const files = Array.from(event.dataTransfer.files || []);
    const ifcFiles = files.filter(isIfcFile);
    const stbFiles = files.filter(isStbFile);
    if (ifcFiles.length > 0 || stbFiles.length > 0) {
      loadOpenBimFiles([...ifcFiles, ...stbFiles]);
    } else {
      setStatus(t("status.onlyOpenBim"), true);
    }
  });

  elements.canvas.addEventListener("pointerdown", onPointerDown, { capture: true });
  elements.canvas.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", endClipDrag);
  window.addEventListener("pointercancel", endClipDrag);
  for (const button of elements.popoutToggleButtons) {
    button.addEventListener("click", () => togglePopout(button.dataset.popoutTarget));
  }
  elements.languageSelect.addEventListener("change", () => {
    state.language = normalizeLanguage(elements.languageSelect.value);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
    applyLanguage();
    syncViewAppearanceControls();
    renderAll();
    updateClipping();
    setStatus(t("status.languageChanged"));
  });
  elements.fitButton.addEventListener("click", fitAllModelsToView);
  elements.projectionModeSelect.addEventListener("change", () => setProjectionMode(elements.projectionModeSelect.value));
  elements.togglePropertyInfoButton.addEventListener("click", () => {
    state.showPropertyInfo = !state.showPropertyInfo;
    if (state.showPropertyInfo) {
      state.currentSpaceSignature = "";
    }
    syncPropertyInfoVisibility();
    setStatus(t(state.showPropertyInfo ? "view.propertyInfoOn" : "view.propertyInfoOff"));
  });
  elements.spacesButton.addEventListener("click", () => {
    state.showSpaces = !state.showSpaces;
    if (!state.showSpaces) {
      state.showSpaceNames = false;
      if (isSelectedSpaceElement()) {
        clearSelection();
      }
    }
    applySpaceVisibilityState();
    setStatus(t(state.showSpaces ? "space.enabled" : "space.disabled"));
  });
  elements.spaceNamesButton.addEventListener("click", () => {
    state.showSpaceNames = !state.showSpaceNames;
    if (state.showSpaceNames) {
      state.showSpaces = true;
    }
    applySpaceVisibilityState();
    setStatus(t(state.showSpaceNames ? "space.namesEnabled" : "space.namesDisabled"));
  });
  elements.currentSpaceOverlay.addEventListener("click", (event) => {
    event.preventDefault();
    const recordKey = elements.currentSpaceOverlay.dataset.recordKey || "";
    const expressID = Number(elements.currentSpaceOverlay.dataset.expressId);
    const record = getRecordByKey(recordKey);
    if (record && Number.isFinite(expressID)) {
      selectSpaceFromOverlay(record, expressID);
    }
  });
  elements.currentSpaceOverlay.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    const record = getRecordByKey(elements.currentSpaceOverlay.dataset.recordKey || "");
    const expressID = Number(elements.currentSpaceOverlay.dataset.expressId);
    if (record && Number.isFinite(expressID)) {
      selectSpaceFromOverlay(record, expressID);
    }
  });
  elements.clearSelectionButton.addEventListener("click", clearSelectionAndRender);
  elements.selectionPaneClearButton.addEventListener("click", clearSelectionAndRender);
  elements.selectionPanePopoutButton.addEventListener("click", () => togglePaneWindow(elements.floatingSelectionPane));
  elements.clearModelsButton.addEventListener("click", clearAllModels);
  elements.toggleCommentHighlightButton.addEventListener("click", () => {
    state.showCommentHighlights = !state.showCommentHighlights;
    updateAllCommentHighlights();
    updateActions();
  });
  elements.exportCommentsButton.addEventListener("click", exportComments);
  elements.exportCommentedIfcButton.addEventListener("click", exportCommentedIfc);
  elements.exportViewStateButton.addEventListener("click", exportViewState);
  elements.saveCommentButton.addEventListener("click", saveCommentForSelection);
  elements.authorInput.addEventListener("change", () => {
    localStorage.setItem(AUTHOR_STORAGE_KEY, elements.authorInput.value.trim());
  });
  elements.commentScope.addEventListener("change", () => {
    syncCommentScopeControls();
    updateActions();
  });
  elements.departmentInput.addEventListener("input", updateActions);
  elements.commentBody.addEventListener("input", updateActions);
  elements.showAllCategoriesButton.addEventListener("click", () => setAllCategoryVisibility(true));
  elements.hideAllCategoriesButton.addEventListener("click", () => setAllCategoryVisibility(false));
  elements.showAllLevelsButton.addEventListener("click", () => setAllLevelVisibility(true));
  elements.hideAllLevelsButton.addEventListener("click", () => setAllLevelVisibility(false));
  elements.gridToggle.addEventListener("change", () => {
    state.showGrid = elements.gridToggle.checked;
    updateReferenceGrid();
  });
  elements.levelToggle.addEventListener("change", () => {
    state.showLevels = elements.levelToggle.checked;
    updateLevelHelperVisibility();
  });
  elements.viewBrightnessRange.addEventListener("input", () => {
    state.view.brightness = Number(elements.viewBrightnessRange.value);
    applyViewAppearance();
  });
  elements.viewFovRange.addEventListener("input", () => {
    state.view.fov = Number(elements.viewFovRange.value);
    applyProjectionSettings();
    syncViewAppearanceControls();
  });
  elements.viewSizeRange.addEventListener("input", () => {
    state.view.viewSize = Number(elements.viewSizeRange.value);
    applyProjectionSettings();
    syncViewAppearanceControls();
  });
  elements.viewSaturationRange.addEventListener("input", () => {
    state.view.saturation = Number(elements.viewSaturationRange.value);
    applyViewAppearance();
  });
  elements.backgroundColorInput.addEventListener("input", () => {
    state.view.backgroundColor = elements.backgroundColorInput.value;
    applyViewAppearance();
  });
  elements.edgeToggle.addEventListener("change", () => {
    state.edges.enabled = elements.edgeToggle.checked;
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.ifcEdgeToggle.addEventListener("change", () => {
    state.edges.ifcEnabled = elements.ifcEdgeToggle.checked;
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.edgeOpacityRange.addEventListener("input", () => {
    state.edges.opacity = Number(elements.edgeOpacityRange.value);
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.edgeThresholdRange.addEventListener("input", () => {
    state.edges.threshold = Number(elements.edgeThresholdRange.value);
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.edgeColorInput.addEventListener("input", () => {
    state.edges.color = elements.edgeColorInput.value;
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.resetViewAppearanceButton.addEventListener("click", () => {
    state.view.fov = 55;
    state.view.viewSize = 100;
    state.view.brightness = 100;
    state.view.saturation = 100;
    state.view.backgroundColor = "#b8c6d0";
    state.edges.enabled = true;
    state.edges.ifcEnabled = false;
    state.edges.opacity = 65;
    state.edges.threshold = 45;
    state.edges.color = "#1f2933";
    syncViewAppearanceControls();
    applyProjectionSettings();
    applyViewAppearance();
    syncEdgeControls();
    updateAllEdgeOverlays();
  });
  elements.attributeColorEnabled.addEventListener("change", () => {
    state.attributeColor.enabled = elements.attributeColorEnabled.checked;
    if (!state.attributeColor.enabled) {
      clearAttributeColorRule();
    } else {
      syncAttributeColorControls();
    }
    updateActions();
  });
  elements.attributeColorTarget.addEventListener("change", syncAttributeColorControls);
  elements.attributeColorName.addEventListener("input", syncAttributeColorControls);
  elements.attributeColorValue.addEventListener("input", syncAttributeColorControls);
  elements.attributeColorMode.addEventListener("change", syncAttributeColorControls);
  elements.attributeColorInput.addEventListener("input", syncAttributeColorControls);
  elements.attributeUnmatchedOpacityRange.addEventListener("input", syncAttributeColorControls);
  elements.attributeShowOnly.addEventListener("change", syncAttributeColorControls);
  elements.applyAttributeColorButton.addEventListener("click", applyAttributeColorRule);
  elements.clearAttributeColorButton.addEventListener("click", clearAttributeColorRule);
  elements.spaceInteriorMoveSelectedButton.addEventListener("click", moveCameraToSelectedSpace);
  elements.spaceInteriorMoveListedButton.addEventListener("click", moveCameraToListedSpace);
  elements.spaceInteriorSelectListedButton.addEventListener("click", selectListedSpace);
  elements.spaceInteriorResetHorizontalButton.addEventListener("click", resetCameraToHorizontalView);
  elements.spaceInteriorSelect.addEventListener("change", updateActions);
  elements.spaceInteriorEyeHeight.addEventListener("input", updateActions);
  elements.sectionToggle.addEventListener("change", () => {
    const wasEnabled = state.section.enabled;
    state.section.enabled = elements.sectionToggle.checked;
    if (!wasEnabled && state.section.enabled) {
      resetClippingToSafeBoxMode();
    }
    updateClipping();
    updateActions();
  });
  elements.clipHandleToggle.addEventListener("change", () => {
    state.section.showHandles = elements.clipHandleToggle.checked;
    updateClipping();
    updateActions();
  });
  elements.clipGuideToggleButton.addEventListener("click", () => {
    state.section.showGuide = !state.section.showGuide;
    updateClipping();
    updateActions();
  });
  elements.clipMode.addEventListener("change", () => {
    state.section.mode = elements.clipMode.value;
    if (state.section.mode === "box") {
      resetClipBoxRatios();
    }
    updateClipping();
    updateActions();
  });
  elements.clipRotationInput.addEventListener("input", () => {
    state.section.rotationDeg = normalizeDegrees(Number(elements.clipRotationInput.value));
    updateClipping();
  });
  elements.alignClipToModelButton.addEventListener("click", () => {
    state.section.rotationDeg = estimateBuildingRotationDeg();
    elements.clipRotationInput.value = formatRotationInput(state.section.rotationDeg);
    updateClipping();
  });
  elements.sectionAxis.addEventListener("change", () => {
    state.section.axis = elements.sectionAxis.value;
    updateClipping();
  });
  elements.sectionRange.addEventListener("input", () => {
    state.section.ratio = Number(elements.sectionRange.value);
    updateClipping();
  });
  bindClipRange(elements.clipXMinRange, "xMin");
  bindClipRange(elements.clipXMaxRange, "xMax");
  bindClipRange(elements.clipYMinRange, "yMin");
  bindClipRange(elements.clipYMaxRange, "yMax");
  bindClipRange(elements.clipZMinRange, "zMin");
  bindClipRange(elements.clipZMaxRange, "zMax");
  elements.resetClipBoxButton.addEventListener("click", () => {
    resetClipBoxRatios();
    updateClipping();
  });
  for (const input of [
    elements.clipLevelFromSelect,
    elements.clipLevelToSelect,
    elements.clipBottomOffsetInput,
    elements.clipTopOffsetInput,
    elements.clipGridXFromSelect,
    elements.clipGridXToSelect,
    elements.clipGridZFromSelect,
    elements.clipGridZToSelect,
    elements.clipGridPaddingInput
  ]) {
    input.addEventListener("change", syncSmartClipStateFromUi);
  }
  elements.applySmartClipButton.addEventListener("click", applySmartClip);
  elements.measurementModeSelect.addEventListener("change", () => setMeasurementMode(elements.measurementModeSelect.value));
  elements.measurementDirectionSelect.addEventListener("change", () => setMeasurementDirection(elements.measurementDirectionSelect.value));
  elements.measureToggleButton.addEventListener("click", () => setMeasurementEnabled(!state.measurement.enabled));
  elements.measurementClearButton.addEventListener("click", clearMeasurements);
  elements.measurementClearSelectedButton.addEventListener("click", clearSelectedMeasurement);
  elements.measurementUndoButton.addEventListener("click", undoMeasurement);
  elements.saveFindingButton.addEventListener("click", saveFinding);
  elements.findingTitle.addEventListener("input", updateActions);
  elements.findingBody.addEventListener("input", updateActions);
  elements.findingSeverity.addEventListener("change", updateActions);
  elements.findingDiscipline.addEventListener("input", updateActions);
  elements.exportSelectedBcfButton.addEventListener("click", () => exportBcfFindings("selected"));
  elements.exportAllBcfButton.addEventListener("click", () => exportBcfFindings("all"));
  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("keydown", handleGlobalKeydown);
}

function initViewportLayout() {
  syncViewportLayout();
  if (typeof ResizeObserver !== "function") {
    return;
  }
  state.layoutObserver = new ResizeObserver(() => {
    syncViewportLayout();
    resizeRenderer();
  });
  if (elements.topbar) {
    state.layoutObserver.observe(elements.topbar);
  }
  if (elements.dropZone) {
    state.layoutObserver.observe(elements.dropZone);
  }
}

function handleWindowResize() {
  syncViewportLayout();
  resizeRenderer();
}

function syncViewportLayout() {
  if (!elements.appShell || !elements.topbar) {
    return;
  }
  const topbarRect = elements.topbar.getBoundingClientRect();
  elements.appShell.style.setProperty("--topbar-height", `${Math.ceil(topbarRect.height)}px`);
}

function handleGlobalKeydown(event) {
  if (isTypingTarget(event.target)) {
    return;
  }
  const key = String(event.key || "").toLowerCase();
  if (moveCameraViewByKeyboard(key, event)) {
    setStatus(t("measure.shortcutStatus"));
    event.preventDefault();
    return;
  }
  if (rotateCameraViewByKeyboard(key, event)) {
    setStatus(t("measure.shortcutStatus"));
    event.preventDefault();
    return;
  }
  if (key === "h") {
    resetCameraToHorizontalView();
  } else if (key === "f") {
    fitAllModelsToView();
  } else if (key === "c") {
    state.openPopouts.add("clip");
    if (!state.section.enabled) {
      enableClipping();
    }
    syncPopouts();
  } else if (key === "l") {
    state.showLevels = !state.showLevels;
    elements.levelToggle.checked = state.showLevels;
    updateLevelHelperVisibility();
  } else if (key === "m") {
    setMeasurementEnabled(!state.measurement.enabled);
  } else if (key === "escape") {
    if (state.measurement.pendingPoint) {
      state.measurement.pendingPoint = null;
      state.measurement.status = state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle");
      updateMeasurementUi();
    } else if (state.measurement.enabled) {
      setMeasurementEnabled(false);
    } else {
      clearSelection();
      renderAll();
    }
  } else if (key === "delete" || key === "backspace") {
    if (state.measurement.enabled || state.measurement.records.length > 0) {
      undoMeasurement();
    } else {
      return;
    }
  } else {
    return;
  }
  setStatus(t("measure.shortcutStatus"));
  event.preventDefault();
}

function moveCameraViewByKeyboard(key, event) {
  const distance = keyboardMoveDistanceSceneUnits(event);
  if (distance === null || !state.camera || !state.controls) {
    return false;
  }
  const forward = horizontalCameraForward();
  const right = horizontalCameraRight(forward);
  const delta = new THREE.Vector3();
  if (key === "w") {
    delta.copy(forward).multiplyScalar(distance);
  } else if (key === "s") {
    delta.copy(forward).multiplyScalar(-distance);
  } else if (key === "a") {
    delta.copy(right).multiplyScalar(-distance);
  } else if (key === "d") {
    delta.copy(right).multiplyScalar(distance);
  } else if (key === "z") {
    delta.set(0, -distance, 0);
  } else if (key === "x") {
    delta.set(0, distance, 0);
  } else {
    return false;
  }
  state.camera.position.add(delta);
  state.controls.target.add(delta);
  state.controls.update();
  state.currentSpaceSignature = "";
  updateCurrentSpaceOverlay();
  return true;
}

function rotateCameraViewByKeyboard(key, event) {
  let yawDelta = 0;
  let pitchDelta = 0;
  if (key === "q" || key === "e") {
    const step = keyboardRotationStepRadians(event);
    if (step === null) {
      return false;
    }
    yawDelta = key === "q" ? -step : step;
  } else if (key === "t" || key === "g") {
    const step = keyboardRotationStepRadians(event);
    if (step === null) {
      return false;
    }
    pitchDelta = key === "t" ? step : -step;
  } else {
    return false;
  }
  rotateCameraInPlace(yawDelta, pitchDelta);
  return true;
}

function keyboardMoveDistanceSceneUnits(event) {
  if (event.altKey && !event.shiftKey) {
    return null;
  }
  if (event.shiftKey && event.altKey) {
    return millimetersToSceneUnits(100);
  }
  if (event.shiftKey) {
    return millimetersToSceneUnits(2000);
  }
  return millimetersToSceneUnits(500);
}

function keyboardRotationStepRadians(event) {
  if (event.altKey && !event.shiftKey) {
    return null;
  }
  if (event.shiftKey && event.altKey) {
    return THREE.MathUtils.degToRad(2);
  }
  if (event.shiftKey) {
    return THREE.MathUtils.degToRad(30);
  }
  return THREE.MathUtils.degToRad(10);
}

function rotateCameraInPlace(yawDelta, pitchDelta) {
  const distance = currentViewDistance();
  const { yaw, pitch } = currentCameraYawPitch();
  const nextPitch = clampNumber(
    pitch + pitchDelta,
    THREE.MathUtils.degToRad(-82),
    THREE.MathUtils.degToRad(82),
    pitch
  );
  const nextYaw = yaw + yawDelta;
  const direction = directionFromYawPitch(nextYaw, nextPitch);
  state.controls.target.copy(state.camera.position).add(direction.multiplyScalar(distance));
  state.controls.update();
  state.currentSpaceSignature = "";
  updateCurrentSpaceOverlay();
}

function resetCameraToHorizontalView() {
  if (!state.camera || !state.controls) {
    return;
  }
  const spaceBox = currentOrSelectedSpaceBox();
  if (spaceBox) {
    state.camera.position.y = spaceBox.min.y + millimetersToSceneUnits(1500);
  }
  const distance = currentViewDistance();
  const forward = horizontalCameraForward();
  state.controls.target.copy(state.camera.position).add(forward.multiplyScalar(distance));
  state.controls.target.y = state.camera.position.y;
  state.controls.update();
  state.currentSpaceSignature = "";
  updateCurrentSpaceOverlay();
}

function currentViewDistance() {
  if (!state.camera || !state.controls) {
    return 1;
  }
  const distance = state.controls.target.distanceTo(state.camera.position);
  return Number.isFinite(distance) && distance > 0.01 ? distance : 1;
}

function captureCameraView() {
  if (!state.camera || !state.controls) {
    return null;
  }
  return {
    projectionMode: state.view.projectionMode,
    position: state.camera.position.clone(),
    target: state.controls.target.clone(),
    near: state.camera.near,
    far: state.camera.far,
    fov: state.view.fov,
    orthographicHeight: state.view.orthographicHeight
  };
}

function restoreCameraView(view) {
  if (!view || !state.camera || !state.controls) {
    return;
  }
  state.view.fov = Number(view.fov) || state.view.fov;
  state.view.orthographicHeight = Number(view.orthographicHeight) || state.view.orthographicHeight;
  setProjectionMode(view.projectionMode);
  state.camera.position.copy(view.position);
  state.controls.target.copy(view.target);
  state.camera.near = Number(view.near) || state.camera.near;
  state.camera.far = Number(view.far) || state.camera.far;
  applyProjectionSettings();
  state.camera.updateProjectionMatrix();
  state.controls.update();
  state.currentSpaceSignature = "";
  updateCameraCoordinateDisplay();
}

function currentCameraYawPitch() {
  const direction = cameraViewDirection();
  const horizontal = Math.hypot(direction.x, direction.z);
  return {
    yaw: Math.atan2(direction.z, direction.x),
    pitch: Math.atan2(direction.y, horizontal || 0.000001)
  };
}

function directionFromYawPitch(yaw, pitch) {
  const horizontal = Math.cos(pitch);
  return new THREE.Vector3(
    Math.cos(yaw) * horizontal,
    Math.sin(pitch),
    Math.sin(yaw) * horizontal
  ).normalize();
}

function cameraViewDirection() {
  const direction = state.controls && state.camera
    ? state.controls.target.clone().sub(state.camera.position)
    : new THREE.Vector3(0, 0, -1);
  if (direction.lengthSq() < 0.000001 && state.camera) {
    state.camera.getWorldDirection(direction);
  }
  if (direction.lengthSq() < 0.000001) {
    direction.set(0, 0, -1);
  }
  return direction.normalize();
}

function horizontalCameraForward() {
  const forward = cameraViewDirection();
  forward.y = 0;
  if (forward.lengthSq() < 0.000001) {
    forward.set(0, 0, -1);
  }
  return forward.normalize();
}

function horizontalCameraRight(forward) {
  return new THREE.Vector3(-forward.z, 0, forward.x).normalize();
}

function currentOrSelectedSpaceBox() {
  const current = currentIfcSpaceAtCamera();
  if (current) {
    return translatedElementBox(current.record, current.expressID);
  }
  const record = getSelectedRecord();
  if (!record || !isIfcRecord(record) || state.selectedExpressID === null) {
    return null;
  }
  if (!record.spatialElementsById || !record.spatialElementsById.has(Number(state.selectedExpressID))) {
    return null;
  }
  return translatedElementBox(record, state.selectedExpressID);
}

function isTypingTarget(target) {
  const tag = String(target && target.tagName || "").toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || Boolean(target && target.isContentEditable);
}

async function loadOpenBimFiles(files) {
  const ifcFiles = files.filter(isIfcFile);
  const stbFiles = files.filter(isStbFile);
  if (ifcFiles.length === 0 && stbFiles.length === 0) {
    setStatus(t("status.onlyOpenBim"), true);
    return;
  }
  const hadModels = state.models.length > 0;
  const cameraView = hadModels ? captureCameraView() : null;
  elements.emptyState.classList.add("is-hidden");
  updateActions();
  for (const file of ifcFiles) {
    await loadIfcFile(file);
  }
  for (const file of stbFiles) {
    await loadStbFile(file);
  }
  finishModelBatchLoad(hadModels, cameraView);
}

async function loadIfcFiles(files) {
  const ifcFiles = files.filter(isIfcFile);
  if (ifcFiles.length === 0) {
    setStatus(t("status.selectIfcExtension"), true);
    return;
  }

  const hadModels = state.models.length > 0;
  const cameraView = hadModels ? captureCameraView() : null;
  elements.emptyState.classList.add("is-hidden");
  updateActions();

  for (const file of ifcFiles) {
    await loadIfcFile(file);
  }

  finishModelBatchLoad(hadModels, cameraView);
}

async function loadStbFiles(files) {
  const stbFiles = files.filter(isStbFile);
  if (stbFiles.length === 0) {
    setStatus(t("status.selectStbExtension"), true);
    return;
  }

  const hadModels = state.models.length > 0;
  const cameraView = hadModels ? captureCameraView() : null;
  elements.emptyState.classList.add("is-hidden");
  updateActions();

  for (const file of stbFiles) {
    await loadStbFile(file);
  }

  finishModelBatchLoad(hadModels, cameraView);
}

function finishModelBatchLoad(hadModels, cameraView) {
  updateReferenceGrid();
  updateClipping();
  if (hadModels) {
    restoreCameraView(cameraView);
  } else {
    fitAllModelsToView();
  }
  renderAll();
}

function isIfcFile(file) {
  return Boolean(file && file.name && file.name.toLowerCase().endsWith(".ifc"));
}

function isStbFile(file) {
  if (!file || !file.name) {
    return false;
  }
  const name = file.name.toLowerCase();
  return name.endsWith(".stb") || name.endsWith(".xml");
}

async function loadIfcFile(file) {
  const fileKey = await buildFileKey(file);
  const objectUrl = URL.createObjectURL(file);
  setStatus(t("status.loadingFile", { name: file.name }));

  try {
    const model = await state.ifcLoader.loadAsync(objectUrl);
    model.name = file.name;
    state.scene.add(model);

    const record = createModelRecord(file, fileKey, objectUrl, model);
    state.models.push(record);
    state.activeModelKey = record.key;
    renderAll();

    setStatus(t("status.analyzingFile", { name: file.name }));
    await analyzeModel(record);
    record.comments = readLocalComments(record);
    const embeddedComments = await readEmbeddedComments(file);
    const embeddedImported = mergeComments(record, embeddedComments);
    if (embeddedImported > 0) {
      await persistComments(record);
      setCommentStatus(t("commentStatus.embeddedImported", { count: embeddedImported }));
    }
    applyVisibility(record);
    refreshSceneOverlays();
    setStatus(t("status.loadedFile", { name: file.name }));
  } catch (error) {
    console.error(error);
    URL.revokeObjectURL(objectUrl);
    setStatus(t("status.loadFailed", { message: error.message || error }), true);
  }
}

function createModelRecord(file, fileKey, objectUrl, model) {
  return {
    key: `${fileKey}-${model.modelID}`,
    sourceType: SOURCE_IFC,
    modelID: model.modelID,
    model,
    file,
    fileKey,
    objectUrl,
    name: file.name,
    enabled: true,
    allExpressIDs: [],
    visibleExpressIDs: new Set(),
    idToCategory: new Map(),
    idToLevel: new Map(),
    categoryMap: new Map(),
    levelMap: new Map(),
    boxesByExpressID: new Map(),
    spatialElementsById: new Map(),
    propertyCache: new Map(),
    attributeMatchIds: null,
    comments: [],
    display: {
      opacity: 100,
      colorMode: "original",
      tintColor: "#7f9fb5",
      offset: {
        x: 0,
        y: 0,
        z: 0
      }
    },
    visibilitySubset: null,
    categoryColorSubsets: new Map(),
    attributeColorSubset: null,
    spaceSubset: null,
    selectedSpaceSubset: null,
    levelGroup: null,
    filterSubsetId: VISIBLE_SUBSET_ID,
    selectedSubsetId: SELECTED_SUBSET_ID,
    commentSubsetId: COMMENT_SUBSET_ID
  };
}

async function loadStbFile(file) {
  const fileKey = await buildFileKey(file);
  setStatus(t("status.loadingStb", { name: file.name }));

  try {
    const text = decodeStbXmlText(await file.arrayBuffer());
    const doc = parseStbXmlDocument(text);
    const modelID = -(Date.now() + state.models.length + 1);
    const key = `${fileKey}-stb-${Math.abs(modelID)}`;
    const parsed = buildStbModelFromDocument(doc, file, key);
    const record = createStbModelRecord(file, fileKey, modelID, key, parsed);
    state.scene.add(record.model);
    state.models.push(record);
    state.activeModelKey = record.key;
    record.comments = readLocalComments(record);
    applyVisibility(record);
    refreshSceneOverlays();
    renderAll();
    setStatus(t("status.loadedStb", {
      name: file.name,
      count: record.allExpressIDs.length,
      levels: record.levelMap.size
    }));
  } catch (error) {
    console.error(error);
    setStatus(t("status.stbLoadFailed", { message: error.message || error }), true);
  }
}

function createStbModelRecord(file, fileKey, modelID, key, parsed) {
  const record = {
    key,
    sourceType: SOURCE_STB,
    modelID,
    model: parsed.group,
    file,
    fileKey,
    objectUrl: "",
    name: file.name,
    enabled: true,
    allExpressIDs: [],
    visibleExpressIDs: new Set(),
    idToCategory: new Map(),
    idToLevel: new Map(),
    categoryMap: new Map(),
    levelMap: new Map(),
    boxesByExpressID: new Map(),
    spatialElementsById: new Map(),
    propertyCache: new Map(),
    attributeMatchIds: null,
    comments: [],
    display: {
      opacity: 100,
      colorMode: "original",
      tintColor: "#7f9fb5",
      offset: { x: 0, y: 0, z: 0 }
    },
    visibilitySubset: null,
    categoryColorSubsets: new Map(),
    attributeColorSubset: null,
    levelGroup: null,
    filterSubsetId: VISIBLE_SUBSET_ID,
    selectedSubsetId: SELECTED_SUBSET_ID,
    commentSubsetId: COMMENT_SUBSET_ID,
    stbElementsById: new Map()
  };

  for (const item of parsed.elements) {
    record.allExpressIDs.push(item.id);
    record.stbElementsById.set(item.id, item);
    record.boxesByExpressID.set(item.id, item.box);
    addCategory(record, item.id, item.category);
    addLevel(record, item.id, {
      name: item.levelName || UNCATEGORIZED_LEVEL,
      elevation: Number.isFinite(item.levelElevation) ? item.levelElevation : null,
      expressID: null
    });
  }
  record.allExpressIDs.sort((a, b) => a - b);
  record.visibleExpressIDs = new Set(record.allExpressIDs);
  refreshLevelHelpers(record);
  return record;
}

function buildStbModelFromDocument(doc, file, recordKey) {
  const root = doc.documentElement;
  const transform = stbGlobalTransform(root);
  const nodeMap = buildStbNodeMap(root, transform);
  const { stories, nodeToStory } = buildStbStories(root, transform);
  const sections = buildStbSectionMap(root);
  const group = new THREE.Group();
  group.name = file.name;
  const elements = [];
  const diagnostics = [];

  for (const localName of ["StbColumn", "StbPost", "StbGirder", "StbBeam", "StbBrace"]) {
    for (const member of xmlElements(root, localName)) {
      const endpoints = stbMemberEndpoints(member, nodeMap, diagnostics, transform);
      if (!endpoints) {
        continue;
      }
      const section = resolveStbSection(member, sections);
      const primitives = stbPrimitivesForMember(localName, stbSectionPrimitives(section));
      const meshData = createStbMemberMesh(endpoints.start, endpoints.end, stbNumber(member, "rotate", 0), primitives);
      if (!meshData) {
        continue;
      }
      const story = stbStoryForMember(stories, nodeToStory, endpoints.startId, endpoints.endId, endpoints.start, endpoints.end, member);
      addStbElement(group, elements, recordKey, file, member, localName, meshData, section, story, endpoints);
    }
  }

  for (const localName of ["StbSlab", "StbWall"]) {
    const offsetName = localName === "StbSlab" ? "StbSlabOffset" : "StbWallOffset";
    for (const member of xmlElements(root, localName)) {
      const points = stbPolygonPoints(member, nodeMap, offsetName, transform);
      const meshData = createStbDoubleSidedFanMesh(points);
      if (!meshData) {
        continue;
      }
      const story = nearestStoryForZ(stories, stbMeshCenter(meshData));
      const section = resolveStbSection(member, sections);
      addStbElement(group, elements, recordKey, file, member, localName, meshData, section, story, null);
    }
  }

  for (const localName of ["StbFooting", "StbPile"]) {
    for (const member of xmlElements(root, localName)) {
      const section = resolveStbSection(member, sections);
      const meshData = localName === "StbFooting"
        ? createStbFootingMesh(member, nodeMap, section, transform)
        : createStbPileMesh(member, nodeMap, section, transform);
      if (!meshData) {
        continue;
      }
      const story = nearestStoryForZ(stories, stbMeshCenter(meshData));
      addStbElement(group, elements, recordKey, file, member, localName, meshData, section, story, null);
    }
  }

  if (elements.length === 0) {
    throw new Error("Supported ST-Bridge members were not found.");
  }
  if (diagnostics.length > 0) {
    console.warn("ST-Bridge diagnostics", diagnostics);
  }
  return { group, elements, stories };
}

function addStbElement(group, elements, recordKey, file, member, localName, meshData, section, story, endpoints) {
  const rawId = Math.round(stbNumber(member, "id", elements.length + 1));
  const usedIds = new Set(elements.map((item) => item.id));
  let id = rawId || elements.length + 1;
  while (usedIds.has(id)) {
    id += 100000;
  }
  const category = stbMemberCategory(localName);
  const color = stbMemberColor(category, stbAttr(member, "kind_structure", ""));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(meshData.vertices), 3));
  geometry.setIndex(meshData.indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  const material = new THREE.MeshLambertMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.92
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `${localName} ${id}`;
  mesh.userData.recordKey = recordKey;
  mesh.userData.elementID = id;
  mesh.userData.baseColor = color;
  mesh.userData.category = category;
  setObjectLayer(mesh, SCENE_LAYER_MAIN);
  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, edgeThresholdDegrees()),
    new THREE.LineBasicMaterial({ color: edgeColorHex(), transparent: true, opacity: edgeOpacityRatio() })
  );
  edge.userData.isStbEdge = true;
  edge.userData.openBimEdgeOverlay = true;
  mesh.add(edge);
  group.add(mesh);

  const box = new THREE.Box3().setFromObject(mesh);
  const levelName = story && story.name ? story.name : UNCATEGORIZED_LEVEL;
  const levelElevation = story && Number.isFinite(story.elevationMm)
    ? millimetersToSceneUnits(story.elevationMm)
    : null;
  elements.push({
    id,
    mesh,
    box,
    category,
    family: localName,
    type: section && section.name || "",
    levelName,
    levelElevation,
    globalId: stbAttr(member, "guid", ""),
    name: stbAttr(member, "name", "") || `${localName} ${id}`,
    properties: stbMemberProperties(file, member, localName, section, story, endpoints, meshData)
  });
}

async function analyzeModel(record) {
  record.boxesByExpressID = collectExpressIdBoxes(record.model);
  record.allExpressIDs = Array.from(record.boxesByExpressID.keys()).sort((a, b) => a - b);
  record.visibleExpressIDs = new Set(record.allExpressIDs);

  let completed = 0;
  const pairs = await mapWithConcurrency(record.allExpressIDs, 24, async (expressID) => {
    const ifcType = await safeGetIfcType(record.modelID, expressID);
    completed++;
    if (completed % 300 === 0) {
      setStatus(t("status.analyzingCategory", {
        name: record.name,
        completed,
        total: record.allExpressIDs.length
      }));
      await yieldToBrowser();
    }
    return [expressID, ifcType || UNCATEGORIZED_CATEGORY];
  });

  for (const [expressID, ifcType] of pairs) {
    addCategory(record, expressID, ifcType);
  }

  await assignLevelsFromSpatialStructure(record);
  ensureUnassignedLevels(record);
  await analyzeIfcSpaces(record);
  refreshLevelHelpers(record);
}

function collectExpressIdBoxes(model) {
  model.updateMatrixWorld(true);
  const boxes = new Map();
  const geometry = model.geometry;
  const positions = geometry && geometry.attributes && geometry.attributes.position;
  const expressIds = geometry && geometry.attributes && geometry.attributes.expressID;
  if (!positions || !expressIds) {
    return boxes;
  }

  const point = new THREE.Vector3();
  for (let i = 0; i < expressIds.count; i++) {
    const expressID = Number(expressIds.getX(i));
    if (!Number.isFinite(expressID)) {
      continue;
    }
    let box = boxes.get(expressID);
    if (!box) {
      box = new THREE.Box3();
      boxes.set(expressID, box);
    }
    point.fromBufferAttribute(positions, i).applyMatrix4(model.matrixWorld);
    box.expandByPoint(point);
  }
  return boxes;
}

function xmlLocalName(node) {
  return String(node && (node.localName || node.nodeName) || "").replace(/^.*:/, "");
}

function xmlElements(root, localName) {
  if (!root) {
    return [];
  }
  return Array.from(root.getElementsByTagName("*"))
    .filter((node) => xmlLocalName(node) === localName);
}

function xmlFirst(root, localNames) {
  const names = new Set(Array.isArray(localNames) ? localNames : [localNames]);
  for (const node of Array.from(root.getElementsByTagName("*"))) {
    if (names.has(xmlLocalName(node))) {
      return node;
    }
  }
  return null;
}

function stbAttr(node, names, fallback = "") {
  const candidates = Array.isArray(names) ? names : [names];
  for (const name of candidates) {
    const value = node && node.getAttribute ? node.getAttribute(name) : null;
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return fallback;
}

function stbNumber(node, names, fallback = 0) {
  const value = Number(stbAttr(node, names, "").replace(/,/g, ""));
  return Number.isFinite(value) ? value : fallback;
}

function decodeStbXmlText(buffer) {
  const bytes = new Uint8Array(buffer);
  const head = Array.from(bytes.slice(0, Math.min(bytes.length, 512)))
    .map((value) => String.fromCharCode(value))
    .join("");
  const declared = (head.match(/encoding\s*=\s*["']([^"']+)["']/i) || [])[1] || "";
  const encodings = /shift[-_]?jis|sjis/i.test(declared)
    ? ["shift_jis", "utf-8"]
    : ["utf-8", "shift_jis"];
  for (const encoding of encodings) {
    try {
      return new TextDecoder(encoding).decode(buffer);
    } catch {
    }
  }
  return new TextDecoder().decode(buffer);
}

function parseStbXmlDocument(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) {
    throw new Error(parserError.textContent || "ST-Bridge XML parse error.");
  }
  if (!doc.documentElement || xmlLocalName(doc.documentElement) !== "ST_BRIDGE") {
    throw new Error("The selected file is not an ST-Bridge XML document.");
  }
  return doc;
}

function stbGlobalTransform(root) {
  const common = xmlElements(root, "StbCommon")[0];
  const offset = [
    stbNumber(common, "global_offset_X", 0),
    stbNumber(common, "global_offset_Y", 0),
    stbNumber(common, "global_offset_Z", 0)
  ];
  const angle = THREE.MathUtils.degToRad(stbNumber(common, "global_rotation", 0));
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    offset,
    rotationDeg: THREE.MathUtils.radToDeg(angle),
    apply(point) {
      const x = Number(point[0]) || 0;
      const y = Number(point[1]) || 0;
      const z = Number(point[2]) || 0;
      return [
        x * cos - y * sin + offset[0],
        x * sin + y * cos + offset[1],
        z + offset[2]
      ];
    },
    applyVector(vector) {
      const x = Number(vector[0]) || 0;
      const y = Number(vector[1]) || 0;
      const z = Number(vector[2]) || 0;
      return [
        x * cos - y * sin,
        x * sin + y * cos,
        z
      ];
    }
  };
}

function buildStbNodeMap(root, transform) {
  const map = new Map();
  for (const node of xmlElements(root, "StbNode")) {
    const id = Math.round(stbNumber(node, "id", 0));
    if (!id) {
      continue;
    }
    map.set(id, {
      id,
      guid: stbAttr(node, "guid", ""),
      point: transform.apply([
        stbNumber(node, "X", 0),
        stbNumber(node, "Y", 0),
        stbNumber(node, "Z", 0)
      ])
    });
  }
  return map;
}

function buildStbStories(root, transform) {
  const stories = [];
  const nodeToStory = new Map();
  for (const story of xmlElements(root, "StbStory")) {
    const id = Math.round(stbNumber(story, "id", stories.length + 1));
    const item = {
      id,
      name: stbAttr(story, ["name", "level_name"], "") || `Story ${id}`,
      elevationMm: stbNumber(story, "height", 0) + transform.offset[2],
      strengthConcrete: stbAttr(story, "strength_concrete", "")
    };
    stories.push(item);
    const nodeList = xmlFirst(story, "StbNodeIdList");
    for (const nodeId of stbParseIntegerList(nodeList && nodeList.textContent)) {
      nodeToStory.set(nodeId, item);
    }
  }
  stories.sort((a, b) => a.elevationMm - b.elevationMm);
  return { stories, nodeToStory };
}

function stbParseIntegerList(text) {
  return String(text || "").match(/-?\d+/g)?.map((item) => Number(item)).filter(Number.isFinite) || [];
}

function buildStbSectionMap(root) {
  const map = new Map();
  const names = [
    "StbSecColumn_RC", "StbSecColumn_S", "StbSecColumn_SRC", "StbSecColumn_CFT",
    "StbSecBeam_RC", "StbSecBeam_S", "StbSecBeam_SRC", "StbSecBrace_S",
    "StbSecSlab_RC", "StbSecSlabDeck", "StbSecWall_RC", "StbSecFoundation_RC", "StbSecPile_RC"
  ];
  for (const localName of names) {
    for (const section of xmlElements(root, localName)) {
      const id = Math.round(stbNumber(section, "id", 0));
      if (!id) {
        continue;
      }
      const item = {
        id,
        localName,
        name: stbAttr(section, "name", "") || `${localName} ${id}`,
        shape: "box",
        width: 600,
        depth: 600,
        diameter: 0,
        thickness: 180,
        widthX: 1200,
        widthY: 1200,
        steelShape: firstStbSteelShape(section),
        strengthConcrete: stbAttr(section, "strength_concrete", "")
      };
      applyStbSectionShape(item, section, localName);
      applyParsedSteelShapeToSection(item);
      map.set(`${localName}:${id}`, item);
      if (!map.has(String(id))) {
        map.set(String(id), item);
      }
    }
  }
  return map;
}

function applyStbSectionShape(item, section, localName) {
  const rectColumn = xmlFirst(section, ["StbSecColumnRect", "StbSecColumn_RC_Rect"]);
  const circleColumn = xmlFirst(section, ["StbSecColumnCircle", "StbSecColumn_RC_Circle"]);
  const beamStraight = xmlFirst(section, ["StbSecBeamStraight", "StbSecBeam_RC_Straight"]);
  const slabStraight = xmlFirst(section, ["StbSecSlab_RC_Straight", "StbSecSlabDeckStraight"]);
  const wallStraight = xmlFirst(section, ["StbSecWall_RC_Straight"]);
  const foundation = xmlFirst(section, ["StbSecFoundation_RC_Rect", "StbSecFoundation_RC_TaperedRect"]);
  const pile = xmlFirst(section, ["StbSecPile_RC_Straight"]);
  if (rectColumn) {
    item.width = stbNumber(rectColumn, ["width_X", "width", "B"], item.width);
    item.depth = stbNumber(rectColumn, ["width_Y", "depth", "D"], item.depth);
  } else if (circleColumn) {
    item.shape = "circle";
    item.diameter = stbNumber(circleColumn, "D", 700);
    item.width = item.diameter;
    item.depth = item.diameter;
  } else if (beamStraight) {
    item.width = stbNumber(beamStraight, "width", item.width);
    item.depth = stbNumber(beamStraight, "depth", item.depth);
  } else if (slabStraight || localName === "StbSecSlabDeck") {
    item.shape = "slab";
    item.depth = stbNumber(slabStraight, "depth", 150);
  } else if (wallStraight) {
    item.shape = "wall";
    item.thickness = stbNumber(wallStraight, ["thickness", "width"], 180);
  } else if (foundation) {
    item.shape = "footing";
    item.widthX = stbNumber(foundation, ["width_X", "width"], item.widthX);
    item.widthY = stbNumber(foundation, ["width_Y", "depth"], item.widthY);
    item.depth = stbNumber(foundation, ["depth", "depth_base"], 600);
  } else if (pile) {
    item.shape = "pile";
    item.diameter = stbNumber(pile, "D", 800);
  }
}

function firstStbSteelShape(section) {
  for (const node of Array.from(section.getElementsByTagName("*"))) {
    const shape = stbAttr(node, ["shape", "name_shape", "steel_shape"], "");
    if (shape) {
      return shape;
    }
  }
  return "";
}

function parseStbSteelShapeText(shapeText) {
  const text = String(shapeText || "").trim();
  if (!text) {
    return null;
  }
  const normalized = text.replace(/[x×＊*]/gi, "x").replace(/[－ー―]/g, "-").toUpperCase();
  const values = (normalized.match(/\d+(?:\.\d+)?/g) || []).map(Number).filter((value) => value > 0);
  if (values.length === 0) {
    return null;
  }
  if (normalized.includes("ROUND") || normalized.startsWith("R-")) {
    return { kind: "cylinder", diameter: values[0] };
  }
  if (normalized.includes("PIPE") || normalized.includes("P-") || normalized.includes("D-")) {
    return { kind: "cylinder", diameter: values[0] };
  }
  if (normalized.includes("H-") || normalized.startsWith("BH-") || normalized.startsWith("WH-")) {
    return {
      kind: "h",
      depth: values[0] || 600,
      width: values[1] || values[0] || 300,
      web: values[2] || 12,
      flange: values[3] || values[2] || 16
    };
  }
  return {
    kind: "box",
    depth: values[0] || 600,
    width: values[1] || values[0] || 300
  };
}

function applyParsedSteelShapeToSection(item) {
  const parsed = parseStbSteelShapeText(item.steelShape);
  if (!parsed) {
    return;
  }
  item.parsedSteelProfile = parsed;
  if (parsed.kind === "cylinder") {
    item.shape = "circle";
    item.diameter = parsed.diameter;
    item.width = parsed.diameter;
    item.depth = parsed.diameter;
  } else {
    item.width = parsed.width || item.width;
    item.depth = parsed.depth || item.depth;
  }
}

function stbSectionCandidates(member, sectionId) {
  const kind = String(stbAttr(member, "kind_structure", "")).toUpperCase();
  const local = xmlLocalName(member);
  if (local === "StbColumn" || local === "StbPost") {
    return kind.includes("S") || kind.includes("CFT")
      ? [`StbSecColumn_${kind}:${sectionId}`, `StbSecColumn_S:${sectionId}`, String(sectionId)]
      : [`StbSecColumn_RC:${sectionId}`, String(sectionId)];
  }
  if (local === "StbGirder" || local === "StbBeam") {
    return kind.includes("S")
      ? [`StbSecBeam_${kind}:${sectionId}`, `StbSecBeam_S:${sectionId}`, String(sectionId)]
      : [`StbSecBeam_RC:${sectionId}`, String(sectionId)];
  }
  if (local === "StbBrace") {
    return [`StbSecBrace_S:${sectionId}`, String(sectionId)];
  }
  if (local === "StbSlab") {
    return [`StbSecSlab_RC:${sectionId}`, `StbSecSlabDeck:${sectionId}`, String(sectionId)];
  }
  if (local === "StbWall") {
    return [`StbSecWall_RC:${sectionId}`, String(sectionId)];
  }
  if (local === "StbFooting") {
    return [`StbSecFoundation_RC:${sectionId}`, String(sectionId)];
  }
  if (local === "StbPile") {
    return [`StbSecPile_RC:${sectionId}`, String(sectionId)];
  }
  return [String(sectionId)];
}

function resolveStbSection(member, sections) {
  const sectionId = Math.round(stbNumber(member, "id_section", 0));
  for (const key of stbSectionCandidates(member, sectionId)) {
    if (sections.has(key)) {
      return sections.get(key);
    }
  }
  return {
    id: sectionId,
    localName: "",
    name: sectionId ? `Section ${sectionId}` : "Undefined Section",
    shape: "box",
    width: 600,
    depth: 600,
    diameter: 0,
    steelShape: ""
  };
}

function stbSectionPrimitives(section) {
  const parsed = section && section.parsedSteelProfile;
  if (parsed && parsed.kind === "cylinder") {
    return [{ kind: "cylinder", diameter: Math.max(50, parsed.diameter || 700) }];
  }
  if (parsed && parsed.kind === "h") {
    const width = Math.max(50, parsed.width || 300);
    const depth = Math.max(50, parsed.depth || 600);
    const web = Math.max(8, parsed.web || 12);
    const flange = Math.max(8, parsed.flange || 16);
    return [
      { kind: "box", width, depth: flange, offsetV: depth / 2 - flange / 2 },
      { kind: "box", width, depth: flange, offsetV: -depth / 2 + flange / 2 },
      { kind: "box", width: web, depth }
    ];
  }
  if (section && section.shape === "circle") {
    return [{ kind: "cylinder", diameter: Math.max(50, section.diameter || 700) }];
  }
  return [{
    kind: "box",
    width: Math.max(50, Number(section && section.width) || 600),
    depth: Math.max(50, Number(section && section.depth) || 600)
  }];
}

function stbPrimitivesForMember(localName, primitives) {
  const cloned = (primitives || []).map((primitive) => ({ ...primitive }));
  if (localName !== "StbGirder" && localName !== "StbBeam") {
    return cloned;
  }
  let maxV = Number.NEGATIVE_INFINITY;
  for (const primitive of cloned) {
    const depth = primitive.kind === "cylinder" ? (primitive.diameter || 500) : (primitive.depth || 500);
    maxV = Math.max(maxV, (Number(primitive.offsetV) || 0) + depth / 2);
  }
  return cloned.map((primitive) => ({
    ...primitive,
    offsetV: (Number(primitive.offsetV) || 0) - maxV
  }));
}

function stbMemberEndpoints(member, nodeMap, diagnostics, transform) {
  const local = xmlLocalName(member);
  let startId = 0;
  let endId = 0;
  let start = null;
  let end = null;
  if (local === "StbColumn" || local === "StbPost") {
    startId = Math.round(stbNumber(member, "id_node_bottom", 0));
    endId = Math.round(stbNumber(member, "id_node_top", 0));
    start = nodeMap.get(startId);
    end = nodeMap.get(endId);
    if (start && end) {
      return {
        startId,
        endId,
        start: stbAdd(start.point, stbOffsetPoint(member, "offset_bottom", transform)),
        end: stbAdd(end.point, stbOffsetPoint(member, "offset_top", transform))
      };
    }
  } else if (local === "StbGirder" || local === "StbBeam" || local === "StbBrace") {
    startId = Math.round(stbNumber(member, "id_node_start", 0));
    endId = Math.round(stbNumber(member, "id_node_end", 0));
    start = nodeMap.get(startId);
    end = nodeMap.get(endId);
    if (start && end) {
      const startPrefix = local === "StbBrace" ? "aim_offset_start" : "offset_start";
      const endPrefix = local === "StbBrace" ? "aim_offset_end" : "offset_end";
      const rawStart = stbAdd(start.point, local === "StbBrace"
        ? stbOffsetPointWithFallback(member, startPrefix, "offset_start", transform)
        : stbOffsetPoint(member, startPrefix, transform));
      const rawEnd = stbAdd(end.point, local === "StbBrace"
        ? stbOffsetPointWithFallback(member, endPrefix, "offset_end", transform)
        : stbOffsetPoint(member, endPrefix, transform));
      const axis = stbNormalize(stbSub(rawEnd, rawStart));
      return {
        startId,
        endId,
        start: stbAdd(rawStart, stbScale(axis, stbNumber(member, "cutback_start", 0))),
        end: stbAdd(rawEnd, stbScale(axis, -stbNumber(member, "cutback_end", 0)))
      };
    }
  }
  diagnostics.push(`Missing node reference for ${local} ${stbAttr(member, "id", "")}`.trim());
  return null;
}

function stbOffsetPoint(node, prefix, transform) {
  const vector = [
    stbNumber(node, `${prefix}_X`, 0),
    stbNumber(node, `${prefix}_Y`, 0),
    stbNumber(node, `${prefix}_Z`, 0)
  ];
  return transform.applyVector(vector);
}

function stbOffsetPointWithFallback(node, primaryPrefix, fallbackPrefix, transform) {
  const primary = stbOffsetPoint(node, primaryPrefix, transform);
  return primary.some((value) => Math.abs(value) > 1e-9)
    ? primary
    : stbOffsetPoint(node, fallbackPrefix, transform);
}

function stbNodeOrder(element) {
  const order = xmlFirst(element, "StbNodeIdOrder");
  return stbParseIntegerList(order && order.textContent || "");
}

function stbPolygonPoints(element, nodeMap, offsetLocalName, transform) {
  const offsets = new Map();
  for (const node of Array.from(element.getElementsByTagName("*"))) {
    if (xmlLocalName(node) !== offsetLocalName) {
      continue;
    }
    const id = Math.round(stbNumber(node, "id_node", 0));
    offsets.set(id, transform.applyVector([
      stbNumber(node, "offset_X", 0),
      stbNumber(node, "offset_Y", 0),
      stbNumber(node, "offset_Z", 0)
    ]));
  }
  return stbNodeOrder(element)
    .map((id) => {
      const node = nodeMap.get(id);
      return node ? stbAdd(node.point, offsets.get(id) || [0, 0, 0]) : null;
    })
    .filter(Boolean);
}

function stbStoryForMember(stories, nodeToStory, startNodeId, endNodeId, start, end, member) {
  const assigned = nodeToStory.get(startNodeId) || nodeToStory.get(endNodeId) || null;
  const local = xmlLocalName(member);
  const zMm = local === "StbColumn" || local === "StbPost"
    ? Math.min(start[2], end[2])
    : (start[2] + end[2]) / 2;
  return assigned || nearestStoryForMmZ(stories, zMm);
}

function nearestStoryForMmZ(stories, zMm) {
  if (!stories || stories.length === 0) {
    return null;
  }
  return stories.slice().sort((a, b) =>
    Math.abs(a.elevationMm - zMm) - Math.abs(b.elevationMm - zMm))[0] || null;
}

function nearestStoryForZ(stories, sceneY) {
  if (!stories || stories.length === 0) {
    return null;
  }
  return stories.slice().sort((a, b) =>
    Math.abs(millimetersToSceneUnits(a.elevationMm) - sceneY) -
    Math.abs(millimetersToSceneUnits(b.elevationMm) - sceneY))[0] || null;
}

function stbMemberCategory(localName) {
  return {
    StbColumn: "Columns",
    StbPost: "Columns",
    StbGirder: "Girders",
    StbBeam: "Beams",
    StbBrace: "Braces",
    StbSlab: "Slabs",
    StbWall: "Walls",
    StbFooting: "Footings",
    StbPile: "Piles"
  }[localName] || "ST-Bridge";
}

function stbMemberColor(category, kindStructure) {
  const kind = String(kindStructure || "").toUpperCase();
  if (STB_COLORS[category]) {
    return STB_COLORS[category];
  }
  if (kind.includes("S") || kind.includes("CFT")) {
    return 0x597aa6;
  }
  if (kind.includes("RC")) {
    return 0x8d96a2;
  }
  return STB_COLORS.default;
}

function createStbMemberMesh(start, end, rotateDegrees, primitives) {
  const length = Math.sqrt(stbDot(stbSub(end, start), stbSub(end, start)));
  if (!Number.isFinite(length) || length < 1) {
    return null;
  }
  const basis = stbMemberBasis(start, end, rotateDegrees);
  const mesh = { vertices: [], indices: [] };
  for (const primitive of primitives || []) {
    if (primitive.kind === "cylinder") {
      addStbCylinderPrimitive(mesh, start, end, basis, primitive);
    } else {
      addStbBoxPrimitive(mesh, start, end, basis, primitive);
    }
  }
  return mesh.indices.length > 0 ? mesh : null;
}

function createStbDoubleSidedFanMesh(points) {
  if (!Array.isArray(points) || points.length < 3) {
    return null;
  }
  const mesh = { vertices: [], indices: [] };
  for (const point of points) {
    pushStbVertex(mesh.vertices, point);
  }
  for (let i = 1; i < points.length - 1; i++) {
    mesh.indices.push(0, i, i + 1, 0, i + 1, i);
  }
  return mesh;
}

function createStbFootingMesh(member, nodeMap, section, transform) {
  const node = nodeMap.get(Math.round(stbNumber(member, "id_node", 0)));
  if (!node) {
    return null;
  }
  const center = stbAdd(node.point, transform.applyVector([
    stbNumber(member, "offset_X", 0),
    stbNumber(member, "offset_Y", 0),
    0
  ]));
  const widthX = Math.max(100, Number(section && (section.widthX || section.width)) || 1200);
  const widthY = Math.max(100, Number(section && (section.widthY || section.depth)) || widthX);
  const depth = Math.max(100, Number(section && section.depth) || 600);
  const bottom = stbNumber(member, "level_bottom", center[2] - depth);
  return createStbBoxMeshFromBounds(
    center[0] - widthX / 2,
    center[1] - widthY / 2,
    bottom,
    center[0] + widthX / 2,
    center[1] + widthY / 2,
    bottom + depth
  );
}

function createStbPileMesh(member, nodeMap, section, transform) {
  const node = nodeMap.get(Math.round(stbNumber(member, "id_node", 0)));
  if (!node) {
    return null;
  }
  const top = stbAdd(node.point, transform.applyVector([
    stbNumber(member, "offset_X", 0),
    stbNumber(member, "offset_Y", 0),
    0
  ]));
  top[2] = stbNumber(member, "level_top", node.point[2]);
  const length = Math.max(100, stbNumber(member, "length_all", 2000));
  return createStbMemberMesh([top[0], top[1], top[2] - length], top, 0, [{
    kind: "cylinder",
    diameter: Math.max(100, Number(section && section.diameter) || 800)
  }]);
}

function createStbBoxMeshFromBounds(minX, minY, minZ, maxX, maxY, maxZ) {
  const mesh = { vertices: [], indices: [] };
  const points = [
    [minX, minY, minZ], [maxX, minY, minZ], [maxX, maxY, minZ], [minX, maxY, minZ],
    [minX, minY, maxZ], [maxX, minY, maxZ], [maxX, maxY, maxZ], [minX, maxY, maxZ]
  ];
  for (const point of points) {
    pushStbVertex(mesh.vertices, point);
  }
  mesh.indices.push(
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    2, 3, 7, 2, 7, 6,
    3, 0, 4, 3, 4, 7
  );
  return mesh;
}

function stbMemberBasis(start, end, rotateDegrees) {
  const axis = stbNormalize(stbSub(end, start));
  const upSeed = Math.abs(stbDot(axis, [0, 0, 1])) > 0.92 ? [1, 0, 0] : [0, 0, 1];
  const side0 = stbNormalize(stbCross(axis, upSeed));
  const vertical0 = stbNormalize(stbCross(side0, axis));
  const angle = THREE.MathUtils.degToRad(Number(rotateDegrees) || 0);
  return {
    axis,
    side: stbAdd(stbScale(side0, Math.cos(angle)), stbScale(vertical0, Math.sin(angle))),
    vertical: stbAdd(stbScale(side0, -Math.sin(angle)), stbScale(vertical0, Math.cos(angle)))
  };
}

function addStbBoxPrimitive(mesh, start, end, basis, primitive) {
  const width = Math.max(50, Number(primitive.width) || 500);
  const depth = Math.max(50, Number(primitive.depth) || 500);
  const offsetU = Number(primitive.offsetU) || 0;
  const offsetV = Number(primitive.offsetV) || 0;
  const corners = [
    [-width / 2 + offsetU, -depth / 2 + offsetV],
    [width / 2 + offsetU, -depth / 2 + offsetV],
    [width / 2 + offsetU, depth / 2 + offsetV],
    [-width / 2 + offsetU, depth / 2 + offsetV]
  ];
  const base = mesh.vertices.length / 3;
  for (const center of [start, end]) {
    for (const [u, v] of corners) {
      pushStbVertex(mesh.vertices, stbCrossSectionPoint(center, basis.side, basis.vertical, u, v));
    }
  }
  mesh.indices.push(
    base, base + 2, base + 1, base, base + 3, base + 2,
    base + 4, base + 5, base + 6, base + 4, base + 6, base + 7,
    base, base + 1, base + 5, base, base + 5, base + 4,
    base + 1, base + 2, base + 6, base + 1, base + 6, base + 5,
    base + 2, base + 3, base + 7, base + 2, base + 7, base + 6,
    base + 3, base, base + 4, base + 3, base + 4, base + 7
  );
}

function addStbCylinderPrimitive(mesh, start, end, basis, primitive) {
  const radius = Math.max(25, (Number(primitive.diameter) || 500) / 2);
  const segments = 16;
  const base = mesh.vertices.length / 3;
  for (const center of [start, end]) {
    for (let i = 0; i < segments; i++) {
      const angle = i * Math.PI * 2 / segments;
      pushStbVertex(mesh.vertices, stbCrossSectionPoint(center, basis.side, basis.vertical, Math.cos(angle) * radius, Math.sin(angle) * radius));
    }
  }
  const startCenter = mesh.vertices.length / 3;
  pushStbVertex(mesh.vertices, start);
  const endCenter = mesh.vertices.length / 3;
  pushStbVertex(mesh.vertices, end);
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    mesh.indices.push(base + i, base + next, base + segments + next);
    mesh.indices.push(base + i, base + segments + next, base + segments + i);
    mesh.indices.push(startCenter, base + next, base + i);
    mesh.indices.push(endCenter, base + segments + i, base + segments + next);
  }
}

function stbCrossSectionPoint(center, side, vertical, u, v) {
  return stbAdd(stbAdd(center, stbScale(side, u)), stbScale(vertical, v));
}

function pushStbVertex(vertices, pointMm) {
  vertices.push(
    millimetersToSceneUnits(pointMm[0]),
    millimetersToSceneUnits(pointMm[2]),
    millimetersToSceneUnits(pointMm[1])
  );
}

function stbMeshCenter(meshData) {
  const vertices = meshData && meshData.vertices || [];
  if (vertices.length < 3) {
    return 0;
  }
  let y = 0;
  for (let i = 1; i < vertices.length; i += 3) {
    y += vertices[i];
  }
  return y / Math.floor(vertices.length / 3);
}

function stbMemberProperties(file, member, localName, section, story, endpoints) {
  const rows = {
    File: file.name,
    Category: stbMemberCategory(localName),
    Level: story && story.name || UNCATEGORIZED_LEVEL,
    StBridgeElement: localName,
    MemberId: stbAttr(member, "id", ""),
    GlobalId: stbAttr(member, "guid", ""),
    Name: stbAttr(member, "name", ""),
    KindStructure: stbAttr(member, "kind_structure", ""),
    Section: section && section.name || "",
    SectionId: stbAttr(member, "id_section", ""),
    SteelShape: section && section.steelShape || "",
    WidthMm: section && section.width ? String(Math.round(section.width)) : "",
    DepthMm: section && section.depth ? String(Math.round(section.depth)) : "",
    DiameterMm: section && section.diameter ? String(Math.round(section.diameter)) : "",
    StoryElevationMm: story && Number.isFinite(story.elevationMm) ? String(Math.round(story.elevationMm)) : ""
  };
  if (endpoints) {
    rows.AxisStartMm = endpoints.start.map((value) => String(Math.round(value))).join(", ");
    rows.AxisEndMm = endpoints.end.map((value) => String(Math.round(value))).join(", ");
  }
  return rows;
}

function stbAdd(left, right) {
  return [left[0] + right[0], left[1] + right[1], left[2] + right[2]];
}

function stbSub(left, right) {
  return [left[0] - right[0], left[1] - right[1], left[2] - right[2]];
}

function stbScale(vector, scale) {
  return [vector[0] * scale, vector[1] * scale, vector[2] * scale];
}

function stbDot(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function stbCross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0]
  ];
}

function stbNormalize(vector) {
  const length = Math.sqrt(stbDot(vector, vector));
  return length > 0 ? [vector[0] / length, vector[1] / length, vector[2] / length] : [1, 0, 0];
}

function addCategory(record, expressID, rawType) {
  const name = isStbRecord(record)
    ? (stringValue(rawType).trim() || "ST-Bridge")
    : normalizeIfcType(rawType);
  record.idToCategory.set(expressID, name);
  if (!record.categoryMap.has(name)) {
    record.categoryMap.set(name, {
      name,
      ids: [],
      visible: true
    });
  }
  record.categoryMap.get(name).ids.push(expressID);
}

async function assignLevelsFromSpatialStructure(record) {
  let tree = null;
  try {
    tree = await state.ifcLoader.ifcManager.getSpatialStructure(record.modelID, false);
  } catch (error) {
    console.warn("Spatial structure failed", error);
  }
  if (!tree) {
    return;
  }

  const knownIds = new Set(record.allExpressIDs);
  const visit = async (node, currentLevel) => {
    if (!node || !Number.isFinite(Number(node.expressID))) {
      return;
    }

    const type = normalizeIfcType(node.type);
    let nextLevel = currentLevel;
    if (type === "IFCBUILDINGSTOREY") {
      let storeyNode = node;
      try {
        const properties = await state.ifcLoader.ifcManager.getItemProperties(record.modelID, Number(node.expressID), false);
        storeyNode = { ...properties, ...node };
      } catch {
      }
      nextLevel = {
        name: levelNameFromNode(storeyNode),
        elevation: numberValue(storeyNode.Elevation),
        expressID: Number(node.expressID)
      };
    } else if (nextLevel && knownIds.has(Number(node.expressID))) {
      addLevel(record, Number(node.expressID), nextLevel);
    }

    const children = Array.isArray(node.children) ? node.children : [];
    for (const child of children) {
      await visit(child, nextLevel);
    }
  };

  await visit(tree, null);
  inferMissingLevelElevations(record);
}

function addLevel(record, expressID, info) {
  const name = info.name || UNCATEGORIZED_LEVEL;
  record.idToLevel.set(expressID, name);
  if (!record.levelMap.has(name)) {
    record.levelMap.set(name, {
      name,
      ids: [],
      visible: true,
      elevation: Number.isFinite(info.elevation) ? info.elevation : null,
      expressID: info.expressID || null
    });
  }
  const level = record.levelMap.get(name);
  level.ids.push(expressID);
  if (!Number.isFinite(level.elevation) && Number.isFinite(info.elevation)) {
    level.elevation = info.elevation;
  }
}

function inferMissingLevelElevations(record) {
  for (const level of record.levelMap.values()) {
    if (Number.isFinite(level.elevation) || level.name === UNCATEGORIZED_LEVEL) {
      continue;
    }
    const box = unionBoxesForIds(record, level.ids);
    if (box) {
      level.elevation = box.min.y;
    }
  }
}

function ensureUnassignedLevels(record) {
  for (const expressID of record.allExpressIDs) {
    if (!record.idToLevel.has(expressID)) {
      addLevel(record, expressID, {
        name: UNCATEGORIZED_LEVEL,
        elevation: null
      });
    }
  }
}

async function analyzeIfcSpaces(record) {
  record.spatialElementsById.clear();
  const ids = record.allExpressIDs.filter((id) => isSpaceCategory(record.idToCategory.get(id)));
  for (const expressID of ids) {
    let properties = {};
    try {
      properties = await state.ifcLoader.ifcManager.getItemProperties(record.modelID, expressID, false);
    } catch {
    }
    const box = record.boxesByExpressID.get(expressID);
    if (!box || box.isEmpty()) {
      continue;
    }
    record.spatialElementsById.set(expressID, {
      expressID,
      globalId: stringValue(properties.GlobalId),
      name: displayNameFromProperties(properties) || `IfcSpace ${expressID}`,
      longName: stringValue(properties.LongName),
      level: record.idToLevel.get(expressID) || "",
      category: record.idToCategory.get(expressID) || "IFCSPACE",
      box
    });
  }
}

function isSpaceCategory(category) {
  const value = String(category || "").toUpperCase();
  return value === "IFCSPACE" || value === "IFCSPATIALZONE" || value.includes("ROOM");
}

function isIfcSpaceElement(record, expressID) {
  return Boolean(isIfcRecord(record) && (
    record.spatialElementsById && record.spatialElementsById.has(Number(expressID)) ||
    isSpaceCategory(record.idToCategory && record.idToCategory.get(Number(expressID)))
  ));
}

function applyVisibility(record) {
  if (isStbRecord(record)) {
    applyStbVisibility(record);
    return;
  }

  removeRecordSubset(record, record.filterSubsetId);
  removeCategoryColorSubsets(record);
  removeAttributeColorSubset(record);
  removeSpaceOverlays(record);
  record.visibilitySubset = null;

  if (!record.enabled) {
    record.model.visible = false;
    record.visibleExpressIDs = new Set();
    if (record.levelGroup) {
      record.levelGroup.visible = false;
    }
    applyRecordAppearance(record);
    applyRecordTransform(record);
    return;
  }

  const nonSpaceVisibleIds = [];
  const spaceVisibleIds = [];
  for (const expressID of record.allExpressIDs) {
    const category = record.categoryMap.get(record.idToCategory.get(expressID));
    const level = record.levelMap.get(record.idToLevel.get(expressID));
    if ((category && !category.visible) || (level && !level.visible)) {
      continue;
    }
    if (!attributeVisibilityAllows(record, expressID)) {
      continue;
    }
    if (isIfcSpaceElement(record, expressID)) {
      if (state.showSpaces && isSpaceInActiveClip(record, expressID)) {
        spaceVisibleIds.push(expressID);
      }
      continue;
    }
    nonSpaceVisibleIds.push(expressID);
  }

  record.visibleExpressIDs = new Set([...nonSpaceVisibleIds, ...spaceVisibleIds]);
  const isFiltered = nonSpaceVisibleIds.length !== record.allExpressIDs.length;
  record.model.visible = !isFiltered;

  if (isFiltered && nonSpaceVisibleIds.length > 0) {
    try {
      record.visibilitySubset = state.ifcLoader.ifcManager.createSubset({
        modelID: record.modelID,
        ids: nonSpaceVisibleIds,
        scene: state.scene,
        removePrevious: true,
        customID: record.filterSubsetId
      });
      record.visibilitySubset.name = `${record.name} visible subset`;
    } catch (error) {
      console.warn("Visibility subset failed", error);
      record.model.visible = true;
    }
  }

  if (record.levelGroup) {
    record.levelGroup.visible = state.showLevels && record.enabled;
  }

  updateColorSubsets(record);
  updateAttributeColorSubset(record);
  applyRecordAppearance(record);
  applyRecordTransform(record);
  updateRecordEdgeOverlays(record);
  updateSpaceOverlays(record, spaceVisibleIds);
}

function applyStbVisibility(record) {
  record.visibleExpressIDs = new Set();
  record.model.visible = record.enabled;
  for (const item of record.stbElementsById.values()) {
    const category = record.categoryMap.get(record.idToCategory.get(item.id));
    const level = record.levelMap.get(record.idToLevel.get(item.id));
    const visible = Boolean(record.enabled &&
      (!category || category.visible) &&
      (!level || level.visible) &&
      attributeVisibilityAllows(record, item.id));
    item.mesh.visible = visible;
    if (visible) {
      record.visibleExpressIDs.add(item.id);
    }
  }
  if (record.levelGroup) {
    record.levelGroup.visible = state.showLevels && record.enabled;
  }
  applyStbAppearance(record);
  applyRecordTransform(record);
  updateRecordEdgeOverlays(record);
}

function updateSpaceOverlays(record, visibleSpaceIds = visibleSpaceIdsForRecord(record)) {
  removeSpaceOverlays(record);
  if (!isIfcRecord(record) || !record.enabled || !state.showSpaces || visibleSpaceIds.length === 0) {
    return;
  }
  const selectedID = record.key === state.selectedModelKey && isIfcSpaceElement(record, state.selectedExpressID)
    ? Number(state.selectedExpressID)
    : null;
  const baseIds = visibleSpaceIds.filter((id) => Number(id) !== selectedID);
  record.spaceSubset = createSpaceSubset(record, baseIds, materials.space, SPACE_SUBSET_ID, false);
  record.selectedSpaceSubset = Number.isFinite(selectedID) && visibleSpaceIds.includes(selectedID)
    ? createSpaceSubset(record, [selectedID], materials.selectedSpace, SELECTED_SPACE_SUBSET_ID, true)
    : null;
}

function createSpaceSubset(record, ids, material, customID, selected) {
  if (!ids || ids.length === 0) {
    return null;
  }
  try {
    const subset = state.ifcLoader.ifcManager.createSubset({
      modelID: record.modelID,
      ids,
      material,
      scene: state.scene,
      removePrevious: true,
      customID
    });
    subset.name = `${record.name} ${selected ? "selected space" : "spaces"}`;
    subset.userData.recordKey = record.key;
    subset.userData.openBimSpaceOverlay = true;
    subset.userData.spaceExpressIDs = ids.slice();
    applyRecordTransformToObject(subset, record);
    addSpaceEdgeOverlay(subset, selected);
    return subset;
  } catch (error) {
    console.warn("Space overlay failed", error);
    return null;
  }
}

function addSpaceEdgeOverlay(subset, selected) {
  if (!subset || !subset.geometry) {
    return;
  }
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(subset.geometry, 24),
    new THREE.LineBasicMaterial({
      color: selected ? 0x9a3a06 : 0x123f63,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      opacity: selected ? 0.96 : 0.86
    })
  );
  line.userData.openBimEdgeOverlay = true;
  line.userData.openBimSpaceEdge = true;
  subset.add(line);
}

function removeSpaceOverlays(record) {
  if (!record || isStbRecord(record)) {
    return;
  }
  removeEdgeOverlaysFromObject(record.spaceSubset);
  removeEdgeOverlaysFromObject(record.selectedSpaceSubset);
  removeRecordSubset(record, SPACE_SUBSET_ID, materials.space);
  removeRecordSubset(record, SELECTED_SPACE_SUBSET_ID, materials.selectedSpace);
  record.spaceSubset = null;
  record.selectedSpaceSubset = null;
}

function visibleSpaceIdsForRecord(record) {
  if (!isIfcRecord(record) || !record.spatialElementsById || !state.showSpaces) {
    return [];
  }
  const ids = [];
  for (const space of record.spatialElementsById.values()) {
    const category = record.categoryMap.get(record.idToCategory.get(space.expressID));
    const level = record.levelMap.get(record.idToLevel.get(space.expressID));
    if ((category && !category.visible) || (level && !level.visible)) {
      continue;
    }
    if (isSpaceInActiveClip(record, space.expressID)) {
      ids.push(space.expressID);
    }
  }
  return ids;
}

function updateColorSubsets(record) {
  if (isStbRecord(record)) {
    applyStbAppearance(record);
    return;
  }

  if (!usesGeneratedColorSubsets(record) || !record.enabled) {
    restoreBaseRecordVisibility(record);
    return;
  }
  if (record.visibleExpressIDs.size === 0) {
    record.model.visible = false;
    if (record.visibilitySubset) {
      record.visibilitySubset.visible = false;
    }
    return;
  }

  record.model.visible = false;
  if (record.visibilitySubset) {
    record.visibilitySubset.visible = false;
  }

  for (const group of colorGroupsForRecord(record)) {
    const ids = group.ids.filter((expressID) =>
      record.visibleExpressIDs.has(Number(expressID)) && !isIfcSpaceElement(record, expressID));
    if (ids.length === 0) {
      continue;
    }

    const material = new THREE.MeshLambertMaterial({
      color: displayGroupColor(record, group.name),
      transparent: true,
      opacity: 0.92
    });
    const customID = categoryColorSubsetId(record.display.colorMode, group.name);
    try {
      const subset = state.ifcLoader.ifcManager.createSubset({
        modelID: record.modelID,
        ids,
        material,
        scene: state.scene,
        removePrevious: true,
        customID
      });
      subset.name = `${record.name} ${group.name} color subset`;
      applyRecordTransformToObject(subset, record);
      record.categoryColorSubsets.set(customID, { subset, material });
    } catch (error) {
      console.warn("Color subset failed", error);
      material.dispose();
      removeCategoryColorSubsets(record);
      restoreBaseRecordVisibility(record);
      return;
    }
  }
}

function restoreBaseRecordVisibility(record) {
  if (!record || !record.enabled) {
    if (record && record.model) {
      record.model.visible = false;
    }
    return;
  }
  if (record.visibleExpressIDs.size === 0) {
    record.model.visible = false;
    if (record.visibilitySubset) {
      record.visibilitySubset.visible = false;
    }
    return;
  }
  if (record.visibilitySubset) {
    record.model.visible = false;
    record.visibilitySubset.visible = true;
  } else {
    record.model.visible = true;
  }
}

function removeCategoryColorSubsets(record) {
  if (!record || !record.categoryColorSubsets) {
    return;
  }
  for (const [customID, entry] of record.categoryColorSubsets) {
    removeRecordSubset(record, customID, entry.material);
    if (entry.material && typeof entry.material.dispose === "function") {
      entry.material.dispose();
    }
  }
  record.categoryColorSubsets.clear();
}

function removeAttributeColorSubset(record) {
  if (!record || isStbRecord(record)) {
    return;
  }
  const subset = record.attributeColorSubset;
  if (subset) {
    removeEdgeOverlaysFromObject(subset);
    removeRecordSubset(record, ATTRIBUTE_COLOR_SUBSET_ID, subset.material);
    if (subset.material && typeof subset.material.dispose === "function") {
      subset.material.dispose();
    }
  }
  record.attributeColorSubset = null;
}

function updateAttributeColorSubset(record) {
  if (!isIfcRecord(record)) {
    return;
  }
  removeAttributeColorSubset(record);
  if (!isAttributeColorActive() || !record.enabled || !record.attributeMatchIds || record.attributeMatchIds.size === 0) {
    return;
  }
  const ids = Array.from(record.attributeMatchIds)
    .map(Number)
    .filter((expressID) => record.visibleExpressIDs.has(expressID));
  if (ids.length === 0) {
    return;
  }
  const material = new THREE.MeshLambertMaterial({
    color: state.attributeColor.color || "#ffb000",
    transparent: true,
    opacity: 0.94,
    depthWrite: false
  });
  try {
    const subset = state.ifcLoader.ifcManager.createSubset({
      modelID: record.modelID,
      ids,
      material,
      scene: state.scene,
      removePrevious: true,
      customID: ATTRIBUTE_COLOR_SUBSET_ID
    });
    subset.name = `${record.name} attribute color`;
    subset.userData.openBimAttributeColor = true;
    applyRecordTransformToObject(subset, record);
    record.attributeColorSubset = subset;
  } catch (error) {
    console.warn("Attribute color subset failed", error);
    material.dispose();
    record.attributeColorSubset = null;
  }
}

function isAttributeColorActive() {
  return state.attributeColor.enabled === true && Boolean(state.attributeColor.activeSignature);
}

function attributeVisibilityAllows(record, expressID) {
  if (!isAttributeColorActive() || !state.attributeColor.showOnly) {
    return true;
  }
  return attributeColorMatchesRecordId(record, expressID);
}

function attributeColorMatchesRecordId(record, expressID) {
  return Boolean(isAttributeColorActive() &&
    record &&
    record.attributeMatchIds &&
    record.attributeMatchIds.has(Number(expressID)));
}

function attributeUnmatchedOpacityRatio(record) {
  if (!isAttributeColorActive() || !record || state.attributeColor.showOnly) {
    return 1;
  }
  if (!record.attributeMatchIds || record.attributeMatchIds.size === 0) {
    return 1;
  }
  return clampNumber(state.attributeColor.unmatchedOpacity, 0, 100, 35) / 100;
}

function applyStbAppearance(record) {
  if (!isStbRecord(record)) {
    return;
  }
  const opacityRatio = clampNumber(record.display.opacity, 5, 100, 100) / 100;
  const selectedID = record.key === state.selectedModelKey ? Number(state.selectedExpressID) : null;
  const commentedIDs = new Set(record.comments.filter(isElementComment).map((comment) => Number(comment.expressID)));
  for (const item of record.stbElementsById.values()) {
    const material = item.mesh.material;
    let color = item.mesh.userData.baseColor || STB_COLORS.default;
    if (record.display.colorMode === "single") {
      color = new THREE.Color(record.display.tintColor || "#7f9fb5").getHex();
    } else if (record.display.colorMode === "category") {
      color = displayGroupColor(record, item.category);
    } else if (record.display.colorMode === "level") {
      color = displayGroupColor(record, item.levelName || UNCATEGORIZED_LEVEL);
    }
    if (state.showCommentHighlights && commentedIDs.has(item.id)) {
      color = 0xd94d2b;
    }
    if (attributeColorMatchesRecordId(record, item.id)) {
      color = new THREE.Color(state.attributeColor.color || "#ffb000").getHex();
    }
    if (Number.isFinite(selectedID) && item.id === selectedID) {
      color = 0xffc400;
    }
    material.color.setHex(color);
    const unmatchedRatio = attributeColorMatchesRecordId(record, item.id)
      ? 1
      : attributeUnmatchedOpacityRatio(record);
    material.opacity = Math.max(0.03, 0.92 * opacityRatio * unmatchedRatio);
    material.transparent = material.opacity < 0.999;
    material.needsUpdate = true;
  }
}

function applyRecordAppearance(record) {
  if (!record || !record.display) {
    return;
  }
  if (isStbRecord(record)) {
    applyStbAppearance(record);
    return;
  }
  record.display.colorMode = normalizeColorMode(record.display.colorMode);
  record.display.opacity = clampNumber(record.display.opacity, 5, 100, 100);
  const opacityRatio = record.display.opacity / 100;
  const baseOpacityRatio = opacityRatio * attributeUnmatchedOpacityRatio(record);
  applyObjectAppearance(record.model, record, baseOpacityRatio, true);
  applyObjectAppearance(record.visibilitySubset, record, baseOpacityRatio, true);
  for (const entry of record.categoryColorSubsets.values()) {
    applyMaterialAppearance(entry.material, record, baseOpacityRatio, false);
  }
  if (record.attributeColorSubset) {
    applyObjectAppearance(record.attributeColorSubset, record, opacityRatio, false);
  }
}

function applyObjectAppearance(object, record, opacityRatio, allowTint) {
  if (!object) {
    return;
  }
  object.traverse((child) => {
    if (child.userData && child.userData.openBimEdgeOverlay) {
      return;
    }
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      applyMaterialAppearance(material, record, opacityRatio, allowTint);
    }
  });
}

function applyMaterialAppearance(material, record, opacityRatio, allowTint) {
  if (!material) {
    return;
  }
  const original = originalMaterialState(material);
  if ("opacity" in material) {
    material.opacity = Math.max(0.01, original.opacity * opacityRatio);
    material.transparent = original.transparent || material.opacity < 0.999;
  }
  if (material.color && original.color) {
    if (allowTint && record.display.colorMode === "single") {
      material.color.set(record.display.tintColor || "#7f9fb5");
    } else {
      material.color.copy(original.color);
    }
  }
  material.needsUpdate = true;
}

function originalMaterialState(material) {
  if (!MATERIAL_ORIGINALS.has(material)) {
    MATERIAL_ORIGINALS.set(material, {
      opacity: Number.isFinite(material.opacity) ? material.opacity : 1,
      transparent: Boolean(material.transparent),
      color: material.color ? material.color.clone() : null
    });
  }
  return MATERIAL_ORIGINALS.get(material);
}

function applyRecordTransform(record) {
  if (!record || !record.display || !record.display.offset) {
    return;
  }
  applyRecordTransformToObject(record.model, record);
  applyRecordTransformToObject(record.visibilitySubset, record);
  applyRecordTransformToObject(record.spaceSubset, record);
  applyRecordTransformToObject(record.selectedSpaceSubset, record);
  applyRecordTransformToObject(record.attributeColorSubset, record);
  if (record.levelGroup) {
    applyRecordTransformToObject(record.levelGroup, record);
  }
  for (const entry of record.categoryColorSubsets.values()) {
    applyRecordTransformToObject(entry.subset, record);
  }
}

function applyRecordTransformToObject(object, record) {
  if (!object || !record || !record.display || !record.display.offset) {
    return;
  }
  object.position.copy(recordOffsetVector(record));
  object.updateMatrixWorld(true);
}

function translatedElementBox(record, expressID) {
  const box = record && record.boxesByExpressID.get(Number(expressID));
  if (!box) {
    return null;
  }
  return box.clone().translate(recordOffsetVector(record));
}

function recordOffsetVector(record) {
  const offset = record && record.display && record.display.offset;
  const xMm = Number(offset && offset.x) || 0;
  const yMm = Number(offset && offset.y) || 0;
  const zMm = Number(offset && offset.z) || 0;
  // UI offsets use BIM axes in millimeters: X/Y are plan axes, Z is height. Three.js uses Y as height.
  return new THREE.Vector3(
    millimetersToSceneUnits(xMm),
    millimetersToSceneUnits(zMm),
    millimetersToSceneUnits(yMm)
  );
}

function millimetersToSceneUnits(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return 0;
  }
  return numeric / 1000;
}

function setAllCategoryVisibility(visible) {
  for (const record of state.models) {
    for (const category of record.categoryMap.values()) {
      category.visible = visible;
    }
    applyVisibility(record);
  }
  afterVisibilityChange();
}

function setAllLevelVisibility(visible) {
  for (const record of state.models) {
    for (const level of record.levelMap.values()) {
      level.visible = visible;
    }
    applyVisibility(record);
  }
  afterVisibilityChange();
}

function setCategoryVisibility(name, visible) {
  for (const record of state.models) {
    const category = record.categoryMap.get(name);
    if (category) {
      category.visible = visible;
      applyVisibility(record);
    }
  }
  afterVisibilityChange();
}

function setRecordCategoryVisibility(record, visible) {
  for (const category of record.categoryMap.values()) {
    category.visible = visible;
  }
  applyVisibility(record);
  afterVisibilityChange();
}

function setLevelVisibility(name, visible) {
  for (const record of state.models) {
    const level = record.levelMap.get(name);
    if (level) {
      level.visible = visible;
      applyVisibility(record);
    }
  }
  afterVisibilityChange();
}

function setRecordLevelVisibility(record, visible) {
  for (const level of record.levelMap.values()) {
    level.visible = visible;
  }
  applyVisibility(record);
  afterVisibilityChange();
}

function afterVisibilityChange() {
  const scrollState = captureScrollState();
  if (!isSelectedElementVisible()) {
    clearSelection();
  }
  refreshSceneOverlays();
  updateClipping();
  renderAll();
  restoreScrollState(scrollState);
}

function applySpaceVisibilityState() {
  clearSpaceLabels();
  state.currentSpaceSignature = "";
  for (const record of state.models) {
    if (isIfcRecord(record)) {
      applyVisibility(record);
    }
  }
  refreshSceneOverlays();
  renderAll();
}

function updateAllSpaceOverlays() {
  for (const record of state.models) {
    if (isIfcRecord(record)) {
      const visibleIds = visibleSpaceIdsForRecord(record);
      for (const id of record.spatialElementsById.keys()) {
        if (visibleIds.includes(id)) {
          record.visibleExpressIDs.add(id);
        } else if (isIfcSpaceElement(record, id)) {
          record.visibleExpressIDs.delete(id);
        }
      }
      updateSpaceOverlays(record, visibleIds);
    }
  }
}

function refreshSceneOverlays() {
  updateSelectionHighlight();
  updateAllCommentHighlights();
  updateLevelHelperVisibility();
}

function captureScrollState() {
  const state = {
    sidePanel: scrollPosition(document.querySelector(".side-panel")),
    activeModelSettings: scrollPosition(elements.activeModelSettings),
    categoryList: scrollPosition(elements.categoryList),
    levelList: scrollPosition(elements.levelList),
    filterLists: []
  };
  for (const node of document.querySelectorAll("[data-scroll-key]")) {
    state.filterLists.push({
      key: node.dataset.scrollKey,
      position: scrollPosition(node)
    });
  }
  return state;
}

function restoreScrollState(state) {
  if (!state) {
    return;
  }
  const apply = () => {
    restoreScrollPosition(document.querySelector(".side-panel"), state.sidePanel);
    restoreScrollPosition(elements.activeModelSettings, state.activeModelSettings);
    restoreScrollPosition(elements.categoryList, state.categoryList);
    restoreScrollPosition(elements.levelList, state.levelList);
    const currentLists = Array.from(document.querySelectorAll("[data-scroll-key]"));
    for (const item of state.filterLists || []) {
      const node = currentLists.find((candidate) => candidate.dataset.scrollKey === item.key);
      restoreScrollPosition(node, item.position);
    }
  };
  apply();
  requestAnimationFrame(apply);
}

function scrollPosition(node) {
  return node ? { top: node.scrollTop, left: node.scrollLeft } : { top: 0, left: 0 };
}

function restoreScrollPosition(node, position) {
  if (!node || !position) {
    return;
  }
  node.scrollTop = position.top || 0;
  node.scrollLeft = position.left || 0;
}

async function onPointerDown(event) {
  if (tryStartClipHandleDrag(event)) {
    return;
  }

  if (state.measurement.enabled && handleMeasurementClick(event)) {
    return;
  }

  if (state.models.length === 0 || event.button !== 0) {
    return;
  }

  const rect = elements.canvas.getBoundingClientRect();
  state.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  state.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  state.raycaster.setFromCamera(state.pointer, state.camera);
  state.raycaster.layers.set(SCENE_LAYER_MAIN);

  const spaceHit = firstSpaceIntersection();
  if (spaceHit) {
    await selectElement(spaceHit.record, spaceHit.expressID);
    return;
  }

  const intersections = state.raycaster.intersectObjects(getPickableMeshes(), false);
  if (intersections.length === 0) {
    await selectElement(null, null);
    return;
  }

  const hit = intersections[0];
  const record = hit.object.userData && hit.object.userData.recordKey
    ? getRecordByKey(hit.object.userData.recordKey)
    : getRecordByModelID(hit.object.modelID);
  if (!record) {
    await selectElement(null, null);
    return;
  }

  const expressID = isStbRecord(record)
    ? hit.object.userData.elementID
    : state.ifcLoader.ifcManager.getExpressId(hit.object.geometry, hit.faceIndex);
  await selectElement(record, expressID);
}

function firstSpaceIntersection() {
  const intersections = state.raycaster.intersectObjects(getSpacePickableMeshes(), false);
  for (const hit of intersections) {
    const record = getRecordByKey(hit.object.userData && hit.object.userData.recordKey);
    if (!record) {
      continue;
    }
    let expressID = null;
    try {
      expressID = state.ifcLoader.ifcManager.getExpressId(hit.object.geometry, hit.faceIndex);
    } catch {
      const ids = hit.object.userData && hit.object.userData.spaceExpressIDs;
      expressID = Array.isArray(ids) && ids.length === 1 ? ids[0] : null;
    }
    if (Number.isFinite(Number(expressID)) && isIfcSpaceElement(record, expressID)) {
      return { record, expressID: Number(expressID) };
    }
  }
  return null;
}

function getSpacePickableMeshes() {
  return state.models
    .filter((record) => isIfcRecord(record) && record.enabled)
    .flatMap((record) => [record.selectedSpaceSubset, record.spaceSubset])
    .filter((mesh) => mesh && mesh.visible);
}

async function selectElement(record, expressID, options = {}) {
  const id = Number(expressID);
  if (!record || !Number.isFinite(id)) {
    clearSelection();
    renderAll();
    return;
  }

  state.activeModelKey = record.key;
  state.selectedModelKey = record.key;
  state.selectedExpressID = id;
  state.selectedProperties = null;

  if (isStbRecord(record)) {
    const item = record.stbElementsById.get(id);
    state.selectedProperties = {
      ...(item && item.properties || {}),
      File: record.name,
      Category: item && item.category || "",
      Level: item && item.levelName || "",
      IfcType: t("selection.stbElement"),
      GlobalId: item && item.globalId || "",
      Name: item && item.name || `ST-Bridge ${id}`,
      expressID: id
    };
    updateSelectionHighlight();
    if (options.fit) {
      fitExpressIdToView(record, id);
    }
    renderAll();
    return;
  }

  try {
    const [properties, ifcType] = await Promise.all([
      state.ifcLoader.ifcManager.getItemProperties(record.modelID, id, true),
      safeGetIfcType(record.modelID, id)
    ]);
    state.selectedProperties = {
      ...properties,
      IfcType: ifcType,
      File: record.name,
      Level: record.idToLevel.get(id) || "",
      Category: record.idToCategory.get(id) || ""
    };
  } catch (error) {
    console.warn(error);
    state.selectedProperties = {
      expressID: id,
      File: record.name,
      Level: record.idToLevel.get(id) || "",
      Category: record.idToCategory.get(id) || ""
    };
  }

  updateSelectionHighlight();
  if (options.fit) {
    fitExpressIdToView(record, id);
  }
  renderAll();
}

function clearSelection() {
  state.selectedModelKey = "";
  state.selectedExpressID = null;
  state.selectedProperties = null;
  updateSelectionHighlight();
}

function clearSelectionAndRender() {
  clearSelection();
  renderAll();
}

async function safeGetIfcType(modelID, expressID) {
  try {
    return await state.ifcLoader.ifcManager.getIfcType(modelID, expressID);
  } catch {
    return "";
  }
}

function updateSelectionHighlight() {
  for (const record of state.models) {
    if (isStbRecord(record)) {
      applyStbAppearance(record);
    } else {
      removeRecordSubset(record, record.selectedSubsetId, materials.selected);
      updateSpaceOverlays(record);
    }
  }

  const record = getSelectedRecord();
  if (!record || state.selectedExpressID === null || !isElementVisible(record, state.selectedExpressID)) {
    return;
  }

  if (isStbRecord(record)) {
    applyStbAppearance(record);
    return;
  }

  if (isIfcSpaceElement(record, state.selectedExpressID)) {
    updateSpaceOverlays(record);
    return;
  }

  try {
    const subset = state.ifcLoader.ifcManager.createSubset({
      modelID: record.modelID,
      ids: [state.selectedExpressID],
      material: materials.selected,
      scene: state.scene,
      removePrevious: true,
      customID: record.selectedSubsetId
    });
    applyRecordTransformToObject(subset, record);
  } catch (error) {
    console.warn("Selection highlight failed", error);
  }
}

function updateAllCommentHighlights() {
  for (const record of state.models) {
    updateCommentHighlights(record);
  }
}

function updateCommentHighlights(record) {
  if (isStbRecord(record)) {
    applyStbAppearance(record);
    return;
  }

  removeRecordSubset(record, record.commentSubsetId, materials.commented);
  if (!record.enabled || !state.showCommentHighlights) {
    return;
  }

  const ids = unique(record.comments
    .filter(isElementComment)
    .map((comment) => Number(comment.expressID))
    .filter((expressID) => Number.isFinite(expressID) && isElementVisible(record, expressID)));
  if (ids.length === 0) {
    return;
  }

  try {
    const subset = state.ifcLoader.ifcManager.createSubset({
      modelID: record.modelID,
      ids,
      material: materials.commented,
      scene: state.scene,
      removePrevious: true,
      customID: record.commentSubsetId
    });
    applyRecordTransformToObject(subset, record);
  } catch (error) {
    console.warn("Comment highlight failed", error);
  }
}

function removeRecordSubset(record, customID, material) {
  if (!record || !record.model || isStbRecord(record)) {
    return;
  }
  try {
    state.ifcLoader.ifcManager.removeSubset(record.modelID, material, customID);
  } catch {
  }
}

async function saveCommentForSelection() {
  const scope = currentCommentScope();
  const body = elements.commentBody.value.trim();
  if (!body) {
    setCommentStatus(t("commentStatus.emptyBody"), true);
    return;
  }

  const record = resolveCommentTargetRecord(scope);
  if (!record) {
    setCommentStatus(t(scope === "element" ? "commentStatus.selectElement" : "commentStatus.selectCommentTarget"), true);
    return;
  }

  if (scope === "element" && state.selectedExpressID === null) {
    setCommentStatus(t("commentStatus.selectElement"), true);
    return;
  }

  const department = elements.departmentInput.value.trim();
  if (scope === "department" && !department) {
    setCommentStatus(t("commentStatus.departmentRequired"), true);
    return;
  }

  const author = elements.authorInput.value.trim() || t("comment.defaultAuthor");
  localStorage.setItem(AUTHOR_STORAGE_KEY, author);

  const comment = {
    id: createId(),
    scope,
    body,
    author,
    createdAt: new Date().toISOString(),
    viewContext: captureViewContext(record)
  };

  if (scope === "element") {
    comment.expressID = state.selectedExpressID;
    comment.globalId = stringValue(state.selectedProperties && state.selectedProperties.GlobalId);
    comment.ifcType = stringValue(state.selectedProperties && state.selectedProperties.IfcType);
    comment.name = displayNameFromProperties(state.selectedProperties);
  } else if (scope === "department") {
    comment.expressID = null;
    comment.globalId = "";
    comment.ifcType = "";
    comment.name = department;
    comment.department = department;
  } else {
    comment.expressID = null;
    comment.globalId = "";
    comment.ifcType = "";
    comment.name = "";
    comment.department = "";
  }

  state.activeModelKey = record.key;
  record.comments.push(comment);
  elements.commentBody.value = "";
  await persistComments(record);
  updateCommentHighlights(record);
  renderAll();
  setCommentStatus(t("commentStatus.saved"), false, true);
}

function currentCommentScope() {
  const scope = elements.commentScope ? elements.commentScope.value : "element";
  return normalizeCommentScope(scope);
}

function normalizeCommentScope(scope) {
  return scope === "model" || scope === "department" ? scope : "element";
}

function resolveCommentTargetRecord(scope) {
  if (scope === "element") {
    return getSelectedRecord();
  }
  return getActiveRecord() || getSelectedRecord() || state.models[0] || null;
}

function syncCommentScopeControls() {
  const scope = currentCommentScope();
  if (elements.departmentField) {
    elements.departmentField.classList.toggle("is-hidden", scope !== "department");
  }
}

function canSaveComment() {
  if (!elements.commentBody.value.trim()) {
    return false;
  }
  const scope = currentCommentScope();
  const record = resolveCommentTargetRecord(scope);
  if (!record) {
    return false;
  }
  if (scope === "element") {
    return state.selectedExpressID !== null;
  }
  if (scope === "department") {
    return Boolean(elements.departmentInput.value.trim());
  }
  return true;
}

async function deleteComment(recordKey, commentId) {
  const record = getRecordByKey(recordKey);
  if (!record) {
    return;
  }
  const next = record.comments.filter((comment) => comment.id !== commentId);
  if (next.length === record.comments.length) {
    return;
  }
  record.comments = next;
  await persistComments(record);
  updateCommentHighlights(record);
  renderAll();
  setCommentStatus(t("commentStatus.deleted"));
}

async function persistComments(record) {
  writeLocalComments(record);
}

function readLocalComments(record) {
  if (!record.fileKey) {
    return [];
  }
  try {
    const raw = localStorage.getItem(COMMENT_STORAGE_PREFIX + record.fileKey);
    if (!raw) {
      return [];
    }
    const payload = JSON.parse(raw);
    return normalizeComments(Array.isArray(payload.comments) ? payload.comments : payload);
  } catch {
    return [];
  }
}

function writeLocalComments(record) {
  if (!record.fileKey) {
    return;
  }
  localStorage.setItem(COMMENT_STORAGE_PREFIX + record.fileKey, JSON.stringify({
    fileKey: record.fileKey,
    fileName: record.name,
    savedAt: new Date().toISOString(),
    comments: record.comments
  }));
}

function normalizeComments(comments) {
  return comments
    .map((comment) => {
      if (!comment || !comment.body) {
        return null;
      }
      const hasExpressID = hasFiniteExpressID(comment.expressID);
      const scope = normalizeCommentScope(comment.scope || (hasExpressID ? "element" : "model"));
      if (scope === "element" && !hasExpressID) {
        return null;
      }
      return {
        id: comment.id || createId(),
        scope,
        expressID: scope === "element" ? Number(comment.expressID) : null,
        globalId: stringValue(comment.globalId),
        ifcType: stringValue(comment.ifcType),
        name: stringValue(comment.name),
        department: stringValue(comment.department),
        body: stringValue(comment.body),
        author: stringValue(comment.author) || "anonymous",
        createdAt: stringValue(comment.createdAt) || new Date().toISOString(),
        viewContext: normalizeViewContext(comment.viewContext)
      };
    })
    .filter(Boolean);
}

function exportComments() {
  const recordsWithComments = state.models.filter((record) => record.comments.length > 0);
  if (recordsWithComments.length === 0) {
    return;
  }

  const payload = {
    format: "ifc-review-comments",
    version: 3,
    exportedAt: new Date().toISOString(),
    files: recordsWithComments.map((record) => ({
      fileKey: record.fileKey,
      fileName: record.name,
      sourceType: record.sourceType || SOURCE_IFC,
      comments: record.comments
    }))
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = recordsWithComments.length === 1
    ? `${safeFileBase(recordsWithComments[0].name)}-comments.json`
    : "ifc-review-comments.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function exportCommentedIfc() {
  const record = getCommentedIfcExportTarget();
  if (!record) {
    return;
  }

  try {
    const source = await record.file.text();
    const payload = {
      format: "ifc-review-viewer-embedded-comments",
      version: 1,
      exportedAt: new Date().toISOString(),
      fileKey: record.fileKey,
      fileName: record.name,
      comments: record.comments
    };
    const block = buildEmbeddedCommentsBlock(payload);
    const withoutOldBlocks = source.replace(EMBEDDED_COMMENTS_PATTERN, "").trimEnd();
    const output = appendEmbeddedCommentsBlock(withoutOldBlocks, block);
    const blob = new Blob([output], { type: "application/x-step" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileBase(record.name)}-review.ifc`;
    link.click();
    URL.revokeObjectURL(url);
    setCommentStatus(t("commentStatus.ifcExported"));
  } catch (error) {
    setCommentStatus(t("commentStatus.ifcExportFailed", { message: error.message || error }), true);
  }
}

function getCommentedIfcExportTarget() {
  const candidates = [
    getActiveRecord(),
    getSelectedRecord(),
    ...state.models
  ].filter(Boolean);
  return candidates.find((record, index, list) =>
    list.findIndex((candidate) => candidate.key === record.key) === index &&
    isIfcRecord(record) &&
    record.comments.length > 0) || null;
}

function buildEmbeddedCommentsBlock(payload) {
  return [
    `/* ${EMBEDDED_COMMENTS_MARKER}`,
    textToBase64(JSON.stringify(payload)),
    `${EMBEDDED_COMMENTS_END_MARKER} */`
  ].join("\n");
}

function appendEmbeddedCommentsBlock(ifcText, block) {
  const marker = "END-ISO-10303-21;";
  const markerIndex = ifcText.lastIndexOf(marker);
  if (markerIndex === -1) {
    return `${ifcText}\n${block}\n`;
  }
  return `${ifcText.slice(0, markerIndex).trimEnd()}\n${block}\n${ifcText.slice(markerIndex)}`;
}

async function readEmbeddedComments(file) {
  try {
    const source = await file.text();
    const comments = [];
    for (const payload of extractEmbeddedCommentPayloads(source)) {
      comments.push(...normalizeComments(payload.comments || []));
    }
    return comments;
  } catch (error) {
    console.warn("Embedded IFC comments could not be read", error);
    return [];
  }
}

function extractEmbeddedCommentPayloads(source) {
  const payloads = [];
  EMBEDDED_COMMENTS_PATTERN.lastIndex = 0;
  for (const match of source.matchAll(EMBEDDED_COMMENTS_PATTERN)) {
    try {
      const base64 = String(match[1] || "").replace(/\s+/g, "");
      payloads.push(JSON.parse(base64ToText(base64)));
    } catch (error) {
      console.warn("Invalid embedded IFC review comments", error);
    }
  }
  return payloads;
}

async function importComments(file) {
  if (state.models.length === 0) {
    setCommentStatus(t("commentStatus.loadIfcFirst"), true);
    return;
  }

  try {
    const payload = JSON.parse(await file.text());
    let imported = 0;

    if (Array.isArray(payload.files)) {
      for (const filePayload of payload.files) {
        const record = findRecordForCommentPayload(filePayload);
        if (!record) {
          continue;
        }
        imported += mergeComments(record, normalizeComments(filePayload.comments || []));
        await persistComments(record);
      }
    } else {
      const target = getSelectedRecord() || getActiveRecord() || state.models[0];
      imported += mergeComments(target, normalizeComments(Array.isArray(payload.comments) ? payload.comments : payload));
      await persistComments(target);
    }

    updateAllCommentHighlights();
    renderAll();
    setCommentStatus(imported > 0
      ? t("commentStatus.imported", { count: imported })
      : t("commentStatus.noImportMatch"), imported === 0);
  } catch (error) {
    setCommentStatus(t("commentStatus.importFailed", { message: error.message || error }), true);
  }
}

function findRecordForCommentPayload(payload) {
  const sourceType = payload.sourceType || SOURCE_IFC;
  return state.models.find((record) => record.fileKey === payload.fileKey && (record.sourceType || SOURCE_IFC) === sourceType) ||
    state.models.find((record) => record.name === payload.fileName && (record.sourceType || SOURCE_IFC) === sourceType) ||
    null;
}

function mergeComments(record, comments) {
  const existingById = new Map(record.comments.map((comment) => [comment.id, comment]));
  for (const comment of comments) {
    existingById.set(comment.id, comment);
  }
  const next = Array.from(existingById.values()).sort((a, b) =>
    String(a.createdAt).localeCompare(String(b.createdAt)));
  const imported = Math.max(0, next.length - record.comments.length);
  record.comments = next;
  return imported;
}

function captureViewContext(activeRecord = getActiveRecord()) {
  return {
    format: "ifc-review-view-context",
    version: 1,
    capturedAt: new Date().toISOString(),
    camera: {
      position: vectorToArray(state.camera.position),
      target: vectorToArray(state.controls.target),
      near: state.camera.near,
      far: state.camera.far,
      fov: state.view.fov,
      projectionMode: state.view.projectionMode
    },
    view: { ...state.view },
    edges: { ...state.edges },
    helpers: {
      showGrid: state.showGrid,
      showLevels: state.showLevels,
      showSpaces: state.showSpaces,
      showSpaceNames: state.showSpaceNames,
      showCommentHighlights: state.showCommentHighlights
    },
    section: {
      enabled: state.section.enabled,
      showHandles: state.section.showHandles,
      showGuide: state.section.showGuide,
      mode: state.section.mode,
      axis: state.section.axis,
      ratio: state.section.ratio,
      rotationDeg: state.section.rotationDeg,
      box: { ...state.section.box }
    },
    activeModel: activeRecord ? modelViewIdentity(activeRecord) : null,
    selection: getSelectedRecord() ? {
      model: modelViewIdentity(getSelectedRecord()),
      expressID: state.selectedExpressID
    } : null
  };
}

function exportViewState() {
  if (state.models.length === 0) {
    return;
  }
  const payload = {
    format: "ifc-review-view-state",
    version: 1,
    exportedAt: new Date().toISOString(),
    context: captureViewContext(),
    models: state.models.map((record) => ({
      ...modelViewIdentity(record),
      enabled: record.enabled,
      display: clonePlain(record.display),
      categories: Array.from(record.categoryMap.values()).map((item) => ({
        name: item.name,
        visible: item.visible
      })),
      levels: Array.from(record.levelMap.values()).map((item) => ({
        name: item.name,
        visible: item.visible
      }))
    }))
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ifc-review-view-state.json";
  link.click();
  URL.revokeObjectURL(url);
  setStatus(t("viewState.exported"));
}

async function importViewState(file) {
  try {
    const payload = JSON.parse(await file.text());
    const models = Array.isArray(payload.models) ? payload.models : [];
    let restored = 0;
    for (const saved of models) {
      const record = findRecordForViewState(saved);
      if (!record) {
        continue;
      }
      restoreRecordViewState(record, saved);
      restored++;
    }
    restoreViewContext(payload.context || payload.viewContext || payload);
    renderAll();
    setStatus(t("viewState.imported", { count: restored }));
  } catch (error) {
    setStatus(t("viewState.importFailed", { message: error.message || error }), true);
  }
}

function restoreRecordViewState(record, saved) {
  record.enabled = saved.enabled !== false;
  if (saved.display && typeof saved.display === "object") {
    record.display = {
      ...record.display,
      ...saved.display,
      offset: {
        ...record.display.offset,
        ...(saved.display.offset || {})
      }
    };
  }
  for (const item of saved.categories || []) {
    const category = record.categoryMap.get(item.name);
    if (category) {
      category.visible = item.visible !== false;
    }
  }
  for (const item of saved.levels || []) {
    const level = record.levelMap.get(item.name);
    if (level) {
      level.visible = item.visible !== false;
    }
  }
  applyVisibility(record);
}

function restoreViewContext(context) {
  const normalized = normalizeViewContext(context);
  if (!normalized) {
    return;
  }
  if (normalized.view) {
    state.view = {
      ...state.view,
      ...normalized.view
    };
    setProjectionMode(state.view.projectionMode);
    applyProjectionSettings();
    applyViewAppearance();
  }
  if (normalized.edges) {
    state.edges = {
      ...state.edges,
      ...normalized.edges
    };
    syncEdgeControls();
    updateAllEdgeOverlays();
  }
  if (normalized.helpers) {
    state.showGrid = normalized.helpers.showGrid !== false;
    state.showLevels = normalized.helpers.showLevels === true;
    state.showSpaces = normalized.helpers.showSpaces === true;
    state.showSpaceNames = normalized.helpers.showSpaceNames === true;
    if (state.showSpaceNames) {
      state.showSpaces = true;
    }
    state.showCommentHighlights = normalized.helpers.showCommentHighlights !== false;
    elements.gridToggle.checked = state.showGrid;
    elements.levelToggle.checked = state.showLevels;
  }
  if (normalized.section) {
    state.section.enabled = normalized.section.enabled === true;
    state.section.showHandles = normalized.section.showHandles !== false;
    state.section.showGuide = normalized.section.showGuide !== false;
    state.section.mode = normalized.section.mode === "plane" ? "plane" : "box";
    state.section.axis = ["x", "y", "z"].includes(normalized.section.axis) ? normalized.section.axis : "y";
    state.section.ratio = clampNumber(normalized.section.ratio, 0, 100, 50);
    state.section.rotationDeg = normalizeDegrees(Number(normalized.section.rotationDeg) || 0);
    state.section.box = {
      ...state.section.box,
      ...(normalized.section.box || {})
    };
  }
  if (normalized.camera) {
    state.camera.position.fromArray(normalized.camera.position || vectorToArray(state.camera.position));
    state.controls.target.fromArray(normalized.camera.target || vectorToArray(state.controls.target));
    state.camera.near = Number(normalized.camera.near) || state.camera.near;
    state.camera.far = Number(normalized.camera.far) || state.camera.far;
    state.camera.fov = Number(normalized.camera.fov) || state.camera.fov;
    state.camera.updateProjectionMatrix();
    state.controls.update();
  }
  if (normalized.activeModel) {
    const active = findRecordForViewState(normalized.activeModel);
    if (active) {
      state.activeModelKey = active.key;
    }
  }
  for (const record of state.models) {
    if (isIfcRecord(record)) {
      applyVisibility(record);
    }
  }
  updateReferenceGrid();
  refreshSceneOverlays();
  updateClipping();
  renderAll();
}

function renderAll() {
  renderFileSummary();
  renderModelList();
  renderActiveModelSettings();
  renderCategoryControls();
  renderLevelControls();
  renderSelection();
  renderComments();
  renderFindings();
  updateMeasurementUi();
  updateCameraCoordinateDisplay();
  updateSectionControls();
  syncSmartClipControls();
  syncAttributeColorControls();
  syncSpaceInteriorControls();
  syncEdgeControls();
  syncPopouts();
  syncPropertyInfoVisibility();
  syncPanelCollapseButtons();
  updateActions();
}

function togglePopout(name) {
  if (!name) {
    return;
  }
  if (name === "clip" && !state.clipMenuAutoEnabled) {
    enableClipping();
    state.clipMenuAutoEnabled = true;
  }
  if (state.openPopouts.has(name)) {
    state.openPopouts.delete(name);
  } else {
    state.openPopouts.add(name);
  }
  syncPopouts();
}

function enableClipping() {
  if (state.section.enabled) {
    return;
  }
  state.section.enabled = true;
  resetClippingToSafeBoxMode();
  elements.sectionToggle.checked = true;
  updateClipping();
  updateActions();
}

function initCollapsiblePanels() {
  const panels = Array.from(document.querySelectorAll(".popout-panel"));
  panels.forEach((panel, index) => {
    panel.dataset.panelKey = panel.dataset.panelKey || `${panel.dataset.popout || "panel"}-${index}`;
    panel.dataset.panelWindowKey = panel.dataset.panelWindowKey || panel.dataset.panelKey;
    let titleRow = panel.querySelector(":scope > .section-title-row");
    const directHeading = panel.querySelector(":scope > h2");
    if (!titleRow && directHeading) {
      titleRow = el("div", "section-title-row");
      panel.insertBefore(titleRow, directHeading);
      titleRow.append(directHeading);
    }
    if (!titleRow) {
      return;
    }
    const heading = titleRow.querySelector("h2");
    if (heading && heading.dataset.i18n) {
      panel.dataset.panelWindowTitleI18n = heading.dataset.i18n;
    }
    if (!titleRow.querySelector(".panel-window-button")) {
      const windowButton = document.createElement("button");
      windowButton.type = "button";
      windowButton.className = "panel-window-button";
      windowButton.addEventListener("click", (event) => {
        event.stopPropagation();
        togglePaneWindow(panel);
      });
      titleRow.append(windowButton);
    }
    if (titleRow.querySelector(".panel-collapse-button")) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "panel-collapse-button";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePanelCollapse(panel);
    });
    titleRow.append(button);
  });
  syncPanelCollapseButtons();
}

function togglePanelCollapse(panel) {
  const key = panel.dataset.panelKey;
  if (!key) {
    return;
  }
  if (state.collapsedPanels.has(key)) {
    state.collapsedPanels.delete(key);
    panel.classList.remove("is-collapsed");
  } else {
    state.collapsedPanels.add(key);
    panel.classList.add("is-collapsed");
  }
  syncPanelCollapseButtons();
  syncEdgeControls();
}

function syncPanelCollapseButtons() {
  for (const panel of allWindowablePanes()) {
    const collapsed = state.collapsedPanels.has(panel.dataset.panelKey);
    panel.classList.toggle("is-collapsed", collapsed);
    const windowButton = panel.querySelector(":scope > .section-title-row .panel-window-button, :scope > .section-title-row #selectionPanePopoutButton");
    if (windowButton) {
      const isWindowed = isPaneWindowed(panel);
      windowButton.textContent = isWindowed ? t("ui.dockPane") : t("ui.popOut");
      windowButton.title = isWindowed ? t("ui.dockPane") : t("ui.popOut");
      windowButton.setAttribute("aria-pressed", String(isWindowed));
    }
    const button = panel.querySelector(":scope > .section-title-row .panel-collapse-button");
    if (!button) {
      continue;
    }
    button.textContent = collapsed ? "+" : "-";
    const label = collapsed ? t("ui.expandPane") : t("ui.collapsePane");
    button.title = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-expanded", String(!collapsed));
  }
}

function syncPopouts() {
  for (const panel of document.querySelectorAll("[data-popout]")) {
    panel.classList.toggle("is-open", state.openPopouts.has(panel.dataset.popout));
  }
  document.querySelector(".side-panel").classList.toggle("has-open", state.openPopouts.size > 0);
  for (const button of elements.popoutToggleButtons) {
    button.classList.toggle("primary", state.openPopouts.has(button.dataset.popoutTarget));
  }
  syncPanelCollapseButtons();
}

function allWindowablePanes() {
  const panes = Array.from(document.querySelectorAll(".popout-panel"));
  if (elements.floatingSelectionPane) {
    panes.push(elements.floatingSelectionPane);
  }
  for (const entry of state.panelWindows.values()) {
    if (entry.pane && !panes.includes(entry.pane)) {
      panes.push(entry.pane);
    }
  }
  return panes;
}

function paneWindowKey(pane) {
  if (!pane) {
    return "";
  }
  pane.dataset.panelWindowKey = pane.dataset.panelWindowKey || pane.dataset.panelKey || createId();
  return pane.dataset.panelWindowKey;
}

function paneWindowTitle(pane) {
  if (!pane) {
    return "";
  }
  const key = pane.dataset.panelWindowTitleI18n;
  if (key) {
    return t(key);
  }
  const heading = pane.querySelector(":scope h2");
  return heading ? heading.textContent.trim() : t("ui.settings");
}

function isPaneWindowed(pane) {
  const key = paneWindowKey(pane);
  const entry = key ? state.panelWindows.get(key) : null;
  return Boolean(entry && entry.window && !entry.window.closed);
}

function togglePaneWindow(pane) {
  if (!pane) {
    return;
  }
  const key = paneWindowKey(pane);
  if (state.panelWindows.has(key)) {
    dockPaneWindow(key);
  } else {
    openPaneWindow(pane);
  }
}

function openPaneWindow(pane) {
  const key = paneWindowKey(pane);
  const existing = state.panelWindows.get(key);
  if (existing && existing.window && !existing.window.closed) {
    existing.window.focus();
    return true;
  }
  const title = paneWindowTitle(pane);
  const features = "popup=yes,width=520,height=720,left=80,top=80,resizable=yes,scrollbars=yes";
  const paneWindow = window.open("", `IFCReviewViewerPane_${key}`, features);
  if (!paneWindow) {
    setStatus(t("panel.windowBlocked", { title }), true);
    return false;
  }

  const placeholder = document.createElement("div");
  placeholder.className = "pane-window-placeholder";
  placeholder.textContent = t("panel.openInSeparateWindow", { title });
  pane.parentNode.insertBefore(placeholder, pane);

  paneWindow.document.open();
  paneWindow.document.write("<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title></title></head><body class=\"panel-window-body\"><main id=\"panelWindowHost\"></main></body></html>");
  paneWindow.document.close();
  paneWindow.document.title = title;
  const stylesheet = document.querySelector("link[rel='stylesheet']");
  if (stylesheet && stylesheet.href) {
    const link = paneWindow.document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylesheet.href;
    paneWindow.document.head.appendChild(link);
  }
  const style = paneWindow.document.createElement("style");
  style.textContent = "html{min-width:0;min-height:100%;overflow:auto}.panel-window-body{min-width:0;min-height:100vh;margin:0;padding:12px;background:#edf1f4;overflow:auto}.panel-window-body #panelWindowHost{display:grid;gap:12px;min-width:min-content}.panel-window-body .popout-panel,.panel-window-body .floating-selection-pane{position:static;display:grid!important;width:max-content;min-width:100%;max-width:none;max-height:none;margin:0;overflow:visible}.panel-window-body .panel-section,.panel-window-body .floating-selection-pane{box-shadow:none}.panel-window-body .record-filter-list,.panel-window-body .control-list,.panel-window-body .model-settings,.panel-window-body .comment-list,.panel-window-body .finding-list,.panel-window-body .measurement-result-list{max-height:none;overflow:visible}.panel-window-body .pane-window-placeholder{display:none}";
  paneWindow.document.head.appendChild(style);
  pane.classList.add("is-windowed", "is-open");
  paneWindow.document.getElementById("panelWindowHost").appendChild(pane);

  const entry = {
    pane,
    window: paneWindow,
    placeholder,
    title,
    closing: false,
    poll: 0
  };
  state.panelWindows.set(key, entry);
  paneWindow.addEventListener("beforeunload", () => dockPaneWindow(key, { fromWindow: true }));
  entry.poll = window.setInterval(() => {
    const current = state.panelWindows.get(key);
    if (current && current.window.closed) {
      dockPaneWindow(key, { fromWindow: true });
    }
  }, 800);
  applyLanguage();
  syncPopouts();
  paneWindow.focus();
  return true;
}

function dockPaneWindow(key, options = {}) {
  const entry = state.panelWindows.get(key);
  if (!entry || entry.closing) {
    return;
  }
  entry.closing = true;
  if (entry.poll) {
    window.clearInterval(entry.poll);
  }
  const pane = entry.pane;
  pane.classList.remove("is-windowed");
  if (entry.placeholder && entry.placeholder.parentNode) {
    entry.placeholder.parentNode.insertBefore(pane, entry.placeholder);
    entry.placeholder.remove();
  } else {
    const fallback = pane.classList.contains("floating-selection-pane")
      ? elements.dropZone
      : document.querySelector(".side-panel");
    if (fallback) {
      fallback.appendChild(pane);
    }
  }
  state.panelWindows.delete(key);
  if (!options.fromWindow && entry.window && !entry.window.closed) {
    entry.window.close();
  }
  applyLanguage();
  syncPopouts();
}

function renderFileSummary() {
  if (state.models.length === 0) {
    elements.fileSummary.textContent = t("summary.noIfc");
    elements.emptyState.classList.remove("is-hidden");
    return;
  }

  elements.emptyState.classList.add("is-hidden");
  const totalSize = state.models.reduce((sum, record) => sum + record.file.size, 0);
  const comments = totalCommentCount();
  elements.fileSummary.textContent = t("summary.loaded", {
    count: state.models.length,
    size: formatBytes(totalSize),
    comments
  });
}

function renderModelList() {
  elements.modelCount.textContent = String(state.models.length);
  elements.modelList.innerHTML = "";
  elements.modelList.classList.toggle("empty", state.models.length === 0);
  if (state.models.length === 0) {
    elements.modelList.textContent = t("model.none");
    return;
  }

  for (const record of state.models) {
    const row = el("div", "control-row model-row");
    row.classList.toggle("is-active", record.key === state.activeModelKey);
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.addEventListener("click", () => {
      state.activeModelKey = record.key;
      renderAll();
    });
    row.addEventListener("keydown", (event) => {
      if (event.target !== row) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        state.activeModelKey = record.key;
        renderAll();
      }
    });

    const main = el("div", "model-row-main");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = record.enabled;
    checkbox.setAttribute("aria-label", t("model.visible"));
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    checkbox.addEventListener("change", () => {
      record.enabled = checkbox.checked;
      state.activeModelKey = record.key;
      applyVisibility(record);
      afterVisibilityChange();
    });

    const text = el("span", "", `${modelTypeLabel(record)} / ${t("model.elements", { name: record.name, count: record.allExpressIDs.length })}`);
    main.append(checkbox, text);

    const actions = el("div", "row-actions");
    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.textContent = record.key === state.activeModelKey ? t("model.selected") : t("ui.settings");
    settingsButton.classList.toggle("primary", record.key === state.activeModelKey);
    settingsButton.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeModelKey = record.key;
      renderAll();
    });
    const zoomButton = document.createElement("button");
    zoomButton.type = "button";
    zoomButton.textContent = t("ui.zoom");
    zoomButton.disabled = !record.enabled;
    zoomButton.addEventListener("click", (event) => {
      event.stopPropagation();
      state.activeModelKey = record.key;
      fitRecordToView(record);
      renderAll();
    });
    actions.append(settingsButton, zoomButton);
    row.append(main, actions);
    elements.modelList.append(row);
  }
}

function renderActiveModelSettings() {
  const record = getActiveRecord() || state.models[0] || null;
  elements.activeModelSettings.innerHTML = "";
  elements.activeModelSettings.classList.toggle("empty", !record);
  if (!record) {
    elements.activeModelSettings.textContent = t("model.noActive");
    return;
  }

  state.activeModelKey = record.key;
  const title = el("div", "model-settings-title", record.name);
  const visibility = el("label", "check-row control-row");
  const visibilityCheckbox = document.createElement("input");
  visibilityCheckbox.type = "checkbox";
  visibilityCheckbox.checked = record.enabled;
  visibilityCheckbox.addEventListener("change", () => {
    record.enabled = visibilityCheckbox.checked;
    applyVisibility(record);
    afterVisibilityChange();
  });
  visibility.append(visibilityCheckbox, el("span", "", t("model.visible")));

  const opacityField = el("label", "field compact-field");
  const opacityLabel = el("span", "", t("model.opacity", { value: record.display.opacity }));
  const opacityRange = document.createElement("input");
  opacityRange.type = "range";
  opacityRange.min = "5";
  opacityRange.max = "100";
  opacityRange.value = String(record.display.opacity);
  opacityRange.addEventListener("input", () => {
    record.display.opacity = Number(opacityRange.value);
    opacityLabel.textContent = t("model.opacity", { value: record.display.opacity });
    applyRecordAppearance(record);
  });
  opacityField.append(opacityLabel, opacityRange);

  const colorModeField = el("label", "field compact-field");
  colorModeField.append(el("span", "", t("model.colorMode")));
  const colorModeSelect = document.createElement("select");
  for (const [value, labelKey] of [
    ["original", "model.colorOriginal"],
    ["single", "model.colorSingle"],
    ["category", "model.colorCategory"],
    ["level", "model.colorLevel"]
  ]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = t(labelKey);
    colorModeSelect.append(option);
  }
  colorModeSelect.value = normalizeColorMode(record.display.colorMode);
  colorModeSelect.addEventListener("change", () => {
    record.display.colorMode = normalizeColorMode(colorModeSelect.value);
    applyVisibility(record);
    refreshSceneOverlays();
    renderAll();
  });
  colorModeField.append(colorModeSelect);

  const colorField = el("label", "field compact-field");
  colorField.append(el("span", "", t("model.tintColor")));
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = record.display.tintColor;
  colorInput.addEventListener("input", () => {
    record.display.tintColor = colorInput.value;
    record.display.colorMode = "single";
    colorModeSelect.value = "single";
    applyRecordAppearance(record);
  });
  colorField.append(colorInput);

  const offsetGroup = el("div", "model-offset-grid");
  offsetGroup.append(el("div", "model-setting-label", t("model.offset")));
  for (const axis of ["x", "y", "z"]) {
    const field = el("label", "field compact-field");
    field.append(el("span", "", t(`model.offset${axis.toUpperCase()}`)));
    const input = document.createElement("input");
    input.type = "number";
    input.step = "1";
    input.value = formatOffsetInput(record.display.offset[axis]);
    input.addEventListener("change", () => {
      record.display.offset[axis] = Number(input.value) || 0;
      input.value = formatOffsetInput(record.display.offset[axis]);
      applyRecordTransform(record);
      refreshSceneOverlays();
      updateReferenceGrid();
      updateClipping();
      renderAll();
    });
    field.append(input);
    offsetGroup.append(field);
  }

  const resetButton = modelActionButton(t("model.resetAppearance"), () => {
    record.display.opacity = 100;
    record.display.colorMode = "original";
    record.display.tintColor = "#7f9fb5";
    record.display.offset = { x: 0, y: 0, z: 0 };
    applyVisibility(record);
    applyRecordTransform(record);
    refreshSceneOverlays();
    updateReferenceGrid();
    updateClipping();
    renderAll();
  });

  const legend = renderModelColorLegend(record);
  const categoryControls = renderRecordFilterControls({
    record,
    type: "category",
    title: t("model.categoryControls"),
    emptyText: t("model.noCategories")
  });
  const levelControls = renderRecordFilterControls({
    record,
    type: "level",
    title: t("model.levelControls"),
    emptyText: t("model.noLevels")
  });
  elements.activeModelSettings.append(
    title,
    visibility,
    opacityField,
    colorModeField,
    colorField,
    offsetGroup,
    legend,
    categoryControls,
    levelControls,
    resetButton
  );
}

function modelActionButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderModelColorLegend(record) {
  const legend = el("div", "model-color-legend");
  if (!usesGeneratedColorSubsets(record)) {
    legend.classList.add("empty");
    return legend;
  }
  legend.append(el("div", "model-setting-label", t("model.colorLegend")));
  for (const group of colorGroupsForRecord(record).slice(0, 24)) {
    const row = el("div", "legend-row");
    const swatch = el("span", "color-swatch");
    swatch.style.backgroundColor = `#${displayGroupColor(record, group.name).toString(16).padStart(6, "0")}`;
    row.append(swatch, el("span", "", localizedFilterName(group.name)));
    legend.append(row);
  }
  return legend;
}

function renderRecordFilterControls({ record, type, title, emptyText }) {
  const wrapper = el("div", "record-filter-controls");
  const titleRow = el("div", "settings-group-title-row compact-title-row");
  titleRow.append(el("div", "model-setting-label", title));
  const actions = el("div", "mini-actions");
  actions.append(
    modelActionButton(t("ui.showAll"), () => {
      if (type === "level") {
        setRecordLevelVisibility(record, true);
      } else {
        setRecordCategoryVisibility(record, true);
      }
    }),
    modelActionButton(t("ui.hideAll"), () => {
      if (type === "level") {
        setRecordLevelVisibility(record, false);
      } else {
        setRecordCategoryVisibility(record, false);
      }
    })
  );
  titleRow.append(actions);
  wrapper.append(titleRow);
  const groups = type === "level"
    ? Array.from(record.levelMap.values()).sort(compareLevelsHighToLow)
    : Array.from(record.categoryMap.values())
      .sort(compareCategoriesByName);
  if (groups.length === 0) {
    wrapper.append(el("div", "control-list empty", emptyText));
    return wrapper;
  }

  const list = el("div", "record-filter-list");
  list.dataset.scrollKey = `${record.key}:${type}`;
  const showColor = (type === "category" && record.display.colorMode === "category") ||
    (type === "level" && record.display.colorMode === "level");
  for (const group of groups) {
    const label = el("label", "check-row control-row");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = group.visible;
    checkbox.addEventListener("change", () => {
      group.visible = checkbox.checked;
      applyVisibility(record);
      afterVisibilityChange();
    });
    label.append(checkbox);
    if (showColor) {
      const swatch = el("span", "color-swatch");
      swatch.style.backgroundColor = `#${displayGroupColor(record, group.name).toString(16).padStart(6, "0")}`;
      label.append(swatch);
    }
    label.append(
      el("span", "control-name", localizedFilterName(group.name)),
      el("span", "control-count", String(group.ids.length))
    );
    list.append(label);
  }
  wrapper.append(list);
  return wrapper;
}

function renderCategoryControls() {
  renderAggregatedControls({
    container: elements.categoryList,
    entries: aggregateCategories(),
    emptyText: t("filters.noCategories"),
    onChange: setCategoryVisibility
  });
}

function renderLevelControls() {
  renderAggregatedControls({
    container: elements.levelList,
    entries: aggregateLevels(),
    emptyText: t("filters.noLevels"),
    onChange: setLevelVisibility
  });
}

function renderAggregatedControls({ container, entries, emptyText, onChange }) {
  container.innerHTML = "";
  container.classList.toggle("empty", entries.length === 0);
  if (entries.length === 0) {
    container.textContent = emptyText;
    return;
  }

  for (const entry of entries) {
    const label = el("label", "check-row control-row");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = entry.visibleCount === entry.modelCount;
    checkbox.indeterminate = entry.visibleCount > 0 && entry.visibleCount < entry.modelCount;
    checkbox.addEventListener("change", () => onChange(entry.name, checkbox.checked));
    label.append(checkbox);
    label.append(
      el("span", "control-name", localizedFilterName(entry.name)),
      el("span", "control-count", String(entry.count))
    );
    container.append(label);
  }
}

function aggregateCategories() {
  const map = new Map();
  for (const record of state.models) {
    for (const category of record.categoryMap.values()) {
      const entry = map.get(category.name) || {
        name: category.name,
        count: 0,
        modelCount: 0,
        visibleCount: 0
      };
      entry.count += category.ids.length;
      entry.modelCount++;
      if (category.visible) {
        entry.visibleCount++;
      }
      map.set(category.name, entry);
    }
  }
  return Array.from(map.values()).sort(compareCategoriesByName);
}

function aggregateLevels() {
  const map = new Map();
  for (const record of state.models) {
    for (const level of record.levelMap.values()) {
      const entry = map.get(level.name) || {
        name: level.name,
        count: 0,
        modelCount: 0,
        visibleCount: 0
      };
      entry.count += level.ids.length;
      entry.modelCount++;
      if (level.visible) {
        entry.visibleCount++;
      }
      map.set(level.name, entry);
    }
  }
  return Array.from(map.values()).sort(compareLevelsHighToLow);
}

function renderSelection() {
  const selected = Boolean(getSelectedRecord()) && state.selectedExpressID !== null;
  if (elements.floatingSelectionPane) {
    elements.floatingSelectionPane.classList.toggle("is-hidden", !state.showPropertyInfo);
  }
  elements.selectionSummary.classList.toggle("empty", !selected);

  if (!selected) {
    elements.selectionSummary.textContent = t("selection.none");
    elements.propertyList.innerHTML = "";
    return;
  }

  const record = getSelectedRecord();
  const title = displayNameFromProperties(state.selectedProperties) || elementLabel(record, state.selectedExpressID);
  const ifcType = stringValue(state.selectedProperties && state.selectedProperties.IfcType);
  const globalId = stringValue(state.selectedProperties && state.selectedProperties.GlobalId);
  elements.selectionSummary.innerHTML = "";
  elements.selectionSummary.append(
    el("div", "selection-title", title),
    el("div", "selection-meta", `${record.name} / ${ifcType || modelElementTypeLabel(record)} / ${elementLabel(record, state.selectedExpressID)}`),
    el("div", "selection-meta", globalId ? `GlobalId: ${globalId}` : "GlobalId: -")
  );

  elements.propertyList.innerHTML = "";
  for (const [key, value] of selectedPropertyRows(state.selectedProperties)) {
    const row = el("div", "property-row");
    row.append(el("div", "property-key", key), el("div", "property-value", value));
    elements.propertyList.append(row);
  }
}

function selectedPropertyRows(properties) {
  if (!properties) {
    return [];
  }
  const preferred = [
    "File", "Category", "Level", "IfcType", "StBridgeElement", "MemberId", "GlobalId",
    "Name", "KindStructure", "Section", "SectionId", "SteelShape",
    "ObjectType", "Tag", "Description", "PredefinedType"
  ];
  const rows = [];
  for (const key of preferred) {
    const value = stringValue(properties[key]);
    if (value) {
      rows.push([localizedPropertyKey(key), localizedPropertyValue(key, value)]);
    }
  }
  for (const [key, rawValue] of Object.entries(properties)) {
    if (preferred.includes(key) || key === "expressID" || key === "type") {
      continue;
    }
    const value = stringValue(rawValue);
    if (value && rows.length < 28) {
      rows.push([key, value]);
    }
  }
  return rows;
}

function renderComments() {
  const selectedRecord = getSelectedRecord();
  const selectedComments = !selectedRecord || state.selectedExpressID === null
    ? []
    : selectedRecord.comments
      .filter((comment) => isElementComment(comment) && Number(comment.expressID) === state.selectedExpressID)
      .map((comment) => ({ comment, record: selectedRecord }));

  const allComments = state.models.flatMap((record) =>
    record.comments.map((comment) => ({ comment, record })));

  elements.selectedCommentCount.textContent = String(selectedComments.length);
  elements.allCommentCount.textContent = String(allComments.length);
  renderCommentList(elements.selectedCommentList, selectedComments);
  renderCommentList(elements.allCommentList, allComments);
}

function renderCommentList(container, items) {
  container.innerHTML = "";
  container.classList.toggle("empty", items.length === 0);
  if (items.length === 0) {
    container.textContent = t("comment.none");
    return;
  }

  for (const itemInfo of items.slice().sort((a, b) => sortNewestFirst(a.comment, b.comment))) {
    const { comment, record } = itemInfo;
    const isElementScoped = isElementComment(comment);
    const item = document.createElement("div");
    item.className = "comment-item";
    if (isElementScoped) {
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.classList.toggle("is-selected",
        record.key === state.selectedModelKey && Number(comment.expressID) === state.selectedExpressID);
      item.addEventListener("click", () => selectElement(record, Number(comment.expressID), { fit: true }));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectElement(record, Number(comment.expressID), { fit: true });
        }
      });
    }

    const name = commentTitle(comment);
    item.append(
      el("div", "selection-title", name),
      el("div", "comment-meta", commentMeta(comment, record)),
      el("div", "comment-body", comment.body),
      el("div", "comment-meta", `${comment.author} / ${formatDateTime(comment.createdAt)}`)
    );

    const actions = el("div", "comment-actions");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-comment-button";
    deleteButton.textContent = t("ui.delete");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteComment(record.key, comment.id);
    });
    if (comment.viewContext) {
      const restoreButton = document.createElement("button");
      restoreButton.type = "button";
      restoreButton.textContent = t("viewState.restoreView");
      restoreButton.addEventListener("click", (event) => {
        event.stopPropagation();
        restoreViewContext(comment.viewContext);
      });
      actions.append(restoreButton);
    }
    actions.append(deleteButton);
    item.append(actions);
    container.append(item);
  }
}

function isElementComment(comment) {
  return normalizeCommentScope(comment && comment.scope) === "element" &&
    hasFiniteExpressID(comment && comment.expressID);
}

function hasFiniteExpressID(value) {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
}

function commentTitle(comment) {
  if (isElementComment(comment)) {
    return comment.name || `Element ${comment.expressID}`;
  }
  if (normalizeCommentScope(comment && comment.scope) === "department") {
    return `${t("comment.targetDepartment")}: ${comment.department || comment.name || "-"}`;
  }
  return t("comment.targetModel");
}

function commentMeta(comment, record) {
  if (isElementComment(comment)) {
    return `${record.name} / ${comment.ifcType || modelElementTypeLabel(record)} / ${elementLabel(record, comment.expressID)}`;
  }
  if (normalizeCommentScope(comment && comment.scope) === "department") {
    return `${record.name} / ${t("comment.targetDepartment")}: ${comment.department || comment.name || "-"}`;
  }
  return `${record.name} / ${t("comment.targetModel")}`;
}

function saveFinding() {
  const title = elements.findingTitle.value.trim();
  const body = elements.findingBody.value.trim();
  if (!title && !body) {
    elements.findingStatus.textContent = t("finding.needBody");
    elements.findingStatus.classList.add("is-error");
    return;
  }
  const record = getSelectedRecord();
  const hasSelection = Boolean(record && state.selectedExpressID !== null);
  const author = elements.authorInput.value.trim() || t("comment.defaultAuthor");
  const finding = {
    id: createId(),
    title: title || (hasSelection
      ? displayNameFromProperties(state.selectedProperties) || elementLabel(record, state.selectedExpressID)
      : t("comment.targetModel")),
    body,
    severity: normalizeFindingSeverity(elements.findingSeverity.value),
    discipline: elements.findingDiscipline.value.trim(),
    author,
    createdAt: new Date().toISOString(),
    recordKey: hasSelection ? record.key : "",
    modelName: hasSelection ? record.name : "",
    sourceType: hasSelection ? record.sourceType || SOURCE_IFC : "",
    expressID: hasSelection ? Number(state.selectedExpressID) : null,
    globalId: hasSelection ? stringValue(state.selectedProperties && state.selectedProperties.GlobalId) : "",
    ifcType: hasSelection ? stringValue(state.selectedProperties && state.selectedProperties.IfcType) : "",
    elementName: hasSelection ? displayNameFromProperties(state.selectedProperties) : "",
    viewContext: captureViewContext(record || getActiveRecord())
  };
  state.findings.unshift(finding);
  state.selectedFindingId = finding.id;
  writeStoredFindings();
  elements.findingTitle.value = "";
  elements.findingBody.value = "";
  elements.findingStatus.classList.remove("is-error");
  elements.findingStatus.textContent = t("finding.saved");
  renderFindings();
  updateActions();
}

function normalizeFindingSeverity(value) {
  return ["critical", "high", "medium", "low", "info"].includes(value) ? value : "medium";
}

function readStoredFindings() {
  try {
    const payload = JSON.parse(localStorage.getItem(FINDING_STORAGE_KEY) || "[]");
    return Array.isArray(payload) ? payload.filter((item) => item && item.id && item.title) : [];
  } catch {
    return [];
  }
}

function writeStoredFindings() {
  localStorage.setItem(FINDING_STORAGE_KEY, JSON.stringify(state.findings.slice(0, 500)));
}

function renderFindings() {
  elements.findingCount.textContent = String(state.findings.length);
  elements.findingList.innerHTML = "";
  elements.findingList.classList.toggle("empty", state.findings.length === 0);
  elements.findingList.classList.toggle("is-empty", state.findings.length === 0);
  if (state.findings.length === 0) {
    elements.findingList.textContent = t("finding.empty");
    return;
  }
  for (const finding of state.findings) {
    const item = el("div", "finding-item");
    item.tabIndex = 0;
    item.classList.toggle("is-selected", finding.id === state.selectedFindingId);
    item.addEventListener("click", () => selectFinding(finding.id));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectFinding(finding.id);
      }
    });
    const badges = el("div", "finding-badges");
    badges.append(
      el("span", `finding-badge severity-${normalizeFindingSeverity(finding.severity)}`, findingSeverityLabel(finding.severity)),
      el("span", "finding-badge", finding.discipline || "-")
    );
    item.append(
      badges,
      el("div", "selection-title", finding.title || "-"),
      el("div", "comment-body", finding.body || ""),
      el("div", "comment-meta", findingMeta(finding))
    );
    const actions = el("div", "comment-actions");
    if (finding.viewContext) {
      const restoreButton = document.createElement("button");
      restoreButton.type = "button";
      restoreButton.textContent = t("viewState.restoreView");
      restoreButton.addEventListener("click", (event) => {
        event.stopPropagation();
        restoreViewContext(finding.viewContext);
      });
      actions.append(restoreButton);
    }
    if (finding.recordKey && Number.isFinite(Number(finding.expressID))) {
      const zoomButton = document.createElement("button");
      zoomButton.type = "button";
      zoomButton.textContent = t("ui.zoom");
      zoomButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const record = getRecordByKey(finding.recordKey);
        if (record) {
          await selectElement(record, Number(finding.expressID), { fit: true });
        }
      });
      actions.append(zoomButton);
    }
    item.append(actions);
    elements.findingList.append(item);
  }
}

async function selectFinding(findingId) {
  const finding = state.findings.find((item) => item.id === findingId);
  if (!finding) {
    return;
  }
  state.selectedFindingId = finding.id;
  if (finding.recordKey && Number.isFinite(Number(finding.expressID))) {
    const record = getRecordByKey(finding.recordKey);
    if (record) {
      await selectElement(record, Number(finding.expressID), { fit: false });
    }
  }
  renderFindings();
  updateActions();
}

function findingSeverityLabel(value) {
  return t(`finding.severity${capitalizeAscii(normalizeFindingSeverity(value))}`);
}

function findingMeta(finding) {
  const target = finding.modelName
    ? `${finding.modelName}${Number.isFinite(Number(finding.expressID)) ? ` / ${finding.ifcType || modelElementTypeLabel({ sourceType: finding.sourceType })} / ${elementLabel({ sourceType: finding.sourceType }, finding.expressID)}` : ""}`
    : t("comment.targetModel");
  return `${target} / ${finding.author || "-"} / ${formatDateTime(finding.createdAt)}`;
}

function exportBcfFindings(scope) {
  const findings = scope === "selected"
    ? state.findings.filter((item) => item.id === state.selectedFindingId)
    : state.findings.slice();
  if (findings.length === 0) {
    elements.findingStatus.textContent = t("finding.noExport");
    elements.findingStatus.classList.add("is-error");
    return;
  }
  const files = [
    {
      name: "bcf.version",
      content: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Version VersionId=\"2.1\" xmlns=\"http://www.buildingsmart-tech.org/bcf/version\" />\n"
    }
  ];
  for (const finding of findings) {
    const folder = bcfGuid(finding.id);
    const viewpointName = `${folder}/viewpoint.bcfv`;
    files.push({
      name: `${folder}/markup.bcf`,
      content: bcfMarkupXml(finding, "viewpoint.bcfv")
    });
    files.push({
      name: viewpointName,
      content: bcfViewpointXml(finding)
    });
  }
  const blob = createStoredZip(files);
  const suffix = scope === "selected" ? "selected" : "all";
  downloadBlob(blob, `ifc-review-findings-${suffix}.bcfzip`);
  elements.findingStatus.classList.remove("is-error");
  elements.findingStatus.textContent = t("finding.exported");
}

function bcfMarkupXml(finding, viewpointFile) {
  const topicGuid = bcfGuid(finding.id);
  const commentGuid = bcfGuid(`${finding.id}-comment`);
  const viewpointGuid = bcfGuid(`${finding.id}-viewpoint`);
  const labels = finding.discipline
    ? `      <Label>${xmlEscape(finding.discipline)}</Label>\n`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<Markup xmlns="http://www.buildingsmart-tech.org/bcf/2.1">
  <Topic Guid="${topicGuid}" TopicType="Issue" TopicStatus="Open">
    <Title>${xmlEscape(finding.title)}</Title>
    <Priority>${xmlEscape(findingSeverityLabel(finding.severity))}</Priority>
    <CreationDate>${xmlEscape(finding.createdAt)}</CreationDate>
    <CreationAuthor>${xmlEscape(finding.author || "anonymous")}</CreationAuthor>
    <Labels>
${labels}    </Labels>
  </Topic>
  <Comment Guid="${commentGuid}">
    <Date>${xmlEscape(finding.createdAt)}</Date>
    <Author>${xmlEscape(finding.author || "anonymous")}</Author>
    <Comment>${xmlEscape(finding.body || finding.title)}</Comment>
  </Comment>
  <Viewpoints>
    <Viewpoint Guid="${viewpointGuid}" Viewpoint="${xmlEscape(viewpointFile)}" />
  </Viewpoints>
</Markup>
`;
}

function bcfViewpointXml(finding) {
  const context = normalizeViewContext(finding.viewContext || {});
  const camera = context && context.camera || {};
  const position = arrayToVector(camera.position, state.camera ? state.camera.position : new THREE.Vector3(5, 5, 5));
  const target = arrayToVector(camera.target, state.controls ? state.controls.target : new THREE.Vector3());
  const direction = target.clone().sub(position);
  if (direction.lengthSq() < 0.000001) {
    direction.set(1, 0, 0);
  }
  direction.normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const components = finding.globalId
    ? `  <Components>\n    <Selection>\n      <Component IfcGuid="${xmlEscape(finding.globalId)}" />\n    </Selection>\n  </Components>\n`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<VisualizationInfo Guid="${bcfGuid(`${finding.id}-viewpoint`)}" xmlns="http://www.buildingsmart-tech.org/bcf/2.1">
${components} 
  <PerspectiveCamera>
    <CameraViewPoint>
      <X>${bcfNumber(position.x)}</X><Y>${bcfNumber(position.y)}</Y><Z>${bcfNumber(position.z)}</Z>
    </CameraViewPoint>
    <CameraDirection>
      <X>${bcfNumber(direction.x)}</X><Y>${bcfNumber(direction.y)}</Y><Z>${bcfNumber(direction.z)}</Z>
    </CameraDirection>
    <CameraUpVector>
      <X>${bcfNumber(up.x)}</X><Y>${bcfNumber(up.y)}</Y><Z>${bcfNumber(up.z)}</Z>
    </CameraUpVector>
    <FieldOfView>${bcfNumber(camera.fov || state.view.fov || 55)}</FieldOfView>
  </PerspectiveCamera>
</VisualizationInfo>
`;
}

function updateActions() {
  const hasModels = state.models.length > 0;
  const hasSelection = Boolean(getSelectedRecord()) && state.selectedExpressID !== null;
  elements.fitButton.disabled = !hasModels;
  elements.togglePropertyInfoButton.classList.toggle("primary", state.showPropertyInfo);
  elements.spacesButton.disabled = !hasIfcSpaces();
  elements.spacesButton.classList.toggle("primary", state.showSpaces);
  elements.spaceNamesButton.disabled = !hasIfcSpaces();
  elements.spaceNamesButton.classList.toggle("primary", state.showSpaceNames);
  elements.clearSelectionButton.disabled = !hasSelection;
  elements.selectionPaneClearButton.disabled = !hasSelection;
  elements.clearModelsButton.disabled = !hasModels;
  elements.toggleCommentHighlightButton.disabled = !hasModels;
  elements.toggleCommentHighlightButton.classList.toggle("primary", hasModels && state.showCommentHighlights);
  elements.exportCommentsButton.disabled = totalCommentCount() === 0;
  elements.exportCommentedIfcButton.disabled = !getCommentedIfcExportTarget();
  elements.exportViewStateButton.disabled = !hasModels;
  syncCommentScopeControls();
  elements.saveCommentButton.disabled = !canSaveComment();
  elements.showAllCategoriesButton.disabled = aggregateCategories().length === 0;
  elements.hideAllCategoriesButton.disabled = aggregateCategories().length === 0;
  elements.showAllLevelsButton.disabled = aggregateLevels().length === 0;
  elements.hideAllLevelsButton.disabled = aggregateLevels().length === 0;
  elements.sectionToggle.disabled = !hasModels;
  elements.clipGuideToggleButton.disabled = !hasModels || !state.section.enabled;
  elements.clipGuideToggleButton.textContent = state.section.showGuide ? t("clip.hideGuide") : t("clip.showGuide");
  elements.clipGuideToggleButton.classList.toggle("primary", !state.section.showGuide && state.section.enabled);
  elements.clipHandleToggle.disabled = !hasModels || !state.section.enabled || !state.section.showGuide || state.section.mode !== "box";
  elements.clipMode.disabled = !hasModels || !state.section.enabled;
  elements.clipRotationInput.disabled = !hasModels || !state.section.enabled || state.section.mode !== "box";
  elements.alignClipToModelButton.disabled = !hasModels || !state.section.enabled || state.section.mode !== "box";
  elements.sectionAxis.disabled = !hasModels || !state.section.enabled || state.section.mode !== "plane";
  elements.sectionRange.disabled = !hasModels || !state.section.enabled || state.section.mode !== "plane";
  const boxDisabled = !hasModels || !state.section.enabled || state.section.mode !== "box";
  for (const input of clipBoxRangeInputs()) {
    input.disabled = boxDisabled;
  }
  elements.resetClipBoxButton.disabled = boxDisabled;
  elements.measurementModeSelect.disabled = !hasModels || state.measurement.enabled;
  elements.measureToggleButton.disabled = !hasModels;
  elements.measurementUndoButton.disabled = !state.measurement.pendingPoint && state.measurement.records.length === 0;
  elements.measurementClearButton.disabled = !state.measurement.pendingPoint && state.measurement.records.length === 0;
  for (const input of [
    elements.clipLevelFromSelect,
    elements.clipLevelToSelect,
    elements.clipBottomOffsetInput,
    elements.clipTopOffsetInput,
    elements.clipGridXFromSelect,
    elements.clipGridXToSelect,
    elements.clipGridZFromSelect,
    elements.clipGridZToSelect,
    elements.clipGridPaddingInput
  ]) {
    input.disabled = !hasModels;
  }
  elements.applySmartClipButton.disabled = !hasModels;
  const hasSpaces = hasIfcSpaces();
  const selectedSpace = hasSelection && isSelectedSpaceElement();
  elements.spaceInteriorMoveSelectedButton.disabled = !selectedSpace;
  elements.spaceInteriorMoveListedButton.disabled = !hasSpaces || !elements.spaceInteriorSelect.value;
  elements.spaceInteriorSelectListedButton.disabled = !hasSpaces || !elements.spaceInteriorSelect.value;
  elements.exportSelectedBcfButton.disabled = !state.selectedFindingId;
  elements.exportAllBcfButton.disabled = state.findings.length === 0;
  elements.saveFindingButton.disabled = !elements.findingTitle.value.trim() && !elements.findingBody.value.trim();
}

function syncPropertyInfoVisibility() {
  elements.togglePropertyInfoButton.classList.toggle("primary", state.showPropertyInfo);
  if (elements.floatingSelectionPane) {
    elements.floatingSelectionPane.classList.toggle("is-hidden", !state.showPropertyInfo);
  }
  if (!state.showPropertyInfo && !state.showSpaceNames && elements.currentSpaceOverlay) {
    state.currentSpaceSignature = "";
    elements.currentSpaceOverlay.classList.add("is-hidden");
    elements.currentSpaceOverlay.innerHTML = "";
  }
}

function setCommentStatus(message, isError = false, savedLocal = false) {
  elements.commentStatus.textContent = message || "";
  elements.commentStatus.classList.toggle("is-error", isError);
  if (!message) {
    return;
  }
  if (!isError && savedLocal && state.models.length > 0) {
    elements.commentStatus.textContent = `${message} (${t("comment.savedLocalSuffix")})`;
  }
}

function setStatus(message, isError = false) {
  elements.statusBar.textContent = message;
  elements.statusBar.style.color = isError ? "#ba4a2a" : "";
}

function updateCameraCoordinateDisplay() {
  if (!elements.cameraCoordinate) {
    return;
  }
  if (!state.camera) {
    elements.cameraCoordinate.textContent = t("info.noCoordinates");
    return;
  }
  const x = state.camera.position.x * 1000;
  const y = state.camera.position.z * 1000;
  const z = state.camera.position.y * 1000;
  elements.cameraCoordinate.textContent = t("info.coordinates", {
    x: formatCoordinateMm(x),
    y: formatCoordinateMm(y),
    z: formatCoordinateMm(z)
  });
}

function formatCoordinateMm(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return "-";
  }
  return `${Math.round(number).toLocaleString(state.language === "en" ? "en-US" : "ja-JP")} mm`;
}

function getPickableMeshes() {
  return state.models
    .filter((record) => record.enabled)
    .flatMap((record) => {
      if (isStbRecord(record)) {
        return Array.from(record.stbElementsById.values())
          .map((item) => item.mesh)
          .filter((mesh) => mesh && mesh.visible);
      }
      const spaceMeshes = [record.selectedSpaceSubset, record.spaceSubset].filter((mesh) => mesh && mesh.visible);
      const modelMeshes = usesGeneratedColorSubsets(record)
        ? Array.from(record.categoryColorSubsets.values()).map((entry) => entry.subset)
        : [record.visibilitySubset || record.model];
      const attributeMeshes = record.attributeColorSubset ? [record.attributeColorSubset] : [];
      return [...spaceMeshes, ...attributeMeshes, ...modelMeshes];
    })
    .filter((mesh) => mesh && mesh.visible);
}

function updateCurrentSpaceOverlay() {
  if (!elements.currentSpaceOverlay) {
    return;
  }
  if (!shouldShowCurrentSpaceOverlay()) {
    state.currentSpaceSignature = "";
    elements.currentSpaceOverlay.classList.add("is-hidden");
    elements.currentSpaceOverlay.innerHTML = "";
    elements.currentSpaceOverlay.removeAttribute("tabindex");
    elements.currentSpaceOverlay.removeAttribute("role");
    elements.currentSpaceOverlay.removeAttribute("data-record-key");
    elements.currentSpaceOverlay.removeAttribute("data-express-id");
    return;
  }
  const space = currentIfcSpaceAtCamera();
  if (!space) {
    state.currentSpaceSignature = "";
    elements.currentSpaceOverlay.classList.add("is-hidden");
    elements.currentSpaceOverlay.innerHTML = "";
    elements.currentSpaceOverlay.removeAttribute("tabindex");
    elements.currentSpaceOverlay.removeAttribute("role");
    elements.currentSpaceOverlay.removeAttribute("data-record-key");
    elements.currentSpaceOverlay.removeAttribute("data-express-id");
    return;
  }

  const signature = `${state.language}:${space.record.key}:${space.expressID}`;
  if (state.currentSpaceSignature === signature) {
    return;
  }
  state.currentSpaceSignature = signature;
  elements.currentSpaceOverlay.dataset.recordKey = space.record.key;
  elements.currentSpaceOverlay.dataset.expressId = String(space.expressID);
  elements.currentSpaceOverlay.title = t("space.currentClickTitle");
  elements.currentSpaceOverlay.setAttribute("role", "button");
  elements.currentSpaceOverlay.setAttribute("tabindex", "0");
  elements.currentSpaceOverlay.setAttribute("aria-label", `${t("space.current")}: ${space.name}`);
  elements.currentSpaceOverlay.innerHTML = "";
  elements.currentSpaceOverlay.append(
    el("div", "space-caption", t("space.current")),
    el("div", "space-title", space.name),
    el("div", "space-meta", `${space.record.name} / ${space.level || "-"}`),
    el("div", "space-meta", space.globalId ? `GlobalId: ${space.globalId}` : `Express ID ${space.expressID}`)
  );
  elements.currentSpaceOverlay.classList.remove("is-hidden");
}

function shouldShowCurrentSpaceOverlay() {
  return state.showSpaceNames || state.showPropertyInfo;
}

async function selectSpaceFromOverlay(record, expressID) {
  const space = record && record.spatialElementsById && record.spatialElementsById.get(Number(expressID));
  if (!space) {
    return;
  }
  state.showPropertyInfo = true;
  await selectElement(record, expressID, { fit: false });
  syncPropertyInfoVisibility();
  setStatus(t("space.selected", { name: space.name || `IfcSpace ${expressID}` }));
}

function syncSpaceInteriorControls() {
  const options = allSpaceInteriorOptions();
  const current = elements.spaceInteriorSelect.value || "";
  elements.spaceInteriorSelect.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = options.length ? t("spaceInterior.selectPlaceholder") : t("spaceInterior.noSpaces");
  elements.spaceInteriorSelect.append(empty);
  let hasCurrent = current === "";
  for (const optionInfo of options) {
    const option = document.createElement("option");
    option.value = optionInfo.value;
    option.textContent = optionInfo.label;
    if (option.value === current) {
      hasCurrent = true;
    }
    elements.spaceInteriorSelect.append(option);
  }
  elements.spaceInteriorSelect.value = hasCurrent ? current : "";
  if (!options.length) {
    elements.spaceInteriorStatus.textContent = t("spaceInterior.statusEmpty");
  }
}

function allSpaceInteriorOptions() {
  const options = [];
  for (const record of state.models) {
    if (!isIfcRecord(record) || !record.spatialElementsById) {
      continue;
    }
    for (const space of record.spatialElementsById.values()) {
      options.push({
        value: spaceInteriorValue(record, space.expressID),
        record,
        expressID: space.expressID,
        label: `${space.name || `IfcSpace ${space.expressID}`} / ${space.level || "-"} / ${record.name}`
      });
    }
  }
  return options.sort((left, right) => left.label.localeCompare(right.label, state.language === "en" ? "en" : "ja", {
    numeric: true,
    sensitivity: "base"
  }));
}

function spaceInteriorValue(record, expressID) {
  return `${record.key}::${Number(expressID)}`;
}

function parseSpaceInteriorValue(value) {
  const [recordKey, rawId] = String(value || "").split("::");
  const expressID = Number(rawId);
  const record = getRecordByKey(recordKey);
  if (!record || !Number.isFinite(expressID)) {
    return null;
  }
  const space = record.spatialElementsById && record.spatialElementsById.get(expressID);
  return space ? { record, expressID, space } : null;
}

function moveCameraToSelectedSpace() {
  const record = getSelectedRecord();
  if (!record || !isIfcSpaceElement(record, state.selectedExpressID)) {
    elements.spaceInteriorStatus.textContent = t("spaceInterior.statusEmpty");
    return;
  }
  moveCameraInsideSpace(record, Number(state.selectedExpressID));
}

function moveCameraToListedSpace() {
  const target = parseSpaceInteriorValue(elements.spaceInteriorSelect.value);
  if (!target) {
    elements.spaceInteriorStatus.textContent = t("spaceInterior.statusEmpty");
    return;
  }
  moveCameraInsideSpace(target.record, target.expressID);
}

async function selectListedSpace() {
  const target = parseSpaceInteriorValue(elements.spaceInteriorSelect.value);
  if (!target) {
    elements.spaceInteriorStatus.textContent = t("spaceInterior.statusEmpty");
    return;
  }
  await selectElement(target.record, target.expressID, { fit: false });
  state.showPropertyInfo = true;
  syncPropertyInfoVisibility();
  elements.spaceInteriorStatus.textContent = t("spaceInterior.statusSelected", {
    name: target.space.name || `IfcSpace ${target.expressID}`
  });
}

function moveCameraInsideSpace(record, expressID) {
  const space = record && record.spatialElementsById && record.spatialElementsById.get(Number(expressID));
  const box = translatedElementBox(record, expressID);
  if (!space || !box || box.isEmpty()) {
    elements.spaceInteriorStatus.textContent = t("spaceInterior.statusEmpty");
    return;
  }
  const eyeHeight = millimetersToSceneUnits(clampNumber(elements.spaceInteriorEyeHeight.value, 300, 3000, 1500));
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const position = center.clone();
  const minEye = box.min.y + Math.min(0.3, Math.max(size.y * 0.2, 0.05));
  const maxEye = box.max.y - Math.min(0.2, Math.max(size.y * 0.1, 0.02));
  position.y = clampNumber(box.min.y + eyeHeight, minEye, Math.max(minEye, maxEye), box.min.y + eyeHeight);

  let forward = horizontalCameraForward();
  if (forward.lengthSq() < 0.000001) {
    forward = size.x >= size.z ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
  }
  const viewDistance = Math.max(Math.min(Math.max(size.x, size.z) * 0.65, 12), 1.6);
  state.camera.position.copy(position);
  state.controls.target.copy(position).add(forward.multiplyScalar(viewDistance));
  state.controls.target.y = position.y;
  if (state.camera.isOrthographicCamera) {
    state.view.orthographicHeight = Math.max(Math.min(Math.max(size.x, size.z) * 1.3, 18), 2.5);
    applyProjectionSettings();
  }
  state.controls.update();
  state.currentSpaceSignature = "";
  updateCurrentSpaceOverlay();
  elements.spaceInteriorSelect.value = spaceInteriorValue(record, expressID);
  elements.spaceInteriorStatus.textContent = t("spaceInterior.statusMoved", {
    name: space.name || `IfcSpace ${expressID}`
  });
}

function currentIfcSpaceAtCamera() {
  const point = state.camera.position;
  const candidates = [];
  for (const record of state.models) {
    if (!isIfcRecord(record) || !record.enabled || !record.spatialElementsById || record.spatialElementsById.size === 0) {
      continue;
    }
    for (const space of record.spatialElementsById.values()) {
      if (!isSpaceDetectableAtCamera(record, space.expressID)) {
        continue;
      }
      const box = translatedElementBox(record, space.expressID);
      if (!box || !box.containsPoint(point)) {
        continue;
      }
      const size = box.getSize(new THREE.Vector3());
      candidates.push({
        ...space,
        record,
        volume: Math.max(size.x * size.y * size.z, 0)
      });
    }
  }
  return candidates.sort((a, b) => a.volume - b.volume)[0] || null;
}

function isSpaceDetectableAtCamera(record, expressID) {
  if (state.showPropertyInfo) {
    return isSpaceAvailableForPositionInfo(record, expressID);
  }
  return isSpaceVisibleForDisplay(record, expressID);
}

function isSpaceAvailableForPositionInfo(record, expressID) {
  if (!isIfcRecord(record) || !record.enabled || !isIfcSpaceElement(record, expressID)) {
    return false;
  }
  const category = record.categoryMap.get(record.idToCategory.get(Number(expressID)));
  const level = record.levelMap.get(record.idToLevel.get(Number(expressID)));
  return Boolean((!category || category.visible) &&
    (!level || level.visible) &&
    isSpaceInActiveClip(record, expressID));
}

function isSpaceVisibleForDisplay(record, expressID) {
  return Boolean(state.showSpaces &&
    isIfcRecord(record) &&
    record.enabled &&
    record.visibleExpressIDs.has(Number(expressID)) &&
    isSpaceInActiveClip(record, expressID));
}

function updateSpaceLabels() {
  const layer = elements.spaceLabelLayer;
  if (!layer || !state.camera) {
    return;
  }
  if (!state.showSpaceNames) {
    clearSpaceLabels();
    return;
  }
  const now = performance.now();
  if (now - state.spaceLabels.lastUpdateAt < 160) {
    return;
  }
  state.spaceLabels.lastUpdateAt = now;
  const rect = elements.canvas.getBoundingClientRect();
  const labelCandidates = [];
  const current = currentIfcSpaceAtCamera();
  const currentKey = current ? `${current.record.key}:${current.expressID}` : "";

  for (const record of state.models) {
    if (!isIfcRecord(record) || !record.enabled || !record.spatialElementsById) {
      continue;
    }
    for (const space of record.spatialElementsById.values()) {
      if (!isSpaceVisibleForDisplay(record, space.expressID)) {
        continue;
      }
      const box = translatedElementBox(record, space.expressID);
      if (!box || box.isEmpty()) {
        continue;
      }
      const center = box.getCenter(new THREE.Vector3());
      const projected = center.clone().project(state.camera);
      if (projected.z < -1 || projected.z > 1) {
        continue;
      }
      const x = (projected.x * 0.5 + 0.5) * rect.width;
      const y = (-projected.y * 0.5 + 0.5) * rect.height;
      if (x < -80 || x > rect.width + 80 || y < -40 || y > rect.height + 40) {
        continue;
      }
      labelCandidates.push({
        key: `${record.key}:${space.expressID}`,
        x,
        y,
        distance: center.distanceTo(state.camera.position),
        text: space.name || space.longName || `IfcSpace ${space.expressID}`,
        meta: `${record.name} / ${space.level || "-"}`,
        recordKey: record.key,
        expressID: space.expressID,
        selected: record.key === state.selectedModelKey && Number(space.expressID) === Number(state.selectedExpressID),
        current: `${record.key}:${space.expressID}` === currentKey
      });
    }
  }

  labelCandidates.sort((a, b) => a.distance - b.distance);
  const visible = new Set(labelCandidates.slice(0, 160).map((item) => item.key));
  for (const [key, node] of state.spaceLabels.nodes) {
    if (!visible.has(key)) {
      node.remove();
      state.spaceLabels.nodes.delete(key);
    }
  }
  for (const item of labelCandidates.slice(0, 160)) {
    let node = state.spaceLabels.nodes.get(item.key);
    if (!node) {
      node = document.createElement("div");
      node.className = "space-label";
      node.tabIndex = 0;
      node.setAttribute("role", "button");
      node.addEventListener("click", () => selectSpaceLabel(node));
      node.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        event.preventDefault();
        selectSpaceLabel(node);
      });
      state.spaceLabels.nodes.set(item.key, node);
      layer.appendChild(node);
    }
    node.textContent = item.text;
    node.title = item.meta;
    node.dataset.recordKey = item.recordKey;
    node.dataset.expressId = String(item.expressID);
    node.classList.toggle("is-current", item.current);
    node.classList.toggle("is-selected", item.selected);
    node.style.transform = `translate(${Math.round(item.x)}px, ${Math.round(item.y)}px) translate(-50%, -50%)`;
  }
  layer.classList.toggle("is-hidden", visible.size === 0);
}

function selectSpaceLabel(node) {
  const record = getRecordByKey(node && node.dataset && node.dataset.recordKey || "");
  const expressID = Number(node && node.dataset && node.dataset.expressId);
  if (record && Number.isFinite(expressID)) {
    selectSpaceFromOverlay(record, expressID);
  }
}

function clearSpaceLabels() {
  for (const node of state.spaceLabels.nodes.values()) {
    node.remove();
  }
  state.spaceLabels.nodes.clear();
  state.spaceLabels.lastUpdateAt = 0;
  if (elements.spaceLabelLayer) {
    elements.spaceLabelLayer.classList.add("is-hidden");
  }
}

function handleMeasurementClick(event) {
  if (event.button !== 0) {
    return false;
  }
  const hit = pickMeasurementPoint(event);
  if (!hit) {
    state.measurement.status = t("measure.statusNoHit");
    updateMeasurementUi();
    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }
  if (!state.measurement.pendingPoint) {
    state.measurement.pendingPoint = hit;
    state.measurement.status = measurementPromptKey(true);
    updateMeasurementUi();
    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }
  const created = addMeasurementRecord(state.measurement.pendingPoint, hit);
  state.measurement.pendingPoint = null;
  state.measurement.status = created ? t("measure.statusCreated") : state.measurement.status;
  updateMeasurementUi();
  event.preventDefault();
  event.stopImmediatePropagation();
  return true;
}

function pickMeasurementPoint(event) {
  const raycaster = pointerRaycaster(event, SCENE_LAYER_MAIN);
  const intersections = raycaster.intersectObjects(getPickableMeshes(), false);
  const hit = intersections.find((item) => item && item.point);
  if (!hit) {
    return null;
  }
  const record = hit.object.userData && hit.object.userData.recordKey
    ? getRecordByKey(hit.object.userData.recordKey)
    : getRecordByModelID(hit.object.modelID);
  let expressID = null;
  if (record) {
    if (isStbRecord(record)) {
      expressID = hit.object.userData && hit.object.userData.elementID;
    } else {
      try {
        expressID = state.ifcLoader.ifcManager.getExpressId(hit.object.geometry, hit.faceIndex);
      } catch {
        expressID = null;
      }
    }
  }
  const normal = hit.face && hit.object
    ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
    : null;
  return {
    point: hit.point.clone(),
    normal,
    recordKey: record && record.key || "",
    expressID,
    label: record ? `${record.name}${Number.isFinite(Number(expressID)) ? ` / ${elementLabel(record, expressID)}` : ""}` : ""
  };
}

function addMeasurementRecord(first, second) {
  const result = computeMeasurementResult(first, second, state.measurement.mode);
  if (!result || result.error) {
    if (result && result.error === "not-parallel") {
      state.measurement.status = t("measure.statusNotParallel");
    } else if (result && result.error === "zero-distance") {
      state.measurement.status = t("measure.statusZeroDistance");
    } else {
      state.measurement.status = t("measure.statusNoHit");
    }
    return false;
  }
  const record = {
    id: createId(),
    number: state.measurement.nextNumber++,
    mode: normalizeMeasurementMode(state.measurement.mode),
    start: result.start,
    end: result.end,
    distance: result.distance,
    label: `${first.label || "-"} -> ${second.label || "-"}`
  };
  state.measurement.records.push(record);
  rebuildMeasurementGroup();
  return true;
}

function computeMeasurementResult(first, second, mode) {
  if (normalizeMeasurementMode(mode) === "point-to-point") {
    const distance = first.point.distanceTo(second.point);
    if (distance < MEASUREMENT_MIN_DISTANCE) {
      return { error: "zero-distance" };
    }
    return {
      start: first.point.clone(),
      end: second.point.clone(),
      distance
    };
  }
  if (!first.normal || !second.normal) {
    return { error: "no-face" };
  }
  const directionMode = normalizeMeasurementDirection(state.measurement.direction);
  const parallel = Math.abs(first.normal.dot(second.normal));
  if ((directionMode === "auto" || directionMode.startsWith("normal")) && parallel < Math.cos(7 * Math.PI / 180)) {
    return { error: "not-parallel" };
  }
  const direction = measurementDirectionVector(first, second, directionMode);
  let signedDistance = second.point.clone().sub(first.point).dot(direction);
  if (signedDistance < 0 && directionMode === "auto") {
    direction.negate();
    signedDistance = -signedDistance;
  }
  if (Math.abs(signedDistance) < MEASUREMENT_MIN_DISTANCE) {
    return { error: "zero-distance" };
  }
  return {
    start: first.point.clone(),
    end: first.point.clone().addScaledVector(direction, signedDistance),
    distance: Math.abs(signedDistance)
  };
}

function normalizeMeasurementMode(value) {
  return value === "point-to-point" ? "point-to-point" : "face-to-face";
}

function normalizeMeasurementDirection(value) {
  return [
    "normal-positive",
    "normal-negative",
    "z-positive",
    "z-negative"
  ].includes(value) ? value : "auto";
}

function measurementDirectionVector(first, second, mode) {
  if (mode === "z-positive") {
    return new THREE.Vector3(0, 1, 0);
  }
  if (mode === "z-negative") {
    return new THREE.Vector3(0, -1, 0);
  }
  if (mode === "normal-negative") {
    return first.normal.clone().normalize().negate();
  }
  const direction = first.normal.clone().normalize();
  if (mode === "auto" && second.point.clone().sub(first.point).dot(direction) < 0) {
    direction.negate();
  }
  return direction;
}

function measurementModeLabel(mode) {
  return normalizeMeasurementMode(mode) === "point-to-point"
    ? t("measure.modePointToPoint")
    : t("measure.modeFaceToFace");
}

function measurementPromptKey(hasPending) {
  if (normalizeMeasurementMode(state.measurement.mode) === "point-to-point") {
    return t(hasPending ? "measure.statusPickSecond" : "measure.statusPickFirst");
  }
  return t(hasPending ? "measure.statusPickSecondFace" : "measure.statusPickFirstFace");
}

function setMeasurementEnabled(enabled) {
  if (enabled === true && state.models.length === 0) {
    setStatus(t("status.selectModel"), true);
    return;
  }
  state.measurement.enabled = enabled === true;
  state.measurement.pendingPoint = null;
  state.measurement.status = state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle");
  if (state.measurement.enabled) {
    state.openPopouts.add("measure");
  }
  updateMeasurementUi();
  syncPopouts();
}

function setMeasurementMode(mode) {
  state.measurement.mode = normalizeMeasurementMode(mode);
  state.measurement.pendingPoint = null;
  state.measurement.status = state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle");
  updateMeasurementUi();
}

function setMeasurementDirection(direction) {
  state.measurement.direction = normalizeMeasurementDirection(direction);
  state.measurement.pendingPoint = null;
  state.measurement.status = state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle");
  updateMeasurementUi();
}

function undoMeasurement() {
  if (state.measurement.pendingPoint) {
    state.measurement.pendingPoint = null;
    state.measurement.status = state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle");
  } else {
    state.measurement.records.pop();
    state.measurement.nextNumber = Math.max(1, state.measurement.nextNumber - 1);
    rebuildMeasurementGroup();
  }
  updateMeasurementUi();
}

function clearSelectedMeasurement() {
  if (!state.measurement.selectedRecordId) {
    return;
  }
  state.measurement.records = state.measurement.records.filter((record) => record.id !== state.measurement.selectedRecordId);
  state.measurement.selectedRecordId = "";
  rebuildMeasurementGroup();
  updateMeasurementUi();
}

function clearMeasurements() {
  state.measurement.records = [];
  state.measurement.pendingPoint = null;
  state.measurement.selectedRecordId = "";
  state.measurement.nextNumber = 1;
  state.measurement.status = t("measure.statusCleared");
  rebuildMeasurementGroup();
  updateMeasurementUi();
}

function rebuildMeasurementGroup() {
  if (state.measurement.group) {
    state.scene.remove(state.measurement.group);
    disposeObject3D(state.measurement.group);
    state.measurement.group = null;
  }
  if (state.measurement.records.length === 0) {
    return;
  }
  const group = new THREE.Group();
  group.name = "measurement-results";
  for (const record of state.measurement.records) {
    const geometry = new THREE.BufferGeometry().setFromPoints([record.start, record.end]);
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x111827, depthTest: false, transparent: true, opacity: 0.95 })
    );
    const sphereGeometry = new THREE.SphereGeometry(Math.max(record.distance * 0.012, 0.03), 16, 12);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffc400, depthTest: false });
    const startSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const endSphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
    startSphere.position.copy(record.start);
    endSphere.position.copy(record.end);
    const label = createTextSprite(formatMeasurementDistance(record.distance));
    label.position.copy(record.start).add(record.end).multiplyScalar(0.5);
    label.scale.set(2.2, 0.56, 1);
    group.add(line, startSphere, endSphere, label);
  }
  setObjectLayer(group, SCENE_LAYER_MAIN);
  state.scene.add(group);
  state.measurement.group = group;
}

function updateMeasurementUi() {
  elements.measurementModeSelect.value = normalizeMeasurementMode(state.measurement.mode);
  elements.measurementDirectionSelect.value = normalizeMeasurementDirection(state.measurement.direction);
  elements.measureToggleButton.textContent = state.measurement.enabled ? t("measure.stop") : t("measure.start");
  elements.measureToggleButton.classList.toggle("primary", state.measurement.enabled);
  elements.measurementModeSelect.disabled = state.models.length === 0 || state.measurement.enabled;
  elements.measurementDirectionSelect.disabled = normalizeMeasurementMode(state.measurement.mode) !== "face-to-face";
  elements.measurementUndoButton.disabled = !state.measurement.pendingPoint && state.measurement.records.length === 0;
  elements.measurementClearSelectedButton.disabled = !state.measurement.selectedRecordId;
  elements.measurementClearButton.disabled = !state.measurement.pendingPoint && state.measurement.records.length === 0;
  elements.measurementStatus.textContent = state.measurement.status || (state.measurement.enabled ? measurementPromptKey(false) : t("measure.statusIdle"));
  renderMeasurementList();
  renderMeasurementOverlay();
}

function renderMeasurementList() {
  elements.measurementResultList.innerHTML = "";
  elements.measurementResultList.classList.toggle("empty", state.measurement.records.length === 0);
  elements.measurementResultList.classList.toggle("is-empty", state.measurement.records.length === 0);
  if (state.measurement.records.length === 0) {
    elements.measurementResultList.textContent = t("measure.resultEmpty");
    return;
  }
  for (const record of state.measurement.records.slice().reverse()) {
    const row = el("div", "measurement-result-row");
    row.tabIndex = 0;
    row.classList.toggle("is-selected", record.id === state.measurement.selectedRecordId);
    row.addEventListener("click", () => {
      state.measurement.selectedRecordId = record.id === state.measurement.selectedRecordId ? "" : record.id;
      updateMeasurementUi();
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });
    const number = el("span", "measurement-result-number", String(record.number));
    const main = el("span", "measurement-result-main");
    main.append(
      el("span", "measurement-result-distance", formatMeasurementDistance(record.distance)),
      el("span", "measurement-result-meta", t("measure.resultMeta", {
        mode: measurementModeLabel(record.mode),
        label: record.label
      }))
    );
    row.append(number, main);
    elements.measurementResultList.append(row);
  }
}

function renderMeasurementOverlay() {
  const svg = elements.measurementOverlaySvg;
  if (!svg || !state.camera) {
    return;
  }
  svg.innerHTML = "";
  const rect = elements.canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  if (state.measurement.records.length === 0) {
    return;
  }
  for (const record of state.measurement.records) {
    const start = projectWorldToOverlay(record.start, width, height);
    const end = projectWorldToOverlay(record.end, width, height);
    if (!start || !end) {
      continue;
    }
    const selected = record.id === state.measurement.selectedRecordId;
    const line = svgNode("line", {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      class: `measurement-overlay-line${selected ? " is-selected" : ""}`
    });
    const startPoint = svgNode("circle", {
      cx: start.x,
      cy: start.y,
      r: selected ? 4.2 : 3.4,
      class: "measurement-overlay-point"
    });
    const endPoint = svgNode("circle", {
      cx: end.x,
      cy: end.y,
      r: selected ? 4.2 : 3.4,
      class: "measurement-overlay-point"
    });
    const labelText = `${record.number}: ${formatMeasurementDistance(record.distance)}`;
    const labelX = (start.x + end.x) / 2;
    const labelY = (start.y + end.y) / 2 - 8;
    const labelWidth = Math.min(190, Math.max(54, labelText.length * 7.2 + 16));
    const bg = svgNode("rect", {
      x: labelX - labelWidth / 2,
      y: labelY - 15,
      width: labelWidth,
      height: 21,
      rx: 4,
      class: "measurement-overlay-label-bg"
    });
    const text = svgNode("text", {
      x: labelX,
      y: labelY,
      "text-anchor": "middle",
      class: "measurement-overlay-label"
    });
    text.textContent = labelText;
    svg.append(line, startPoint, endPoint, bg, text);
  }
}

function projectWorldToOverlay(point, width, height) {
  const projected = point.clone().project(state.camera);
  if (projected.z < -1 || projected.z > 1) {
    return null;
  }
  const x = (projected.x * 0.5 + 0.5) * width;
  const y = (-projected.y * 0.5 + 0.5) * height;
  if (x < -120 || x > width + 120 || y < -120 || y > height + 120) {
    return null;
  }
  return { x, y };
}

function svgNode(tagName, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, String(value));
  }
  return node;
}

function formatMeasurementDistance(sceneUnits) {
  const millimeters = sceneUnits * 1000;
  if (Math.abs(millimeters) >= 10000) {
    return `${(millimeters / 1000).toFixed(3)} m`;
  }
  if (Math.abs(millimeters) >= 100) {
    return `${millimeters.toFixed(0)} mm`;
  }
  return `${millimeters.toFixed(1)} mm`;
}

function fitAllModelsToView() {
  const box = computeDisplayBox();
  if (box) {
    fitBoxToView(box);
  }
}

function fitRecordToView(record) {
  const box = record.visibilitySubset
    ? new THREE.Box3().setFromObject(record.visibilitySubset)
    : new THREE.Box3().setFromObject(record.model);
  if (!box.isEmpty()) {
    fitBoxToView(box);
  }
}

function fitExpressIdToView(record, expressID) {
  const box = translatedElementBox(record, expressID);
  if (box) {
    fitBoxToView(box);
  }
}

function fitBoxToView(box) {
  if (!box || box.isEmpty()) {
    return;
  }
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z) || 1;
  const distance = maxSize / (2 * Math.tan((Math.PI * state.view.fov) / 360));
  const direction = new THREE.Vector3(1, 0.85, 1).normalize();
  state.camera.near = Math.max(distance / 1000, 0.01);
  state.camera.far = Math.max(distance * 100, 1000);
  state.camera.position.copy(center).add(direction.multiplyScalar(distance * 1.7));
  if (state.camera.isOrthographicCamera) {
    state.view.orthographicHeight = Math.max(size.x, size.z, size.y * 1.2, 1) * 1.45;
  }
  applyProjectionSettings();
  state.camera.updateProjectionMatrix();
  state.controls.target.copy(center);
  state.controls.update();
}

function computeDisplayBox() {
  const box = new THREE.Box3();
  let found = false;
  for (const record of state.models) {
    if (!record.enabled) {
      continue;
    }
    const target = record.visibilitySubset || record.model;
    if (!target) {
      continue;
    }
    const current = new THREE.Box3().setFromObject(target);
    if (!current.isEmpty()) {
      box.union(current);
      found = true;
    }
  }
  return found ? box : computeModelBox();
}

function computeModelBox() {
  const box = new THREE.Box3();
  let found = false;
  for (const record of state.models) {
    const current = new THREE.Box3().setFromObject(record.model);
    if (!current.isEmpty()) {
      box.union(current);
      found = true;
    }
  }
  return found ? box : null;
}

function updateReferenceGrid() {
  if (state.referenceGrid) {
    state.scene.remove(state.referenceGrid);
    disposeObject3D(state.referenceGrid);
    state.referenceGrid = null;
  }
  if (!state.showGrid) {
    return;
  }

  const box = computeModelBox();
  const center = box ? box.getCenter(new THREE.Vector3()) : new THREE.Vector3();
  const size = box ? box.getSize(new THREE.Vector3()) : new THREE.Vector3(40, 0, 40);
  const gridSize = niceGridSize(Math.max(size.x, size.z, 40) * 1.25);
  const divisions = Math.min(120, Math.max(20, Math.round(gridSize / niceGridStep(gridSize))));
  state.referenceGrid = new THREE.GridHelper(gridSize, divisions, 0x6d8597, 0xc6d0d8);
  state.referenceGrid.name = "reference-grid";
  state.referenceGrid.position.set(center.x, 0, center.z);
  state.scene.add(state.referenceGrid);
}

function syncSmartClipControls() {
  syncSmartClipStateFromUi(false);
  const levelOptions = smartClipLevelOptions();
  setSelectOptions(elements.clipLevelFromSelect, levelOptions, t("clip.anyLevel"), state.section.smart.levelFrom);
  setSelectOptions(elements.clipLevelToSelect, levelOptions, t("clip.anyLevel"), state.section.smart.levelTo);
  const xOptions = smartClipGridOptions("x");
  const zOptions = smartClipGridOptions("z");
  setSelectOptions(elements.clipGridXFromSelect, xOptions, t("clip.anyGrid"), state.section.smart.xFrom);
  setSelectOptions(elements.clipGridXToSelect, xOptions, t("clip.anyGrid"), state.section.smart.xTo);
  setSelectOptions(elements.clipGridZFromSelect, zOptions, t("clip.anyGrid"), state.section.smart.zFrom);
  setSelectOptions(elements.clipGridZToSelect, zOptions, t("clip.anyGrid"), state.section.smart.zTo);
  elements.clipBottomOffsetInput.value = String(Math.round(state.section.smart.bottomOffsetMm));
  elements.clipTopOffsetInput.value = String(Math.round(state.section.smart.topOffsetMm));
  elements.clipGridPaddingInput.value = String(Math.round(state.section.smart.paddingMm));
  if (!state.models.length) {
    elements.smartClipStatus.textContent = t("clip.noSmartTarget");
  }
}

function syncSmartClipStateFromUi(render = true) {
  if (!elements.clipLevelFromSelect) {
    return;
  }
  state.section.smart.levelFrom = elements.clipLevelFromSelect.value || "";
  state.section.smart.levelTo = elements.clipLevelToSelect.value || "";
  state.section.smart.bottomOffsetMm = Number(elements.clipBottomOffsetInput.value) || 0;
  state.section.smart.topOffsetMm = Number(elements.clipTopOffsetInput.value) || 0;
  state.section.smart.xFrom = elements.clipGridXFromSelect.value || "";
  state.section.smart.xTo = elements.clipGridXToSelect.value || "";
  state.section.smart.zFrom = elements.clipGridZFromSelect.value || "";
  state.section.smart.zTo = elements.clipGridZToSelect.value || "";
  state.section.smart.paddingMm = Math.max(0, Number(elements.clipGridPaddingInput.value) || 0);
  if (render) {
    elements.smartClipStatus.textContent = "";
    elements.smartClipStatus.classList.remove("is-error");
  }
}

function applySmartClip() {
  const modelBox = computeModelBox();
  if (!modelBox || modelBox.isEmpty()) {
    elements.smartClipStatus.textContent = t("clip.noSmartTarget");
    elements.smartClipStatus.classList.add("is-error");
    return;
  }
  syncSmartClipStateFromUi(false);
  const axes = clipAxes();
  const bounds = clipSpaceBounds(modelBox, axes);
  const nextBox = {
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 100,
    zMin: 0,
    zMax: 100
  };

  applySmartLevelRange(nextBox, modelBox, bounds);
  applySmartGridRange(nextBox, bounds, "x", state.section.smart.xFrom, state.section.smart.xTo);
  applySmartGridRange(nextBox, bounds, "z", state.section.smart.zFrom, state.section.smart.zTo);

  state.section.enabled = true;
  state.section.mode = "box";
  state.section.box = nextBox;
  elements.sectionToggle.checked = true;
  elements.clipMode.value = "box";
  syncClipRangeInputs();
  updateClipping();
  renderAll();
  elements.smartClipStatus.classList.remove("is-error");
  elements.smartClipStatus.textContent = t("clip.smartApplied");
}

function applySmartLevelRange(nextBox, modelBox, bounds) {
  const fromRange = smartClipLevelRangeByName(state.section.smart.levelFrom);
  const toRange = smartClipLevelRangeByName(state.section.smart.levelTo);
  if (!fromRange && !toRange) {
    return;
  }
  const bottomOffset = millimetersToSceneUnits(state.section.smart.bottomOffsetMm);
  const topOffset = millimetersToSceneUnits(state.section.smart.topOffsetMm);
  const minCandidate = fromRange ? fromRange.min : toRange.min;
  const maxCandidate = toRange ? toRange.max : fromRange.max;
  let min = Math.min(minCandidate, maxCandidate) + bottomOffset;
  let max = Math.max(minCandidate, maxCandidate) + topOffset;
  if (max <= min) {
    max = min + Math.max((modelBox.max.y - modelBox.min.y) * 0.05, 0.25);
  }
  setClipRatioFromValue(nextBox, "yMin", bounds, min);
  setClipRatioFromValue(nextBox, "yMax", bounds, max);
}

function applySmartGridRange(nextBox, bounds, axis, fromValue, toValue) {
  const from = Number(fromValue);
  const to = Number(toValue);
  if (!Number.isFinite(from) && !Number.isFinite(to)) {
    return;
  }
  const padding = millimetersToSceneUnits(state.section.smart.paddingMm);
  let min = Number.isFinite(from) ? from : bounds[`${axis}Min`];
  let max = Number.isFinite(to) ? to : bounds[`${axis}Max`];
  if (max < min) {
    [min, max] = [max, min];
  }
  if (Math.abs(max - min) < 0.001) {
    min -= Math.max(padding, 0.5);
    max += Math.max(padding, 0.5);
  } else {
    min -= padding;
    max += padding;
  }
  setClipRatioFromValue(nextBox, `${axis}Min`, bounds, min);
  setClipRatioFromValue(nextBox, `${axis}Max`, bounds, max);
}

function setClipRatioFromValue(nextBox, key, bounds, value) {
  const axis = key[0];
  const min = bounds[`${axis}Min`];
  const max = bounds[`${axis}Max`];
  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return;
  }
  const clamped = clampNumber(value, min, max, value);
  nextBox[key] = clampNumber(((clamped - min) / (max - min)) * 100, 0, 100, nextBox[key]);
}

function smartClipLevelOptions() {
  return smartClipLevelRanges()
    .slice()
    .sort((left, right) => right.min - left.min || String(left.name).localeCompare(String(right.name)))
    .map((item) => ({
      value: item.name,
      label: `${localizedFilterName(item.name)} (${Math.round(item.min * 1000)} mm)`
    }));
}

function smartClipLevelRangeByName(name) {
  if (!name) {
    return null;
  }
  return smartClipLevelRanges().find((item) => item.name === name) || null;
}

function smartClipLevelRanges() {
  const modelBox = computeModelBox();
  if (!modelBox) {
    return [];
  }
  const byName = new Map();
  for (const record of state.models) {
    for (const level of record.levelMap.values()) {
      if (level.name === UNCATEGORIZED_LEVEL) {
        continue;
      }
      const elevation = smartClipLevelElevation(record, level);
      if (!Number.isFinite(elevation)) {
        continue;
      }
      const existing = byName.get(level.name);
      if (!existing || elevation < existing.min) {
        byName.set(level.name, { name: level.name, min: elevation, max: elevation });
      }
    }
  }
  const levels = Array.from(byName.values()).sort((left, right) => left.min - right.min);
  for (let index = 0; index < levels.length; index++) {
    const next = levels[index + 1];
    levels[index].max = next ? next.min : modelBox.max.y;
    if (levels[index].max <= levels[index].min) {
      levels[index].max = Math.max(modelBox.max.y, levels[index].min + 0.25);
    }
  }
  return levels;
}

function smartClipLevelElevation(record, level) {
  if (Number.isFinite(level.elevation)) {
    return level.elevation;
  }
  const box = unionBoxesForIds(record, level.ids || []);
  return box && !box.isEmpty() ? box.min.y : null;
}

function smartClipGridOptions(axis) {
  const modelBox = computeModelBox();
  if (!modelBox || modelBox.isEmpty()) {
    return [];
  }
  const bounds = clipSpaceBounds(modelBox, clipAxes());
  const min = bounds[`${axis}Min`];
  const max = bounds[`${axis}Max`];
  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return [];
  }
  const range = Math.abs(max - min);
  const step = niceGridStep(niceGridSize(range));
  const values = [min, max];
  const first = Math.ceil(min / step) * step;
  for (let value = first; value <= max + step * 0.25; value += step) {
    if (value >= min - 1e-6 && value <= max + 1e-6) {
      values.push(value);
    }
  }
  return unique(values.map((value) => Number(value.toFixed(6))))
    .sort((left, right) => left - right)
    .map((value) => ({
      value: String(value),
      label: `${axis.toUpperCase()} ${Math.round(value * 1000)} mm`
    }));
}

function setSelectOptions(select, options, emptyLabel, selectedValue) {
  const current = selectedValue || select.value || "";
  select.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = emptyLabel;
  select.append(empty);
  let hasCurrent = current === "";
  for (const optionInfo of options) {
    const option = document.createElement("option");
    option.value = optionInfo.value;
    option.textContent = optionInfo.label;
    if (option.value === current) {
      hasCurrent = true;
    }
    select.append(option);
  }
  if (!hasCurrent && current) {
    const option = document.createElement("option");
    option.value = current;
    option.textContent = current;
    select.append(option);
    hasCurrent = true;
  }
  select.value = hasCurrent ? current : "";
}

function refreshLevelHelpers(record) {
  if (record.levelGroup) {
    state.scene.remove(record.levelGroup);
    disposeObject3D(record.levelGroup);
    record.levelGroup = null;
  }

  const modelBox = new THREE.Box3().setFromObject(record.model);
  if (modelBox.isEmpty()) {
    return;
  }

  const size = modelBox.getSize(new THREE.Vector3());
  const margin = Math.max(size.x, size.z, 10) * 0.08;
  const minX = modelBox.min.x - margin;
  const maxX = modelBox.max.x + margin;
  const minZ = modelBox.min.z - margin;
  const maxZ = modelBox.max.z + margin;
  const group = new THREE.Group();
  group.name = `${record.name} level helpers`;

  for (const level of record.levelMap.values()) {
    if (level.name === UNCATEGORIZED_LEVEL || !Number.isFinite(level.elevation)) {
      continue;
    }
    const y = level.elevation;
    const points = [
      new THREE.Vector3(minX, y, minZ),
      new THREE.Vector3(maxX, y, minZ),
      new THREE.Vector3(maxX, y, maxZ),
      new THREE.Vector3(minX, y, maxZ)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x0f6f78,
      transparent: true,
      opacity: 0.78
    });
    const line = new THREE.LineLoop(geometry, material);
    const label = createTextSprite(`${level.name}  ${formatLength(y)}`);
    label.position.set(minX, y, maxZ);
    group.add(line, label);
  }

  group.visible = state.showLevels && record.enabled;
  state.scene.add(group);
  record.levelGroup = group;
}

function updateLevelHelperVisibility() {
  for (const record of state.models) {
    if (record.levelGroup) {
      record.levelGroup.visible = state.showLevels && record.enabled;
    }
  }
}

function createTextSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(255, 255, 255, 0.88)";
  context.strokeStyle = "rgba(15, 111, 120, 0.65)";
  context.lineWidth = 4;
  roundRect(context, 8, 18, 496, 86, 12);
  context.fill();
  context.stroke();
  context.fillStyle = "#17313a";
  context.font = "bold 34px Yu Gothic UI, Segoe UI, sans-serif";
  context.textBaseline = "middle";
  context.fillText(String(text).slice(0, 34), 28, 62);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(7.5, 1.9, 1);
  return sprite;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function updateSectionControls() {
  const box = computeModelBox();
  const hasEnabledBox = Boolean(box && state.section.enabled && state.section.mode === "box");
  const hasEnabledPlane = Boolean(box && state.section.enabled && state.section.mode === "plane");
  elements.sectionToggle.checked = state.section.enabled;
  elements.clipHandleToggle.checked = state.section.showHandles;
  elements.clipGuideToggleButton.textContent = state.section.showGuide ? t("clip.hideGuide") : t("clip.showGuide");
  elements.clipGuideToggleButton.classList.toggle("primary", !state.section.showGuide && state.section.enabled);
  elements.clipMode.value = state.section.mode;
  elements.clipRotationInput.value = formatRotationInput(state.section.rotationDeg);
  elements.clipRotationInput.parentElement.parentElement.style.display = state.section.mode === "box" ? "grid" : "none";
  elements.sectionAxis.parentElement.style.display = state.section.mode === "plane" ? "" : "none";
  elements.sectionRange.parentElement.style.display = state.section.mode === "plane" ? "" : "none";
  elements.clipBoxControls.style.display = state.section.mode === "box" ? "grid" : "none";

  if (!hasEnabledPlane) {
    elements.sectionValue.textContent = t("clip.positionEmpty");
  } else {
    const value = sectionPositionFromBox(box);
    elements.sectionValue.textContent = t("clip.position", { value: formatLength(value) });
  }

  const clipData = box ? computeClipData(box) : null;
  setClipValueLabel(elements.clipXMinValue, t("clip.xMin"), clipData && clipData.values.xMin, hasEnabledBox);
  setClipValueLabel(elements.clipXMaxValue, t("clip.xMax"), clipData && clipData.values.xMax, hasEnabledBox);
  setClipValueLabel(elements.clipYMinValue, t("clip.yMin"), clipData && clipData.values.yMin, hasEnabledBox);
  setClipValueLabel(elements.clipYMaxValue, t("clip.yMax"), clipData && clipData.values.yMax, hasEnabledBox);
  setClipValueLabel(elements.clipZMinValue, t("clip.zMin"), clipData && clipData.values.zMin, hasEnabledBox);
  setClipValueLabel(elements.clipZMaxValue, t("clip.zMax"), clipData && clipData.values.zMax, hasEnabledBox);
  syncClipRangeInputs();
}

function updateClipping() {
  removeClippingHelpers();
  const box = computeModelBox();
  if (!box || !state.section.enabled) {
    state.section.planes = [];
    state.renderer.clippingPlanes = [];
    updateSectionControls();
    updateAllSpaceOverlays();
    state.spaceLabels.lastUpdateAt = 0;
    return;
  }

  if (state.section.mode === "plane") {
    updatePlaneClipping(box);
  } else {
    updateBoxClipping(box);
  }
  updateSectionControls();
  updateAllSpaceOverlays();
  state.spaceLabels.lastUpdateAt = 0;
}

function updatePlaneClipping(box) {
  const axis = state.section.axis;
  const normal = axisVector(axis);
  const value = sectionPositionFromBox(box);
  state.section.plane.normal.copy(normal);
  state.section.plane.constant = -value;
  state.renderer.clippingPlanes = [state.section.plane];
  if (!state.section.showGuide) {
    return;
  }

  const size = Math.max(...box.getSize(new THREE.Vector3()).toArray(), 10) * 1.35;
  state.section.helper = new THREE.PlaneHelper(state.section.plane, size, 0xba4a2a);
  state.section.helper.name = "section-plane-helper";
  prepareClipHelperObject(state.section.helper);
  state.scene.add(state.section.helper);
}

function updateBoxClipping(modelBox) {
  const clip = computeClipData(modelBox);
  state.section.planes = [
    new THREE.Plane(clip.axes.x.clone(), -clip.values.xMin),
    new THREE.Plane(clip.axes.x.clone().negate(), clip.values.xMax),
    new THREE.Plane(clip.axes.y.clone(), -clip.values.yMin),
    new THREE.Plane(clip.axes.y.clone().negate(), clip.values.yMax),
    new THREE.Plane(clip.axes.z.clone(), -clip.values.zMin),
    new THREE.Plane(clip.axes.z.clone().negate(), clip.values.zMax)
  ];
  state.renderer.clippingPlanes = activeClippingPlanes();
  if (!state.section.showGuide) {
    return;
  }
  state.section.boxHelper = createClipBoxHelper(clip);
  prepareClipHelperObject(state.section.boxHelper);
  state.scene.add(state.section.boxHelper);
}

function sectionPositionFromBox(box) {
  const axis = state.section.axis;
  const min = box.min[axis];
  const max = box.max[axis];
  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return min || 0;
  }
  const ratio = Math.min(100, Math.max(0, Number(state.section.ratio))) / 100;
  return min + (max - min) * ratio;
}

function axisVector(axis) {
  if (axis === "x") {
    return new THREE.Vector3(1, 0, 0);
  }
  if (axis === "z") {
    return new THREE.Vector3(0, 0, 1);
  }
  return new THREE.Vector3(0, 1, 0);
}

function computeClipData(modelBox) {
  const normalized = normalizedClipRatios();
  const axes = clipAxes();
  const bounds = clipSpaceBounds(modelBox, axes);
  const values = {
    xMin: lerp(bounds.xMin, bounds.xMax, normalized.xMin / 100),
    xMax: lerp(bounds.xMin, bounds.xMax, normalized.xMax / 100),
    yMin: lerp(bounds.yMin, bounds.yMax, normalized.yMin / 100),
    yMax: lerp(bounds.yMin, bounds.yMax, normalized.yMax / 100),
    zMin: lerp(bounds.zMin, bounds.zMax, normalized.zMin / 100),
    zMax: lerp(bounds.zMin, bounds.zMax, normalized.zMax / 100)
  };
  return {
    axes,
    bounds,
    values
  };
}

function clipAxes() {
  const angle = THREE.MathUtils.degToRad(Number(state.section.rotationDeg) || 0);
  return {
    x: new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle)).normalize(),
    y: new THREE.Vector3(0, 1, 0),
    z: new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize()
  };
}

function clipSpaceBounds(modelBox, axes) {
  const corners = modelBoxCorners(modelBox);
  const bounds = {
    xMin: Number.POSITIVE_INFINITY,
    xMax: Number.NEGATIVE_INFINITY,
    yMin: modelBox.min.y,
    yMax: modelBox.max.y,
    zMin: Number.POSITIVE_INFINITY,
    zMax: Number.NEGATIVE_INFINITY
  };
  for (const corner of corners) {
    const x = corner.dot(axes.x);
    const z = corner.dot(axes.z);
    bounds.xMin = Math.min(bounds.xMin, x);
    bounds.xMax = Math.max(bounds.xMax, x);
    bounds.zMin = Math.min(bounds.zMin, z);
    bounds.zMax = Math.max(bounds.zMax, z);
  }
  return bounds;
}

function modelBoxCorners(box) {
  return [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z)
  ];
}

function clipPoint(clip, x, y, z) {
  return new THREE.Vector3()
    .addScaledVector(clip.axes.x, x)
    .addScaledVector(clip.axes.y, y)
    .addScaledVector(clip.axes.z, z);
}

function createClipBoxHelper(clip) {
  const { xMin, xMax, yMin, yMax, zMin, zMax } = clip.values;
  const corners = [
    clipPoint(clip, xMin, yMin, zMin),
    clipPoint(clip, xMax, yMin, zMin),
    clipPoint(clip, xMax, yMin, zMax),
    clipPoint(clip, xMin, yMin, zMax),
    clipPoint(clip, xMin, yMax, zMin),
    clipPoint(clip, xMax, yMax, zMin),
    clipPoint(clip, xMax, yMax, zMax),
    clipPoint(clip, xMin, yMax, zMax)
  ];
  const linePoints = [
    corners[0], corners[1], corners[1], corners[2], corners[2], corners[3], corners[3], corners[0],
    corners[4], corners[5], corners[5], corners[6], corners[6], corners[7], corners[7], corners[4],
    corners[0], corners[4], corners[1], corners[5], corners[2], corners[6], corners[3], corners[7]
  ];
  const group = new THREE.Group();
  group.name = "clip-box-helper";
  const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  const material = new THREE.LineBasicMaterial({
    color: 0xba4a2a,
    depthTest: false,
    transparent: true,
    opacity: 0.9
  });
  group.add(new THREE.LineSegments(geometry, material));
  if (state.section.showHandles) {
    addClipHandles(group, clip, corners);
  }
  return group;
}

function prepareClipHelperObject(object) {
  setObjectLayer(object, SCENE_LAYER_OVERLAY);
  object.traverse((child) => {
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        material.depthTest = false;
        material.depthWrite = false;
        material.transparent = true;
        material.needsUpdate = true;
      }
    }
    child.renderOrder = 1000;
  });
}

function addClipHandles(group, clip, corners) {
  const maxSize = Math.max(...computeModelBox().getSize(new THREE.Vector3()).toArray(), 10);
  const radius = maxSize * 0.0095;
  const pickGeometry = new THREE.SphereGeometry(radius * 1.35, 24, 16);
  const coreGeometry = new THREE.SphereGeometry(radius, 24, 16);
  const haloGeometry = new THREE.SphereGeometry(radius * 1.48, 24, 16);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x7a0505,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.98
  });
  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.42,
    wireframe: true
  });
  const pickMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1f1f,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.12
  });
  const centers = {
    xMin: averageVectors(corners[0], corners[3], corners[4], corners[7]),
    xMax: averageVectors(corners[1], corners[2], corners[5], corners[6]),
    yMin: averageVectors(corners[0], corners[1], corners[2], corners[3]),
    yMax: averageVectors(corners[4], corners[5], corners[6], corners[7]),
    zMin: averageVectors(corners[0], corners[1], corners[4], corners[5]),
    zMax: averageVectors(corners[2], corners[3], corners[6], corners[7])
  };
  const normals = {
    xMin: clip.axes.x.clone().negate(),
    xMax: clip.axes.x.clone(),
    yMin: clip.axes.y.clone().negate(),
    yMax: clip.axes.y.clone(),
    zMin: clip.axes.z.clone().negate(),
    zMax: clip.axes.z.clone()
  };
  for (const [key, position] of Object.entries(centers)) {
    const handle = new THREE.Group();
    handle.position.copy(position);
    handle.userData.clipHandle = key;
    const pick = new THREE.Mesh(pickGeometry, pickMaterial);
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    const stemEnd = normals[key].clone().multiplyScalar(radius * 3.2);
    const stemGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), stemEnd]);
    const stem = new THREE.Line(stemGeometry, new THREE.LineBasicMaterial({
      color: 0x5b0505,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.85
    }));
    for (const item of [pick, halo, core, stem]) {
      item.userData.clipHandle = key;
      item.renderOrder = 1002;
    }
    handle.add(stem, pick, halo, core);
    group.add(handle);
  }
}

function normalizedClipRatios() {
  const box = { ...state.section.box };
  for (const key of Object.keys(box)) {
    box[key] = Math.min(100, Math.max(0, Number(box[key])));
  }
  if (box.xMin > box.xMax - 1) {
    box.xMin = Math.max(0, box.xMax - 1);
  }
  if (box.yMin > box.yMax - 1) {
    box.yMin = Math.max(0, box.yMax - 1);
  }
  if (box.zMin > box.zMax - 1) {
    box.zMin = Math.max(0, box.zMax - 1);
  }
  state.section.box = box;
  return box;
}

function bindClipRange(input, key) {
  input.addEventListener("input", () => {
    state.section.box[key] = Number(input.value);
    normalizeChangedClipRange(key);
    updateClipping();
  });
}

function tryStartClipHandleDrag(event) {
  if (event.button !== 0) {
    return false;
  }
  if (!state.section.enabled || !state.section.showGuide || state.section.mode !== "box" || !state.section.boxHelper) {
    return false;
  }
  const handles = clipHandleMeshes();
  if (handles.length === 0) {
    return false;
  }

  const raycaster = pointerRaycaster(event, SCENE_LAYER_OVERLAY);
  const intersections = raycaster.intersectObjects(handles, false);
  if (intersections.length === 0) {
    return false;
  }

  const handle = intersections[0].object;
  const key = handle.userData.clipHandle;
  const modelBox = computeModelBox();
  const clip = computeClipData(modelBox);
  const axis = clipHandleAxis(key, clip.axes);
  const startPoint = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  state.camera.getWorldDirection(cameraDirection);
  const handlePosition = handle.getWorldPosition(new THREE.Vector3());
  const dragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(cameraDirection, handlePosition);
  if (!raycaster.ray.intersectPlane(dragPlane, startPoint)) {
    return false;
  }

  state.clipDrag = {
    key,
    axis,
    bounds: clip.bounds,
    startPoint,
    startValue: clip.values[key],
    dragPlane,
    pointerId: event.pointerId
  };
  state.controls.enabled = false;
  elements.canvas.setPointerCapture(event.pointerId);
  elements.canvas.style.cursor = "grabbing";
  event.preventDefault();
  event.stopImmediatePropagation();
  return true;
}

function onPointerMove(event) {
  if (!state.clipDrag) {
    return;
  }
  const raycaster = pointerRaycaster(event);
  const point = new THREE.Vector3();
  if (!raycaster.ray.intersectPlane(state.clipDrag.dragPlane, point)) {
    return;
  }
  const delta = point.sub(state.clipDrag.startPoint).dot(state.clipDrag.axis);
  const nextValue = state.clipDrag.startValue + delta;
  state.section.box[state.clipDrag.key] = clipRatioFromValue(
    state.clipDrag.key,
    state.clipDrag.bounds,
    nextValue
  );
  normalizeChangedClipRange(state.clipDrag.key);
  updateClipping();
  event.preventDefault();
  event.stopImmediatePropagation();
}

function endClipDrag(event) {
  if (!state.clipDrag) {
    return;
  }
  try {
    elements.canvas.releasePointerCapture(state.clipDrag.pointerId);
  } catch {
  }
  state.clipDrag = null;
  state.controls.enabled = true;
  elements.canvas.style.cursor = "";
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

function pointerRaycaster(event, layer = SCENE_LAYER_MAIN) {
  const rect = elements.canvas.getBoundingClientRect();
  state.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  state.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  state.raycaster.setFromCamera(state.pointer, state.camera);
  state.raycaster.layers.set(layer);
  return state.raycaster;
}

function clipHandleMeshes() {
  const meshes = [];
  state.section.boxHelper.traverse((child) => {
    if (child.userData && child.userData.clipHandle) {
      meshes.push(child);
    }
  });
  return meshes;
}

function clipHandleAxis(key, axes) {
  if (key.startsWith("x")) {
    return axes.x.clone();
  }
  if (key.startsWith("z")) {
    return axes.z.clone();
  }
  return axes.y.clone();
}

function clipRatioFromValue(key, bounds, value) {
  const axis = key[0];
  const min = bounds[`${axis}Min`];
  const max = bounds[`${axis}Max`];
  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return 0;
  }
  return ((value - min) / (max - min)) * 100;
}

function normalizeChangedClipRange(key) {
  const pairKey = key.endsWith("Min") ? key.replace("Min", "Max") : key.replace("Max", "Min");
  const value = Number(state.section.box[key]);
  const pairValue = Number(state.section.box[pairKey]);
  if (key.endsWith("Min") && value > pairValue - 1) {
    state.section.box[key] = Math.max(0, pairValue - 1);
  }
  if (key.endsWith("Max") && value < pairValue + 1) {
    state.section.box[key] = Math.min(100, pairValue + 1);
  }
}

function resetClipBoxRatios() {
  state.section.box = {
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 100,
    zMin: 0,
    zMax: 100
  };
  syncClipRangeInputs();
}

function resetClippingToSafeBoxMode() {
  state.section.mode = "box";
  state.section.planes = [];
  state.renderer.clippingPlanes = [];
  if (elements.clipMode) {
    elements.clipMode.value = "box";
  }
  resetClipBoxRatios();
}

function syncClipRangeInputs() {
  const box = normalizedClipRatios();
  elements.clipXMinRange.value = String(box.xMin);
  elements.clipXMaxRange.value = String(box.xMax);
  elements.clipYMinRange.value = String(box.yMin);
  elements.clipYMaxRange.value = String(box.yMax);
  elements.clipZMinRange.value = String(box.zMin);
  elements.clipZMaxRange.value = String(box.zMax);
}

function clipBoxRangeInputs() {
  return [
    elements.clipXMinRange,
    elements.clipXMaxRange,
    elements.clipYMinRange,
    elements.clipYMaxRange,
    elements.clipZMinRange,
    elements.clipZMaxRange
  ];
}

function setClipValueLabel(element, label, value, enabled) {
  element.textContent = enabled && Number.isFinite(value)
    ? `${label}: ${formatLength(value)}`
    : `${label}: -`;
}

function removeClippingHelpers() {
  if (state.section.helper) {
    state.scene.remove(state.section.helper);
    disposeObject3D(state.section.helper);
    state.section.helper = null;
  }
  if (state.section.boxHelper) {
    state.scene.remove(state.section.boxHelper);
    disposeObject3D(state.section.boxHelper);
    state.section.boxHelper = null;
  }
}

function resizeRenderer() {
  const rect = elements.canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  state.renderer.setSize(width, height, false);
  const aspect = width / height;
  if (state.perspectiveCamera) {
    state.perspectiveCamera.aspect = aspect;
    state.perspectiveCamera.updateProjectionMatrix();
  }
  if (state.orthographicCamera) {
    const viewScale = clampNumber(state.view.viewSize, 50, 200, 100) / 100;
    const heightWorld = Math.max(0.1, Number(state.view.orthographicHeight) || currentViewDistance() || 20) / viewScale;
    const widthWorld = heightWorld * aspect;
    state.orthographicCamera.left = -widthWorld / 2;
    state.orthographicCamera.right = widthWorld / 2;
    state.orthographicCamera.top = heightWorld / 2;
    state.orthographicCamera.bottom = -heightWorld / 2;
    state.orthographicCamera.updateProjectionMatrix();
  }
  state.camera.updateProjectionMatrix();
}

function animate() {
  state.animationFrame = requestAnimationFrame(animate);
  state.controls.update();
  renderSceneFrame();
}

function renderSceneFrame() {
  const clippingPlanes = activeClippingPlanes();
  state.camera.layers.set(SCENE_LAYER_MAIN);
  state.renderer.clippingPlanes = clippingPlanes;
  updateCameraCoordinateDisplay();
  updateCurrentSpaceOverlay();
  updateSpaceLabels();
  state.renderer.autoClear = true;
  state.renderer.render(state.scene, state.camera);
  if (state.section.enabled && state.section.showGuide) {
    state.renderer.autoClear = false;
    state.renderer.clearDepth();
    state.camera.layers.set(SCENE_LAYER_OVERLAY);
    state.renderer.clippingPlanes = [];
    state.renderer.render(state.scene, state.camera);
  }
  state.renderer.autoClear = true;
  state.camera.layers.set(SCENE_LAYER_MAIN);
  renderMeasurementOverlay();
}

function activeClippingPlanes() {
  if (!state.section.enabled) {
    return [];
  }
  if (state.section.mode === "plane") {
    return [state.section.plane];
  }
  if (!hasNarrowedClipBox()) {
    return [];
  }
  return state.section.planes || [];
}

function hasNarrowedClipBox() {
  const box = normalizedClipRatios();
  return box.xMin > 0.01 ||
    box.yMin > 0.01 ||
    box.zMin > 0.01 ||
    box.xMax < 99.99 ||
    box.yMax < 99.99 ||
    box.zMax < 99.99;
}

function isSpaceInActiveClip(record, expressID) {
  const box = translatedElementBox(record, expressID);
  if (!box || box.isEmpty()) {
    return false;
  }
  if (!state.section.enabled) {
    return true;
  }
  if (state.section.mode === "plane") {
    return modelBoxCorners(box).some((corner) => state.section.plane.distanceToPoint(corner) >= -1e-6);
  }
  if (!hasNarrowedClipBox()) {
    return true;
  }
  const modelBox = computeModelBox();
  if (!modelBox) {
    return true;
  }
  const clip = computeClipData(modelBox);
  const bounds = clipSpaceBounds(box, clip.axes);
  return bounds.xMax >= clip.values.xMin - 1e-6 &&
    bounds.xMin <= clip.values.xMax + 1e-6 &&
    bounds.yMax >= clip.values.yMin - 1e-6 &&
    bounds.yMin <= clip.values.yMax + 1e-6 &&
    bounds.zMax >= clip.values.zMin - 1e-6 &&
    bounds.zMin <= clip.values.zMax + 1e-6;
}

function clearAllModels() {
  for (const record of state.models) {
    removeRecordSubset(record, record.filterSubsetId);
    removeCategoryColorSubsets(record);
    removeAttributeColorSubset(record);
    removeSpaceOverlays(record);
    removeRecordSubset(record, record.selectedSubsetId, materials.selected);
    removeRecordSubset(record, record.commentSubsetId, materials.commented);
    if (record.levelGroup) {
      state.scene.remove(record.levelGroup);
      disposeObject3D(record.levelGroup);
    }
    if (record.objectUrl) {
      URL.revokeObjectURL(record.objectUrl);
    }
    if (isIfcRecord(record)) {
      try {
        state.ifcLoader.ifcManager.close(record.modelID, state.scene);
      } catch {
        state.scene.remove(record.model);
      }
    } else {
      state.scene.remove(record.model);
    }
    disposeObject3D(record.model);
  }
  state.models = [];
  state.activeModelKey = "";
  state.showSpaces = false;
  state.showSpaceNames = false;
  clearSelection();
  clearMeasurements();
  state.currentSpaceSignature = "";
  if (elements.currentSpaceOverlay) {
    elements.currentSpaceOverlay.classList.add("is-hidden");
    elements.currentSpaceOverlay.innerHTML = "";
  }
  clearSpaceLabels();
  removeClippingHelpers();
  state.renderer.clippingPlanes = [];
  updateReferenceGrid();
  renderAll();
  setStatus(t("status.selectModel"));
}

async function buildFileKey(file) {
  const text = `${file.name}|${file.size}|${file.lastModified}`;
  if (!window.crypto || !window.crypto.subtle) {
    return btoa(unescape(encodeURIComponent(text))).replace(/=+$/g, "");
  }
  const bytes = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getRecordByKey(key) {
  return state.models.find((record) => record.key === key) || null;
}

function getRecordByModelID(modelID) {
  return state.models.find((record) => Number(record.modelID) === Number(modelID)) || null;
}

function isIfcRecord(record) {
  return Boolean(record && (record.sourceType || SOURCE_IFC) === SOURCE_IFC);
}

function isStbRecord(record) {
  return Boolean(record && record.sourceType === SOURCE_STB);
}

function getSelectedRecord() {
  return getRecordByKey(state.selectedModelKey);
}

function getActiveRecord() {
  return getRecordByKey(state.activeModelKey);
}

function isSelectedElementVisible() {
  const record = getSelectedRecord();
  return Boolean(record) && state.selectedExpressID !== null && isElementVisible(record, state.selectedExpressID);
}

function isSelectedSpaceElement() {
  const record = getSelectedRecord();
  return Boolean(record && isIfcSpaceElement(record, state.selectedExpressID));
}

function isElementVisible(record, expressID) {
  return Boolean(record && record.enabled && record.visibleExpressIDs.has(Number(expressID)));
}

function hasIfcSpaces() {
  return state.models.some((record) => {
    if (!isIfcRecord(record)) {
      return false;
    }
    if (record.spatialElementsById && record.spatialElementsById.size > 0) {
      return true;
    }
    return Array.from(record.idToCategory.values()).some(isSpaceCategory);
  });
}

function modelTypeLabel(record) {
  return isStbRecord(record) ? t("model.typeStb") : t("model.typeIfc");
}

function modelElementTypeLabel(record) {
  return isStbRecord(record) ? t("selection.stbElement") : t("selection.ifcElement");
}

function elementLabel(record, expressID) {
  return isStbRecord(record) ? `Member ID ${expressID}` : `Express ID ${expressID}`;
}

function modelViewIdentity(record) {
  return {
    fileKey: record.fileKey,
    fileName: record.name,
    sourceType: record.sourceType || SOURCE_IFC
  };
}

function findRecordForViewState(saved) {
  if (!saved) {
    return null;
  }
  const sourceType = saved.sourceType || SOURCE_IFC;
  return state.models.find((record) => record.fileKey === saved.fileKey && (record.sourceType || SOURCE_IFC) === sourceType) ||
    state.models.find((record) => record.name === saved.fileName && (record.sourceType || SOURCE_IFC) === sourceType) ||
    null;
}

function vectorToArray(vector) {
  return [vector.x, vector.y, vector.z];
}

function arrayToVector(value, fallback = new THREE.Vector3()) {
  if (!Array.isArray(value) || value.length < 3) {
    return fallback.clone();
  }
  return new THREE.Vector3(
    Number(value[0]) || 0,
    Number(value[1]) || 0,
    Number(value[2]) || 0
  );
}

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeViewContext(context) {
  if (!context || typeof context !== "object") {
    return null;
  }
  return {
    ...context,
    camera: context.camera && typeof context.camera === "object" ? context.camera : null,
    view: context.view && typeof context.view === "object" ? context.view : null,
    edges: context.edges && typeof context.edges === "object" ? context.edges : null,
    helpers: context.helpers && typeof context.helpers === "object" ? context.helpers : null,
    section: context.section && typeof context.section === "object" ? context.section : null,
    activeModel: context.activeModel && typeof context.activeModel === "object" ? context.activeModel : null
  };
}

function totalCommentCount() {
  return state.models.reduce((sum, record) => sum + record.comments.length, 0);
}

function unionBoxesForIds(record, ids) {
  const box = new THREE.Box3();
  let found = false;
  for (const id of ids) {
    const itemBox = record.boxesByExpressID.get(Number(id));
    if (itemBox && !itemBox.isEmpty()) {
      box.union(itemBox);
      found = true;
    }
  }
  return found ? box : null;
}

function displayNameFromProperties(properties) {
  if (!properties) {
    return "";
  }
  return stringValue(properties.Name) ||
    stringValue(properties.LongName) ||
    stringValue(properties.ObjectType) ||
    stringValue(properties.Tag) ||
    "";
}

function levelNameFromNode(node) {
  return displayNameFromProperties(node) ||
    stringValue(node.Name) ||
    `Level ${node.expressID}`;
}

function stringValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "object" && "value" in value) {
    return stringValue(value.value);
  }
  return "";
}

function numberValue(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "object" && "value" in value) {
    return numberValue(value.value);
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeIfcType(value) {
  const type = stringValue(value).trim().toUpperCase();
  return type || UNCATEGORIZED_CATEGORY;
}

function createId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `comment-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function bcfGuid(value) {
  const text = String(value || createId());
  const hex = [0, 1, 2, 3].map((salt) => hashString(`${salt}:${text}`).toString(16).replace("-", "").padStart(8, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function unique(values) {
  return Array.from(new Set(values));
}

function sortNewestFirst(left, right) {
  return String(right.createdAt).localeCompare(String(left.createdAt));
}

function levelSortValue(name) {
  if (name === UNCATEGORIZED_LEVEL) {
    return Number.POSITIVE_INFINITY;
  }
  for (const record of state.models) {
    const level = record.levelMap.get(name);
    if (level && Number.isFinite(level.elevation)) {
      return level.elevation;
    }
  }
  return 0;
}

function compareLevelsHighToLow(left, right) {
  const leftValue = levelSortValue(left.name);
  const rightValue = levelSortValue(right.name);
  const leftUnknown = !Number.isFinite(leftValue) || leftValue === Number.POSITIVE_INFINITY;
  const rightUnknown = !Number.isFinite(rightValue) || rightValue === Number.POSITIVE_INFINITY;
  if (leftUnknown && rightUnknown) {
    return String(left.name).localeCompare(String(right.name));
  }
  if (leftUnknown) {
    return 1;
  }
  if (rightUnknown) {
    return -1;
  }
  return rightValue - leftValue || String(left.name).localeCompare(String(right.name));
}

function lerp(min, max, ratio) {
  return min + (max - min) * ratio;
}

function averageVectors(...vectors) {
  const result = new THREE.Vector3();
  for (const vector of vectors) {
    result.add(vector);
  }
  return result.multiplyScalar(1 / vectors.length);
}

function normalizeDegrees(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  let degrees = value % 360;
  if (degrees > 180) {
    degrees -= 360;
  }
  if (degrees < -180) {
    degrees += 360;
  }
  return degrees;
}

function formatRotationInput(value) {
  return String(Number(normalizeDegrees(value).toFixed(1)));
}

function capitalizeAscii(value) {
  const text = String(value || "");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function estimateBuildingRotationDeg() {
  const centers = [];
  for (const record of state.models) {
    for (const box of record.boxesByExpressID.values()) {
      if (!box || box.isEmpty()) {
        continue;
      }
      centers.push(box.getCenter(new THREE.Vector3()));
    }
  }
  if (centers.length < 2) {
    return 0;
  }

  const mean = centers.reduce((sum, point) => sum.add(point), new THREE.Vector3()).multiplyScalar(1 / centers.length);
  let xx = 0;
  let zz = 0;
  let xz = 0;
  for (const point of centers) {
    const x = point.x - mean.x;
    const z = point.z - mean.z;
    xx += x * x;
    zz += z * z;
    xz += x * z;
  }
  const principalAngle = 0.5 * Math.atan2(2 * xz, xx - zz);
  return normalizeDegrees(THREE.MathUtils.radToDeg(-principalAngle));
}

function readStoredLanguage() {
  try {
    return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return "ja";
  }
}

function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : "ja";
}

function t(key, params = {}) {
  const dictionary = I18N[state.language] || I18N.ja;
  const template = dictionary[key] || I18N.ja[key] || key;
  return String(template).replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match);
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("app.title");
  for (const uiDocument of uiDocuments()) {
    uiDocument.documentElement.lang = state.language;
    for (const node of uiDocument.querySelectorAll("[data-i18n]")) {
      node.textContent = t(node.dataset.i18n);
    }
    for (const node of uiDocument.querySelectorAll("[data-i18n-placeholder]")) {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    }
    for (const node of uiDocument.querySelectorAll("[data-i18n-aria-label]")) {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    }
  }
  syncPanelCollapseButtons();
}

function uiDocuments() {
  const documents = [document];
  for (const entry of state.panelWindows.values()) {
    if (entry.window && !entry.window.closed && entry.window.document && !documents.includes(entry.window.document)) {
      documents.push(entry.window.document);
    }
  }
  return documents;
}

function localizedFilterName(name) {
  return name === UNCATEGORIZED_CATEGORY || name === UNCATEGORIZED_LEVEL
    ? t("label.uncategorized")
    : name;
}

function localizedPropertyKey(key) {
  if (key === "File") {
    return t("property.file");
  }
  if (key === "Category") {
    return t("property.category");
  }
  if (key === "Level") {
    return t("property.level");
  }
  if (key === "StBridgeElement") {
    return "ST-Bridge";
  }
  if (key === "MemberId") {
    return "Member ID";
  }
  return key;
}

function localizedPropertyValue(key, value) {
  if ((key === "Category" || key === "Level") && (value === UNCATEGORIZED_CATEGORY || value === UNCATEGORIZED_LEVEL)) {
    return t("label.uncategorized");
  }
  return value;
}

function syncViewAppearanceControls() {
  elements.projectionModeSelect.value = state.view.projectionMode;
  elements.viewFovRange.value = String(state.view.fov);
  elements.viewSizeRange.value = String(state.view.viewSize);
  elements.viewFovValue.textContent = t("display.fov", { value: Math.round(state.view.fov) });
  elements.viewSizeValue.textContent = t("display.viewSize", { value: Math.round(state.view.viewSize) });
  elements.viewBrightnessRange.value = String(state.view.brightness);
  elements.viewSaturationRange.value = String(state.view.saturation);
  elements.backgroundColorInput.value = state.view.backgroundColor;
  elements.viewBrightnessValue.textContent = t("display.brightness", { value: state.view.brightness });
  elements.viewSaturationValue.textContent = t("display.saturation", { value: state.view.saturation });
}

function syncAttributeColorControls() {
  state.attributeColor.enabled = elements.attributeColorEnabled.checked;
  state.attributeColor.target = elements.attributeColorTarget.value === "spaces" ? "spaces" : "all";
  state.attributeColor.name = elements.attributeColorName.value.trim();
  state.attributeColor.value = elements.attributeColorValue.value.trim();
  state.attributeColor.mode = elements.attributeColorMode.value === "exact" ? "exact" : "contains";
  state.attributeColor.color = /^#[0-9a-f]{6}$/i.test(elements.attributeColorInput.value)
    ? elements.attributeColorInput.value
    : "#ffb000";
  state.attributeColor.unmatchedOpacity = clampNumber(elements.attributeUnmatchedOpacityRange.value, 0, 100, 35);
  state.attributeColor.showOnly = elements.attributeShowOnly.checked;

  elements.attributeColorEnabled.checked = state.attributeColor.enabled;
  elements.attributeColorTarget.value = state.attributeColor.target;
  elements.attributeColorName.value = state.attributeColor.name;
  elements.attributeColorValue.value = state.attributeColor.value;
  elements.attributeColorMode.value = state.attributeColor.mode;
  elements.attributeColorInput.value = state.attributeColor.color;
  elements.attributeUnmatchedOpacityRange.value = String(state.attributeColor.unmatchedOpacity);
  elements.attributeShowOnly.checked = state.attributeColor.showOnly;
  elements.attributeUnmatchedOpacityValue.textContent = t("attribute.unmatchedOpacity", {
    value: state.attributeColor.unmatchedOpacity
  });
  elements.applyAttributeColorButton.disabled = state.models.length === 0 || !state.attributeColor.name;
  elements.clearAttributeColorButton.disabled = !isAttributeColorActive();
}

async function applyAttributeColorRule() {
  syncAttributeColorControls();
  if (!state.attributeColor.name) {
    elements.attributeColorStatus.textContent = t("attribute.needName");
    elements.attributeColorStatus.classList.add("is-error");
    return;
  }
  if (state.models.length === 0) {
    return;
  }
  state.attributeColor.enabled = true;
  elements.attributeColorEnabled.checked = true;
  if (state.attributeColor.target === "spaces") {
    state.showSpaces = true;
  }
  state.attributeColor.activeSignature = attributeColorSignature();
  elements.attributeColorStatus.classList.remove("is-error");
  elements.attributeColorStatus.textContent = t("attribute.processing");
  updateActions();

  let matchCount = 0;
  for (const record of state.models) {
    record.attributeMatchIds = await findAttributeMatches(record);
    matchCount += record.attributeMatchIds.size;
    applyVisibility(record);
  }
  refreshSceneOverlays();
  renderAll();
  elements.attributeColorStatus.classList.remove("is-error");
  elements.attributeColorStatus.textContent = t("attribute.applied", { count: matchCount });
}

function clearAttributeColorRule() {
  state.attributeColor.enabled = false;
  state.attributeColor.activeSignature = "";
  for (const record of state.models) {
    record.attributeMatchIds = null;
    removeAttributeColorSubset(record);
    applyVisibility(record);
  }
  if (elements.attributeColorEnabled) {
    elements.attributeColorEnabled.checked = false;
  }
  if (elements.attributeColorStatus) {
    elements.attributeColorStatus.textContent = t("attribute.cleared");
    elements.attributeColorStatus.classList.remove("is-error");
  }
  refreshSceneOverlays();
  renderAll();
}

function attributeColorSignature() {
  return [
    state.attributeColor.target,
    state.attributeColor.name.trim().toLowerCase(),
    state.attributeColor.value.trim().toLowerCase(),
    state.attributeColor.mode,
    state.attributeColor.showOnly ? "only" : "dim"
  ].join("|");
}

async function findAttributeMatches(record) {
  if (!record || !record.allExpressIDs) {
    return new Set();
  }
  const ids = await mapWithConcurrency(record.allExpressIDs, 12, async (expressID) => {
    const match = await elementMatchesAttributeRule(record, expressID);
    return match ? Number(expressID) : null;
  });
  return new Set(ids.filter((expressID) => Number.isFinite(expressID)));
}

async function elementMatchesAttributeRule(record, expressID) {
  if (state.attributeColor.target === "spaces" && !isIfcSpaceElement(record, expressID)) {
    return false;
  }
  const rows = await attributeRowsForElement(record, expressID);
  const nameNeedle = normalizeAttributeText(state.attributeColor.name);
  const valueNeedle = normalizeAttributeText(state.attributeColor.value);
  const candidates = rows.filter((row) => attributeKeyMatches(row.key, nameNeedle));
  if (candidates.length === 0) {
    return false;
  }
  if (!valueNeedle) {
    return candidates.some((row) => normalizeAttributeText(row.value));
  }
  return candidates.some((row) => {
    const value = normalizeAttributeText(row.value);
    return state.attributeColor.mode === "exact"
      ? value === valueNeedle
      : value.includes(valueNeedle);
  });
}

async function attributeRowsForElement(record, expressID) {
  if (!record) {
    return [];
  }
  const id = Number(expressID);
  if (record.propertyCache && record.propertyCache.has(id)) {
    return record.propertyCache.get(id);
  }
  let properties = {};
  if (isStbRecord(record)) {
    const item = record.stbElementsById.get(id);
    properties = {
      ...(item && item.properties || {}),
      File: record.name,
      Category: item && item.category || "",
      Level: item && item.levelName || "",
      StBridgeElement: item && item.kind || "",
      MemberId: id,
      Name: item && item.name || ""
    };
  } else {
    try {
      const [itemProperties, ifcType] = await Promise.all([
        state.ifcLoader.ifcManager.getItemProperties(record.modelID, id, true),
        safeGetIfcType(record.modelID, id)
      ]);
      properties = {
        ...itemProperties,
        File: record.name,
        Category: record.idToCategory.get(id) || "",
        Level: record.idToLevel.get(id) || "",
        IfcType: ifcType,
        expressID: id
      };
    } catch {
      properties = {
        File: record.name,
        Category: record.idToCategory.get(id) || "",
        Level: record.idToLevel.get(id) || "",
        expressID: id
      };
    }
  }
  const rows = flattenAttributeRows(properties);
  if (record.propertyCache) {
    record.propertyCache.set(id, rows);
  }
  return rows;
}

function flattenAttributeRows(value, prefix = "", rows = [], seen = new WeakSet()) {
  if (value === null || value === undefined) {
    return rows;
  }
  if (typeof value !== "object") {
    if (prefix) {
      rows.push({ key: prefix, value: String(value) });
    }
    return rows;
  }
  if (seen.has(value)) {
    return rows;
  }
  seen.add(value);
  if ("value" in value && Object.keys(value).length <= 3) {
    const scalar = stringValue(value);
    if (prefix && scalar) {
      rows.push({ key: prefix, value: scalar });
    }
    return rows;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenAttributeRows(item, `${prefix}[${index}]`, rows, seen));
    return rows;
  }
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === "function") {
      continue;
    }
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    flattenAttributeRows(child, nextPrefix, rows, seen);
  }
  return rows;
}

function attributeKeyMatches(key, needle) {
  if (!needle) {
    return false;
  }
  const normalized = normalizeAttributeText(key);
  const tail = normalizeAttributeText(String(key || "").split(".").pop());
  return normalized.includes(needle) || tail === needle;
}

function normalizeAttributeText(value) {
  return String(value || "").trim().toLowerCase();
}

function setProjectionMode(mode) {
  const nextMode = mode === "orthographic" ? "orthographic" : "perspective";
  if (state.view.projectionMode === nextMode && state.camera) {
    return;
  }
  const previousCamera = state.camera;
  state.view.projectionMode = nextMode;
  state.camera = nextMode === "orthographic" ? state.orthographicCamera : state.perspectiveCamera;
  if (previousCamera && state.camera && previousCamera !== state.camera) {
    state.camera.position.copy(previousCamera.position);
    state.camera.quaternion.copy(previousCamera.quaternion);
    state.camera.near = previousCamera.near;
    state.camera.far = previousCamera.far;
  }
  state.camera.layers.set(SCENE_LAYER_MAIN);
  state.controls.object = state.camera;
  applyProjectionSettings();
  syncViewAppearanceControls();
}

function applyProjectionSettings() {
  state.view.fov = clampNumber(state.view.fov, 20, 85, 55);
  state.view.viewSize = clampNumber(state.view.viewSize, 50, 200, 100);
  if (state.perspectiveCamera) {
    state.perspectiveCamera.fov = state.view.fov;
  }
  resizeRenderer();
}

function applyViewAppearance() {
  state.view.brightness = clampNumber(state.view.brightness, 50, 150, 100);
  state.view.saturation = clampNumber(state.view.saturation, 0, 180, 100);
  if (!/^#[0-9a-f]{6}$/i.test(state.view.backgroundColor)) {
    state.view.backgroundColor = "#b8c6d0";
  }
  elements.canvas.style.filter = `brightness(${state.view.brightness}%) saturate(${state.view.saturation}%)`;
  elements.dropZone.style.background = state.view.backgroundColor;
  state.scene.background = new THREE.Color(state.view.backgroundColor);
  syncViewAppearanceControls();
}

function syncEdgeControls() {
  state.edges.enabled = state.edges.enabled === true;
  state.edges.ifcEnabled = state.edges.ifcEnabled === true;
  state.edges.opacity = clampNumber(state.edges.opacity, 0, 100, 65);
  state.edges.threshold = clampNumber(state.edges.threshold, 1, 89, 45);
  if (!/^#[0-9a-f]{6}$/i.test(state.edges.color)) {
    state.edges.color = "#1f2933";
  }
  elements.edgeToggle.checked = state.edges.enabled;
  elements.ifcEdgeToggle.checked = state.edges.ifcEnabled;
  elements.ifcEdgeToggle.disabled = !state.edges.enabled;
  elements.edgeOpacityRange.value = String(state.edges.opacity);
  elements.edgeOpacityRange.disabled = !state.edges.enabled;
  elements.edgeThresholdRange.value = String(state.edges.threshold);
  elements.edgeThresholdRange.disabled = !state.edges.enabled;
  elements.edgeColorInput.value = state.edges.color;
  elements.edgeColorInput.disabled = !state.edges.enabled;
  elements.edgeOpacityValue.textContent = t("edge.opacity", { value: state.edges.opacity });
  elements.edgeThresholdValue.textContent = t("edge.threshold", { value: state.edges.threshold });
}

function updateAllEdgeOverlays() {
  for (const record of state.models) {
    updateRecordEdgeOverlays(record);
  }
}

function updateRecordEdgeOverlays(record) {
  if (!record) {
    return;
  }
  if (isStbRecord(record)) {
    updateStbEdgeOverlays(record);
  } else {
    updateIfcEdgeOverlays(record);
  }
}

function updateStbEdgeOverlays(record) {
  for (const item of record.stbElementsById.values()) {
    removeEdgeOverlaysFromObject(item.mesh);
    if (!state.edges.enabled || !item.mesh.geometry) {
      continue;
    }
    const line = createEdgeOverlay(item.mesh.geometry);
    line.userData.isStbEdge = true;
    item.mesh.add(line);
  }
}

function updateIfcEdgeOverlays(record) {
  const targets = [
    record.model,
    record.visibilitySubset,
    ...Array.from(record.categoryColorSubsets.values()).map((entry) => entry.subset),
    record.attributeColorSubset
  ]
    .filter(Boolean);
  for (const target of targets) {
    removeEdgeOverlaysFromObject(target);
  }
  if (!state.edges.enabled || !state.edges.ifcEnabled) {
    return;
  }
  for (const target of targets) {
    addEdgeOverlaysToObject(target);
  }
}

function addEdgeOverlaysToObject(root) {
  const meshes = [];
  root.traverse((child) => {
    if (child.isMesh && child.geometry && !(child.userData && child.userData.openBimEdgeOverlay)) {
      meshes.push(child);
    }
  });
  for (const mesh of meshes) {
    mesh.add(createEdgeOverlay(mesh.geometry));
  }
}

function createEdgeOverlay(geometry) {
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, edgeThresholdDegrees()),
    new THREE.LineBasicMaterial({
      color: edgeColorHex(),
      transparent: true,
      opacity: edgeOpacityRatio(),
      depthTest: true,
      depthWrite: false
    })
  );
  line.userData.openBimEdgeOverlay = true;
  setObjectLayer(line, SCENE_LAYER_MAIN);
  return line;
}

function removeEdgeOverlaysFromObject(root) {
  if (!root) {
    return;
  }
  const overlays = [];
  root.traverse((child) => {
    for (const nested of child.children || []) {
      if (nested.userData && nested.userData.openBimEdgeOverlay) {
        overlays.push(nested);
      }
    }
  });
  for (const overlay of overlays) {
    if (overlay.parent) {
      overlay.parent.remove(overlay);
    }
    disposeObject3D(overlay);
  }
}

function edgeOpacityRatio() {
  return clampNumber(state.edges.opacity, 0, 100, 65) / 100;
}

function edgeThresholdDegrees() {
  return clampNumber(state.edges.threshold, 1, 89, 45);
}

function edgeColorHex() {
  const color = /^#[0-9a-f]{6}$/i.test(state.edges.color) ? state.edges.color : "#1f2933";
  return new THREE.Color(color).getHex();
}

function normalizeColorMode(value) {
  return ["original", "single", "category", "level"].includes(value) ? value : "original";
}

function usesGeneratedColorSubsets(record) {
  const mode = normalizeColorMode(record && record.display && record.display.colorMode);
  return mode === "category" || mode === "level";
}

function colorGroupsForRecord(record) {
  if (!record) {
    return [];
  }
  const source = record.display.colorMode === "level" ? record.levelMap : record.categoryMap;
  const groups = Array.from(source.values());
  if (record.display.colorMode === "level") {
    return groups.sort(compareLevelsHighToLow);
  }
  return groups.sort(compareCategoriesByName);
}

function compareCategoriesByName(left, right) {
  return String(left.name).localeCompare(String(right.name), "en", {
    numeric: true,
    sensitivity: "base"
  });
}

function displayGroupColor(record, name) {
  const seed = `${record.display.colorMode}:${name}`;
  const index = Math.abs(hashString(seed)) % CATEGORY_COLOR_PALETTE.length;
  return CATEGORY_COLOR_PALETTE[index];
}

function categoryColorSubsetId(mode, name) {
  return `${CATEGORY_COLOR_SUBSET_PREFIX}-${mode}-${Math.abs(hashString(name)).toString(36)}`;
}

function formatOffsetInput(value) {
  return String(Math.round(Number(value) || 0));
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < String(value).length; i++) {
    hash = ((hash << 5) - hash) + String(value).charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function setObjectLayer(object, layer) {
  object.traverse((child) => {
    child.layers.set(layer);
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function formatLength(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  const abs = Math.abs(value);
  if (abs >= 1000) {
    return value.toFixed(0);
  }
  if (abs >= 10) {
    return value.toFixed(1);
  }
  return value.toFixed(2);
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || "";
  }
  return new Intl.DateTimeFormat(state.language === "en" ? "en-US" : "ja-JP", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}

function safeFileBase(value) {
  return String(value || "ifc")
    .replace(/\.ifc$/i, "")
    .replace(/[\\/:*?"<>|]+/g, "_")
    .slice(0, 80);
}

function textToBase64(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function base64ToText(value) {
  const binary = atob(String(value));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function bcfNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(6).replace(/\.?0+$/, "") : "0";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function createStoredZip(files) {
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const file of files) {
    const nameBytes = utf8Bytes(file.name);
    const dataBytes = file.content instanceof Uint8Array ? file.content : utf8Bytes(file.content);
    const crc = crc32(dataBytes);
    const local = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint16(12, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, dataBytes.length, true);
    localView.setUint32(22, dataBytes.length, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    chunks.push(local, dataBytes);
    central.push({ nameBytes, crc, size: dataBytes.length, offset });
    offset += local.length + dataBytes.length;
  }

  const centralOffset = offset;
  for (const entry of central) {
    const header = new Uint8Array(46 + entry.nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint16(14, 0, true);
    view.setUint32(16, entry.crc, true);
    view.setUint32(20, entry.size, true);
    view.setUint32(24, entry.size, true);
    view.setUint16(28, entry.nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, entry.offset, true);
    header.set(entry.nameBytes, 46);
    chunks.push(header);
    offset += header.length;
  }

  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, central.length, true);
  endView.setUint16(10, central.length, true);
  endView.setUint32(12, offset - centralOffset, true);
  endView.setUint32(16, centralOffset, true);
  endView.setUint16(20, 0, true);
  chunks.push(end);
  return new Blob(chunks, { type: "application/zip" });
}

function utf8Bytes(value) {
  return new TextEncoder().encode(String(value || ""));
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = (crc >>> 8) ^ crc32Table()[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function crc32Table() {
  if (crc32Table.cache) {
    return crc32Table.cache;
  }
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index++) {
    let value = index;
    for (let bit = 0; bit < 8; bit++) {
      value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    }
    table[index] = value >>> 0;
  }
  crc32Table.cache = table;
  return table;
}

function niceGridSize(value) {
  const raw = Math.max(40, Number(value) || 40);
  const exponent = Math.floor(Math.log10(raw));
  const base = 10 ** exponent;
  const scaled = raw / base;
  const multiplier = scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return multiplier * base;
}

function niceGridStep(size) {
  return niceGridSize(size / 40);
}

function disposeObject3D(object) {
  object.traverse((child) => {
    if (child.geometry && typeof child.geometry.dispose === "function") {
      child.geometry.dispose();
    }
    const materialsToDispose = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materialsToDispose) {
      if (!material) {
        continue;
      }
      if (material.map && typeof material.map.dispose === "function") {
        material.map.dispose();
      }
      if (typeof material.dispose === "function") {
        material.dispose();
      }
    }
  });
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function yieldToBrowser() {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}

function el(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}
