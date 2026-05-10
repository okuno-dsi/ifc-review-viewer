import { THREE, OrbitControls, IFCLoader } from "./vendor/ifc-runtime.js";

const elements = {
  canvas: document.getElementById("viewerCanvas"),
  dropZone: document.getElementById("dropZone"),
  emptyState: document.getElementById("emptyState"),
  statusBar: document.getElementById("statusBar"),
  fileInput: document.getElementById("ifcFileInput"),
  fileSummary: document.getElementById("fileSummary"),
  languageSelect: document.getElementById("languageSelect"),
  fitButton: document.getElementById("fitButton"),
  clearModelsButton: document.getElementById("clearModelsButton"),
  toggleCommentHighlightButton: document.getElementById("toggleCommentHighlightButton"),
  exportCommentsButton: document.getElementById("exportCommentsButton"),
  exportCommentedIfcButton: document.getElementById("exportCommentedIfcButton"),
  importCommentsInput: document.getElementById("importCommentsInput"),
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
  viewBrightnessRange: document.getElementById("viewBrightnessRange"),
  viewBrightnessValue: document.getElementById("viewBrightnessValue"),
  viewSaturationRange: document.getElementById("viewSaturationRange"),
  viewSaturationValue: document.getElementById("viewSaturationValue"),
  backgroundColorInput: document.getElementById("backgroundColorInput"),
  resetViewAppearanceButton: document.getElementById("resetViewAppearanceButton"),
  popoutToggleButtons: Array.from(document.querySelectorAll(".popout-toggle")),
  sectionToggle: document.getElementById("sectionToggle"),
  clipHandleToggle: document.getElementById("clipHandleToggle"),
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
  allCommentList: document.getElementById("allCommentList")
};

const COMMENT_STORAGE_PREFIX = "ifc-review-comments:";
const AUTHOR_STORAGE_KEY = "ifc-review-author";
const EMBEDDED_COMMENTS_MARKER = "IFC_REVIEW_VIEWER_COMMENTS_BASE64";
const EMBEDDED_COMMENTS_END_MARKER = "IFC_REVIEW_VIEWER_COMMENTS_END";
const EMBEDDED_COMMENTS_PATTERN = /\/\*\s*IFC_REVIEW_VIEWER_COMMENTS_BASE64\s*([\s\S]*?)\s*IFC_REVIEW_VIEWER_COMMENTS_END\s*\*\//g;
const SELECTED_SUBSET_ID = "selected-element";
const COMMENT_SUBSET_ID = "comment-elements";
const VISIBLE_SUBSET_ID = "visible-filter";
const CATEGORY_COLOR_SUBSET_PREFIX = "category-color";
const SCENE_LAYER_MAIN = 0;
const UNCATEGORIZED_CATEGORY = "未分類";
const UNCATEGORIZED_LEVEL = "未分類";
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

