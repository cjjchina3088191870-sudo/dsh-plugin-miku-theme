window.__ModuleLoader__.load({id:"dsh-plugin-miku-theme",factory:(require)=>{const module={exports:{}};const exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  fillComposer: () => fillComposer,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react = __toESM(require("react"), 1);

// src/palette.mjs
var colors = {
  "alias-bg-base": ["#f0fbfd", "#1a2022"],
  "alias-bg-layer-1": ["#f7fdfe", "#232e32"],
  "alias-bg-layer-2": ["#e8f8fa", "#2a363b"],
  "alias-bg-layer-3": ["#dcf2f5", "#304148"],
  "alias-bg-overlay": ["#f8fdfe", "#232e32"],
  "alias-bg-module-platform": ["#f6fdfe", "#202a2e"],
  "alias-bg-document-preview": ["#f7fdfe", "#20272a"],
  "alias-label-primary": ["#214b5d", "#daf6f7"],
  "alias-label-primary-foreground": ["#214b5d", "#daf6f7"],
  "alias-label-primary-bluish": ["#208593", "#aee9f2"],
  "alias-label-secondary": ["#557a8c", "#9dbcc9"],
  "alias-label-tertiary": ["#7da1ae", "#84a2ad"],
  "alias-label-caption": ["#6f8d98", "#a2c6cb"],
  "alias-label-dimmed": ["#7da1ae", "#84a2ad"],
  "alias-label-primary-dimmed": ["#6f8d98", "#a2c6cb"],
  "alias-label-primary-inverted": ["#f7fdfe", "#1d2d33"],
  "alias-border-l1": ["#94ced7", "#5a808f"],
  "alias-border-l2": ["#b1dfe6", "#456572"],
  "alias-border-l2-darkmode-thin": ["#b1dfe6", "#456572"],
  "alias-border-l3": ["#c5e6eb", "#39535d"],
  "alias-border-l4": ["#d6f0f4", "#2f454d"],
  "alias-separator-primary": ["#c5e6eb", "#39535d"],
  "alias-brand-primary": ["#19a7b3", "#6bd8df"],
  "alias-brand-text": ["#138995", "#8fe1e6"],
  "alias-brand-primary-invert": ["#f7fdfe", "#1d2d33"],
  "alias-link": ["#138995", "#8fe1e6"],
  "alias-button-primary-fill": ["#19a7b3", "#6bd8df"],
  "alias-button-primary-hover": ["#138995", "#8fe1e6"],
  "alias-button-primary-dimmed": ["#caedf2", "#3a5b68"],
  "alias-button-contrast-fill": ["#395b68", "#d8f3f7"],
  "alias-button-elevated-fill": ["#f7fdfe", "#27363c"],
  "alias-button-info-fill": ["#e0f5f8", "#2c424a"],
  "alias-button-info-hover": ["#cbedf2", "#37545f"],
  "alias-button-floating-fill": ["#f7fdfe", "#27363c"],
  "alias-button-floating-hover": ["#e0f5f8", "#2c424a"],
  "alias-button-tool-bar-hover": ["#e0f5f8", "#2c424a"],
  "alias-button-tool-bar-fill": ["#f6fdfe", "#27363c"],
  "alias-interactive-bg-hover": ["#e2f7fa", "#2c4048"],
  "alias-interactive-bg-hover-solid": ["#d9f3f7", "#2c4048"],
  "alias-interactive-bg-active": ["#cfeff4", "#36515b"],
  "alias-interactive-bg-hover-accent": ["#d9f3f7", "#36515b"],
  "alias-state-business-primary": ["#19a7b3", "#6bd8df"],
  "alias-state-business-tertiary": ["#e5f8fb", "#2c424b"],
  "alias-settings-card-fill": ["#f7fdfe", "#232e32"],
  "alias-settings-card-stroke": ["#c5e6eb", "#39535d"],
  "alias-menu-group-header-fill": ["#f0fbfd", "#232e32"],
  "alias-menu-icon": ["#6ba9c1", "#92d7e1"],
  "alias-switch-thumb": ["#f7fdfe", "#d8f3f7"],
  "alias-scrollbar-bg-l1": ["#bbdee3", "#46626d"],
  "alias-scrollbar-bg-l2": ["#cdeaee", "#354b54"],
  "alias-scrollbar-hover-l1": ["#8cbfd2", "#6391a2"],
  "alias-scrollbar-hover-l2": ["#9fd5dd", "#527887"],
  "alias-markdown-inline-code": ["#e2f6f9", "#2d3e44"],
  "alias-markdown-code-block": ["#edfafc", "#1b2123"],
  "alias-markdown-code-block-banner": ["#dbf4f8", "#253237"],
  "alias-markdown-code-segment-unselected": ["#edfafc", "#1b2123"],
  "alias-markdown-code-segment-selected": ["#d9f3f7", "#2f4a55"],
  "alias-markdown-citation": ["#4a99b7", "#b7ecf4"],
  "alias-markdown-tag": ["#d5f1f5", "#314d58"],
  "alias-tooltip-bg": ["#395b68", "#cfecf0"],
  "alias-tooltip-key-bg": ["#4d7382", "#a7d5dc"],
  "alias-toast-bg": ["#395b68", "#cfecf0"],
  "alias-toast-label": ["#f7fdfe", "#1d2d33"],
  "alias-turn-trigger-bg": ["#f7fdfe", "#232e32"],
  "alias-turn-trigger-bg-hover": ["#e2f7fa", "#2c4048"],
  "alias-onboarding-card-fill": ["#f7fdfe", "#232e32"],
  "alias-onboarding-secondary-fill": ["#e8f8fa", "#2a363b"],
  "alias-onboarding-accent": ["#57a7c5", "#9ee5f0"],
  "specific-sidebar-fill": ["#f0fbfdd9", "#1d262aed"],
  "specific-sidebar-nav-item-active": ["#d5f1f5", "#2f4a55"],
  "specific-sidebar-nav-item-active-accent": ["#d5f1f5", "#2f4a55"],
  "specific-sidebar-nav-item-hover": ["#e2f7fa", "#2c4048"],
  "specific-input-major": ["#f8fdfef5", "#232e32f5"],
  "specific-login-input": ["#f8fdfe", "#232e32"],
  "specific-selector": ["#f8fdfe", "#27363c"],
  "specific-menu": ["#f8fdfe", "#232e32"],
  "specific-bubble": ["#ddf3f6de", "#324c56de"],
  "specific-bubble-highlight": ["#cdeff4", "#3a5b68"]
};
var TOKENS = Object.fromEntries(Object.entries(colors).map(([key, [light, dark]]) => [`--dsw-${key}`, { light, dark }]));

// src/preferences.mjs
var STORAGE_KEY = "dsh:ekko-miku:v1";
var DEFAULTS = Object.freeze({ enabled: true, artwork: true, companion: true, polaroid: true, opacity: 0.12, mobileNav: "corner" });
function normalizeSettings(value) {
  const v = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    enabled: typeof v.enabled === "boolean" ? v.enabled : true,
    artwork: typeof v.artwork === "boolean" ? v.artwork : true,
    companion: typeof v.companion === "boolean" ? v.companion : true,
    polaroid: typeof v.polaroid === "boolean" ? v.polaroid : true,
    mobileNav: v.mobileNav === "rail" ? "rail" : "corner",
    opacity: typeof v.opacity === "number" && Number.isFinite(v.opacity) ? Math.min(0.24, Math.max(0.04, v.opacity)) : DEFAULTS.opacity
  };
}
function readSettings(storage) {
  try {
    return normalizeSettings(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return { ...DEFAULTS };
  }
}

// src/generated.mjs
var ASSETS = { "wallpaper": "./ekko-skins/assets/miku/c7e78efdffa352c892eed75cf8246dd596f1728ab048761c39036b7de01579da.webp", "hero-backdrop": "./ekko-skins/assets/miku/e2e3499a6d286ad28feb6a22f9c01460b6751095dfe6988775a63bf4e23c8a8f.webp", "hero-mobile": "./ekko-skins/assets/miku/c431dce8f869f0f6e3b7a92b6f794aef192b6fb521b4c33f18f8764738ea9cc2.webp", "figure": "./ekko-skins/assets/miku/4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp", "figure-mobile": "./ekko-skins/assets/miku/bc4fb38eabc8a37402d5bd00233447fad10c80f9b3dde5a5960bd325af745ab0.webp", "photo": "./ekko-skins/assets/miku/eb43c95e8eff934c687cec69c9cf4c3965f9340779b74b96356ae06ca31cd9aa.webp", "chat": "./ekko-skins/assets/miku/4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp", "mark": "./ekko-skins/assets/miku/053a9ebff8574d554f8fb1e68b50c4f16724f78798bbb6329210c04247b39781.svg", "badge": "./ekko-skins/assets/miku/d685cf8b51a232c8dfa28e74024ab274913ed4c15acf2894a9f8ee015f4b42fa.webp", "exclusive": "./ekko-skins/assets/miku/9229b5f57f45b1b90a5cbff2c40cde4b7a64743a149e71260d08dd62634cd039.webp", "task-card": "./ekko-skins/assets/miku/445118cb0b5ae7156f1b81ff5e31e4986658f18d47c8649b401b2b2abaa68cdd.webp", "wave": "./ekko-skins/assets/miku/cbff7068eab03e957ad86ba135af8016eeeb2b565d17c2ebef71640ec38c2c4d.webp", "corners": "./ekko-skins/assets/miku/3acb883431c3ec4c0bc4f353673121ec93d0445c62b56d6b66fe8d4e7ea140f6.svg", "crest": "./ekko-skins/assets/miku/8bfe6b789ac16843ce566aa1bf2fb7d14444f0cfea003dc7dc60a7c46dd8115d.svg", "heart": "./ekko-skins/assets/miku/e8c928584d31e448bee1f481e14e763567e1d8db4bbf4c79b02e25dd014b0bbd.svg", "sparkle": "./ekko-skins/assets/miku/9eb321f3e042b0ab8e5215b2d1575c3eaa59a97fee58b216d6266e39556cf04e.svg", "code": "./ekko-skins/assets/miku/63442194f730bb59bb93b679640abb963a007345d982003ba6dbafd9978ff165.svg", "puzzle": "./ekko-skins/assets/miku/19b9a3b3ae87fc8f298cc07969024f591e0b6341ea28c8b8379d5ff8b7016109.svg", "clipboard": "./ekko-skins/assets/miku/05fd9694169628d159e4e9913f9eea0606d179e0c204da60d6861763c7a083be.svg", "wrench": "./ekko-skins/assets/miku/a2dadefdfef7ec7656b20a4dd1447be452532a2a9b856693bd2b793c4f7e1cb1.svg", "close": "./ekko-skins/assets/miku/2f88bcbd25182515d7962a9592322b08fece54303fbafc00bd032221b32e0f0b.svg", "photo-icon": "./ekko-skins/assets/miku/da723a54949b613a74dda7bd3792e9adb382e7b018458bad609b4a9c07a1917c.svg", "trim": "./ekko-skins/assets/miku/34325a82a74620c799c742cf17511e1fff309d7e6bd15b6dd9e721a9c185edc6.webp", "ribbon": "./ekko-skins/assets/miku/c3dda0a51cc5aa4ee1d61796e95d741a15587a703e55a0305755965d17b79481.webp", "sidebar-note": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTZhOGI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48L3N2Zz4K", "sidebar-star": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=", "sidebar-picture": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWU5YmM0IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZjRmMmZjIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZDRlZGYyIiBzdHJva2U9IiM4ZWI5YzciLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZWVkOWVmIiBzdHJva2U9IiNjMGE1ZDIiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==", "sidebar-shirt": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTFhZWI2IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmNWZkZmIiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNjZmYwZWQiIHN0cm9rZT0iIzc0YjdiYyIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2I5ZTFlMiIvPjwvc3ZnPgo=", "sidebar-heart": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2I5NmI1IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjZkOWU5Ii8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZmMiLz48L3N2Zz4K", "sidebar-planet": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjYTdiNWQ0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjYmNlY2YwIiBzdHJva2U9IiM1OWE5YmEiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNlZmZmZmYiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjN2ViNmNlIi8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2I5YTZkNyIvPjwvc3ZnPgo=" };
var STYLES = "/* Native DSH surfaces. Each selector is scoped to this independent skin. */\nbody[data-dsh-ekko-miku]{\n --miku-ink:#214b5d;--miku-muted:#557a8c;--miku-accent:#169fae;--miku-edge:#b9e2e9;--miku-paper:#f5fcff;--miku-card:#f9fdfff5;\n --miku-font:'Noto Sans CJK SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;\n --miku-display:'Noto Serif CJK SC','Source Han Serif SC','Songti SC','STSong',serif;\n --ds-font-family:var(--miku-font);--ds-font-family-text:var(--miku-font);--dsw-radius-sm:12px;--dsw-radius-md:16px;--dsw-radius-lg:23px;\n color:var(--miku-ink);background:#edfaff url('./ekko-skins/assets/miku/c7e78efdffa352c892eed75cf8246dd596f1728ab048761c39036b7de01579da.webp') center/cover fixed;\n}\nbody[data-dsh-ekko-miku][data-ds-dark-theme]{--miku-ink:#daf6f7;--miku-muted:#9dbcc9;--miku-accent:#6bd8df;--miku-edge:#365b6d;--miku-paper:#162935;--miku-card:#183340f5;background:#101d2a;}\nbody[data-dsh-ekko-miku] #root,body[data-dsh-ekko-miku] [data-slot='root']>[class*='_frame']{background:transparent;}\nbody[data-dsh-ekko-miku] .miku-welcome *,body[data-dsh-ekko-miku] [data-miku-editor-root] *,body[data-dsh-ekko-miku] .miku-polaroid *{corner-shape:round;}\nbody[data-dsh-ekko-miku] [data-miku-center]{position:relative;isolation:isolate;container:miku-main / inline-size;margin:7px 7px 7px 0;border:1px solid var(--miku-edge);border-radius:18px;background:color-mix(in srgb,var(--miku-paper) 80%,transparent);box-shadow:0 0 0 1px #ffffff80,0 3px 18px #4389ac12;}\nbody[data-dsh-ekko-miku] [data-miku-center]>[data-slot]{position:relative;z-index:1;}\nbody[data-dsh-ekko-miku] [class*='_sidebarCol']{border-color:var(--miku-edge);background:var(--dsw-specific-sidebar-fill);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar']>div{background:transparent;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button{color:var(--miku-ink);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar.brand.mark'],body[data-dsh-ekko-miku] [data-slot='sidebar.brand.name']{color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{border:1px solid var(--miku-edge);border-radius:18px;background:#d8f6f9a8;box-shadow:inset 1px 1px 1px #fff9,0 2px 6px #40b1bc12;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:hover{background:var(--dsw-alias-interactive-bg-hover);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] :is([class*='_panelRow'],[class*='_sessionRow']){border-radius:12px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_sectionHeader']{border-bottom:1px dashed var(--miku-edge);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']{min-height:37px;gap:9px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelGlyph']{display:inline-grid;place-items:center;width:27px;height:27px;color:#43a6b3;border:1px solid #c7e7ee;border-radius:9px;corner-shape:round;background:#effcff;box-shadow:2px 3px 6px #4596b01c,-2px -2px 6px #ffffffd1,inset 1px 1px 1px #fff;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']:nth-child(3n+2) [class*='_panelGlyph']{color:#a18ac8;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{background:#d8f5f8;box-shadow:inset 2px 2px 5px #72c1cf2e,inset -2px -2px 5px #fff;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] :is([class*='_iconButton'],[class*='_searchButton']){color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_slot']{width:24px;height:24px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']{background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjYTdiNWQ0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjYmNlY2YwIiBzdHJva2U9IiM1OWE5YmEiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNlZmZmZmYiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjN2ViNmNlIi8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2I5YTZkNyIvPjwvc3ZnPgo=') center/24px no-repeat;filter:drop-shadow(0 2px 1px #4a9aa82b);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']>svg{visibility:hidden;}\n/* Fixed display motifs; native status badges, names and menus are retained. */\nbody[data-dsh-ekko-miku] [data-miku-session-icon]{min-height:34px;}\nbody[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']{position:relative;width:24px;height:24px;background:var(--miku-session-icon) center/22px no-repeat;filter:drop-shadow(0 1px 1px #528f9e24);}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-note']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTZhOGI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-star']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-picture']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWU5YmM0IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZjRmMmZjIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZDRlZGYyIiBzdHJva2U9IiM4ZWI5YzciLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZWVkOWVmIiBzdHJva2U9IiNjMGE1ZDIiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-shirt']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTFhZWI2IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmNWZkZmIiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNjZmYwZWQiIHN0cm9rZT0iIzc0YjdiYyIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2I5ZTFlMiIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-heart']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2I5NmI1IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjZkOWU5Ii8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZmMiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']>:not([data-slot]):not([class*='_visuallyHidden']),body[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']>[data-slot]>*{position:absolute;right:-2px;bottom:-1px;z-index:1;border-radius:50%;box-shadow:0 0 0 2px var(--miku-paper);transform:scale(.72);transform-origin:bottom right;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.header']{background:color-mix(in srgb,var(--miku-paper) 80%,transparent);border-bottom:1px solid var(--miku-edge);}\nbody[data-dsh-ekko-miku] [class*='_headerBlank'],body[data-dsh-ekko-miku] [data-slot='main.conversation']>div,body[data-dsh-ekko-miku] [class*='_composerSeat']{background:transparent;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-center] [class*='_scrollBody']{justify-content:flex-start;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{position:absolute;inset:0 0 auto;z-index:12;min-height:0;padding:8px 16px 0;background:transparent;border:0;pointer-events:none;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header] :is(button,a,[role='button']){pointer-events:auto;}\n/* Align the native dock control beside the right-sidebar button, even on narrow screens. */\nbody[data-dsh-ekko-miku] [data-dsh-dock-fallback][data-ekko-theme-dock]{left:var(--ekko-dock-left)!important;top:var(--ekko-dock-top)!important;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat]{--dsh-composer-card-max-width:100%;--dsh-composer-text-max-height:min(26dvh,220px);--miku-photo-reserve:0px;position:relative;box-sizing:border-box;width:100%;max-width:none;align-self:stretch;padding:8px 24px 12px;gap:6px;}\nbody[data-dsh-ekko-miku][data-miku-polaroid='true'] [data-miku-hero-seat]{--miku-photo-reserve:174px;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-shell]{padding:0;align-items:stretch;height:auto;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-stack]{max-width:none;gap:0;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-stack]>[class*='_headline']{display:none;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat] [data-slot='conversation.composer.bar']{box-sizing:border-box;width:100%;max-width:none;padding:0;margin-inline:0;align-self:stretch;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root]{box-sizing:border-box;width:calc(100% - var(--miku-photo-reserve));max-width:none;padding-inline:0;align-self:flex-start;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{width:calc(100% - var(--miku-photo-reserve));box-sizing:border-box;margin-top:0;padding-inline:7px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{position:relative;overflow:visible;border:1px solid #a8dce6;border-radius:22px;background-color:var(--dsw-specific-input-major);box-shadow:7px 9px 20px #4798b12b,-6px -6px 18px #ffffffd1,inset 1px 1px 1px #fff,inset -1px -1px 1px #aabfe83b;transition:box-shadow 200ms ease,border-color 200ms ease,transform 200ms ease;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root] [data-composer-card]{min-height:128px;background-image:url('./ekko-skins/assets/miku/cbff7068eab03e957ad86ba135af8016eeeb2b565d17c2ebef71640ec38c2c4d.webp');background-position:center bottom;background-size:min(48%,360px) auto;background-repeat:no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root] [class*='_scroll']{min-height:70px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_input']{font-family:var(--miku-font);color:var(--miku-ink);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 22px 22px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [contenteditable]{caret-color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_placeholder']{color:var(--miku-muted);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_add']{width:34px;height:34px;border:1px solid var(--miku-edge);border-radius:50%;background:var(--miku-paper);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){min-height:32px;padding-inline:10px;border:1px solid var(--miku-edge);border-radius:11px;background:#e3f8fc;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:#24b6c1;box-shadow:0 0 0 3px #68dbe730,8px 10px 22px #6a9fc22b,-6px -6px 18px #fff9,inset 1px 1px 1px #fff;}\n/* The background clips separately; the character rises above the stage rim. */\n.miku-welcome{position:relative;isolation:isolate;min-height:0;width:100%;font-family:var(--miku-font);color:var(--miku-ink);}\n.miku-welcome-brand{position:relative;z-index:6;display:flex;align-items:center;gap:11px;box-sizing:border-box;min-height:67px;width:100%;padding:0 40px 9px 0;}\n.miku-mark{width:43px;height:43px;object-fit:contain;flex:none;filter:drop-shadow(2px 2px 0 #cbecf6);}\n.miku-welcome-signature{display:flex;flex-direction:column;gap:4px;min-width:0;}\n.miku-welcome-signature strong{font-size:17px;font-weight:650;line-height:1.5;color:#267f8c;}\n.miku-welcome-signature span{font-size:11px;line-height:1.5;color:#7892a0;letter-spacing:.5px;}\n.miku-brand-badge{width:145px;height:58px;object-fit:contain;margin-left:auto;}\n.miku-stage{--miku-cards-height:clamp(144px,min(20cqw,27dvh),215px);position:relative;isolation:isolate;container:miku-stage / inline-size;box-sizing:border-box;width:100%;min-width:0;aspect-ratio:1044/470;max-height:min(740px,var(--miku-stage-limit,calc(100dvh - 280px)));min-height:300px;border:2px solid #b5e8f0;border-radius:26px;background:#d9ecfb;overflow:visible;box-shadow:0 0 0 3px #fff9,9px 12px 26px #5b9fc22b,-6px -6px 20px #ffffffb3,inset 1px 1px 1px #fff9;transition:box-shadow 220ms ease,transform 220ms ease;}\n.miku-welcome-backdrop{position:absolute;z-index:0;inset:0;width:100%;height:100%;object-fit:cover;object-position:left top;border-radius:24px;clip-path:inset(0 round 24px);filter:saturate(.82) brightness(1.04);opacity:.85;pointer-events:none;}\n.miku-figure-layer{position:absolute;z-index:2;inset:-44px -1px 0;overflow:hidden;border-radius:0 0 24px 24px;pointer-events:none;}\n.miku-welcome-figure{position:absolute;top:0;right:15%;width:49%;max-width:680px;height:auto;object-fit:contain;pointer-events:none;user-select:none;opacity:1;filter:drop-shadow(0 6px 8px #23617d20);}\n.miku-stage-exclusive{position:absolute;z-index:3;top:8%;right:2.2%;width:11%;max-width:116px;height:auto;pointer-events:none;}\n.miku-stage-seal{position:absolute;z-index:3;top:38%;right:1.8%;box-sizing:border-box;max-width:24%;padding:9px 13px;border:1px solid #dcffff;border-radius:9px;background:#90d1e95c;box-shadow:0 0 10px #f6c8fd94,inset 0 0 0 2px #c5f7fc80;text-align:center;color:#efffff;text-shadow:0 1px 3px #3f6b9a;pointer-events:none;}\n.miku-stage-seal strong{display:block;font-size:clamp(10px,1.3cqw,14px);font-weight:500;letter-spacing:1px;}\n.miku-stage-seal span{display:block;margin-top:4px;font-size:10px;letter-spacing:2px;}\n.miku-welcome-heading{position:absolute;z-index:3;top:33%;left:3.8%;width:52%;color:#194b64;text-shadow:0 1px 4px #fff,0 0 14px #ffffffb3;}\n.miku-welcome-heading h1{margin:0 0 7px;font-family:var(--miku-display);font-size:clamp(25px,3.25cqw,36px);font-weight:700;line-height:1.45;letter-spacing:.1px;white-space:nowrap;color:#194b64;}\n.miku-welcome-heading p{margin:0;font-size:clamp(11px,1.48cqw,16px);line-height:1.7;letter-spacing:.3px;color:#47768b;}\n.miku-heading-phrase{white-space:nowrap;}\n.miku-prompt-cards{position:absolute;z-index:4;bottom:5px;left:1.5%;right:1.5%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:minmax(0,1fr);gap:1.5%;height:var(--miku-cards-height);}\n.miku-prompt-card{--miku-medallion:#d2f4f7;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:9px;box-sizing:border-box;min-width:0;min-height:0;height:100%;padding:19px 10px 24px;border:0;border-radius:23px;background:url('./ekko-skins/assets/miku/445118cb0b5ae7156f1b81ff5e31e4986658f18d47c8649b401b2b2abaa68cdd.webp') center/100% 100% no-repeat;color:#285b6e;cursor:pointer;font:600 clamp(12px,1.55cqw,17px)/1.5 var(--miku-font);transition:transform 180ms ease,filter 180ms ease;}\n.miku-prompt-card:nth-child(2){--miku-medallion:#f3e1f3;}.miku-prompt-card:nth-child(3){--miku-medallion:#e6dff8;}.miku-prompt-card:nth-child(4){--miku-medallion:#d8f4f1;}\n.miku-card-medallion{display:flex;align-items:center;justify-content:center;flex:none;width:clamp(47px,6.4cqw,66px);height:clamp(47px,6.4cqw,66px);border:1px solid #fff;border-radius:50%;background:var(--miku-medallion);box-shadow:0 0 0 2px #d6edf3b3,0 0 0 5px #ffffff80;}\n.miku-card-icon{display:block;object-fit:contain;width:68%;height:68%;filter:drop-shadow(1px 1px 0 #fff);}\n.miku-card-copy{display:flex;align-items:center;justify-content:center;min-height:45px;white-space:pre-line;text-align:center;line-height:1.45;}\n/* Hearts and tiny stars already belong to the supplied card artwork. */\n.miku-card-heart{display:none;}\n.miku-prompt-card:hover{transform:translateY(-3px);filter:drop-shadow(0 5px 7px #5b8cba33);}\n.miku-prompt-card:focus-visible,.miku-photo-switch:focus-visible,.miku-polaroid-close:focus-visible,.miku-preferences :is(input,button):focus-visible{outline:2px solid var(--miku-accent,#169fae);outline-offset:3px;}\n.miku-polaroid{position:absolute;z-index:8;pointer-events:none;right:0;bottom:4px;width:184px;aspect-ratio:520/600;filter:drop-shadow(0 4px 5px #47728d25);transform-origin:center 75%;transition:transform 180ms ease;}\n.miku-polaroid-art{display:block;width:100%;height:100%;object-fit:contain;user-select:none;}\n.miku-polaroid-close{pointer-events:auto;position:absolute;right:9%;top:5%;display:grid;place-items:center;box-sizing:border-box;width:22px;height:22px;padding:4px;border:1px solid var(--miku-edge);border-radius:50%;background:#f6ffffed;opacity:0;cursor:pointer;transition:opacity 150ms ease;}\n.miku-polaroid-close img{width:100%;height:100%;}\n.miku-polaroid:hover .miku-polaroid-close,.miku-polaroid:focus-within .miku-polaroid-close{opacity:1;}\n.miku-photo-switch{display:inline-flex;align-items:center;gap:4px;flex:none;padding:3px 7px;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--miku-muted);font:12px/1.5 var(--miku-font);cursor:pointer;}\n.miku-photo-switch img{width:15px;height:15px;}\n.miku-photo-switch[aria-pressed='true']{border-color:var(--miku-edge);background:var(--miku-paper);color:var(--miku-accent);}\n.miku-chat-figure{position:absolute;z-index:-1;pointer-events:none;right:1%;bottom:160px;height:min(70%,700px);width:min(50%,560px);object-fit:contain;object-position:right bottom;opacity:var(--miku-companion-opacity,.12);mask-image:radial-gradient(ellipse 85% 70% at 70% 55%,#000 35%,transparent 83%);}\n.miku-preferences{border:1px solid var(--miku-edge,#b9e2e9);border-radius:16px;padding:15px;background:var(--miku-paper,#f5fcff);color:var(--miku-ink,#214b5d);font:13px/1.6 var(--miku-font,system-ui);}\n.miku-preference-heading,.miku-preference-row{display:flex;align-items:center;justify-content:space-between;gap:16px;}\n.miku-preference-row{min-height:37px;border-top:1px solid var(--miku-edge,#b9e2e9);padding-block:6px;}\n.miku-preference-row input{accent-color:var(--miku-accent,#169fae);}.miku-preference-row input[type='range']{width:130px;}\n.miku-preference-heading button{border:1px solid var(--miku-edge,#b9e2e9);border-radius:8px;background:var(--miku-paper,#f5fcff);color:inherit;padding:4px 8px;cursor:pointer;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false']{background-image:none;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false'] :is(.miku-welcome-backdrop,.miku-figure-layer,.miku-stage-exclusive,.miku-stage-seal,.miku-chat-figure,.miku-brand-badge){display:none;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false'] [data-miku-editor-root] [data-composer-card]{background-image:none;}\n/* Night performance: preserve character colors, dim only the star field. */\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='sidebar'] :is(button[class*='_newSession'],[class*='_panelGlyph']){background:#203d4d;border-color:#365b6d;color:#80d4dd;box-shadow:2px 3px 7px #070f1c66,inset 1px 1px 1px #98d8ea1f;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{background:#2b5161;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-miku-center]{box-shadow:none;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-stage{background:#1c344e;border-color:#588aab;box-shadow:0 0 0 3px #71b6ce12,9px 12px 26px #030d1b80,-5px -5px 18px #70b7d324;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-backdrop{filter:brightness(.39) saturate(.75);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading{ text-shadow:0 1px 4px #071b2e;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading :is(h1,p){color:#e4faff;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-signature strong{color:var(--miku-accent);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-signature span{color:var(--miku-muted);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-prompt-card{border:1px solid #7ad4e385;background-color:#193a4a;background-blend-mode:multiply;color:#e4faff;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-card-medallion{background:#385769;border-color:#96c9d8;box-shadow:0 0 0 2px #71b6ce33;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-card-icon{filter:brightness(1.35) drop-shadow(0 1px 0 #060f1d);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]{border-color:#4c7a91;box-shadow:7px 9px 20px #040c1a80,-5px -5px 16px #6bafd626,inset 1px 1px 1px #a6d8e52e;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){background:#234757;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:#76dce4;box-shadow:0 0 0 3px #73dce426,8px 10px 22px #030d1b80,inset 1px 1px 1px #95e1e93b;}\n@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){\n body[data-dsh-ekko-miku] .miku-stage:hover{transform:translateY(-2px);box-shadow:0 0 0 3px #fff9,12px 16px 30px #5b9fc23b,-7px -7px 22px #ffffffc2;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:hover{transform:translateY(-1px);border-color:#6bc5d2;}\n body[data-dsh-ekko-miku][data-ds-dark-theme] .miku-stage:hover{box-shadow:0 0 0 3px #71b6ce26,12px 16px 30px #030d1b99,-7px -7px 22px #70b7d32e;}\n}\n/* The available viewport and native editor height determine the desktop stage. */\n@container miku-main (min-width:641px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{min-height:var(--miku-view-height,0px);}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n [data-miku-hero-seat] .miku-stage{height:var(--miku-stage-limit,auto);max-height:var(--miku-stage-limit,calc(100dvh - 280px));}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-stage{--miku-cards-height:125px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading{top:30%;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading h1{font-size:clamp(22px,3.1cqw,30px);margin-bottom:0;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading p{font-size:11px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-prompt-card{padding:12px 7px 15px;gap:6px;font-size:13px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-card-medallion{width:43px;height:43px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-card-copy{min-height:36px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-figure{width:49%;right:13%;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-stage-seal{top:26%;}\n}\n@container miku-main (max-width:900px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{padding-inline:15px;}\n .miku-welcome-brand{min-height:64px;gap:8px;padding-right:35px;}.miku-mark{width:33px;height:33px;}.miku-welcome-signature strong{font-size:14px;}.miku-welcome-signature span{font-size:10px;letter-spacing:.1px;}.miku-brand-badge{width:105px;height:45px;}\n .miku-stage{min-height:310px;--miku-cards-height:clamp(120px,17cqw,155px);}\n .miku-prompt-card{padding:15px 6px 19px;gap:8px;font-size:12px;}.miku-card-medallion{width:46px;height:46px;}.miku-card-copy{min-height:35px;}\n .miku-welcome-heading h1{font-size:clamp(22px,3.3cqw,29px);}.miku-welcome-heading p{font-size:11px;}\n .miku-polaroid{width:149px;}body[data-dsh-ekko-miku][data-miku-polaroid='true'] [data-miku-hero-seat]{--miku-photo-reserve:142px;}\n .miku-stage-seal{padding:6px 8px;}.miku-stage-seal span{font-size:8px;}\n}\n@container miku-main (max-width:640px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{min-height:var(--miku-view-height,0px);}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{padding:0 12px 12px;--miku-photo-reserve:0px!important;}\n .miku-welcome-brand{min-height:70px;gap:7px;padding:6px 74px 12px 0;}.miku-mark{width:27px;height:27px;}.miku-welcome-signature strong{font-size:13px;line-height:1.5;}.miku-welcome-signature span{font-size:9px;letter-spacing:0;}.miku-brand-badge{display:none;}\n .miku-stage{height:var(--miku-stage-limit,370px);min-height:180px;max-height:none;aspect-ratio:auto;border-radius:18px;--miku-cards-height:clamp(104px,calc(var(--miku-stage-limit,370px) * .34),146px);}\n .miku-welcome-backdrop{border-radius:16px;clip-path:inset(0 round 16px);content:url('./ekko-skins/assets/miku/c431dce8f869f0f6e3b7a92b6f794aef192b6fb521b4c33f18f8764738ea9cc2.webp');}\n .miku-figure-layer{inset:-22px -1px 0;border-radius:0 0 16px 16px;}\n .miku-welcome-figure{content:url('./ekko-skins/assets/miku/bc4fb38eabc8a37402d5bd00233447fad10c80f9b3dde5a5960bd325af745ab0.webp');width:min(80%,calc(var(--miku-stage-limit,370px) * .72));right:-12%;max-width:none;}\n .miku-welcome-heading{left:4%;top:16%;box-sizing:border-box;width:53%;max-width:178px;padding:10px 8px;border:1px solid #ffffffb3;border-radius:13px;background:#f3fcffe6;text-shadow:0 1px 1px #fff;}.miku-welcome-heading h1{font-size:20px;white-space:normal;line-height:1.45;margin-bottom:7px;}.miku-welcome-heading p{font-size:10px;line-height:1.65;}\n body[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading{background:#193749ed;border-color:#78c9dc66;text-shadow:none;}\n .miku-stage-exclusive{width:42px;top:5px;right:6px;}.miku-stage-seal{display:none;}\n .miku-prompt-cards{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:5px;bottom:5px;left:2%;right:2%;}\n .miku-prompt-card{flex-direction:row;justify-content:flex-start;padding:9px 9px;gap:7px;border-radius:14px;font-size:10.5px;line-height:1.5;}\n .miku-card-medallion{width:29px;height:29px;flex:none;box-shadow:0 0 0 2px #d6edf3b3;}.miku-card-copy{display:block;min-height:0;text-align:left;letter-spacing:0;font-weight:600;}\n .miku-polaroid{display:none;}\n body[data-dsh-ekko-miku] [data-miku-editor-root] [data-composer-card]{min-height:120px;background-image:none;}\n body[data-dsh-ekko-miku] [data-miku-editor-root] [class*='_scroll']{min-height:65px;}\n .miku-photo-switch{padding-inline:4px;}.miku-photo-switch span{display:none;}.miku-chat-figure{width:85%;height:60%;bottom:140px;}\n}\n@media(max-height:650px) and (max-width:640px){.miku-welcome-brand{min-height:52px;}.miku-card-copy{font-size:10px;}.miku-prompt-card{padding:4px 6px;gap:5px;}.miku-card-medallion{width:23px;height:23px;}.miku-welcome-heading{top:14%;max-width:150px;width:45%;}.miku-welcome-heading h1{font-size:20px;}.miku-welcome-heading p{display:none;}.miku-stage-exclusive{display:none;}}\n@media(prefers-reduced-motion:reduce){.miku-stage,.miku-prompt-card,.miku-polaroid,.miku-polaroid-close,body[data-dsh-ekko-miku] [data-composer-card]{transition:none;}.miku-prompt-card:hover,.miku-polaroid:hover{transform:none;}}\n\n/* Theme jewellery: paint layers only; the native controls retain their DOM and actions. */\nbody[data-dsh-ekko-miku]{\n --ekko-rim:#89bdce;--ekko-rim-soft:#c8e3ed;--ekko-shine:#f7ffff;--ekko-panel:#f7fdff;--ekko-tint:#e3f8fb;--ekko-shadow:#4390b334;\n --ekko-ribbon:url('./ekko-skins/assets/miku/c3dda0a51cc5aa4ee1d61796e95d741a15587a703e55a0305755965d17b79481.webp');--ekko-trim:url('./ekko-skins/assets/miku/34325a82a74620c799c742cf17511e1fff309d7e6bd15b6dd9e721a9c185edc6.webp');--ekko-corners:url('./ekko-skins/assets/miku/3acb883431c3ec4c0bc4f353673121ec93d0445c62b56d6b66fe8d4e7ea140f6.svg');--ekko-crest:url('./ekko-skins/assets/miku/8bfe6b789ac16843ce566aa1bf2fb7d14444f0cfea003dc7dc60a7c46dd8115d.svg');--ekko-trim-size:360px;\n}\nbody[data-dsh-ekko-miku][data-ds-dark-theme]{--ekko-rim:#73a6bf;--ekko-rim-soft:#3c5c76;--ekko-shine:#729eb6;--ekko-panel:#172e3d;--ekko-tint:#25485c;--ekko-shadow:#030f2299;}\n/* A complete frame: fine hanging trim above, a small engraved clasp below. */\nbody[data-dsh-ekko-miku] [data-miku-center]{border:2px solid var(--ekko-rim-soft);border-radius:20px;box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-shine),0 6px 22px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-miku-center]::before,\nbody[data-dsh-ekko-miku] [data-miku-center]::after{content:'';position:absolute;z-index:16;pointer-events:none;user-select:none;}\nbody[data-dsh-ekko-miku] [data-miku-center]::before{inset:1px 6px auto;height:20px;background:var(--ekko-trim) left top/var(--ekko-trim-size) auto repeat-x;border-radius:14px 14px 0 0;}\nbody[data-dsh-ekko-miku] [data-miku-center]::after{inset:auto 10px 0;height:10px;border-bottom:1px solid var(--ekko-rim);background:var(--ekko-crest) center bottom/126px 14px no-repeat;border-radius:0 0 12px 12px;}\nbody[data-dsh-ekko-miku] [data-miku-header-frame]{padding-top:23px;border-bottom-color:var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-header-frame] [data-conversation-header-corner]{margin-right:0;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{padding:22px 16px 0;}\nbody[data-dsh-ekko-miku] .miku-welcome-brand{padding-top:13px;}\nbody[data-dsh-ekko-miku] [data-miku-header-frame] :is(button,[role='button']):hover{background:var(--ekko-tint);box-shadow:inset 0 0 0 1px var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-dsh-bottom-toggle]{border:1px solid var(--ekko-rim-soft);background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine),0 2px 5px var(--ekko-shadow);color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-dsh-bottom-toggle][aria-pressed='true']{background:var(--ekko-tint);border-color:var(--ekko-rim);}\n/* Sidebar stationery frame: full panel when expanded, narrow inlaid rail when folded. */\nbody[data-dsh-ekko-miku] [class*='_sidebarCol']{position:relative;isolation:isolate;border-right:1px solid var(--ekko-rim);box-shadow:inset -3px 0 0 var(--ekko-shine),inset -5px 0 0 var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]{position:relative;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]::before{content:'';position:absolute;z-index:-1;inset:8px 7px;border:1px solid var(--ekko-rim-soft);border-radius:15px;pointer-events:none;box-shadow:inset 0 0 0 2px var(--ekko-shine);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) [class*='_logoRow']{position:relative;min-height:62px;margin:1px 0 7px;padding-inline:7px;background:var(--ekko-corners) center/100% 100% no-repeat;border-bottom:1px solid var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) [class*='_footArea']{position:relative;margin-top:7px;padding:11px 3px 2px;border-top:1px solid var(--ekko-rim-soft);background:var(--ekko-crest) center top -2px/114px 13px no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[aria-label='\u8D26\u53F7\u83DC\u5355'],\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[aria-label='Account menu']{border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n/* The new-session button is one framed surface; no styling reaches its text spans. */\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{corner-shape:round;border:1px solid var(--ekko-rim);border-radius:16px;background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-rim-soft),0 4px 9px var(--ekko-shadow);transition:background .18s ease,box-shadow .18s ease,transform .18s ease;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']::before{content:'';position:absolute;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-corners) center/100% 100% no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']{height:45px;margin:4px 3px 17px;padding-inline:12px;font-size:14px;letter-spacing:.09em;background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=');background-position:14px center;background-size:26px 26px;background-repeat:no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']::after{content:'';position:absolute;right:11px;top:50%;width:34px;height:20px;transform:translateY(-50%);background:var(--ekko-ribbon) center/contain no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession'] [class*='_newSessionContent']>svg{box-sizing:border-box;width:24px;height:24px;padding:4px;border:1px solid var(--ekko-rim-soft);border-radius:50%;background:var(--ekko-tint);color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame][class*='_collapsed'] button[class*='_newSession']{border-radius:13px;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame][class*='_collapsed'] button[class*='_newSession']::before{inset:3px;border-radius:9px;background:none;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:hover{background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine),0 0 0 1px var(--ekko-rim),0 5px 12px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:active{transform:translateY(1px);box-shadow:inset 1px 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:focus-visible{outline:2px solid var(--miku-accent);outline-offset:4px;}\n/* A silk crest, tiny hanging trim and an inner engraving follow every native input card. */\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{corner-shape:round;border:2px solid var(--ekko-rim);border-radius:24px;padding-top:20px;background-color:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 3px var(--ekko-rim-soft),0 4px 0 var(--ekko-tint),0 10px 24px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::before{content:'';position:absolute;z-index:1;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:19px;background-image:var(--ekko-corners),var(--ekko-trim);background-position:center,left top;background-size:100% 100%,var(--ekko-trim-size) auto;background-repeat:no-repeat,repeat-x;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::after{content:'';position:absolute;z-index:2;top:-23px;left:calc(50% - 49px);width:98px;height:49px;background:var(--ekko-ribbon) center/contain no-repeat;filter:drop-shadow(0 2px 1px var(--ekko-shadow));pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:var(--miku-accent);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 4px var(--ekko-rim-soft),0 10px 26px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-top:1px solid color-mix(in srgb,var(--ekko-rim-soft) 55%,transparent);background-color:color-mix(in srgb,var(--ekko-tint) 45%,transparent);box-shadow:inset 0 1px 0 var(--ekko-shine);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_add']{border-color:var(--ekko-rim);background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']){border:1px solid var(--ekko-rim);background:var(--miku-accent);color:var(--ekko-panel);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--ekko-shine) 45%,transparent),0 2px 6px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']):disabled{opacity:.4;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){border-color:var(--ekko-rim-soft);background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n@container miku-main (max-width:640px){\n body[data-dsh-ekko-miku] [data-miku-center]::before{height:13px;background-size:190px auto;}\n body[data-dsh-ekko-miku] [data-miku-center]::after{height:8px;background-size:90px 11px;}\n body[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{padding:19px 12px 0;}\n body[data-dsh-ekko-miku] .miku-welcome-brand{padding-top:16px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{border-radius:21px;padding-top:15px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::before{border-radius:16px;background-size:100% 100%,210px auto;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::after{width:66px;height:33px;left:calc(50% - 33px);top:-16px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 18px 18px;}\n}\n@media(prefers-reduced-motion:reduce){body[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{transition:none;}}\n";

// src/session-icons.mjs
var SESSION_ICON_KEY = "dsh:ekko-miku:session-icons:v1";
var SESSION_ICONS = ["sidebar-note", "sidebar-star", "sidebar-picture", "sidebar-shirt", "sidebar-heart"];
function createSessionIcons(storage) {
  const entries = /* @__PURE__ */ new Map();
  let next = 0, dirty = false;
  try {
    const saved = JSON.parse(storage.getItem(SESSION_ICON_KEY) || "null");
    if (Array.isArray(saved?.entries)) for (const item of saved.entries.slice(-2e3)) {
      if (Array.isArray(item) && typeof item[0] === "string" && item[0].length > 0 && item[0].length <= 256 && Number.isInteger(item[1]) && item[1] >= 0 && item[1] < SESSION_ICONS.length) entries.set(item[0], item[1]);
    }
    next = Number.isInteger(saved?.next) && saved.next >= 0 ? saved.next % SESSION_ICONS.length : entries.size % SESSION_ICONS.length;
  } catch {
  }
  return {
    get(id) {
      if (!entries.has(id)) {
        entries.set(id, next);
        next = (next + 1) % SESSION_ICONS.length;
        dirty = true;
        if (entries.size > 2e3) entries.delete(entries.keys().next().value);
      }
      return SESSION_ICONS[entries.get(id)];
    },
    flush() {
      if (!dirty) return;
      dirty = false;
      try {
        storage.setItem(SESSION_ICON_KEY, JSON.stringify({ next, entries: [...entries] }));
      } catch {
      }
    }
  };
}

// src/dock-alignment.mjs
function createDockAlignment() {
  let target, previous;
  const properties = ["--ekko-dock-left", "--ekko-dock-top"];
  function restore() {
    if (!target) return;
    for (const [name, value, priority] of previous.styles) value ? target.style.setProperty(name, value, priority) : target.style.removeProperty(name);
    if (previous.attr === null) target.removeAttribute("data-ekko-theme-dock");
    else target.setAttribute("data-ekko-theme-dock", previous.attr);
    target = previous = void 0;
  }
  function sync() {
    const fallback = document.querySelector("[data-dsh-dock-fallback]");
    const anchor = [...document.querySelectorAll("[data-sidebar-right-expand]")].find((el) => {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
    });
    if (target !== fallback || !anchor) restore();
    if (!fallback || !anchor) return;
    const rect = anchor.getBoundingClientRect(), button = fallback.querySelector("[data-dsh-bottom-toggle]");
    if (!button) return;
    if (!target) {
      target = fallback;
      previous = { attr: target.getAttribute("data-ekko-theme-dock"), styles: properties.map((name) => [name, target.style.getPropertyValue(name), target.style.getPropertyPriority(name)]) };
      target.setAttribute("data-ekko-theme-dock", "");
    }
    const box = button.getBoundingClientRect();
    const values = [rect.left - 8 - box.width, rect.top + (rect.height - box.height) / 2];
    properties.forEach((name, i) => {
      const value = values[i] + "px";
      if (target.style.getPropertyValue(name) !== value) target.style.setProperty(name, value);
    });
  }
  return { sync, dispose: restore };
}

// src/client.jsx
var PRESENTATION_INJECT = ["theme", "slots", "layout"];
var ATTR = "data-dsh-ekko-miku";
var copy = {
  zh: {
    title: "\u6211\u4EEC\u4ECA\u5929\u6765\u6784\u5EFA\u4EC0\u4E48\uFF1F",
    subtitle: "\u548C\u521D\u97F3\u672A\u6765\u4E00\u8D77\uFF0C\u628A\u7075\u611F\u5199\u6210\u4EE3\u7801\u4E0E\u65CB\u5F8B",
    name: "\u521D\u97F3\u672A\u6765\u4E3B\u9898 DeepSeek Harness",
    edition: "\u4F60\u7684\u4E13\u5C5E AI \u7F16\u7A0B\u4E0E\u521B\u4F5C\u4F19\u4F34",
    cards: ["\u63A2\u7D22\u5E76\u7406\u89E3\u4EE3\u7801", "\u6784\u5EFA\u65B0\u529F\u80FD\u3001\n\u5E94\u7528\u6216\u5DE5\u5177", "\u5BA1\u67E5\u4EE3\u7801\u5E76\u63D0\u51FA\n\u4FEE\u6539\u5EFA\u8BAE", "\u4FEE\u590D\u95EE\u9898\u548C\u5931\u8D25"],
    prompts: ["\u5E2E\u6211\u7406\u89E3\u8FD9\u4E2A\u9879\u76EE\u7684\u7ED3\u6784\u548C\u5173\u952E\u5B9E\u73B0\u3002", "\u4E00\u8D77\u6784\u5EFA\u4E00\u4E2A\u65B0\u529F\u80FD\uFF0C\u5148\u68B3\u7406\u9700\u6C42\u548C\u5B9E\u73B0\u65B9\u6848\u3002", "\u8BF7\u5BA1\u67E5\u5F53\u524D\u4EE3\u7801\uFF0C\u6307\u51FA\u5177\u4F53\u95EE\u9898\u548C\u6539\u8FDB\u5EFA\u8BAE\u3002", "\u5E2E\u6211\u6392\u67E5\u5F53\u524D\u9879\u76EE\u7684\u95EE\u9898\uFF0C\u5E76\u7ED9\u51FA\u4FEE\u590D\u65B9\u6848\u3002"],
    settings: "\u521D\u97F3\u672A\u6765\u4E3B\u9898",
    enabled: "\u542F\u7528\u521D\u97F3\u4E3B\u9898",
    artwork: "\u661F\u5149\u821E\u53F0\u4E0E\u4EBA\u7269\u88C5\u9970",
    companion: "\u804A\u5929\u4EBA\u7269\u80CC\u666F",
    polaroid: "\u53F3\u4E0B\u89D2\u62CD\u7ACB\u5F97",
    photo: "\u7167\u7247",
    hidePhoto: "\u6536\u8D77\u62CD\u7ACB\u5F97",
    opacity: "\u804A\u5929\u80CC\u666F\u6D53\u5EA6",
    reset: "\u6062\u590D\u9ED8\u8BA4",
    hint: "\u8DDF\u968F DSH \u7684\u6D45\u8272 / \u6DF1\u8272\u6A21\u5F0F\uFF1B\u4EC5\u8C03\u6574\u5916\u89C2\u3002"
  },
  en: {
    title: "What shall we build today?",
    subtitle: "Turn inspiration into code and melodies with Miku.",
    name: "Hatsune Miku \xB7 DeepSeek Harness",
    edition: "Your AI coding and creative companion",
    cards: ["Explore and understand code", "Build a feature,\napp or tool", "Review code and\nsuggest improvements", "Investigate and fix an issue"],
    prompts: ["Help me understand the structure and key implementation of this project.", "Let\u2019s build a feature. Start with the requirements and approach.", "Review this code and suggest concrete improvements.", "Investigate this project\u2019s issue and propose a fix."],
    settings: "Hatsune Miku theme",
    enabled: "Enable Miku theme",
    artwork: "Starlight stage and character artwork",
    companion: "Chat companion artwork",
    polaroid: "Corner polaroid",
    photo: "Photo",
    hidePhoto: "Hide polaroid",
    opacity: "Chat companion opacity",
    reset: "Restore defaults",
    hint: "Follows DSH light / dark appearance; presentation only."
  }
};
function language() {
  return /^zh/i.test(document.documentElement.lang || navigator.language) ? "zh" : "en";
}
function img(key, className = "") {
  const el = document.createElement("img");
  el.src = ASSETS[key];
  el.alt = "";
  el.className = className;
  el.draggable = false;
  el.setAttribute("aria-hidden", "true");
  return el;
}
function node(tag, className, text) {
  const el = document.createElement(tag);
  el.className = className;
  if (text) el.textContent = text;
  return el;
}
function fillComposer(text, inputActions) {
  const editor = document.querySelector('[data-slot="conversation.composer"] [contenteditable="true"]');
  if (!editor || !inputActions) {
    document.querySelector('[data-slot="conversation.hero.workspace"] button')?.click();
    return false;
  }
  const captured = inputActions.captureInsertion();
  const span = { ...captured, start: captured.end, end: captured.end };
  const inserted = (editor.textContent.trim() ? "\n\n" : "") + text;
  if (!inputActions.insertText(inserted, span)) return false;
  inputActions.persistDraft();
  requestAnimationFrame(() => editor.isConnected && editor.focus());
  return true;
}
function createWelcome(insert) {
  const lang = language(), c = copy[lang], root = node("section", "miku-welcome");
  root.lang = lang;
  root.setAttribute("aria-label", c.name);
  const brand = node("header", "miku-welcome-brand"), labels = node("div", "miku-welcome-signature");
  labels.append(node("strong", "", c.name), node("span", "", c.edition));
  brand.append(img("mark", "miku-mark"), labels, img("badge", "miku-brand-badge"));
  const stage = node("div", "miku-stage"), figureLayer = node("div", "miku-figure-layer");
  figureLayer.append(img("figure", "miku-welcome-figure"));
  stage.append(img("hero-backdrop", "miku-welcome-backdrop"), figureLayer, img("exclusive", "miku-stage-exclusive"));
  const seal = node("div", "miku-stage-seal");
  seal.append(node("strong", "", lang === "zh" ? "\u521D\u97F3\u672A\u6765\u4E3B\u9898\u5B9A\u5236" : "MIKU STARLIGHT STUDIO"), node("span", "", "MIKU.3939"));
  stage.append(seal);
  const heading = node("div", "miku-welcome-heading"), title = node("h1", "");
  if (lang === "zh") {
    const split = c.title.indexOf("\u6784\u5EFA");
    title.append(document.createTextNode(c.title.slice(0, split)), node("span", "miku-heading-phrase", c.title.slice(split)));
  } else title.textContent = c.title;
  heading.append(title, node("p", "", c.subtitle));
  stage.append(heading);
  const cards = node("div", "miku-prompt-cards");
  ["code", "puzzle", "clipboard", "wrench"].forEach((key, i) => {
    const button = node("button", "miku-prompt-card");
    button.type = "button";
    const circle = node("span", "miku-card-medallion" + (i === 0 ? " miku-card-medallion-code" : ""));
    circle.append(img(key, "miku-card-icon"));
    button.append(circle, node("span", "miku-card-copy", c.cards[i]), img("heart", "miku-card-heart"));
    button.addEventListener("click", () => insert(c.prompts[i]));
    cards.append(button);
  });
  stage.append(cards);
  root.append(brand, stage);
  return root;
}
function createPolaroid(hide) {
  const c = copy[language()], photo = node("aside", "miku-polaroid");
  photo.setAttribute("aria-label", c.polaroid);
  photo.append(img("photo", "miku-polaroid-art"));
  const close = node("button", "miku-polaroid-close");
  close.type = "button";
  close.setAttribute("aria-label", c.hidePhoto);
  close.append(img("close"));
  close.addEventListener("click", hide);
  photo.append(close);
  return photo;
}
function mountPresentation(ctx) {
  const body = document.body, previousAttr = body.getAttribute(ATTR), listeners = /* @__PURE__ */ new Set(), owned = /* @__PURE__ */ new Set(), marked = /* @__PURE__ */ new Map(), sizeTargets = /* @__PURE__ */ new Set(), layoutStyles = /* @__PURE__ */ new Map();
  const sessionIcons = createSessionIcons(localStorage), dockAlignment = createDockAlignment();
  const readCurrent = () => ({ ...readSettings(localStorage), enabled: true });
  let current = readCurrent(), disposeTokens, disposed = false, frame = 0, welcome, companion, photo, photoSwitch, activeInput;
  const mark = (el, name) => {
    if (!el) return;
    if (!marked.has(el)) marked.set(el, /* @__PURE__ */ new Map());
    const attrs = marked.get(el);
    if (!attrs.has(name)) attrs.set(name, el.getAttribute(name));
    if (!el.hasAttribute(name)) el.setAttribute(name, "");
  };
  const restoreMarks = () => {
    for (const [el, attrs] of marked) for (const [name, value] of attrs) value === null ? el.removeAttribute(name) : el.setAttribute(name, value);
    marked.clear();
  };
  const sizingObserver = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
  function clearSizing() {
    sizingObserver?.disconnect();
    sizeTargets.clear();
    for (const [el, values] of layoutStyles) {
      for (const [name, value] of Object.entries(values)) value ? el.style.setProperty(name, value) : el.style.removeProperty(name);
      const previous = marked.get(el)?.get("data-miku-stage-compact");
      previous == null ? el.removeAttribute("data-miku-stage-compact") : el.setAttribute("data-miku-stage-compact", previous);
    }
    layoutStyles.clear();
  }
  function fitStage(seat, editorRoot) {
    const stage = welcome?.querySelector(".miku-stage"), cards = welcome?.querySelector(".miku-prompt-cards"), viewport = seat?.closest('[class*="_scrollBody"]');
    if (!stage || !viewport) return;
    const shell = seat.querySelector("[data-miku-welcome-shell]"), row = seat.querySelector('[class*="_heroWorkspaceRow"]');
    for (const el of [seat, viewport, editorRoot, stage, cards, shell]) if (el && !sizeTargets.has(el)) {
      sizeTargets.add(el);
      sizingObserver?.observe(el);
    }
    const phone = (seat.closest("[data-miku-center]")?.clientWidth || viewport.clientWidth) <= 640;
    const visual = window.visualViewport, top = viewport.getBoundingClientRect().top;
    const height = phone && visual ? Math.min(viewport.clientHeight, Math.max(0, visual.height + visual.offsetTop - top)) : viewport.clientHeight;
    if (height <= 0) return;
    const flow = [shell, row, editorRoot].filter((el) => el && getComputedStyle(el).display !== "none");
    const seatStyle = getComputedStyle(seat), stageRect = stage.getBoundingClientRect();
    const overhead = flow.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0) - stageRect.height + (parseFloat(seatStyle.paddingTop) || 0) + (parseFloat(seatStyle.paddingBottom) || 0) + (parseFloat(seatStyle.rowGap) || 0) * Math.max(0, flow.length - 1);
    const portraitLimit = stageRect.width * 0.53;
    const limit = Math.max(phone ? 180 : 220, Math.floor(phone ? height - overhead - 4 : Math.min(height - overhead - 4, portraitLimit))) + "px";
    mark(seat, "data-miku-stage-compact");
    seat.toggleAttribute("data-miku-stage-compact", !phone && parseFloat(limit) < 420);
    if (!layoutStyles.has(seat)) layoutStyles.set(seat, Object.fromEntries(["--miku-stage-limit", "--miku-view-height"].map((name) => [name, seat.style.getPropertyValue(name)])));
    for (const [name, value] of Object.entries({ "--miku-stage-limit": limit, "--miku-view-height": height + "px" })) if (seat.style.getPropertyValue(name) !== value) seat.style.setProperty(name, value);
  }
  const remove = (el) => {
    if (el) {
      owned.delete(el);
      el.remove();
    }
  };
  const style = node("style", "miku-theme-styles");
  style.dataset.dshMikuOwned = "";
  style.textContent = STYLES;
  document.head.append(style);
  owned.add(style);
  const theme = ctx.get("theme");
  function render() {
    if (!current.enabled) {
      disposeTokens?.();
      disposeTokens = void 0;
    }
    if (current.enabled) {
      body.setAttribute(ATTR, "");
      body.dataset.mikuArtwork = String(current.artwork);
      body.dataset.mikuCompanion = String(current.companion);
      body.dataset.mikuPolaroid = String(current.artwork && current.polaroid);
      body.style.setProperty("--miku-companion-opacity", String(current.opacity));
      disposeTokens ||= theme.overrideTokens("dsh-plugin-miku-theme", TOKENS);
    } else {
      previousAttr === null ? body.removeAttribute(ATTR) : body.setAttribute(ATTR, previousAttr);
      for (const key of ["mikuArtwork", "mikuCompanion", "mikuPolaroid"]) delete body.dataset[key];
      body.style.removeProperty("--miku-companion-opacity");
    }
    schedule();
  }
  function update(value) {
    current = normalizeSettings({ ...current, ...value });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
    }
    render();
    for (const fn of listeners) fn();
    window.dispatchEvent(new CustomEvent("dsh:ekko-skin-preferences", { detail: { id: "miku" } }));
  }
  function DraftBridge({ inputActions, sessionId }) {
    (0, import_react.useEffect)(() => {
      const lease = { actions: inputActions, sessionId };
      activeInput = lease;
      return () => {
        if (activeInput === lease) activeInput = void 0;
      };
    }, [inputActions, sessionId]);
    return null;
  }
  ctx.slots.inject("conversation.input.left", () => ctx.slots.register({ name: "conversation.input.left", id: "ekko-miku-draft", order: 0 }, DraftBridge));
  function sync() {
    if (disposed) return;
    dockAlignment.sync();
    for (const el of marked.keys()) if (!el.isConnected) marked.delete(el);
    for (const el of sizeTargets) if (!el.isConnected) {
      sizingObserver?.unobserve(el);
      sizeTargets.delete(el);
      layoutStyles.delete(el);
    }
    const center = document.querySelector('[class*="_centerCol"]'), brand = document.querySelector('[data-slot="conversation.hero.brand.mark"]');
    const stack = brand?.closest('[class*="_root"]')?.querySelector('[class*="_stack"]'), isWelcome = !!stack;
    if (current.enabled) {
      body.dataset.mikuPage = isWelcome ? "welcome" : "conversation";
      mark(center, "data-miku-center");
      mark(center?.querySelector('header[class*="_header"]'), "data-miku-header-frame");
      mark(document.querySelector('[data-slot="sidebar"]')?.firstElementChild, "data-miku-sidebar-frame");
    } else {
      delete body.dataset.mikuPage;
      restoreMarks();
    }
    if (current.enabled) {
      for (const row of document.querySelectorAll('[data-slot="sidebar"] [data-row-key^="session:"]')) {
        const id = row.getAttribute("data-row-key").slice(8);
        if (!id) continue;
        mark(row, "data-miku-session-icon");
        const icon = sessionIcons.get(id);
        if (row.getAttribute("data-miku-session-icon") !== icon) row.setAttribute("data-miku-session-icon", icon);
      }
      sessionIcons.flush();
    }
    if (current.enabled && stack) {
      const seat = stack.closest('[class*="_composerHero"]');
      mark(seat, "data-miku-hero-seat");
      mark(stack, "data-miku-welcome-stack");
      mark(stack.parentElement, "data-miku-welcome-shell");
      mark(center?.querySelector('[class*="_headerBlank"]'), "data-miku-welcome-header");
      if (!welcome || !welcome.isConnected || welcome.lang !== language()) {
        remove(welcome);
        welcome = createWelcome((text) => fillComposer(text, activeInput?.actions));
        owned.add(welcome);
        stack.prepend(welcome);
      }
      const bar = seat?.querySelector('[data-slot="conversation.composer.bar"]'), editorRoot = bar?.querySelector('[class*="_root"]');
      mark(editorRoot, "data-miku-editor-root");
      if (current.artwork && current.polaroid && seat) {
        if (!photo || !photo.isConnected) {
          remove(photo);
          photo = createPolaroid(() => update({ polaroid: false }));
          owned.add(photo);
          seat.append(photo);
        }
      } else {
        remove(photo);
        photo = void 0;
      }
      const row = seat?.querySelector('[class*="_heroWorkspaceRow"]');
      if (row) {
        if (!photoSwitch || !photoSwitch.isConnected) {
          remove(photoSwitch);
          photoSwitch = node("button", "miku-photo-switch");
          photoSwitch.type = "button";
          photoSwitch.append(img("photo-icon"), node("span", "", copy[language()].photo));
          photoSwitch.addEventListener("click", () => update({ polaroid: !current.polaroid }));
          owned.add(photoSwitch);
          row.append(photoSwitch);
        }
        photoSwitch.setAttribute("aria-pressed", String(current.polaroid));
      }
      fitStage(seat, editorRoot);
    } else {
      clearSizing();
      remove(welcome);
      welcome = void 0;
      remove(photo);
      photo = void 0;
      remove(photoSwitch);
      photoSwitch = void 0;
    }
    if (current.enabled && center && !isWelcome && current.artwork && current.companion && document.querySelector('[data-slot="main.conversation"]')) {
      if (!companion || !companion.isConnected) {
        remove(companion);
        companion = img("chat", "miku-chat-figure");
        owned.add(companion);
        center.prepend(companion);
      }
    } else {
      remove(companion);
      companion = void 0;
    }
  }
  function schedule() {
    if (!frame && !disposed) frame = requestAnimationFrame(() => {
      frame = 0;
      sync();
    });
  }
  const observer = new MutationObserver((records) => {
    if (records.some((r) => [...r.addedNodes, ...r.removedNodes].some((n) => n.nodeType === 1 && !n.classList?.contains("miku-chat-figure") && !n.classList?.contains("miku-welcome")))) schedule();
  });
  observer.observe(body, { childList: true, subtree: true });
  const localeObserver = new MutationObserver(() => {
    current = { ...current };
    for (const fn of listeners) fn();
    schedule();
  });
  localeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  const storage = (e) => {
    if (e.key === STORAGE_KEY) {
      current = readCurrent();
      render();
      for (const fn of listeners) fn();
    }
  };
  window.addEventListener("storage", storage);
  window.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("scroll", schedule);
  render();
  sync();
  ctx.effect(() => () => {
    disposed = true;
    dockAlignment.dispose();
    observer.disconnect();
    localeObserver.disconnect();
    clearSizing();
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("storage", storage);
    window.removeEventListener("resize", schedule);
    window.visualViewport?.removeEventListener("resize", schedule);
    window.visualViewport?.removeEventListener("scroll", schedule);
    disposeTokens?.();
    restoreMarks();
    for (const el of owned) el.remove();
    listeners.clear();
    previousAttr === null ? body.removeAttribute(ATTR) : body.setAttribute(ATTR, previousAttr);
    for (const key of ["mikuPage", "mikuArtwork", "mikuCompanion", "mikuPolaroid"]) delete body.dataset[key];
    body.style.removeProperty("--miku-companion-opacity");
  }, "ekko-miku: restore presentation");
}
var inject = ["ekkoSkins"];
function apply(ctx) {
  const provider = { id: "miku", plugin: { name: "ekko-miku-presentation", inject: PRESENTATION_INJECT, apply: mountPresentation }, assets: ASSETS, storageKey: STORAGE_KEY, readSettings, normalizeSettings };
  ctx.effect(() => ctx.get("ekkoSkins").register(provider), "ekko-miku: provider registration");
}

return module.exports;}});