const I18N = {
  ja: {
    "app.title": "IFC Review Viewer",
    "ui.addIfc": "IFC を追加",
    "ui.fit": "全体表示",
    "ui.commentElements": "コメント要素",
    "ui.exportComments": "コメント書出",
    "ui.exportCommentedIfc": "コメント埋込IFC書出",
    "ui.importComments": "コメント読込",
    "ui.clear": "全消去",
    "ui.ifc": "IFC",
    "ui.displaySettings": "表示設定",
    "ui.clip": "クリップ",
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
    "empty.title": "IFC ファイルをドロップまたは選択",
    "empty.body": "要素をクリックすると属性確認とコメント保存ができます。",
    "summary.noIfc": "IFC ファイルを読み込んでください",
    "summary.loaded": "{count} IFC / {size} / コメント {comments} 件",
    "panel.selection": "選択要素",
    "panel.loadedIfc": "読込 IFC",
    "panel.categories": "カテゴリ表示",
    "panel.levels": "レベル表示",
    "panel.displayHelpers": "表示補助",
    "panel.modelAppearance": "モデル表示",
    "panel.clipping": "クリッピング",
    "panel.commentEditor": "コメント記入",
    "panel.selectedComments": "選択要素のコメント",
    "panel.allComments": "全コメント",
    "filters.afterLoad": "IFC 読込後に表示されます。",
    "display.grid": "基準グリッド",
    "display.levelLines": "レベル線",
    "display.categoryColors": "カテゴリ別色分け",
    "display.resetAppearance": "表示をリセット",
    "display.brightness": "明度: {value}%",
    "display.saturation": "彩度: {value}%",
    "display.background": "背景色",
    "clip.enabled": "クリッピング表示",
    "clip.handles": "ハンドル表示",
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
    "clip.positionEmpty": "位置: -",
    "clip.position": "位置: {value}",
    "clip.xMin": "X 最小",
    "clip.xMax": "X 最大",
    "clip.yMin": "Y 最小",
    "clip.yMax": "Y 最大",
    "clip.zMin": "Z 最小",
    "clip.zMax": "Z 最大",
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
    "comment.savedLocalSuffix": "ブラウザ保存",
    "comment.defaultAuthor": "anonymous",
    "comment.targetModel": "建物全体",
    "comment.targetDepartment": "部門・範囲",
    "selection.none": "未選択",
    "selection.ifcElement": "IFC 要素",
    "model.none": "IFC は未読込です。",
    "model.noActive": "IFC を選択すると個別の表示設定を変更できます。",
    "model.elements": "{name} ({count} 要素)",
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
    "model.categoryControls": "この IFC のカテゴリ表示",
    "model.levelControls": "この IFC のレベル表示",
    "model.noCategories": "この IFC にカテゴリ情報はありません。",
    "model.noLevels": "この IFC にレベル情報はありません。",
    "model.resetAppearance": "この IFC の表示をリセット",
    "filters.noCategories": "カテゴリはありません。",
    "filters.noLevels": "レベル情報はありません。",
    "label.uncategorized": "未分類",
    "property.file": "ファイル",
    "property.category": "カテゴリ",
    "property.level": "レベル",
    "status.idle": "待機中",
    "status.selectIfc": "IFC ファイルを選択してください。",
    "status.parsingIfc": "IFC 解析中: {percent}%",
    "status.onlyIfc": "IFC ファイルだけを読み込めます。",
    "status.selectIfcExtension": "拡張子 .ifc のファイルを選択してください。",
    "status.loadingFile": "{name} を読み込んでいます...",
    "status.analyzingFile": "{name} のカテゴリとレベルを解析しています...",
    "status.loadedFile": "{name} を読み込みました。カテゴリ、レベル、クリッピングで表示を切り替えられます。",
    "status.loadFailed": "IFC の読み込みに失敗しました: {message}",
    "status.analyzingCategory": "{name} のカテゴリ解析中: {completed}/{total}",
    "status.languageChanged": "表示言語を日本語に切り替えました。",
    "commentStatus.emptyBody": "コメント本文を入力してください。",
    "commentStatus.selectElement": "選択要素へのコメントは、先に要素を選択してください。",
    "commentStatus.selectCommentTarget": "コメント対象の IFC を選択してください。",
    "commentStatus.departmentRequired": "部門・範囲名を入力してください。",
    "commentStatus.saved": "保存しました。",
    "commentStatus.deleted": "コメントを削除しました。",
    "commentStatus.loadIfcFirst": "先に IFC ファイルを読み込んでください。",
    "commentStatus.imported": "{count} 件のコメントを読み込みました。",
    "commentStatus.noImportMatch": "一致する IFC に読み込めるコメントがありません。",
    "commentStatus.importFailed": "コメント読込に失敗しました: {message}",
    "commentStatus.embeddedImported": "IFC 内のコメント {count} 件を読み込みました。",
    "commentStatus.ifcExported": "コメントを埋め込んだ IFC コピーを書き出しました。",
    "commentStatus.ifcExportFailed": "コメント埋込 IFC の書出に失敗しました: {message}"
  },
  en: {
    "app.title": "IFC Review Viewer",
    "ui.addIfc": "Add IFC",
    "ui.fit": "Fit All",
    "ui.commentElements": "Commented",
    "ui.exportComments": "Export Comments",
    "ui.exportCommentedIfc": "Export Commented IFC",
    "ui.importComments": "Import Comments",
    "ui.clear": "Clear All",
    "ui.ifc": "IFC",
    "ui.displaySettings": "Display Settings",
    "ui.clip": "Clip",
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
    "empty.title": "Drop or Select IFC Files",
    "empty.body": "Click an element to inspect properties and save comments.",
    "summary.noIfc": "Load IFC files to begin",
    "summary.loaded": "{count} IFC / {size} / {comments} comments",
    "panel.selection": "Selected Element",
    "panel.loadedIfc": "Loaded IFC",
    "panel.categories": "Categories",
    "panel.levels": "Levels",
    "panel.displayHelpers": "Display Helpers",
    "panel.modelAppearance": "Model Appearance",
    "panel.clipping": "Clipping",
    "panel.commentEditor": "Add Comment",
    "panel.selectedComments": "Selected Comments",
    "panel.allComments": "All Comments",
    "filters.afterLoad": "Shown after IFC files are loaded.",
    "display.grid": "Reference Grid",
    "display.levelLines": "Level Lines",
    "display.categoryColors": "Color by Category",
    "display.resetAppearance": "Reset Appearance",
    "display.brightness": "Brightness: {value}%",
    "display.saturation": "Saturation: {value}%",
    "display.background": "Background Color",
    "clip.enabled": "Enable Clipping",
    "clip.handles": "Show Handles",
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
    "clip.positionEmpty": "Position: -",
    "clip.position": "Position: {value}",
    "clip.xMin": "X Min",
    "clip.xMax": "X Max",
    "clip.yMin": "Y Min",
    "clip.yMax": "Y Max",
    "clip.zMin": "Z Min",
    "clip.zMax": "Z Max",
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
    "comment.savedLocalSuffix": "saved in browser",
    "comment.defaultAuthor": "anonymous",
    "comment.targetModel": "Whole Building",
    "comment.targetDepartment": "Department / Area",
    "selection.none": "No selection",
    "selection.ifcElement": "IFC Element",
    "model.none": "No IFC files loaded.",
    "model.noActive": "Select an IFC to edit its display settings.",
    "model.elements": "{name} ({count} elements)",
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
    "model.categoryControls": "Categories for This IFC",
    "model.levelControls": "Levels for This IFC",
    "model.noCategories": "No category information for this IFC.",
    "model.noLevels": "No level information for this IFC.",
    "model.resetAppearance": "Reset This IFC",
    "filters.noCategories": "No categories.",
    "filters.noLevels": "No level information.",
    "label.uncategorized": "Uncategorized",
    "property.file": "File",
    "property.category": "Category",
    "property.level": "Level",
    "status.idle": "Idle",
    "status.selectIfc": "Select IFC files.",
    "status.parsingIfc": "Parsing IFC: {percent}%",
    "status.onlyIfc": "Only IFC files can be loaded.",
    "status.selectIfcExtension": "Select files with the .ifc extension.",
    "status.loadingFile": "Loading {name}...",
    "status.analyzingFile": "Analyzing categories and levels for {name}...",
    "status.loadedFile": "{name} loaded. Use categories, levels, and clipping to control visibility.",
    "status.loadFailed": "Failed to load IFC: {message}",
    "status.analyzingCategory": "Analyzing categories for {name}: {completed}/{total}",
    "status.languageChanged": "Display language changed to English.",
    "commentStatus.emptyBody": "Enter a comment body.",
    "commentStatus.selectElement": "Select an element before saving an element comment.",
    "commentStatus.selectCommentTarget": "Select a target IFC for this comment.",
    "commentStatus.departmentRequired": "Enter a department or area name.",
    "commentStatus.saved": "Saved.",
    "commentStatus.deleted": "Comment deleted.",
    "commentStatus.loadIfcFirst": "Load an IFC file first.",
    "commentStatus.imported": "Imported {count} comments.",
    "commentStatus.noImportMatch": "No comments matched the loaded IFC files.",
    "commentStatus.importFailed": "Failed to import comments: {message}",
    "commentStatus.embeddedImported": "Imported {count} comments embedded in the IFC.",
    "commentStatus.ifcExported": "Exported an IFC copy with embedded comments.",
    "commentStatus.ifcExportFailed": "Failed to export commented IFC: {message}"
  }
};

const state = {
  renderer: null,
  scene: null,
  camera: null,
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
  showGrid: true,
  showLevels: false,
  collapsedPanels: new Set(),
  view: {
    brightness: 100,
    saturation: 100,
    backgroundColor: "#b8c6d0"
  },
  referenceGrid: null,
  openPopouts: new Set(),
  clipDrag: null,
  clipMenuAutoEnabled: false,
  section: {
    enabled: false,
    showHandles: true,
    mode: "box",
    axis: "y",
    ratio: 50,
    rotationDeg: 0,
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
  })
};

init();

function init() {
  initThree();
  initIfc();
  bindEvents();
  initCollapsiblePanels();
  if (elements.languageSelect) {
    elements.languageSelect.value = state.language;
  }
  applyLanguage();
  syncViewAppearanceControls();
  applyViewAppearance();
  elements.authorInput.value = localStorage.getItem(AUTHOR_STORAGE_KEY) || "";
  renderAll();
  setStatus(t("status.selectIfc"));
  animate();
}

function initThree() {
  state.scene = new THREE.Scene();
  state.scene.background = new THREE.Color(0xb8c6d0);

  state.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000000);
  state.camera.position.set(12, 10, 12);
  state.camera.layers.set(SCENE_LAYER_MAIN);

  state.renderer = new THREE.WebGLRenderer({
    canvas: elements.canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true
  });
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

  elements.importCommentsInput.addEventListener("change", () => {
    const file = elements.importCommentsInput.files && elements.importCommentsInput.files[0];
    if (file) {
      importComments(file);
    }
    elements.importCommentsInput.value = "";
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
    const files = Array.from(event.dataTransfer.files || []).filter((item) =>
      item.name.toLowerCase().endsWith(".ifc"));
    if (files.length > 0) {
      loadIfcFiles(files);
    } else {
      setStatus(t("status.onlyIfc"), true);
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
  elements.clearModelsButton.addEventListener("click", clearAllModels);
  elements.toggleCommentHighlightButton.addEventListener("click", () => {
    state.showCommentHighlights = !state.showCommentHighlights;
    updateAllCommentHighlights();
    updateActions();
  });
  elements.exportCommentsButton.addEventListener("click", exportComments);
  elements.exportCommentedIfcButton.addEventListener("click", exportCommentedIfc);
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
  elements.viewSaturationRange.addEventListener("input", () => {
    state.view.saturation = Number(elements.viewSaturationRange.value);
    applyViewAppearance();
  });
  elements.backgroundColorInput.addEventListener("input", () => {
    state.view.backgroundColor = elements.backgroundColorInput.value;
    applyViewAppearance();
  });
  elements.resetViewAppearanceButton.addEventListener("click", () => {
    state.view.brightness = 100;
    state.view.saturation = 100;
    state.view.backgroundColor = "#b8c6d0";
    syncViewAppearanceControls();
    applyViewAppearance();
  });
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
  window.addEventListener("resize", resizeRenderer);
  window.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
      fitAllModelsToView();
    }
  });
}

async function loadIfcFiles(files) {
  const ifcFiles = files.filter((file) => file.name.toLowerCase().endsWith(".ifc"));
  if (ifcFiles.length === 0) {
    setStatus(t("status.selectIfcExtension"), true);
    return;
  }

  elements.emptyState.classList.add("is-hidden");
  updateActions();

  for (const file of ifcFiles) {
    await loadIfcFile(file);
  }

  updateReferenceGrid();
  updateClipping();
  fitAllModelsToView();
  renderAll();
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
    levelGroup: null,
    filterSubsetId: VISIBLE_SUBSET_ID,
    selectedSubsetId: SELECTED_SUBSET_ID,
    commentSubsetId: COMMENT_SUBSET_ID
  };
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

function addCategory(record, expressID, rawType) {
  const name = normalizeIfcType(rawType);
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

function applyVisibility(record) {
  removeRecordSubset(record, record.filterSubsetId);
  removeCategoryColorSubsets(record);
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

  const visibleIds = record.allExpressIDs.filter((expressID) => {
    const category = record.categoryMap.get(record.idToCategory.get(expressID));
    const level = record.levelMap.get(record.idToLevel.get(expressID));
    return (!category || category.visible) && (!level || level.visible);
  });

  record.visibleExpressIDs = new Set(visibleIds);
  const isFiltered = visibleIds.length !== record.allExpressIDs.length;
  record.model.visible = !isFiltered;

  if (isFiltered && visibleIds.length > 0) {
    try {
      record.visibilitySubset = state.ifcLoader.ifcManager.createSubset({
        modelID: record.modelID,
        ids: visibleIds,
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
  applyRecordAppearance(record);
  applyRecordTransform(record);
}

function updateColorSubsets(record) {
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
    const ids = group.ids.filter((expressID) => record.visibleExpressIDs.has(Number(expressID)));
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

function applyRecordAppearance(record) {
  if (!record || !record.display) {
    return;
  }
  record.display.colorMode = normalizeColorMode(record.display.colorMode);
  record.display.opacity = clampNumber(record.display.opacity, 5, 100, 100);
  const opacityRatio = record.display.opacity / 100;
  applyObjectAppearance(record.model, record, opacityRatio, true);
  applyObjectAppearance(record.visibilitySubset, record, opacityRatio, true);
  for (const entry of record.categoryColorSubsets.values()) {
    applyMaterialAppearance(entry.material, record, opacityRatio, false);
  }
}

function applyObjectAppearance(object, record, opacityRatio, allowTint) {
  if (!object) {
    return;
  }
  object.traverse((child) => {
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

  if (state.models.length === 0 || event.button !== 0) {
    return;
  }

  const rect = elements.canvas.getBoundingClientRect();
  state.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  state.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  state.raycaster.setFromCamera(state.pointer, state.camera);
  state.raycaster.layers.set(SCENE_LAYER_MAIN);

  const intersections = state.raycaster.intersectObjects(getPickableMeshes(), false);
  if (intersections.length === 0) {
    await selectElement(null, null);
    return;
  }

  const hit = intersections[0];
  const record = getRecordByModelID(hit.object.modelID);
  if (!record) {
    await selectElement(null, null);
    return;
  }

  const expressID = state.ifcLoader.ifcManager.getExpressId(hit.object.geometry, hit.faceIndex);
  await selectElement(record, expressID);
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

async function safeGetIfcType(modelID, expressID) {
  try {
    return await state.ifcLoader.ifcManager.getIfcType(modelID, expressID);
  } catch {
    return "";
  }
}

function updateSelectionHighlight() {
  for (const record of state.models) {
    removeRecordSubset(record, record.selectedSubsetId, materials.selected);
  }

  const record = getSelectedRecord();
  if (!record || state.selectedExpressID === null || !isElementVisible(record, state.selectedExpressID)) {
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
  if (!record || !record.model) {
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
    createdAt: new Date().toISOString()
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
        createdAt: stringValue(comment.createdAt) || new Date().toISOString()
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
    version: 2,
    exportedAt: new Date().toISOString(),
    files: recordsWithComments.map((record) => ({
      fileKey: record.fileKey,
      fileName: record.name,
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
    list.findIndex((candidate) => candidate.key === record.key) === index && record.comments.length > 0) || null;
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
  return state.models.find((record) => record.fileKey === payload.fileKey) ||
    state.models.find((record) => record.name === payload.fileName) ||
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

function renderAll() {
  renderFileSummary();
  renderModelList();
  renderActiveModelSettings();
  renderCategoryControls();
  renderLevelControls();
  renderSelection();
  renderComments();
  updateSectionControls();
  syncPopouts();
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
    let titleRow = panel.querySelector(":scope > .section-title-row");
    const directHeading = panel.querySelector(":scope > h2");
    if (!titleRow && directHeading) {
      titleRow = el("div", "section-title-row");
      panel.insertBefore(titleRow, directHeading);
      titleRow.append(directHeading);
    }
    if (!titleRow || titleRow.querySelector(".panel-collapse-button")) {
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
}

function syncPanelCollapseButtons() {
  for (const panel of document.querySelectorAll(".popout-panel")) {
    const collapsed = state.collapsedPanels.has(panel.dataset.panelKey);
    panel.classList.toggle("is-collapsed", collapsed);
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

    const text = el("span", "", t("model.elements", { name: record.name, count: record.allExpressIDs.length }));
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
  wrapper.append(el("div", "model-setting-label", title));
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
  elements.selectionSummary.classList.toggle("empty", !selected);

  if (!selected) {
    elements.selectionSummary.textContent = t("selection.none");
    elements.propertyList.innerHTML = "";
    return;
  }

  const record = getSelectedRecord();
  const title = displayNameFromProperties(state.selectedProperties) || `Express ID ${state.selectedExpressID}`;
  const ifcType = stringValue(state.selectedProperties && state.selectedProperties.IfcType);
  const globalId = stringValue(state.selectedProperties && state.selectedProperties.GlobalId);
  elements.selectionSummary.innerHTML = "";
  elements.selectionSummary.append(
    el("div", "selection-title", title),
    el("div", "selection-meta", `${record.name} / ${ifcType || t("selection.ifcElement")} / Express ID ${state.selectedExpressID}`),
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
  const preferred = ["File", "Category", "Level", "IfcType", "GlobalId", "Name", "ObjectType", "Tag", "Description", "PredefinedType"];
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
    return comment.name || `Express ID ${comment.expressID}`;
  }
  if (normalizeCommentScope(comment && comment.scope) === "department") {
    return `${t("comment.targetDepartment")}: ${comment.department || comment.name || "-"}`;
  }
  return t("comment.targetModel");
}

function commentMeta(comment, record) {
  if (isElementComment(comment)) {
    return `${record.name} / ${comment.ifcType || t("selection.ifcElement")} / Express ID ${comment.expressID}`;
  }
  if (normalizeCommentScope(comment && comment.scope) === "department") {
    return `${record.name} / ${t("comment.targetDepartment")}: ${comment.department || comment.name || "-"}`;
  }
  return `${record.name} / ${t("comment.targetModel")}`;
}

function updateActions() {
  const hasModels = state.models.length > 0;
  elements.fitButton.disabled = !hasModels;
  elements.clearModelsButton.disabled = !hasModels;
  elements.toggleCommentHighlightButton.disabled = !hasModels;
  elements.toggleCommentHighlightButton.classList.toggle("primary", hasModels && state.showCommentHighlights);
  elements.exportCommentsButton.disabled = totalCommentCount() === 0;
  elements.exportCommentedIfcButton.disabled = !getCommentedIfcExportTarget();
  syncCommentScopeControls();
  elements.saveCommentButton.disabled = !canSaveComment();
  elements.showAllCategoriesButton.disabled = aggregateCategories().length === 0;
  elements.hideAllCategoriesButton.disabled = aggregateCategories().length === 0;
  elements.showAllLevelsButton.disabled = aggregateLevels().length === 0;
  elements.hideAllLevelsButton.disabled = aggregateLevels().length === 0;
  elements.sectionToggle.disabled = !hasModels;
  elements.clipHandleToggle.disabled = !hasModels || !state.section.enabled || state.section.mode !== "box";
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

function getPickableMeshes() {
  return state.models
    .filter((record) => record.enabled)
    .flatMap((record) => usesGeneratedColorSubsets(record)
      ? Array.from(record.categoryColorSubsets.values()).map((entry) => entry.subset)
      : [record.visibilitySubset || record.model])
    .filter((mesh) => mesh && mesh.visible);
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
  const distance = maxSize / (2 * Math.tan((Math.PI * state.camera.fov) / 360));
  const direction = new THREE.Vector3(1, 0.85, 1).normalize();
  state.camera.near = Math.max(distance / 1000, 0.01);
  state.camera.far = Math.max(distance * 100, 1000);
  state.camera.position.copy(center).add(direction.multiplyScalar(distance * 1.7));
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
    return;
  }

  if (state.section.mode === "plane") {
    updatePlaneClipping(box);
  } else {
    updateBoxClipping(box);
  }
  updateSectionControls();
}

function updatePlaneClipping(box) {
  const axis = state.section.axis;
  const normal = axisVector(axis);
  const value = sectionPositionFromBox(box);
  state.section.plane.normal.copy(normal);
  state.section.plane.constant = -value;
  state.renderer.clippingPlanes = [state.section.plane];

  const size = Math.max(...box.getSize(new THREE.Vector3()).toArray(), 10) * 1.35;
  state.section.helper = new THREE.PlaneHelper(state.section.plane, size, 0xba4a2a);
  state.section.helper.name = "section-plane-helper";
  setObjectLayer(state.section.helper, SCENE_LAYER_MAIN);
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
  state.section.boxHelper = createClipBoxHelper(clip);
  setObjectLayer(state.section.boxHelper, SCENE_LAYER_MAIN);
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

function addClipHandles(group, clip, corners) {
  const maxSize = Math.max(...computeModelBox().getSize(new THREE.Vector3()).toArray(), 10);
  const radius = maxSize * 0.008;
  const geometry = new THREE.SphereGeometry(radius, 24, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x8b0000,
    depthTest: false,
    depthWrite: false
  });
  const centers = {
    xMin: averageVectors(corners[0], corners[3], corners[4], corners[7]),
    xMax: averageVectors(corners[1], corners[2], corners[5], corners[6]),
    yMin: averageVectors(corners[0], corners[1], corners[2], corners[3]),
    yMax: averageVectors(corners[4], corners[5], corners[6], corners[7]),
    zMin: averageVectors(corners[0], corners[1], corners[4], corners[5]),
    zMax: averageVectors(corners[2], corners[3], corners[6], corners[7])
  };
  for (const [key, position] of Object.entries(centers)) {
    const handle = new THREE.Mesh(geometry, material);
    handle.position.copy(position);
    handle.userData.clipHandle = key;
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
  if (!state.section.enabled || state.section.mode !== "box" || !state.section.boxHelper) {
    return false;
  }
  const handles = clipHandleMeshes();
  if (handles.length === 0) {
    return false;
  }

  const raycaster = pointerRaycaster(event, SCENE_LAYER_MAIN);
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
  state.camera.aspect = width / height;
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
  state.renderer.render(state.scene, state.camera);
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

function clearAllModels() {
  for (const record of state.models) {
    removeRecordSubset(record, record.filterSubsetId);
    removeCategoryColorSubsets(record);
    removeRecordSubset(record, record.selectedSubsetId, materials.selected);
    removeRecordSubset(record, record.commentSubsetId, materials.commented);
    if (record.levelGroup) {
      state.scene.remove(record.levelGroup);
      disposeObject3D(record.levelGroup);
    }
    if (record.objectUrl) {
      URL.revokeObjectURL(record.objectUrl);
    }
    try {
      state.ifcLoader.ifcManager.close(record.modelID, state.scene);
    } catch {
      state.scene.remove(record.model);
    }
  }
  state.models = [];
  state.activeModelKey = "";
  clearSelection();
  removeClippingHelpers();
  state.renderer.clippingPlanes = [];
  updateReferenceGrid();
  renderAll();
  setStatus(t("status.selectIfc"));
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

function isElementVisible(record, expressID) {
  return Boolean(record && record.enabled && record.visibleExpressIDs.has(Number(expressID)));
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
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of document.querySelectorAll("[data-i18n-placeholder]")) {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  }
  for (const node of document.querySelectorAll("[data-i18n-aria-label]")) {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  }
  syncPanelCollapseButtons();
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
  return key;
}

function localizedPropertyValue(key, value) {
  if ((key === "Category" || key === "Level") && (value === UNCATEGORIZED_CATEGORY || value === UNCATEGORIZED_LEVEL)) {
    return t("label.uncategorized");
  }
  return value;
}

function syncViewAppearanceControls() {
  elements.viewBrightnessRange.value = String(state.view.brightness);
  elements.viewSaturationRange.value = String(state.view.saturation);
  elements.backgroundColorInput.value = state.view.backgroundColor;
  elements.viewBrightnessValue.textContent = t("display.brightness", { value: state.view.brightness });
  elements.viewSaturationValue.textContent = t("display.saturation", { value: state.view.saturation });
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
