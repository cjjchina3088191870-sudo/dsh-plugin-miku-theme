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
  apply: () => apply3,
  fillComposer: () => fillComposer2,
  inject: () => inject2
});
module.exports = __toCommonJS(client_exports);

// integrated/src/client.jsx
var import_react2 = __toESM(require("react"), 1);

// integrated/src/video-settings.jsx
var import_react = __toESM(require("react"), 1);

// integrated/src/boot-player.mjs
var BOOT_CSS = `
.ekko-boot{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:#10171e;color:#fff;opacity:1;isolation:isolate;font:14px/1.5 system-ui,sans-serif}
.ekko-boot[data-skin="rose"]{background:#241a20;--boot-accent:#f3b3c6}.ekko-boot[data-skin="miku"]{--boot-accent:#81eff0}
.ekko-boot video{display:block;width:100%;height:100%;position:absolute;inset:0;object-fit:cover}
.ekko-boot:after{content:"";position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 0 2px var(--boot-accent),inset 0 -100px 100px -75px #000b}
.ekko-boot button{position:relative;z-index:2;cursor:pointer;border:1px solid #fff8;background:#101820b8;color:white;border-radius:999px;min-height:44px;padding:9px 16px;font:inherit;backdrop-filter:blur(8px)}
.ekko-boot button:focus-visible{outline:3px solid var(--boot-accent);outline-offset:3px}
.ekko-boot-skip{position:absolute!important;right:max(18px,env(safe-area-inset-right));top:max(18px,env(safe-area-inset-top))}
.ekko-boot-footer{position:absolute;bottom:max(20px,env(safe-area-inset-bottom));left:max(20px,env(safe-area-inset-left));right:max(20px,env(safe-area-inset-right));display:grid;gap:10px;z-index:2;text-shadow:0 1px 8px #000}
.ekko-boot-toolbar{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.ekko-boot-toolbar span{margin-left:auto}.ekko-boot progress{width:100%;height:4px;accent-color:var(--boot-accent)}
@media(prefers-reduced-motion:reduce){.ekko-boot{scroll-behavior:auto}}
`;
var text = () => /^zh/i.test(document.documentElement.lang || navigator.language) ? {
  skip: "\u8DF3\u8FC7\u89C6\u9891",
  sound: "\u5F00\u542F\u58F0\u97F3",
  mute: "\u9759\u97F3",
  play: "\u64AD\u653E\u89C6\u9891",
  loading: "\u6B63\u5728\u52A0\u8F7D\u542F\u52A8\u89C6\u9891\u2026",
  hint: "\u70B9\u51FB\u753B\u9762\u6216\u6309 Esc \u8DF3\u8FC7",
  title: "\u4E3B\u9898\u542F\u52A8\u89C6\u9891"
} : { skip: "Skip video", sound: "Enable sound", mute: "Mute", play: "Play video", loading: "Loading startup video\u2026", hint: "Click the picture or press Esc to skip", title: "Theme startup video" };
var MOBILE_SCREEN = "(max-width: 768px), (hover: none) and (pointer: coarse) and (max-height: 768px)";
function selectBootVideo(entry, mobile = false) {
  if (!entry) return entry;
  return mobile && entry.mobile ? { ...entry, ...entry.mobile, device: "mobile" } : { ...entry, device: mobile ? "mobile" : "desktop" };
}
function videoSources(options, canPlayWebM) {
  const original = options?.url, alternate = options?.fallbackUrl;
  return [...new Set((canPlayWebM ? [alternate, original] : [original, alternate]).filter(Boolean))];
}
function playBoot(skin, options, { preview = false } = {}) {
  if (!options?.url || options.available === false || !preview && !options.enabled) return Promise.resolve();
  if (!preview && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
  if (document.querySelector(".ekko-boot")) return Promise.resolve();
  let c = text();
  const overlay = document.createElement("section"), video = document.createElement("video");
  overlay.className = "ekko-boot";
  overlay.dataset.skin = skin;
  overlay.dataset.device = options.device || "desktop";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", c.title);
  const style = document.createElement("style");
  style.dataset.ekkoBoot = "";
  style.textContent = BOOT_CSS;
  document.head.append(style);
  video.playsInline = true;
  video.preload = "auto";
  video.muted = !options.sound;
  video.volume = options.volume ?? 0.65;
  video.style.objectFit = options.fit || "cover";
  const sources = videoSources(options, Boolean(video.canPlayType('video/webm; codecs="vp8, opus"')));
  let sourceIndex = 0;
  video.src = sources[sourceIndex];
  const button = (label, cl) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.className = cl || "";
    return b;
  };
  const skip = button(c.skip, "ekko-boot-skip"), sound = button(video.muted ? c.sound : c.mute), play = button(c.play);
  play.hidden = true;
  const footer = document.createElement("div");
  footer.className = "ekko-boot-footer";
  const toolbar = document.createElement("div");
  toolbar.className = "ekko-boot-toolbar";
  const hint = document.createElement("span");
  hint.textContent = c.loading;
  const progress = document.createElement("progress");
  progress.max = 1;
  progress.value = 0;
  progress.setAttribute("aria-label", c.title);
  toolbar.append(sound, play, hint);
  footer.append(toolbar, progress);
  overlay.append(video, skip, footer);
  document.body.append(overlay);
  const previousFocus = document.activeElement, root = document.getElementById("root"), previousInert = root?.inert;
  if (root) root.inert = true;
  skip.focus();
  const localeObserver = new MutationObserver(() => {
    c = text();
    skip.textContent = c.skip;
    sound.textContent = video.muted ? c.sound : c.mute;
    play.textContent = c.play;
    hint.textContent = video.currentTime > 0 ? c.hint : c.loading;
    overlay.setAttribute("aria-label", c.title);
    progress.setAttribute("aria-label", c.title);
  });
  localeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  let leaving = false, finished = false, frame = 0, playTimer, loadTimer, resolve;
  const done = new Promise((r) => resolve = r);
  function cleanup() {
    if (finished) return;
    finished = true;
    clearTimeout(loadTimer);
    clearTimeout(playTimer);
    cancelAnimationFrame(frame);
    localeObserver.disconnect();
    document.removeEventListener("keydown", key, true);
    video.pause();
    video.removeAttribute("src");
    video.load();
    overlay.remove();
    style.remove();
    if (root) root.inert = previousInert;
    if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    resolve();
  }
  function leave(ms = 800) {
    if (leaving) return;
    leaving = true;
    clearTimeout(loadTimer);
    clearTimeout(playTimer);
    cancelAnimationFrame(frame);
    const start = performance.now(), volume = video.volume;
    const fade = () => {
      if (finished) return;
      const p = Math.min(1, (performance.now() - start) / ms);
      overlay.style.opacity = String(1 - p);
      video.volume = volume * (1 - p);
      if (p === 1) cleanup();
      else frame = requestAnimationFrame(fade);
    };
    frame = requestAnimationFrame(fade);
    playTimer = setTimeout(cleanup, ms + 150);
  }
  function key(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      leave(250);
    }
    if (e.key === "Tab") {
      const buttons = [skip, sound, ...play.hidden ? [] : [play]], index = buttons.indexOf(document.activeElement);
      e.preventDefault();
      buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
    }
  }
  document.addEventListener("keydown", key, true);
  skip.onclick = (e) => {
    e.stopPropagation();
    leave(250);
  };
  overlay.onclick = (e) => {
    if (!e.target.closest("button")) leave(250);
  };
  sound.onclick = async (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    try {
      await video.play();
    } catch {
      play.hidden = false;
    }
    sound.textContent = video.muted ? c.sound : c.mute;
  };
  play.onclick = async (e) => {
    e.stopPropagation();
    try {
      await video.play();
      play.hidden = true;
    } catch {
      video.muted = true;
      sound.textContent = c.sound;
      try {
        await video.play();
        play.hidden = true;
      } catch {
        leave(200);
      }
    }
  };
  video.addEventListener("ended", () => leave());
  video.addEventListener("error", () => {
    if (finished || leaving) return;
    if (sourceIndex + 1 < sources.length) {
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => leave(200), 12e3);
      video.src = sources[++sourceIndex];
      video.load();
      void startPlayback();
    } else leave(200);
  });
  video.addEventListener("playing", () => {
    clearTimeout(loadTimer);
    play.hidden = true;
    if (!playTimer) playTimer = setTimeout(() => leave(), Math.max(5, Math.min(60, options.maxSeconds || 30)) * 1e3);
    hint.textContent = c.hint;
  });
  video.addEventListener("timeupdate", () => {
    if (Number.isFinite(video.duration) && video.duration > 0) progress.value = Math.min(1, video.currentTime / video.duration);
  });
  loadTimer = setTimeout(() => leave(200), 12e3);
  async function startPlayback() {
    try {
      await video.play();
    } catch {
      if (finished || leaving) return;
      video.muted = true;
      sound.textContent = c.sound;
      try {
        await video.play();
      } catch {
        if (!finished && !leaving) play.hidden = false;
      }
    }
  }
  void startPlayback();
  return done;
}

// integrated/src/video-settings.jsx
var API = "./api/ekko-skins/";
var LIMIT = 96 * 1024 * 1024;
var fields = (entry) => Object.fromEntries(["enabled", "sound", "volume", "fit", "maxSeconds"].map((k) => [k, entry[k]]));
var draftFrom = (entry) => ({ ...fields(entry), mobileFit: entry.mobile?.fit || entry.fit });
async function request(path, options = {}) {
  const response = await fetch(API + path, { credentials: "same-origin", ...options });
  let data;
  try {
    data = await response.json();
  } catch {
    throw Error(response.status === 401 ? "\u767B\u5F55\u5DF2\u5931\u6548\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u65B0\u767B\u5F55\u3002" : "\u65E0\u6CD5\u8BFB\u53D6\u89C6\u9891\u8BBE\u7F6E\u3002");
  }
  if (!response.ok) throw Error(data.message || "\u89C6\u9891\u64CD\u4F5C\u5931\u8D25\u3002");
  return data;
}
var jsonBody = (data) => ({ headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
function previewError(video) {
  const code = video.error?.code;
  if (code === 2) return "\u89C6\u9891\u9884\u89C8\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002\u5DF2\u4FDD\u5B58\u7684\u89C6\u9891\u4E0D\u4F1A\u88AB\u5220\u9664\u3002";
  if (code === 3 || code === 4) return "\u5F53\u524D\u6D4F\u89C8\u5668\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\u6B64\u89C6\u9891\u3002\u6587\u4EF6\u4ECD\u53EF\u4E0A\u4F20\u548C\u4FDD\u5B58\uFF0C\u53EF\u6362\u6D4F\u89C8\u5668\u9884\u89C8\uFF1B\u82E5\u542F\u52A8\u65F6\u4E5F\u65E0\u6CD5\u64AD\u653E\uFF0C\u8BF7\u8F6C\u6362\u4E3A\u517C\u5BB9\u7684 H.264 MP4 \u6216 WebM\u3002";
  return "\u5F53\u524D\u9884\u89C8\u4E0D\u53EF\u7528\uFF0C\u4E0D\u5F71\u54CD\u4E0A\u4F20\u548C\u4FDD\u5B58\u89C6\u9891\u3002";
}
function VideoSettings({ skin }) {
  const [data, setData] = (0, import_react.useState)(null), [draft, setDraft] = (0, import_react.useState)(null), [message, setMessage] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [progress, setProgress] = (0, import_react.useState)(null);
  const [device, setDevice] = (0, import_react.useState)(() => window.matchMedia?.(MOBILE_SCREEN).matches ? "mobile" : "desktop"), [mediaError, setMediaError] = (0, import_react.useState)(""), [sourceIndex, setSourceIndex] = (0, import_react.useState)(0);
  const preview = (0, import_react.useRef)(null), operation = (0, import_react.useRef)(null), uploadId = (0, import_react.useRef)(null), alive = (0, import_react.useRef)(true), input = (0, import_react.useRef)(null);
  const accept = (value, preserve = false) => {
    if (!alive.current) return;
    setData(value);
    if (!preserve) setDraft(draftFrom(value.skins[skin]));
  };
  const load = async () => {
    try {
      accept(await request("boot"));
    } catch (e) {
      if (alive.current) setMessage(e.message);
    }
  };
  const base = data?.skins[skin], entry = selectBootVideo(base, device === "mobile");
  const sources = videoSources(entry, Boolean(document.createElement("video").canPlayType('video/webm; codecs="vp8, opus"'))), source = sources[sourceIndex] || sources[0];
  (0, import_react.useEffect)(() => {
    alive.current = true;
    void load();
    return () => {
      alive.current = false;
      operation.current?.abort();
      if (uploadId.current) void request("upload?action=cancel&id=" + uploadId.current, { method: "POST", ...jsonBody({}) }).catch(() => {
      });
    };
  }, [skin]);
  (0, import_react.useEffect)(() => {
    setSourceIndex(0);
    setMediaError("");
  }, [entry?.url, entry?.fallbackUrl, device]);
  (0, import_react.useEffect)(() => {
    const video = preview.current;
    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [source, device]);
  (0, import_react.useEffect)(() => {
    if (preview.current) preview.current.volume = draft?.volume ?? 0.65;
  }, [draft?.volume, source, device]);
  const save = async (reset = false) => {
    setBusy(true);
    setMessage("");
    try {
      const patch = reset ? { reset: true } : { ...fields(draft), mobile: { fit: draft.mobileFit } };
      accept(await request("boot-settings", { method: "POST", ...jsonBody({ skin, device, revision: data.revision, patch }) }), reset);
      setMessage(reset ? device === "mobile" ? "\u624B\u673A\u7AEF\u5DF2\u6539\u4E3A\u6CBF\u7528\u7535\u8111\u7AEF\u89C6\u9891\u3002" : "\u7535\u8111\u7AEF\u5DF2\u6062\u590D\u9ED8\u8BA4\u542F\u52A8\u89C6\u9891\u3002" : "\u542F\u52A8\u89C6\u9891\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\u3002");
    } catch (e) {
      setMessage(e.message);
      await load();
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  const upload = async (file) => {
    if (!file) return;
    setMessage("");
    if (!/\.(mp4|webm)$/i.test(file.name) || file.size > LIMIT || file.size < 16) {
      setMessage("\u8BF7\u9009\u62E9\u4E0D\u8D85\u8FC7 96 MiB \u7684 MP4 \u6216 WebM \u89C6\u9891\u3002");
      return;
    }
    const controller = new AbortController();
    operation.current = controller;
    setBusy(true);
    setProgress(0);
    try {
      const start = await request("upload", { method: "POST", signal: controller.signal, ...jsonBody({ skin, device, size: file.size, name: file.name, revision: data.revision }) });
      uploadId.current = start.id;
      for (let offset = 0; offset < file.size; offset += start.chunkSize) {
        const chunk = file.slice(offset, offset + start.chunkSize);
        await request("upload?action=chunk&id=" + start.id + "&offset=" + offset, { method: "POST", signal: controller.signal, headers: { "content-type": "application/octet-stream" }, body: chunk });
        if (alive.current) setProgress(Math.round(Math.min(file.size, offset + chunk.size) / file.size * 100));
      }
      const result = await request("upload?action=complete&id=" + start.id, { method: "POST", signal: controller.signal, ...jsonBody({}) });
      uploadId.current = null;
      accept(result, true);
      if (alive.current) setMessage((device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF") + "\u89C6\u9891\u5DF2\u4E0A\u4F20\u5E76\u4FDD\u5B58\uFF0C\u5237\u65B0\u9875\u9762\u65F6\u4F7F\u7528\u3002");
    } catch (e) {
      if (alive.current) setMessage(controller.signal.aborted ? "\u5DF2\u53D6\u6D88\u4E0A\u4F20\u3002" : e.message);
    } finally {
      if (uploadId.current) {
        const id = uploadId.current;
        uploadId.current = null;
        void request("upload?action=cancel&id=" + id, { method: "POST", ...jsonBody({}) }).catch(() => {
        });
      }
      operation.current = null;
      if (alive.current) {
        setBusy(false);
        setProgress(null);
        if (input.current) input.current.value = "";
      }
    }
  };
  if (!data || !draft) return /* @__PURE__ */ import_react.default.createElement("section", { className: "ekko-skin-options ekko-video-settings", "data-testid": "ekko-video-settings" }, /* @__PURE__ */ import_react.default.createElement("h3", null, "\u542F\u52A8\u89C6\u9891"), /* @__PURE__ */ import_react.default.createElement("p", { role: "status" }, message || "\u6B63\u5728\u8BFB\u53D6\u89C6\u9891\u8BBE\u7F6E\u2026"), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", onClick: load }, "\u91CD\u8BD5"));
  const update = (patch) => setDraft({ ...draft, ...patch }), fitKey = device === "mobile" ? "mobileFit" : "fit";
  return /* @__PURE__ */ import_react.default.createElement("section", { className: "ekko-skin-options ekko-video-settings", "data-testid": "ekko-video-settings", "data-device": device }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ekko-skin-toolbar" }, /* @__PURE__ */ import_react.default.createElement("h3", null, skin === "miku" ? "\u521D\u97F3\u672A\u6765" : "\u73AB\u7470\u5973\u738B", " \xB7 \u542F\u52A8\u89C6\u9891"), /* @__PURE__ */ import_react.default.createElement("span", { className: "ekko-skin-version" }, "\u6BCF\u6B3E\u4E3B\u9898\u5206\u522B\u4FDD\u5B58")), /* @__PURE__ */ import_react.default.createElement("div", { className: "ekko-video-controls" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react.default.createElement("span", null, "\u542F\u7528\u542F\u52A8\u89C6\u9891", /* @__PURE__ */ import_react.default.createElement("small", null, "\u9875\u9762\u542F\u52A8\u65F6\u64AD\u653E\uFF0C\u53EF\u968F\u65F6\u8DF3\u8FC7")), /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", checked: draft.enabled, disabled: busy, onChange: (e) => update({ enabled: e.target.checked }) })), /* @__PURE__ */ import_react.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react.default.createElement("span", null, "\u64AD\u653E\u58F0\u97F3", /* @__PURE__ */ import_react.default.createElement("small", null, "\u6D4F\u89C8\u5668\u9650\u5236\u81EA\u52A8\u64AD\u653E\u65F6\u5148\u9759\u97F3\uFF0C\u70B9\u51FB\u53EF\u5F00\u542F\u58F0\u97F3")), /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", checked: draft.sound, disabled: busy, onChange: (e) => update({ sound: e.target.checked }) })), /* @__PURE__ */ import_react.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react.default.createElement("span", null, "\u97F3\u91CF", /* @__PURE__ */ import_react.default.createElement("small", null, Math.round(draft.volume * 100), "%")), /* @__PURE__ */ import_react.default.createElement("input", { type: "range", min: "0", max: "100", value: Math.round(draft.volume * 100), disabled: busy, onChange: (e) => update({ volume: Number(e.target.value) / 100 }) })), /* @__PURE__ */ import_react.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react.default.createElement("span", null, "\u6700\u957F\u64AD\u653E\u65F6\u95F4", /* @__PURE__ */ import_react.default.createElement("small", null, "5\u201360 \u79D2\uFF0C\u5230\u65F6\u81EA\u52A8\u8FDB\u5165\u754C\u9762")), /* @__PURE__ */ import_react.default.createElement("input", { className: "ekko-video-seconds", type: "number", min: "5", max: "60", value: draft.maxSeconds, disabled: busy, onChange: (e) => update({ maxSeconds: Number(e.target.value) }) }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "ekko-video-device-tabs", role: "tablist", "aria-label": "\u542F\u52A8\u89C6\u9891\u5C4F\u5E55\u7C7B\u578B" }, ["desktop", "mobile"].map((value) => /* @__PURE__ */ import_react.default.createElement("button", { key: value, type: "button", role: "tab", id: "ekko-video-tab-" + skin + "-" + value, "aria-selected": device === value, "aria-controls": "ekko-video-panel-" + skin, disabled: busy, className: "ekko-skin-button", "data-active": device === value, onClick: () => {
    setDevice(value);
    setMessage("");
  } }, value === "mobile" ? "\u624B\u673A\u7AEF\u89C6\u9891" : "\u7535\u8111\u7AEF\u89C6\u9891"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "ekko-video-device-panel", role: "tabpanel", id: "ekko-video-panel-" + skin, "aria-labelledby": "ekko-video-tab-" + skin + "-" + device }, /* @__PURE__ */ import_react.default.createElement("p", { className: "ekko-skin-version" }, device === "mobile" ? "\u624B\u673A\u53CA\u7A84\u5C4F\u81EA\u52A8\u4F7F\u7528\u6B64\u89C6\u9891\uFF0C\u63A8\u8350 9:16 \u7AD6\u5C4F\uFF1B\u672A\u4E0A\u4F20\u65F6\u6CBF\u7528\u7535\u8111\u7AEF\u89C6\u9891\u3002" : "\u7535\u8111\u53CA\u5BBD\u5C4F\u4F7F\u7528\u6B64\u89C6\u9891\uFF0C\u63A8\u8350 16:9 \u6A2A\u5C4F\u3002", "\u652F\u6301\u5176\u4ED6\u5206\u8FA8\u7387\u4E0E\u6BD4\u4F8B\u3002"), /* @__PURE__ */ import_react.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react.default.createElement("span", null, device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF", "\u753B\u9762\u663E\u793A"), /* @__PURE__ */ import_react.default.createElement("select", { "aria-label": (device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF") + "\u753B\u9762\u663E\u793A", value: draft[fitKey], disabled: busy, onChange: (e) => update({ [fitKey]: e.target.value }) }, /* @__PURE__ */ import_react.default.createElement("option", { value: "cover" }, "\u94FA\u6EE1\u5C4F\u5E55"), /* @__PURE__ */ import_react.default.createElement("option", { value: "contain" }, "\u5B8C\u6574\u663E\u793A"))), /* @__PURE__ */ import_react.default.createElement("video", { key: device + source, ref: preview, className: "ekko-video-preview", "data-device": device, muted: !draft.sound, controls: true, playsInline: true, preload: "metadata", onLoadedMetadata: () => setMediaError(""), onError: (e) => {
    if (sourceIndex + 1 < sources.length) {
      setSourceIndex(sourceIndex + 1);
      setMediaError("\u6B63\u5728\u5C1D\u8BD5\u53E6\u4E00\u79CD\u89C6\u9891\u7F16\u7801\u2026");
    } else setMediaError(previewError(e.currentTarget));
  }, src: source, "aria-label": (device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF") + "\u542F\u52A8\u89C6\u9891\u9884\u89C8" }), /* @__PURE__ */ import_react.default.createElement("p", { className: "ekko-video-name" }, entry.source === "upload" ? entry.name : entry.source === "fallback" ? "\u6CBF\u7528\u7535\u8111\u7AEF\u89C6\u9891" + (base.name ? " \xB7 " + base.name : "") : "\u9ED8\u8BA4\u542F\u52A8\u89C6\u9891"), mediaError && /* @__PURE__ */ import_react.default.createElement("p", { className: "ekko-video-message", role: "status" }, mediaError)), /* @__PURE__ */ import_react.default.createElement("p", { className: "ekko-skin-version" }, "\u652F\u6301 MP4 / WebM\uFF0C\u6BCF\u4E2A\u89C6\u9891\u6700\u5927 96 MiB\u3002\u7535\u8111\u7AEF\u4E0E\u624B\u673A\u7AEF\u5206\u522B\u4FDD\u5B58\uFF0C\u53EF\u5728\u5F53\u524D DSH \u7684\u5176\u4ED6\u8BBE\u5907\u4E0A\u4F7F\u7528\u3002"), /* @__PURE__ */ import_react.default.createElement("input", { ref: input, className: "ekko-video-file", tabIndex: "-1", type: "file", accept: "video/mp4,video/webm,.mp4,.webm", disabled: busy, "aria-label": "\u4E0A\u4F20" + (device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF") + "\u542F\u52A8\u89C6\u9891", onChange: (e) => void upload(e.target.files?.[0]) }), progress !== null && /* @__PURE__ */ import_react.default.createElement("div", { role: "status" }, /* @__PURE__ */ import_react.default.createElement("progress", { max: "100", value: progress }), /* @__PURE__ */ import_react.default.createElement("span", null, " \u4E0A\u4F20 ", progress, "%"), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", onClick: () => operation.current?.abort() }, "\u53D6\u6D88\u4E0A\u4F20")), /* @__PURE__ */ import_react.default.createElement("div", { className: "ekko-video-actions" }, /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", disabled: busy, onClick: () => input.current?.click() }, "\u4E0A\u4F20", device === "mobile" ? "\u624B\u673A\u7AEF" : "\u7535\u8111\u7AEF", "\u89C6\u9891"), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", disabled: busy, onClick: () => void playBoot(skin, { ...entry, ...fields(draft), fit: draft[fitKey] }, { preview: true }) }, "\u9884\u89C8\u542F\u52A8\u6548\u679C"), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", disabled: busy || entry.source !== "upload", onClick: () => void save(true) }, device === "mobile" ? "\u6CBF\u7528\u7535\u8111\u7AEF\u89C6\u9891" : "\u6062\u590D\u9ED8\u8BA4\u89C6\u9891"), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "ekko-skin-button", "data-active": "true", disabled: busy, onClick: () => void save() }, "\u4FDD\u5B58\u542F\u52A8\u8BBE\u7F6E")), /* @__PURE__ */ import_react.default.createElement("p", { role: "status", className: "ekko-video-message" }, message));
}

// integrated/src/controller.mjs
var SELECTION_KEY = "dsh:ekko-skins:selection:v1";
var SKIN_IDS = ["default", "rose", "miku"];
function readSelection(storage, fallback = "rose") {
  try {
    const value = JSON.parse(storage.getItem(SELECTION_KEY));
    if (value?.version === 1 && SKIN_IDS.includes(value.skin)) return value.skin;
  } catch {
  }
  const old = {};
  for (const id of ["rose", "miku"]) try {
    old[id] = JSON.parse(storage.getItem("dsh:ekko-" + id + ":v1"))?.enabled;
  } catch {
  }
  if (old.rose === false && old.miku === true) return "miku";
  if (old.miku === false && old.rose === true) return "rose";
  if (old.rose === false && old.miku === false) return "default";
  return SKIN_IDS.includes(fallback) ? fallback : "rose";
}
function createController({ storage, mount, prepare = async () => {
}, fallback = "rose" }) {
  const providers = /* @__PURE__ */ new Map(), listeners = /* @__PURE__ */ new Set();
  let wanted = readSelection(storage, fallback), persistWanted = true, runtime = null, epoch = 0, closed = false, initialized = false, tail = Promise.resolve();
  let snapshot = { selected: "default", desired: wanted, busy: false, error: null, available: [] };
  const publish = (value) => {
    snapshot = { ...snapshot, ...value, available: [...providers.keys()] };
    for (const fn of listeners) fn();
  };
  async function release() {
    const previous = runtime;
    runtime = null;
    if (previous) await previous.handle.dispose();
  }
  function reconcile() {
    if (closed) return Promise.resolve();
    const ticket = ++epoch, target = wanted, persist = persistWanted;
    publish({ desired: target, busy: true, error: null });
    tail = tail.catch(() => {
    }).then(async () => {
      if (closed || ticket !== epoch) return;
      const provider = providers.get(target);
      if (target !== "default" && !provider) {
        if (runtime && providers.get(runtime.provider.id) !== runtime.provider) {
          await release();
          publish({ selected: "default" });
        }
        return;
      }
      if (runtime?.provider !== provider || target === "default") {
        if (provider) await prepare(provider);
        if (closed || ticket !== epoch) return;
        await release();
        if (closed || ticket !== epoch) return;
        if (provider) {
          runtime = { provider, handle: mount(provider) };
          try {
            await runtime.handle.ready();
          } catch (error) {
            await release();
            throw error;
          }
          if (closed || ticket !== epoch) {
            await release();
            return;
          }
        }
      }
      if (persist) try {
        storage.setItem(SELECTION_KEY, JSON.stringify({ version: 1, skin: target }));
      } catch {
      }
      publish({ selected: target, busy: false, error: null });
    }).catch((error) => {
      if (!closed && ticket === epoch) publish({ selected: runtime?.provider.id || "default", busy: false, error: String(error?.message || error) });
    });
    return tail;
  }
  return {
    getSnapshot: () => snapshot,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    register(provider) {
      if (!["rose", "miku"].includes(provider.id) || typeof provider.plugin?.apply !== "function") throw new TypeError("Unknown Ekko skin provider");
      const existing = providers.get(provider.id);
      if (existing && (existing.priority || 0) > (provider.priority || 0)) return () => {
      };
      providers.set(provider.id, provider);
      publish({});
      if (initialized && provider.id === wanted) void reconcile();
      return () => {
        if (providers.get(provider.id) !== provider) return;
        providers.delete(provider.id);
        publish({});
        if (provider.id === wanted || runtime?.provider === provider) void reconcile();
      };
    },
    choose(id, { persist = true } = {}) {
      if (!SKIN_IDS.includes(id)) return Promise.reject(new TypeError("Unknown skin"));
      initialized = true;
      wanted = id;
      persistWanted = persist;
      return reconcile();
    },
    initialize(defaultSkin, installedIds) {
      initialized = true;
      wanted = readSelection(storage, defaultSkin);
      if (Array.isArray(installedIds) && wanted !== "default" && !installedIds.includes(wanted)) wanted = defaultSkin === "default" ? "default" : installedIds.includes(defaultSkin) ? defaultSkin : SKIN_IDS.find((id) => id !== "default" && installedIds.includes(id)) || "default";
      persistWanted = true;
      return reconcile();
    },
    provider: (id) => providers.get(id),
    settled: () => tail,
    async dispose() {
      if (closed) return;
      closed = true;
      ++epoch;
      await tail.catch(() => {
      });
      await release();
      listeners.clear();
      providers.clear();
    }
  };
}

// integrated/src/generated.mjs
var STYLES = ".ekko-skins{display:grid;gap:18px;color:var(--dsw-alias-label-primary);font:14px/1.6 var(--ds-font-family,system-ui);}\n.ekko-skins h2,.ekko-skins h3,.ekko-skins p{margin:0;}.ekko-skins h2{font-size:20px;line-height:1.5;}.ekko-skins h3{font-size:15px;}\n.ekko-skins-intro{display:grid;gap:5px;}.ekko-skins-intro p,.ekko-skin-version,.ekko-skin-option small{color:var(--dsw-alias-label-secondary);font-size:12px;}\n.ekko-skin-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}\n.ekko-skin-card{min-width:0;overflow:hidden;border:1px solid var(--dsw-alias-border-l2);border-radius:16px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 4px 12px #234c6510;}\n.ekko-skin-card[data-active='true']{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent);}\n.ekko-skin-cover{display:block;width:100%;aspect-ratio:1400/787;object-fit:cover;border-bottom:1px solid var(--dsw-alias-border-l3);}\n.ekko-skin-description{display:grid;gap:10px;padding:13px;}.ekko-skin-title{display:flex;align-items:center;justify-content:space-between;gap:8px;}.ekko-skin-state{color:var(--dsw-alias-brand-text);font-size:11px;white-space:nowrap;}\n.ekko-skin-button{border:1px solid var(--dsw-alias-border-l2);border-radius:9px;padding:7px 12px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;}\n.ekko-skin-button:disabled{opacity:.65;cursor:default;}.ekko-skin-button:focus-visible,.ekko-skins input:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px;}\n.ekko-skin-button[data-active='true']{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary-invert);}\n.ekko-skin-option select{min-height:40px;max-width:52%;padding:6px 9px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;}\n.ekko-skin-option select:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px;}\n.ekko-skin-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;}.ekko-skin-options{padding:15px;border:1px solid var(--dsw-alias-border-l2);border-radius:14px;background:var(--dsw-alias-bg-layer-1);}\n.ekko-skin-option{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:40px;padding:8px 0;border-bottom:1px solid var(--dsw-alias-border-l3);}.ekko-skin-option:last-child{border:0;}.ekko-skin-option span{display:grid;gap:2px;}.ekko-skin-option input{accent-color:var(--dsw-alias-brand-primary);}.ekko-skin-option input[type='range']{width:130px;max-width:40%;}.ekko-skin-error{padding:10px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;color:var(--dsw-alias-state-danger,#c43d3d);font-size:13px;}\n@media(max-width:640px){.ekko-skin-grid{grid-template-columns:1fr;}.ekko-skins h2{font-size:18px;}.ekko-skin-toolbar{align-items:flex-start;}.ekko-skin-description{padding:12px;}}\n/* Keep the native settings shell usable on phones: tabs above the content. */\n@media(max-width:640px){\n [role='dialog']:has(>[class*='_nav']>[class*='_navList']){flex-direction:column;width:calc(100vw - 24px);max-width:calc(100vw - 24px);height:min(800px,calc(100dvh - 48px));}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList'])>[class*='_nav']{width:100%;padding:15px 12px 0;gap:12px;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList']) [class*='_navTitle']{padding-inline:5px;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList']) [class*='_navList']{flex-direction:row;gap:4px;overflow:auto;padding-bottom:5px;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList']) [class*='_navCell']{flex:none;width:max-content;height:36px;padding:7px 10px;font-size:13px;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList'])>[class*='_content']{min-height:0;width:100%;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList'])>[class*='_content']>[class*='_header']{position:absolute;top:10px;right:10px;height:auto;padding:0;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList'])>[class*='_content']>[class*='_header'] button{white-space:nowrap;flex-shrink:0;}\n [role='dialog']:has(>[class*='_nav']>[class*='_navList']) [class*='_options']{padding:12px 12px 18px;min-width:0;}\n .ekko-skins{gap:13px;width:100%;min-width:0;}\n .ekko-skin-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}\n .ekko-skin-description{padding:9px;gap:7px;min-width:0;}.ekko-skin-title{gap:4px;flex-wrap:wrap;}.ekko-skin-title h3{font-size:13px;}.ekko-skin-state{font-size:10px;}\n .ekko-skin-button{font-size:12px;padding:6px;min-height:36px;max-width:100%;overflow-wrap:anywhere;}\n .ekko-skin-toolbar{flex-wrap:wrap;min-width:0;}.ekko-skin-options{min-width:0;padding:11px;}.ekko-skin-options .ekko-skin-toolbar h3{font-size:13px;}\n}\n\n.ekko-video-settings{display:grid;gap:10px;min-width:0}.ekko-video-settings .ekko-skin-option{margin:0}.ekko-video-preview{display:block;width:100%;max-height:160px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:#101820;object-fit:contain}.ekko-video-name{font-weight:500;overflow-wrap:anywhere}.ekko-video-file{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none}.ekko-video-file::file-selector-button{font:inherit;padding:8px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);margin-right:8px}.ekko-video-actions{display:flex;gap:8px;flex-wrap:wrap}.ekko-video-seconds{width:72px;padding:7px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:inherit;font:inherit}.ekko-video-settings progress{max-width:100%;accent-color:var(--dsw-alias-brand-primary)}.ekko-video-message{font-size:12px;overflow-wrap:anywhere}\n\n.ekko-video-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 18px;min-width:0}.ekko-video-controls .ekko-skin-option{min-width:0;gap:10px}.ekko-video-controls .ekko-skin-option:last-child{grid-column:1/-1}.ekko-video-controls .ekko-skin-option span{min-width:0}.ekko-video-controls input[type=range]{width:100px}.ekko-video-actions .ekko-skin-button{min-height:40px}.ekko-video-settings{scroll-margin-top:12px}\n@media(max-width:640px){.ekko-video-controls{grid-template-columns:1fr}.ekko-video-preview{max-height:140px}.ekko-video-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ekko-video-actions .ekko-skin-button{width:100%;min-height:42px}.ekko-video-settings .ekko-skin-option small{font-size:11px}}\n\n.ekko-video-device-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:5px;border:1px solid var(--dsw-alias-border-l3);border-radius:13px;background:var(--dsw-alias-bg-layer-2)}\n.ekko-video-device-tabs .ekko-skin-button{min-height:40px;box-shadow:none;background:transparent;border-color:transparent}\n.ekko-video-device-tabs .ekko-skin-button[data-active='true']{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}\n.ekko-video-device-panel{display:grid;gap:8px;min-width:0}\n.ekko-video-preview[data-device='mobile']{width:100%;height:210px;max-height:210px;object-fit:contain}\n.ekko-video-device-tabs .ekko-skin-button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}\n.ekko-video-controls .ekko-skin-option:last-child{grid-column:auto}\n@media(max-width:640px){.ekko-video-preview[data-device='mobile']{height:200px;max-height:200px}.ekko-video-device-tabs{gap:4px;padding:4px}.ekko-video-device-tabs .ekko-skin-button{min-height:40px}}\n\n/* Both phone modes use the active skin's existing artwork and jewellery tokens. */\n.ekko-mobile-navigation{display:none;}\n@media(max-width:700px) and (orientation:portrait){\n body[data-ekko-mobile-nav] .ekko-mobile-navigation{position:fixed;z-index:65;display:flex;box-sizing:border-box;align-items:center;color:var(--dsw-alias-brand-primary);}\n body[data-ekko-mobile-nav] .ekko-mobile-brand,\n body[data-ekko-mobile-nav] .ekko-mobile-action{position:relative;display:flex;flex:none;align-items:center;justify-content:center;box-sizing:border-box;width:44px;height:44px;min-height:44px;padding:8px;border:1px solid var(--ekko-rim-soft);border-radius:14px;background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine),0 3px 8px var(--ekko-shadow);color:inherit;cursor:pointer;}\n body[data-ekko-mobile-nav] .ekko-mobile-brand{padding:6px;border-color:var(--ekko-rim);}\n body[data-ekko-mobile-nav] .ekko-mobile-brand img{display:block;width:31px;height:31px;object-fit:contain;}\n body[data-ekko-mobile-nav] .ekko-mobile-action :is(svg,img){width:21px;height:21px;flex:none;}\n body[data-ekko-mobile-nav] .ekko-mobile-action[data-ekko-mobile-action='new']{margin-top:4px;border-color:var(--ekko-rim);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 3px 8px var(--ekko-shadow);}\n body[data-ekko-mobile-nav] .ekko-mobile-action[aria-current]{background:var(--ekko-tint);border-color:var(--ekko-rim);}\n body[data-ekko-mobile-nav] .ekko-mobile-action:disabled{opacity:.45;cursor:default;}\n body[data-ekko-mobile-nav] .ekko-mobile-navigation button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}\n body[data-ekko-mobile-nav] .ekko-mobile-navigation button:active{box-shadow:inset 1px 2px 5px var(--ekko-shadow);}\n body[data-ekko-mobile-nav='corner'] .ekko-mobile-navigation{top:calc(env(safe-area-inset-top,0px) + 7px);left:9px;}\n body[data-ekko-mobile-nav='corner'] :is(.ekko-mobile-actions,.ekko-mobile-footer){display:none;}\n /* Set clearance on the content column so native drawer/platform frame rules cannot override it. */\n body[data-ekko-mobile-nav='corner'] [data-ekko-mobile-frame] [data-ekko-mobile-center]{--dsh-frame-leading-clearance:62px;}\n body[data-ekko-mobile-nav='corner'] :is(.miku-welcome-brand,.rose-welcome-brand){padding-left:48px;}\n body[data-ekko-mobile-nav='corner'] :is(.miku-mark,.rose-mark){display:none;}\n body[data-ekko-mobile-nav='rail'] .ekko-mobile-navigation{inset:0 auto 0 0;width:60px;flex-direction:column;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 13px) 7px max(10px,env(safe-area-inset-bottom,0px));background:var(--ekko-panel);border-right:1px solid var(--ekko-rim);box-shadow:inset -2px 0 0 var(--ekko-shine),inset -4px 0 0 var(--ekko-rim-soft);}\n body[data-ekko-mobile-nav='rail'] .ekko-mobile-actions{display:flex;flex:1;min-height:0;flex-direction:column;gap:10px;padding:0 0 4px;overflow:auto;scrollbar-width:none;}\n body[data-ekko-mobile-nav='rail'] .ekko-mobile-footer{display:flex;flex:none;padding-top:5px;border-top:1px solid var(--ekko-rim-soft);}\n body[data-ekko-mobile-nav='rail'] [data-ekko-mobile-frame] [data-ekko-mobile-center]{margin-inline-start:60px;--dsh-frame-leading-clearance:0px;}\n /* The native drawer stays inert while closed. Only our launchers remain visible. */\n body[data-ekko-mobile-nav] [data-ekko-mobile-frame] [data-shell-leading]{display:none;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-frame] [data-ekko-mobile-drawer]{z-index:80;background:var(--ekko-panel);box-shadow:12px 0 30px var(--ekko-shadow);}\n body[data-ekko-mobile-nav][data-ekko-mobile-drawer-open='true'] .ekko-mobile-navigation{visibility:hidden;pointer-events:none;}\n}\n\n/* Keep phone controls aligned when the icon rail reduces the editor width. */\n@media(max-width:700px) and (orientation:portrait){\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] :is([data-miku-editor-root],[data-rose-editor-root]){width:calc(100% + 8px);margin-inline-start:-4px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card]{container:ekko-composer / inline-size;gap:6px;padding-top:14px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] :is([data-miku-editor-root],[data-rose-editor-root]) [data-composer-card]{min-height:140px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card]>[class*='_scroll']{flex:1;min-height:56px;margin-right:0;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] [contenteditable]{padding-inline:12px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] button[class*='_primary']{align-self:center;transform:none;}\n}\n@container ekko-composer (max-width:350px){\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card]>[class*='_row']{display:grid;grid-template-columns:auto minmax(0,1fr) 30px 34px;grid-template-areas:'extras extras extras extras' 'tools model activity send';gap:4px 6px;padding:4px 7px 6px;align-items:center;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card]>[class*='_row']:not(:has([data-slot='conversation.input.right']:not(:empty))){grid-template-areas:'tools model activity send';}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] [class*='_tools']{grid-area:tools;gap:5px;align-items:center;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] :is([class*='_trailing'],[class*='_standardControls'],[class*='_modes']){display:contents;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] :is([class*='_tools'],[class*='_standardControls'])[hidden]{display:none!important;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] [class*='_trailing']>[class*='_activity']{display:contents;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.right']{grid-area:extras;display:flex!important;align-items:center;justify-content:flex-start;gap:8px;min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:thin;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.right']:empty{display:none!important;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.right']>*{flex:none;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.model']{grid-area:model;display:flex!important;min-width:0;justify-content:flex-end;align-items:center;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.model']>div{min-width:0;max-width:100%;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.model'] button{min-width:0;max-width:100%;height:34px;padding-inline:4px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.model'] :is([class*='_triggerLabel'],[class*='_triggerEffort']){display:none;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.model'] button>svg:first-child{display:block;flex:none;width:18px;height:18px;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-slot='conversation.input.activity']{grid-area:activity;display:flex!important;align-items:center;justify-content:center;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] button[class*='_primary']{grid-area:send;justify-self:end;}\n body[data-ekko-mobile-nav] [data-ekko-mobile-center] [data-composer-card] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){padding-inline:6px;}\n}\n";

// integrated/src/mobile-navigation.mjs
function createMobileNavigation({ layout, document: doc = document }) {
  const view = doc.defaultView, body = doc.body;
  let current = null, nav, brand, actions, footer, frame, sidebar, center, raf = 0, disposed = false;
  const marked = /* @__PURE__ */ new Map(), buttons = /* @__PURE__ */ new Map();
  const mark = (el, name, value = "") => {
    if (!el) return;
    if (!marked.has(el)) marked.set(el, /* @__PURE__ */ new Map());
    const attrs = marked.get(el);
    if (!attrs.has(name)) attrs.set(name, el.getAttribute(name));
    if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  };
  const restore = () => {
    for (const [el, attrs] of marked) for (const [name, value] of attrs) value === null ? el.removeAttribute(name) : el.setAttribute(name, value);
    marked.clear();
  };
  const phone = () => view.innerWidth <= 700 && view.innerHeight >= view.innerWidth;
  const isOpen = () => frame && !frame.hasAttribute("data-sidebar-collapsed");
  const nativeButton = (key) => {
    if (!sidebar) return null;
    if (key === "new") return sidebar.querySelector('button[class*="_newSession"]');
    if (key === "search") return sidebar.querySelector('button[class*="_searchButton"]');
    if (key === "account") return sidebar.querySelector('button[aria-label="\u8D26\u53F7\u83DC\u5355"],button[aria-label="Account menu"]');
    if (key.startsWith("panel:")) return [...sidebar.querySelectorAll('button[class*="_panelRow"]')].find((el) => el.getAttribute("aria-label") === key.slice(6));
    return null;
  };
  function activate(key) {
    const target = nativeButton(key);
    if (!target || target.disabled) return;
    if (key === "search" || key === "account" || target.hasAttribute("aria-haspopup")) {
      if (!isOpen()) layout.toggleSidebar();
      view.requestAnimationFrame(() => {
        if (!disposed) nativeButton(key)?.click();
      });
    } else target.click();
  }
  function makeButton(key, label) {
    const button = doc.createElement("button");
    button.type = "button";
    button.className = "ekko-mobile-action";
    button.dataset.ekkoMobileAction = key;
    button.setAttribute("aria-label", label);
    button.title = label;
    button.addEventListener("click", () => activate(key));
    buttons.set(key, button);
    return button;
  }
  function mount() {
    nav = doc.createElement("nav");
    nav.className = "ekko-mobile-navigation";
    nav.setAttribute("aria-label", "\u624B\u673A\u5BFC\u822A");
    nav.dataset.ekkoMobileNavigation = "";
    brand = doc.createElement("button");
    brand.type = "button";
    brand.className = "ekko-mobile-brand";
    brand.dataset.sidebarOpener = "";
    brand.setAttribute("aria-label", "\u6253\u5F00\u4FA7\u8FB9\u680F");
    brand.title = "\u6253\u5F00\u4FA7\u8FB9\u680F";
    brand.addEventListener("click", () => layout.toggleSidebar());
    actions = doc.createElement("div");
    actions.className = "ekko-mobile-actions";
    footer = doc.createElement("div");
    footer.className = "ekko-mobile-footer";
    nav.append(brand, actions, footer);
    body.prepend(nav);
  }
  function paintButton(key, target, parent) {
    if (!target) return;
    const label = target.getAttribute("aria-label") || target.textContent.trim();
    let button = buttons.get(key);
    if (!button) {
      button = makeButton(key, label);
      parent.append(button);
    }
    button.setAttribute("aria-label", label);
    button.title = label;
    button.disabled = target.disabled;
    const selected = target.getAttribute("aria-current");
    if (selected) button.setAttribute("aria-current", selected);
    else button.removeAttribute("aria-current");
    const icon = target.querySelector("svg,img");
    const signature = icon?.outerHTML || "";
    if (button.dataset.iconSignature !== signature) {
      button.replaceChildren(...icon ? [icon.cloneNode(true)] : []);
      button.dataset.iconSignature = signature;
    }
  }
  function clear() {
    nav?.remove();
    nav = brand = actions = footer = void 0;
    buttons.clear();
    restore();
    frame = sidebar = center = void 0;
  }
  function sync() {
    if (disposed) return;
    if (!current || !phone() || !body.hasAttribute("data-dsh-ekko-" + current.skin)) {
      if (nav || marked.size) clear();
      return;
    }
    const nextSidebar = doc.querySelector('[data-slot="sidebar"]'), nextFrame = nextSidebar?.closest('[class*="_frame"]');
    if (!nextSidebar || !nextFrame) return;
    if (frame && frame !== nextFrame) clear();
    frame = nextFrame;
    sidebar = nextSidebar;
    center = frame.querySelector('[class*="_centerCol"]');
    if (!nav) mount();
    mark(body, "data-ekko-mobile-nav", current.mode === "rail" ? "rail" : "corner");
    mark(body, "data-ekko-mobile-drawer-open", String(isOpen()));
    mark(frame, "data-ekko-mobile-frame");
    mark(center, "data-ekko-mobile-center");
    mark(sidebar.closest('[class*="_sidebarCol"]'), "data-ekko-mobile-drawer");
    mark(sidebar, "id", "ekko-mobile-native-sidebar");
    brand.setAttribute("aria-controls", "ekko-mobile-native-sidebar");
    brand.setAttribute("aria-expanded", String(isOpen()));
    const lang = /^zh/i.test(doc.documentElement.lang || view.navigator.language), openLabel = lang ? "\u6253\u5F00\u4FA7\u8FB9\u680F" : "Open sidebar";
    nav.setAttribute("aria-label", lang ? "\u624B\u673A\u5BFC\u822A" : "Phone navigation");
    brand.setAttribute("aria-label", openLabel);
    brand.title = openLabel;
    if (brand.dataset.mark !== current.mark) {
      const img3 = doc.createElement("img");
      img3.src = current.mark;
      img3.alt = "";
      img3.draggable = false;
      brand.replaceChildren(img3);
      brand.dataset.mark = current.mark;
    }
    const wanted = /* @__PURE__ */ new Set(["new", "search", "account"]);
    paintButton("new", nativeButton("new"), actions);
    for (const target of sidebar.querySelectorAll('button[class*="_panelRow"]')) {
      const label = target.getAttribute("aria-label");
      if (!label) continue;
      const key = "panel:" + label;
      wanted.add(key);
      paintButton(key, target, actions);
    }
    paintButton("search", nativeButton("search"), actions);
    paintButton("account", nativeButton("account"), footer);
    for (const [key, button] of buttons) if (!wanted.has(key) || !nativeButton(key)) {
      button.remove();
      buttons.delete(key);
    }
  }
  function schedule() {
    if (!raf && !disposed) raf = view.requestAnimationFrame(() => {
      raf = 0;
      sync();
    });
  }
  const observer = new view.MutationObserver((records) => {
    if (records.some((record) => {
      const target = record.target.nodeType === 1 ? record.target : record.target.parentElement;
      if (target?.closest("[data-ekko-mobile-navigation]")) return false;
      if (record.type === "attributes") return record.attributeName === "data-sidebar-collapsed" || target?.closest('[data-slot="sidebar"]') || target === doc.documentElement;
      return [...record.addedNodes, ...record.removedNodes].some((node3) => node3.nodeType === 1 && !node3.hasAttribute?.("data-ekko-mobile-navigation"));
    })) schedule();
  });
  observer.observe(doc.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-sidebar-collapsed", "aria-current", "aria-label", "disabled", "lang"] });
  const closeAfterSelection = (event) => {
    if (!current || !phone() || !isOpen() || !sidebar?.contains(event.target)) return;
    const target = event.target.closest?.('button,[role="button"],a'), row = event.target.closest?.('[data-row-key^="session:"]');
    if (event.target.closest?.('[aria-haspopup],[role="menu"],input,textarea')) return;
    if (row && target && target !== row) return;
    if (!row && !event.target.closest?.('button[class*="_newSession"]')) return;
    view.requestAnimationFrame(() => {
      if (!disposed && isOpen()) layout.toggleSidebar();
    });
  };
  doc.addEventListener("click", closeAfterSelection, true);
  view.addEventListener("resize", schedule);
  return {
    update(value) {
      current = value;
      sync();
    },
    dispose() {
      disposed = true;
      observer.disconnect();
      doc.removeEventListener("click", closeAfterSelection, true);
      view.removeEventListener("resize", schedule);
      if (raf) view.cancelAnimationFrame(raf);
      clear();
    }
  };
}

// integrated/src/client.jsx
var inject = ["slots", "theme", "layout"];
var NAMES = { rose: { zh: "\u73AB\u7470\u5973\u738B", en: "Rose Queen" }, miku: { zh: "\u521D\u97F3\u672A\u6765", en: "Hatsune Miku" } };
var COPY = {
  zh: { nav: "Ekko \u76AE\u80A4", title: "\u73AB\u7470\u4E0E\u521D\u97F3", intro: "\u9009\u62E9\u4F60\u7684\u521B\u4F5C\u7A7A\u95F4\uFF1B\u6BCF\u4E2A\u4E3B\u9898\u7684\u88C5\u9970\u504F\u597D\u5206\u522B\u4FDD\u7559\u3002", use: "\u4F7F\u7528", active: "\u5F53\u524D\u4F7F\u7528", switching: "\u6B63\u5728\u5207\u6362\u2026", native: "\u539F\u751F\u754C\u9762", options: "\u4E3B\u9898\u88C5\u9970", artwork: "\u6B22\u8FCE\u9875\u88C5\u9970", companion: "\u5BF9\u8BDD\u4EBA\u7269\u80CC\u666F", polaroid: "\u53F3\u4E0B\u89D2\u7167\u7247", opacity: "\u5BF9\u8BDD\u80CC\u666F\u6D53\u5EA6", reset: "\u6062\u590D\u6B64\u4E3B\u9898\u9ED8\u8BA4", loading: "\u6B63\u5728\u52A0\u8F7D\u4E3B\u9898\u2026", unavailable: "\u53EF\u9009\u4E3B\u9898\uFF0C\u5C1A\u672A\u5B89\u88C5", retry: "\u91CD\u8BD5", loadFailed: "\u76AE\u80A4\u7BA1\u7406\u5668\u6682\u65F6\u65E0\u6CD5\u52A0\u8F7D\uFF0C\u8BF7\u91CD\u8BD5\u3002", materialFailed: "\u4E3B\u9898\u7D20\u6750\u672A\u80FD\u52A0\u8F7D\uFF0C\u8BF7\u91CD\u8BD5\u3002" },
  en: { nav: "Ekko skins", title: "Rose & Miku", intro: "Choose your creative space. Each skin keeps its own appearance preferences.", use: "Use", active: "In use", switching: "Switching\u2026", native: "Native appearance", options: "Artwork preferences", artwork: "Welcome artwork", companion: "Chat character background", polaroid: "Corner photo", opacity: "Chat background opacity", reset: "Reset this skin", loading: "Loading skins\u2026", unavailable: "Optional skin, not installed", retry: "Retry", loadFailed: "Unable to load the skin manager. Please retry.", materialFailed: "Unable to load the skin artwork. Please retry." }
};
var language = () => /^zh/i.test(document.documentElement.lang || navigator.language) ? "zh" : "en";
function apply(ctx) {
  const storage = window.localStorage, imageCache = /* @__PURE__ */ new Map();
  let alive = true, catalog = null, loadError = null, view, preferenceRevision = 0, initialized = false;
  const navigation = createMobileNavigation({ layout: ctx.get("layout") });
  const listeners = /* @__PURE__ */ new Set();
  const prepare = (provider) => Promise.all([...new Set(Object.values(provider.assets))].filter((url) => !url.startsWith("data:")).map((url) => {
    if (!imageCache.has(url)) imageCache.set(url, new Promise((resolve, reject) => {
      const img3 = new Image(), timer = setTimeout(() => {
        img3.onload = img3.onerror = null;
        reject(Error(COPY[language()].materialFailed));
      }, 12e3);
      img3.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      img3.onerror = () => {
        clearTimeout(timer);
        reject(Error(COPY[language()].materialFailed));
      };
      img3.src = url;
    }).catch((error) => {
      imageCache.delete(url);
      throw error;
    }));
    return imageCache.get(url);
  }));
  const controller = createController({ storage, prepare, mount(provider) {
    const fiber = ctx.plugin(provider.plugin);
    return { ready: () => fiber.await(), dispose: () => fiber.dispose() };
  } });
  const refresh = () => {
    const presentation = controller.getSnapshot(), provider = controller.provider(presentation.selected);
    navigation.update(provider ? { skin: provider.id, mode: provider.readSettings(storage).mobileNav, mark: provider.assets.mark || provider.assets.rose } : null);
    view = { catalog, error: loadError, presentation, preferenceRevision };
    for (const fn of listeners) fn();
  };
  const unsubscribe = controller.subscribe(refresh);
  refresh();
  ctx.provide("ekkoSkins", controller);
  const style = document.createElement("style");
  style.dataset.ekkoSkinManager = "";
  style.textContent = STYLES;
  document.head.append(style);
  async function load() {
    loadError = null;
    refresh();
    try {
      const response = await fetch("./ekko-skins/catalog", { credentials: "same-origin" });
      if (!response.ok) throw Error("catalog");
      const result = await response.json();
      if (!Array.isArray(result.skins)) throw Error("catalog");
      if (!alive) return;
      catalog = result;
      refresh();
      if (!initialized) {
        initialized = true;
        await controller.initialize(result.defaultSkin, result.skins.filter((s) => s.available).map((s) => s.id));
      } else {
        const current = controller.getSnapshot().desired;
        if (current !== "default" && !result.skins.some((s) => s.id === current && s.available)) await controller.choose(result.defaultSkin);
      }
    } catch {
      if (alive) {
        loadError = COPY[language()].loadFailed;
        refresh();
      }
    }
  }
  function setPreference(id, patch) {
    const provider = controller.provider(id);
    if (!provider) return;
    const value = { ...provider.normalizeSettings({ ...provider.readSettings(storage), ...patch }), enabled: true };
    let oldValue;
    try {
      oldValue = storage.getItem(provider.storageKey);
      storage.setItem(provider.storageKey, JSON.stringify(value));
    } catch {
    }
    window.dispatchEvent(new StorageEvent("storage", { key: provider.storageKey, newValue: JSON.stringify(value), oldValue: oldValue || null, storageArea: storage }));
    preferenceRevision++;
    refresh();
  }
  const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  function Panel() {
    (0, import_react2.useEffect)(() => {
      if (innerWidth > 640) return;
      const frame = requestAnimationFrame(() => document.querySelector("[role='dialog'] [class*='_navList'] [class*='_active']")?.scrollIntoView({ block: "nearest", inline: "nearest" }));
      return () => cancelAnimationFrame(frame);
    }, []);
    const state = (0, import_react2.useSyncExternalStore)(subscribe, () => view), lang = language(), c = COPY[lang], p = state.presentation;
    const id = p.selected, provider = controller.provider(id), prefs = provider ? provider.readSettings(storage) : null;
    const choose = (target) => {
      void controller.choose(target);
    };
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: "ekko-skins", "data-ekko-skin-manager": "", "aria-label": c.nav }, /* @__PURE__ */ import_react2.default.createElement("header", { className: "ekko-skins-intro" }, /* @__PURE__ */ import_react2.default.createElement("h2", null, c.title), /* @__PURE__ */ import_react2.default.createElement("p", null, c.intro)), state.error && /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-error", role: "alert" }, state.error, " ", /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "ekko-skin-button", onClick: load }, c.retry)), !state.catalog && !state.error && /* @__PURE__ */ import_react2.default.createElement("p", { role: "status" }, c.loading), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-grid" }, ["rose", "miku"].map((skin) => {
      const entry = state.catalog?.skins.find((s) => s.id === skin), name = NAMES[skin][lang], active = id === skin, available = entry?.available && p.available.includes(skin);
      return /* @__PURE__ */ import_react2.default.createElement("article", { key: skin, className: "ekko-skin-card", "data-active": active }, entry?.preview && /* @__PURE__ */ import_react2.default.createElement("img", { className: "ekko-skin-cover", src: entry.preview[document.body.hasAttribute("data-ds-dark-theme") ? "dark" : "light"], alt: name, loading: "lazy" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-description" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-title" }, /* @__PURE__ */ import_react2.default.createElement("h3", null, name), active && /* @__PURE__ */ import_react2.default.createElement("span", { className: "ekko-skin-state" }, c.active)), /* @__PURE__ */ import_react2.default.createElement("span", { className: "ekko-skin-version" }, entry?.version ? "v" + entry.version : c.unavailable), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "ekko-skin-button", "data-active": active, disabled: !available || active || p.busy, onClick: () => choose(skin) }, p.busy && p.desired === skin ? c.switching : active ? c.active : c.use + " " + name)));
    })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-toolbar" }, /* @__PURE__ */ import_react2.default.createElement("span", null, p.busy ? c.switching : id === "default" ? c.native : NAMES[id]?.[lang]), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "ekko-skin-button", disabled: id === "default" || p.busy, onClick: () => choose("default") }, c.native)), p.error && /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-error", role: "alert" }, p.error, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "ekko-skin-button", onClick: () => choose(p.desired) }, c.retry)), prefs && /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-options" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ekko-skin-toolbar" }, /* @__PURE__ */ import_react2.default.createElement("h3", null, NAMES[id][lang], " \xB7 ", c.options), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "ekko-skin-button", disabled: p.busy, onClick: () => setPreference(id, { artwork: true, companion: true, polaroid: true, opacity: 0.12, mobileNav: "corner" }) }, c.reset)), /* @__PURE__ */ import_react2.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react2.default.createElement("span", null, lang === "zh" ? "\u624B\u673A\u5BFC\u822A\u65B9\u5F0F" : "Phone navigation", /* @__PURE__ */ import_react2.default.createElement("small", null, lang === "zh" ? "\u7AD6\u5C4F\u624B\u673A\u751F\u6548\uFF0C\u4E24\u4E2A\u4E3B\u9898\u5206\u522B\u4FDD\u5B58" : "Portrait phones; saved separately for each skin")), /* @__PURE__ */ import_react2.default.createElement("select", { "aria-label": lang === "zh" ? "\u624B\u673A\u5BFC\u822A\u65B9\u5F0F" : "Phone navigation", value: prefs.mobileNav || "corner", disabled: p.busy, onChange: (e) => setPreference(id, { mobileNav: e.target.value }) }, /* @__PURE__ */ import_react2.default.createElement("option", { value: "corner" }, lang === "zh" ? "\u5DE6\u4E0A\u89D2\u6309\u94AE + \u62BD\u5C49" : "Corner button + drawer"), /* @__PURE__ */ import_react2.default.createElement("option", { value: "rail" }, lang === "zh" ? "\u5DE6\u4FA7\u7EB5\u5411\u56FE\u6807\u680F" : "Vertical icon rail"))), ["artwork", "companion", "polaroid"].map((key) => /* @__PURE__ */ import_react2.default.createElement("label", { className: "ekko-skin-option", key }, /* @__PURE__ */ import_react2.default.createElement("span", null, c[key]), /* @__PURE__ */ import_react2.default.createElement("input", { type: "checkbox", checked: prefs[key], disabled: p.busy, onChange: (e) => setPreference(id, { [key]: e.target.checked }) }))), /* @__PURE__ */ import_react2.default.createElement("label", { className: "ekko-skin-option" }, /* @__PURE__ */ import_react2.default.createElement("span", null, c.opacity, /* @__PURE__ */ import_react2.default.createElement("small", null, Math.round(prefs.opacity * 100), "%")), /* @__PURE__ */ import_react2.default.createElement("input", { type: "range", min: ".04", max: ".24", step: ".01", value: prefs.opacity, disabled: p.busy, onChange: (e) => setPreference(id, { opacity: Number(e.target.value) }) }))), prefs && /* @__PURE__ */ import_react2.default.createElement(VideoSettings, { key: id, skin: id }));
  }
  function registerSection() {
    return ctx.slots.inject("settings.section", () => ctx.slots.register({ name: "settings.section", id: "ekko-skins", order: 115, label: () => COPY[language()].nav }, Panel));
  }
  let section = registerSection();
  const locale = new MutationObserver(() => {
    section?.();
    section = registerSection();
    refresh();
  });
  locale.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  const appearance = new MutationObserver(refresh);
  appearance.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
  const onStorage = (e) => {
    if (e.key === SELECTION_KEY) void controller.choose(readSelection(storage, catalog?.defaultSkin), { persist: false });
    if (e.key?.startsWith("dsh:ekko-")) {
      preferenceRevision++;
      refresh();
    }
  };
  const onPreferences = () => {
    preferenceRevision++;
    refresh();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("dsh:ekko-skin-preferences", onPreferences);
  void load();
  const catalogTimer = setInterval(() => void load(), 15e3);
  const reloadCatalog = () => void load();
  window.addEventListener("focus", reloadCatalog);
  ctx.effect(() => async () => {
    alive = false;
    clearInterval(catalogTimer);
    window.removeEventListener("focus", reloadCatalog);
    section?.();
    locale.disconnect();
    appearance.disconnect();
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("dsh:ekko-skin-preferences", onPreferences);
    unsubscribe();
    navigation.dispose();
    await controller.dispose();
    style.remove();
    listeners.clear();
    imageCache.clear();
  }, "ekko-skins: controller, section and presentation cleanup");
}

// integrated/src/shared-lease.mjs
function acquireShared(ctx, key, plugin, config = {}) {
  const symbol = /* @__PURE__ */ Symbol.for("dsh.ekko-skins.leases." + key);
  const leases = globalThis[symbol] ??= /* @__PURE__ */ new WeakMap(), root = ctx.root;
  if (!root || typeof root.plugin !== "function") throw Error("DSH root context unavailable");
  let state = leases.get(root);
  if (!state) {
    state = { users: 0, fiber: null };
    leases.set(root, state);
    try {
      state.fiber = root.plugin(plugin, config);
    } catch (error) {
      leases.delete(root);
      throw error;
    }
  }
  state.users++;
  let released = false;
  ctx.effect(() => () => {
    if (released) return;
    released = true;
    if (--state.users === 0) {
      leases.delete(root);
      return state.fiber.dispose();
    }
  }, "ekko-skins: shared " + key + " lease");
  return state.fiber;
}

// integrated/src/client-entry.mjs
var manager = { name: "ekko-skins-shared-client-v2", inject, apply };
function acquireClient(ctx) {
  return acquireShared(ctx, "client-v2", manager);
}

// themes/rose/src/client.jsx
var import_react3 = __toESM(require("react"), 1);

// themes/rose/src/palette.mjs
var colors = {
  "alias-bg-base": ["#fcf6f1", "#211b1e"],
  "alias-bg-layer-1": ["#fffaf6", "#30252b"],
  "alias-bg-layer-2": ["#f8eeea", "#392c33"],
  "alias-bg-layer-3": ["#f2dfdf", "#45333d"],
  "alias-bg-overlay": ["#fffaf7", "#30252b"],
  "alias-bg-module-platform": ["#fffaf5", "#2c2228"],
  "alias-bg-document-preview": ["#fffaf6", "#292126"],
  "alias-label-primary": ["#62443f", "#f3dedc"],
  "alias-label-primary-foreground": ["#62443f", "#f3dedc"],
  "alias-label-primary-bluish": ["#9c5265", "#edb3c2"],
  "alias-label-secondary": ["#937a74", "#c6a7b0"],
  "alias-label-tertiary": ["#a88a83", "#a88994"],
  "alias-label-caption": ["#937a74", "#c6a7b0"],
  "alias-label-dimmed": ["#a88a83", "#a88994"],
  "alias-label-primary-dimmed": ["#937a74", "#c6a7b0"],
  "alias-label-primary-inverted": ["#fffaf6", "#302028"],
  "alias-border-l1": ["#ce9da6", "#88616e"],
  "alias-border-l2": ["#dfb8bd", "#6c4b58"],
  "alias-border-l2-darkmode-thin": ["#dfb8bd", "#6c4b58"],
  "alias-border-l3": ["#e6cbca", "#583e49"],
  "alias-border-l4": ["#f0dfda", "#49333e"],
  "alias-separator-primary": ["#e6cbca", "#583e49"],
  "alias-brand-primary": ["#b7657c", "#e6a8bb"],
  "alias-brand-text": ["#a9586c", "#efbccb"],
  "alias-brand-primary-invert": ["#fffaf6", "#302028"],
  "alias-link": ["#a9586c", "#efbccb"],
  "alias-button-primary-fill": ["#bf7185", "#d79caf"],
  "alias-button-primary-hover": ["#a9586c", "#edb6c8"],
  "alias-button-primary-dimmed": ["#edcfd5", "#62404e"],
  "alias-button-contrast-fill": ["#62443f", "#f3dedc"],
  "alias-button-elevated-fill": ["#fffaf6", "#392a32"],
  "alias-button-info-fill": ["#f5e3e4", "#46303b"],
  "alias-button-info-hover": ["#edd0d6", "#5a3c4c"],
  "alias-button-floating-fill": ["#fffaf6", "#392a32"],
  "alias-button-floating-hover": ["#f5e3e4", "#46303b"],
  "alias-button-tool-bar-hover": ["#f5e3e4", "#46303b"],
  "alias-button-tool-bar-fill": ["#fffaf5", "#392a32"],
  "alias-interactive-bg-hover": ["#f7e7e5", "#44303b"],
  "alias-interactive-bg-hover-solid": ["#f3dddd", "#44303b"],
  "alias-interactive-bg-active": ["#efd4da", "#563b49"],
  "alias-interactive-bg-hover-accent": ["#f3dddd", "#563b49"],
  "alias-state-business-primary": ["#b7657c", "#e6a8bb"],
  "alias-state-business-tertiary": ["#f8e8e8", "#47303b"],
  "alias-settings-card-fill": ["#fffaf6", "#30252b"],
  "alias-settings-card-stroke": ["#e6cbca", "#583e49"],
  "alias-menu-group-header-fill": ["#fcf5f1", "#30252b"],
  "alias-menu-icon": ["#b67686", "#d79caf"],
  "alias-switch-thumb": ["#fffaf6", "#f3dedc"],
  "alias-scrollbar-bg-l1": ["#dec0c1", "#684b57"],
  "alias-scrollbar-bg-l2": ["#ead4d1", "#503946"],
  "alias-scrollbar-hover-l1": ["#c995a4", "#9a6b80"],
  "alias-scrollbar-hover-l2": ["#d5a7b3", "#80596d"],
  "alias-markdown-inline-code": ["#f6e9e5", "#413039"],
  "alias-markdown-code-block": ["#fbf3ee", "#211c22"],
  "alias-markdown-code-block-banner": ["#f4e4df", "#352731"],
  "alias-markdown-code-segment-unselected": ["#fbf3ee", "#211c22"],
  "alias-markdown-code-segment-selected": ["#f3dddd", "#503443"],
  "alias-markdown-citation": ["#a9586c", "#efbccb"],
  "alias-markdown-tag": ["#f1d9df", "#533644"],
  "alias-tooltip-bg": ["#62443f", "#ecd3dc"],
  "alias-tooltip-key-bg": ["#7b5954", "#d5aebf"],
  "alias-toast-bg": ["#62443f", "#ecd3dc"],
  "alias-toast-label": ["#fffaf6", "#302028"],
  "alias-turn-trigger-bg": ["#fffaf6", "#30252b"],
  "alias-turn-trigger-bg-hover": ["#f7e7e5", "#44303b"],
  "alias-onboarding-card-fill": ["#fffaf6", "#30252b"],
  "alias-onboarding-secondary-fill": ["#f8eeea", "#392c33"],
  "alias-onboarding-accent": ["#b7657c", "#e6a8bb"],
  "specific-sidebar-fill": ["#fcf5f1d9", "#281f26ed"],
  "specific-sidebar-nav-item-active": ["#f1d9df", "#503443"],
  "specific-sidebar-nav-item-active-accent": ["#f1d9df", "#503443"],
  "specific-sidebar-nav-item-hover": ["#f7e7e5", "#44303b"],
  "specific-input-major": ["#fffaf7f5", "#30252bf5"],
  "specific-login-input": ["#fffaf7", "#30252b"],
  "specific-selector": ["#fffaf7", "#392a32"],
  "specific-menu": ["#fffaf7", "#30252b"],
  "specific-bubble": ["#f3e1e0de", "#513746de"],
  "specific-bubble-highlight": ["#efd2d9", "#624053"]
};
var TOKENS = Object.fromEntries(Object.entries(colors).map(([key, [light, dark]]) => [`--dsw-${key}`, { light, dark }]));

// themes/rose/src/preferences.mjs
var STORAGE_KEY = "dsh:ekko-rose:v1";
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

// themes/rose/src/generated.mjs
var ASSETS = { "wallpaper": "./ekko-skins/assets/rose/5aad89594279fc7998db0037635ee6199b612add4319cc623b32543f560fac7c.webp", "hero-backdrop": "./ekko-skins/assets/rose/07442f83683888752fce345e99c71ca9864f5ac5f86c22e1bced05b1af4e730c.png", "hero-mobile": "./ekko-skins/assets/rose/293fcdad4c993ae040bdfe45dc2f0b7ed0532e530fd68c60d7e197fefbcfc14e.webp", "stage-signature": "./ekko-skins/assets/rose/07442f83683888752fce345e99c71ca9864f5ac5f86c22e1bced05b1af4e730c.png", "figure": "./ekko-skins/assets/rose/44e89839c76ce3a5c3e4a4bcba562247ce5c3d120437b9b18e4ee27051c92eae.png", "photo": "./ekko-skins/assets/rose/5f87bff73cd7ddd462a978452ff86b7ff253b0ef34c126a927b500b46d94cad6.png", "chat": "./ekko-skins/assets/rose/44e89839c76ce3a5c3e4a4bcba562247ce5c3d120437b9b18e4ee27051c92eae.png", "rose": "./ekko-skins/assets/rose/a6be9e1d42e29355bdad81b4f77062c12349adfb08ead5ef27a991b5adf32379.webp", "heart": "./ekko-skins/assets/rose/b749be280a21f07a4568e1701a1462744efba684d2ad92dd336934788a2a3dca.svg", "sparkle": "./ekko-skins/assets/rose/727370b682c31abdb4da39b453480ce705a02cca30c77dee05b4099ba3363523.svg", "code": "./ekko-skins/assets/rose/69f50e8391ef21c76f5c33f92bb993642674777f0336c59f9bf75dc58eda74c4.svg", "puzzle": "./ekko-skins/assets/rose/d353abe5ad97885d670c7f9ac990a7441e96194499befce996612050a6602f3b.svg", "clipboard": "./ekko-skins/assets/rose/60a92c3120dd8a0f1fc9c9424ca202bef80b2ed4923541765c2b3873d0bffc9f.svg", "wrench": "./ekko-skins/assets/rose/0444d06a7b65f02e88e0a9c846c28bf0b70b1670b73ab2e2b044654f6c48b449.svg", "close": "./ekko-skins/assets/rose/c43eba2ef6aa9bf8072d576694530a38678d800c7e3beea9091d89f0761aae22.svg", "photo-icon": "./ekko-skins/assets/rose/4297270bf7823b09db728a7f153ebbe72d19dd0bed28ecbb5234e2cf421f7a06.svg", "corners": "./ekko-skins/assets/rose/3efe6c4697c4e889124ad74f7981679fa3d185ee62229186116dc314321a6921.svg", "crest": "./ekko-skins/assets/rose/377a7904779d8b40cfe98687ffc87292bd9db45ee07120684465df8b52cdb0c0.svg", "trim": "./ekko-skins/assets/rose/0f2f36e48225ed73186473b5ef7b140ad849fa525d3cc6c8158f3489386a4804.webp", "ribbon": "./ekko-skins/assets/rose/f3fe28454ef3c163607029ccb9791a0c5ae736cf35179927ec201f4a0b32dae6.webp", "sidebar-note": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjY3NTgzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNmMmQ0ZDkiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNmMmQ0ZDkiLz48L3N2Zz4K", "sidebar-star": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQ5YjcwIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmJlYmQ1Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmFmMyIvPjwvc3ZnPgo=", "sidebar-picture": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjk4Yzk4IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZmZmNWYxIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZjJkOGQ4IiBzdHJva2U9IiNiZDhmOTIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZjVkY2RhIiBzdHJva2U9IiNjZGE0YTQiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==", "sidebar-shirt": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjY4YTkxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmZmY4ZjUiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNmNmRkZTAiIHN0cm9rZT0iI2MyOGI5NSIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2ViYzNjOSIvPjwvc3ZnPgo=", "sidebar-heart": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzE3ZThiIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjdkOWRkIi8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZjIiLz48L3N2Zz4K", "sidebar-planet": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjY2RhN2FlIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjZjBjZGQyIiBzdHJva2U9IiNiYzdiOGMiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNmZmZhZjUiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjY2Q5OGE2Ii8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2Q0YjE4ZiIvPjwvc3ZnPgo=" };
var STYLES2 = "body[data-dsh-ekko-rose]{\n --rose-ink:#62443f;--rose-muted:#937a74;--rose-accent:#c17685;--rose-edge:#e6c3c6;--rose-paper:#fffaf6;--rose-card:#fffaf6f5;\n --rose-font:'Noto Serif CJK SC','Source Han Serif SC','Songti SC','STSong','SimSun',serif;\n --ds-font-family:var(--rose-font);--ds-font-family-text:var(--rose-font);--dsw-radius-sm:12px;--dsw-radius-md:18px;--dsw-radius-lg:24px;\n background:#fcf6f1 url('./ekko-skins/assets/rose/5aad89594279fc7998db0037635ee6199b612add4319cc623b32543f560fac7c.webp') center/cover fixed;color:var(--rose-ink);\n}\n/* DSH defaults to superellipse corners; this reference uses round geometry. */\nbody[data-dsh-ekko-rose] .rose-welcome *,body[data-dsh-ekko-rose] [data-rose-editor-root] *,body[data-dsh-ekko-rose] .rose-polaroid *{corner-shape:round;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme]{--rose-ink:#f3dedc;--rose-muted:#c6a7b0;--rose-accent:#e6a8bb;--rose-edge:#6c4b58;--rose-paper:#30252b;--rose-card:#30252bf2;background:#211b1e;}\nbody[data-dsh-ekko-rose] #root,body[data-dsh-ekko-rose] [data-slot='root']>[class*='_frame']{background:transparent;}\nbody[data-dsh-ekko-rose] [data-rose-center]{position:relative;isolation:isolate;container:rose-main / inline-size;margin:7px 7px 7px 0;border:1px solid #ead8d5;border-radius:17px;background:color-mix(in srgb,var(--rose-paper) 82%,transparent);box-shadow:0 2px 12px #9c6b5f0a;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-rose-center]{border-color:var(--rose-edge);}\nbody[data-dsh-ekko-rose] [data-rose-center]>[data-slot]{z-index:1;position:relative;}\nbody[data-dsh-ekko-rose] [class*='_sidebarCol']{border-color:#ead3d3;background:var(--dsw-specific-sidebar-fill);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar']>div{background:transparent;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button{color:var(--rose-ink);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']{border-color:var(--rose-edge);border-radius:12px;background:color-mix(in srgb,var(--rose-paper) 70%,transparent);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']:hover{background:var(--dsw-alias-interactive-bg-hover);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar.brand.mark'],body[data-dsh-ekko-rose] [data-slot='sidebar.brand.name']{color:var(--rose-accent);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_panelRow'],body[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_sessionRow']{border-radius:13px;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_sectionHeader']{border-bottom:1px dashed #e9cece8c;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_panelGlyph']{display:inline-grid;place-items:center;width:28px;height:28px;color:#bb788c;border:1px solid #efd6d8;border-radius:10px;corner-shape:round;background:#fff7f2;box-shadow:3px 3px 7px #b7897e24,-3px -3px 7px #fffdf8c9,inset 0 1px 0 #fff;transition:box-shadow 180ms ease,color 180ms ease;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_panelRow']{min-height:38px;gap:10px;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{color:#a75472;background:#f8e6e9;box-shadow:inset 2px 2px 5px #c897a13b,inset -2px -2px 5px #fffaf8;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] :is([class*='_iconButton'],[class*='_searchButton']){color:#b97a8c;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_slot']{width:24px;height:24px;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']{background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjY2RhN2FlIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjZjBjZGQyIiBzdHJva2U9IiNiYzdiOGMiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNmZmZhZjUiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjY2Q5OGE2Ii8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2Q0YjE4ZiIvPjwvc3ZnPgo=') center/24px 24px no-repeat;filter:drop-shadow(0 2px 1px #ad76872b);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']>svg{visibility:hidden;}\n/* Paint the original icon cell, preserving native status dots and row actions. */\nbody[data-dsh-ekko-rose] [data-rose-session-icon]{min-height:34px;}\nbody[data-dsh-ekko-rose] [data-rose-session-icon]>[class*='_slot']{position:relative;width:24px;height:24px;background:var(--rose-session-icon) center/22px 22px no-repeat;filter:drop-shadow(0 1px 1px #af7e8424);}\nbody[data-dsh-ekko-rose] [data-rose-session-icon='sidebar-note']{--rose-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjY3NTgzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNmMmQ0ZDkiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNmMmQ0ZDkiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-rose] [data-rose-session-icon='sidebar-star']{--rose-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQ5YjcwIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmJlYmQ1Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmFmMyIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-rose] [data-rose-session-icon='sidebar-picture']{--rose-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjk4Yzk4IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZmZmNWYxIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZjJkOGQ4IiBzdHJva2U9IiNiZDhmOTIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZjVkY2RhIiBzdHJva2U9IiNjZGE0YTQiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==');}\nbody[data-dsh-ekko-rose] [data-rose-session-icon='sidebar-shirt']{--rose-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYjY4YTkxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmZmY4ZjUiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNmNmRkZTAiIHN0cm9rZT0iI2MyOGI5NSIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2ViYzNjOSIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-rose] [data-rose-session-icon='sidebar-heart']{--rose-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzE3ZThiIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjdkOWRkIi8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZjIiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-rose] [data-rose-session-icon]>[class*='_slot']>:not([data-slot]):not([class*='_visuallyHidden']),body[data-dsh-ekko-rose] [data-rose-session-icon]>[class*='_slot']>[data-slot]>*{position:absolute;right:-2px;bottom:-1px;z-index:1;border-radius:50%;box-shadow:0 0 0 2px var(--rose-paper);transform:scale(.72);transform-origin:bottom right;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='sidebar'] [class*='_panelGlyph']{color:#e2a7bb;background:#382a32;border-color:#674653;box-shadow:3px 3px 7px #100c1180,-2px -2px 6px #6f4d5e26,inset 0 1px 0 #c18a9f18;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{background:#49323e;box-shadow:inset 2px 2px 5px #160f174d,inset -2px -2px 5px #82586d26;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-rose-session-icon]>[class*='_slot']{filter:brightness(1.17) drop-shadow(0 1px 1px #0004);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.header']{background:color-mix(in srgb,var(--rose-paper) 80%,transparent);border-bottom:1px solid color-mix(in srgb,var(--rose-edge) 50%,transparent);}\nbody[data-dsh-ekko-rose] [class*='_headerBlank']{background:transparent;border-color:transparent;}\nbody[data-dsh-ekko-rose] [data-slot='main.conversation']>div,body[data-dsh-ekko-rose] [class*='_composerSeat']{background:transparent;}\nbody[data-dsh-ekko-rose][data-rose-page='welcome'] [data-rose-center] [class*='_scrollBody']{justify-content:flex-start;}\n/* Welcome utilities share the masthead instead of reserving an empty toolbar. */\nbody[data-dsh-ekko-rose][data-rose-page='welcome'] [data-rose-welcome-header]{position:absolute;inset:0 0 auto;z-index:12;min-height:0;padding:8px 16px 0;background:transparent;border:0;pointer-events:none;}\nbody[data-dsh-ekko-rose][data-rose-page='welcome'] [data-rose-welcome-header] :is(button,a,[role='button']){pointer-events:auto;}\n/* Align the native dock control beside the right-sidebar button, even on narrow screens. */\nbody[data-dsh-ekko-rose] [data-dsh-dock-fallback][data-ekko-theme-dock]{left:var(--ekko-dock-left)!important;top:var(--ekko-dock-top)!important;}\nbody[data-dsh-ekko-rose] [data-rose-hero-seat]{--dsh-composer-card-max-width:100%;--dsh-composer-text-max-height:min(26dvh,220px);--rose-photo-reserve:0px;position:relative;box-sizing:border-box;width:100%;max-width:none;align-self:stretch;padding:8px 24px 12px;gap:6px;}\nbody[data-dsh-ekko-rose][data-rose-polaroid='true'] [data-rose-hero-seat]{--rose-photo-reserve:198px;}\nbody[data-dsh-ekko-rose] [data-rose-welcome-shell]{padding:0;align-items:stretch;height:auto;}\nbody[data-dsh-ekko-rose] [data-rose-welcome-stack]{max-width:none;gap:0;}\nbody[data-dsh-ekko-rose] [data-rose-welcome-stack]>[class*='_headline']{display:none;}\nbody[data-dsh-ekko-rose] [data-rose-hero-seat] [data-slot='conversation.composer.bar']{box-sizing:border-box;width:100%;max-width:none;padding:0;margin-inline:0;align-self:stretch;}\nbody[data-dsh-ekko-rose] [data-rose-editor-root]{box-sizing:border-box;width:calc(100% - var(--rose-photo-reserve));max-width:none;padding-inline:0;align-self:flex-start;}\nbody[data-dsh-ekko-rose] [data-rose-hero-seat]>[class*='_heroWorkspaceRow']{width:calc(100% - var(--rose-photo-reserve));box-sizing:border-box;margin-top:0;padding-inline:7px;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_card']{position:relative;overflow:visible;border:1px solid #dfb7bf;border-radius:23px;background:var(--dsw-specific-input-major);box-shadow:0 2px 5px #9c6b5f13,inset 0 1px 0 #fffaf5;}\nbody[data-dsh-ekko-rose] [data-rose-editor-root] [class*='_card']{min-height:128px;background-image:url('./ekko-skins/assets/rose/a6be9e1d42e29355bdad81b4f77062c12349adfb08ead5ef27a991b5adf32379.webp');background-position:left 32% bottom -22px;background-size:80px 100px;background-repeat:no-repeat;}\nbody[data-dsh-ekko-rose] [data-rose-editor-root] [class*='_scroll']{min-height:70px;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_input']{font-family:var(--rose-font);color:var(--rose-ink);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 22px 22px;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [contenteditable]{caret-color:var(--rose-accent);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_placeholder']{color:var(--rose-muted);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_add']{width:34px;height:34px;border:1px solid var(--rose-edge);border-radius:50%;background:var(--rose-paper);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] button[aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],body[data-dsh-ekko-rose] [data-slot='conversation.composer'] button[aria-label^='Access mode']{min-height:32px;padding-inline:10px;border:1px solid #edcdd3;border-radius:11px;background:#f9e9eb;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='conversation.composer'] button[aria-label^='\u8BBF\u95EE\u6A21\u5F0F']{background:#48303a;border-color:var(--rose-edge);}\n.rose-welcome{position:relative;isolation:isolate;min-height:0;width:100%;font-family:var(--rose-font);color:var(--rose-ink);}\n.rose-welcome-brand{position:relative;z-index:6;display:flex;align-items:center;gap:12px;box-sizing:border-box;min-height:64px;width:65%;padding:0 0 8px;}\n.rose-mark{width:43px;height:54px;object-fit:contain;flex:none;}\n.rose-welcome-signature{display:flex;flex-direction:column;gap:3px;min-width:0;}\n.rose-welcome-signature strong{color:#b9657d;font-size:23px;font-weight:500;letter-spacing:1.4px;line-height:1.5;}\n.rose-welcome-signature span{color:#9d8c85;font:14px/1.5 var(--rose-font);letter-spacing:1px;}\n.rose-stage{--rose-cards-height:clamp(140px,min(17.28cqw,22dvh),200px);position:relative;isolation:isolate;container:rose-stage / inline-size;box-sizing:border-box;width:100%;min-width:0;aspect-ratio:1071 / 530;max-height:min(650px,var(--rose-stage-limit,calc(100dvh - 280px)));min-height:320px;border:1px solid #e3b8be;border-radius:25px;background:#f4d8d0;overflow:visible;}\n.rose-welcome-backdrop{position:absolute;z-index:0;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;border-radius:24px;clip-path:inset(0 round 24px);pointer-events:none;}\n.rose-stage::before{content:none;}\n/* Background alone clips. The original RGB portrait remains opaque ABOVE the scene. */\n.rose-figure-layer{display:contents;}\n.rose-welcome-figure{position:absolute;z-index:2;right:13%;bottom:calc(var(--rose-cards-height) + 16px);width:auto;max-width:43%;height:calc(100% - var(--rose-cards-height) + 48px);object-fit:contain;object-position:right bottom;pointer-events:none;user-select:none;opacity:1;filter:drop-shadow(0 7px 8px #825d4e1c);}\n.rose-welcome-heading{position:absolute;z-index:3;top:30.5%;left:7.6%;width:49%;color:#50302e;}\n.rose-welcome-heading h1{margin:0 0 14px;font-family:var(--rose-font);font-size:clamp(29px,4.02cqw,46px);font-weight:650;line-height:1.45;letter-spacing:1px;white-space:nowrap;color:#4d2b29;text-shadow:0 1px 2px #fffaf580;}\n.rose-welcome-heading p{margin:0;font-size:clamp(13px,1.85cqw,21px);line-height:1.7;letter-spacing:1.6px;color:#82665c;}\n.rose-prompt-cards{position:absolute;z-index:4;bottom:15px;left:3.25%;right:6%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:minmax(0,1fr);gap:1%;height:var(--rose-cards-height);}\n.rose-prompt-card{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:9px;box-sizing:border-box;min-width:0;min-height:0;height:100%;padding:19px 9px 24px;background:var(--rose-card);border:1px solid #f0dcd8;border-radius:20px;box-shadow:0 3px 6px #af83701f,inset 0 1px 0 #fff;color:#5b3931;cursor:pointer;font:500 clamp(13px,1.7cqw,19px)/1.55 var(--rose-font);transition:transform 150ms ease,box-shadow 150ms ease;}\n.rose-prompt-card::before{content:'';position:absolute;top:28px;left:14%;width:21px;height:21px;background:url('./ekko-skins/assets/rose/727370b682c31abdb4da39b453480ce705a02cca30c77dee05b4099ba3363523.svg') center/contain no-repeat;pointer-events:none;}\n.rose-prompt-card::after{content:'';position:absolute;top:31px;right:14%;width:15px;height:15px;background:url('./ekko-skins/assets/rose/727370b682c31abdb4da39b453480ce705a02cca30c77dee05b4099ba3363523.svg') center/contain no-repeat;pointer-events:none;}\n.rose-prompt-card:hover{transform:translateY(-3px);box-shadow:0 6px 13px #af837030,inset 0 1px 0 #fff;}\n.rose-prompt-card:focus-visible,.rose-photo-switch:focus-visible,.rose-polaroid-close:focus-visible,.rose-preferences input:focus-visible,.rose-preferences button:focus-visible{outline:2px solid var(--rose-accent,#c17685);outline-offset:4px;}\n.rose-card-medallion{display:flex;align-items:center;justify-content:center;flex:none;width:clamp(48px,6.8cqw,72px);height:clamp(48px,6.8cqw,72px);border-radius:50%;border:1px solid #fffaf5;background:#f9e8e9;box-shadow:0 0 0 2px #eac7ce99,0 0 0 4px #fff7f080;}\n.rose-card-icon{display:block;object-fit:contain;width:57%;height:57%;}\n.rose-card-medallion-code{background:#f5dce2;}\n.rose-card-medallion-code .rose-card-icon{box-sizing:border-box;width:73%;height:73%;padding:10px;border-radius:50%;background:#cf8295;filter:none;}\n.rose-card-medallion-code .rose-card-icon{filter:drop-shadow(0 1px 0 #eebac5);}\n.rose-card-copy{display:flex;align-items:center;justify-content:center;min-height:50px;white-space:pre-line;text-align:center;font-weight:600;line-height:1.4;}\n.rose-prompt-card:nth-child(2) .rose-card-icon{transform:rotate(-18deg);}\n.rose-card-heart{position:absolute;bottom:12px;left:calc(50% - 8px);width:16px;height:16px;object-fit:contain;opacity:.74;}\n.rose-polaroid{position:absolute;z-index:8;pointer-events:none;right:3px;bottom:5px;width:194px;aspect-ratio:194 / 226;filter:drop-shadow(0 4px 4px #94695a25);transform-origin:center 75%;transition:transform 180ms ease;}\n.rose-polaroid:hover{transform:translateY(-3px) rotate(2deg);}\n.rose-polaroid-art{width:100%;height:100%;object-fit:contain;display:block;user-select:none;}\n.rose-polaroid-close{pointer-events:auto;position:absolute;right:10%;top:6%;display:grid;place-items:center;box-sizing:border-box;width:21px;height:21px;padding:3px;border:1px solid #e8ccd1;border-radius:50%;background:#fffaf5e8;opacity:0;cursor:pointer;transition:opacity 150ms ease;}\n.rose-polaroid-close img{width:100%;height:100%;}\n.rose-polaroid:hover .rose-polaroid-close,.rose-polaroid:focus-within .rose-polaroid-close{opacity:1;}\n.rose-photo-switch{display:inline-flex;align-items:center;gap:4px;flex:none;padding:3px 7px;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--rose-muted);font:12px/1.5 var(--rose-font);cursor:pointer;}\n.rose-photo-switch img{width:15px;height:15px;}\n.rose-photo-switch[aria-pressed='true']{border-color:var(--rose-edge);background:var(--rose-paper);color:var(--rose-accent);}\n.rose-chat-figure{position:absolute;z-index:-1;pointer-events:none;right:1%;bottom:160px;height:min(70%,700px);width:min(50%,560px);object-fit:contain;object-position:right bottom;opacity:var(--rose-companion-opacity,.12);mask-image:radial-gradient(ellipse 85% 70% at 70% 55%,#000 35%,transparent 83%);}\nbody[data-dsh-ekko-rose][data-rose-artwork='false']{background-image:none;}\nbody[data-dsh-ekko-rose][data-rose-artwork='false'] .rose-welcome-backdrop,body[data-dsh-ekko-rose][data-rose-artwork='false'] .rose-welcome-figure,body[data-dsh-ekko-rose][data-rose-artwork='false'] .rose-chat-figure{display:none;}\nbody[data-dsh-ekko-rose][data-rose-artwork='false'] [data-rose-editor-root] [class*='_card']{background-image:none;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-stage{background:#38272e;border-color:#966577;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-welcome-backdrop{filter:brightness(.34) saturate(.6);}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-stage::before{filter:brightness(.34) saturate(.6);}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-welcome-heading h1,body[data-dsh-ekko-rose][data-ds-dark-theme] .rose-welcome-heading p,body[data-dsh-ekko-rose][data-ds-dark-theme] .rose-prompt-card{color:var(--rose-ink);text-shadow:none;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-welcome-signature strong{color:var(--rose-accent);}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-welcome-signature span{color:var(--rose-muted);}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-prompt-card{border-color:var(--rose-edge);box-shadow:0 3px 9px #0002;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-card-medallion{border-color:#936274;background:#543b46;box-shadow:0 0 0 2px #714d5c66;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-card-icon,body[data-dsh-ekko-rose][data-ds-dark-theme] .rose-card-heart{filter:brightness(1.3);}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='conversation.composer'] [class*='_card']{border-color:var(--rose-edge);box-shadow:0 2px 5px #0002;}\n/* Soft raised rims: inner highlights and two opposing ambient shadows. */\nbody[data-dsh-ekko-rose] .rose-stage{border-color:#e4b9c2;box-shadow:10px 12px 26px #aa7a7029,-7px -7px 21px #fffdfaaf,0 0 0 4px #fff9f466,inset 1px 1px 1px #fff9;transition:box-shadow 220ms ease,border-color 220ms ease,transform 220ms ease;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]{border-color:#ddb0bd;box-shadow:7px 8px 19px #aa7a7024,-6px -6px 17px #fffdf8c2,inset 1px 1px 1px #fffc,inset -1px -1px 2px #cc97a126;transition:box-shadow 220ms ease,border-color 220ms ease,transform 220ms ease;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:#c87a94;box-shadow:0 0 0 3px #dca0b425,8px 10px 23px #a46b7a30,-6px -6px 18px #fffdf9c9,inset 1px 1px 1px #fff9;}\n@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){\n body[data-dsh-ekko-rose] .rose-stage:hover{transform:translateY(-2px);border-color:#d597a8;box-shadow:12px 16px 31px #a9717033,-8px -8px 23px #fffdf9c9,0 0 0 4px #fff6f080,inset 1px 1px 1px #fff9;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]:hover{transform:translateY(-1px);border-color:#cf8aa1;box-shadow:9px 12px 24px #ac72812b,-7px -7px 20px #fffdf9cc,inset 1px 1px 1px #fffc;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]:focus-within{box-shadow:0 0 0 3px #dca0b42e,9px 12px 24px #ac728133,-7px -7px 20px #fffdf9cc,inset 1px 1px 1px #fffc;}\n}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] .rose-stage{border-color:#986477;box-shadow:10px 13px 27px #100c1466,-6px -6px 18px #95607721,0 0 0 3px #754b5d1f,inset 1px 1px 1px #e2adc026;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]{border-color:#886071;box-shadow:7px 9px 20px #0c080f73,-5px -5px 16px #a56e8821,inset 1px 1px 1px #d8a1b524,inset -1px -1px 2px #0003;}\nbody[data-dsh-ekko-rose][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]:is(:hover,:focus-within){border-color:#d69bb2;box-shadow:0 0 0 3px #d79caf1c,9px 12px 24px #0c080f80,-6px -6px 19px #b97b9526,inset 1px 1px 1px #e4b1c32e;}\n@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){body[data-dsh-ekko-rose][data-ds-dark-theme] .rose-stage:hover{box-shadow:12px 17px 30px #100c1480,-7px -7px 21px #bc7f9829,0 0 0 3px #a66b841f,inset 1px 1px 1px #e2adc033;}}\n@media(prefers-reduced-motion:reduce){body[data-dsh-ekko-rose] .rose-stage,body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card],body[data-dsh-ekko-rose] [data-slot='sidebar'] [class*='_panelGlyph']{transition:none;transform:none;}}\n.rose-preferences{padding:18px;border:1px solid var(--dsw-alias-settings-card-stroke,#e6cbca);border-radius:18px;color:var(--dsw-alias-label-primary,#62443f);background:var(--dsw-alias-settings-card-fill,#fffaf6);}\n.rose-preference-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:14px;}\n.rose-preference-heading button{color:var(--dsw-alias-link,#a9586c);background:none;border:0;padding:4px;font:inherit;cursor:pointer;}\n.rose-preferences p{color:var(--dsw-alias-label-secondary,#937a74);font-size:12px;line-height:1.6;margin:8px 0 12px;}\n.rose-preference-row{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:38px;font-size:13px;}\n.rose-preference-row input{accent-color:var(--dsw-alias-brand-primary,#b7657c);}\n.rose-preference-row input[type='checkbox']{width:17px;height:17px;}\n.rose-preference-row input[type='range']{width:min(38%,160px);}\n@media(max-width:640px){body[data-dsh-ekko-rose] [data-rose-center]{margin:0;border-radius:0;border:0;}}\n@media(min-width:641px) and (max-height:800px){\n .rose-prompt-card{padding:12px 7px 22px;gap:7px;font-size:15px;}.rose-card-medallion{width:48px;height:48px;}.rose-card-medallion-code .rose-card-icon{padding:6px;}.rose-card-copy{min-height:40px;}.rose-card-heart{width:14px;height:14px;bottom:9px;}\n .rose-stage::before{display:none;}.rose-welcome-heading{top:30%;}.rose-welcome-heading h1{font-size:clamp(26px,3.3cqw,34px);margin-bottom:8px;}.rose-welcome-heading p{font-size:clamp(13px,1.4cqw,16px);}\n}\n@container rose-main (min-width:641px){\n body[data-dsh-ekko-rose] [data-rose-hero-seat]{min-height:var(--rose-view-height,0px);}\n body[data-dsh-ekko-rose] [data-rose-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n [data-rose-hero-seat] .rose-stage{height:var(--rose-stage-limit,auto);max-height:var(--rose-stage-limit,calc(100dvh - 280px));}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-stage{--rose-cards-height:140px;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-welcome-backdrop{content:url('./ekko-skins/assets/rose/5aad89594279fc7998db0037635ee6199b612add4319cc623b32543f560fac7c.webp');}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-stage::before{display:block;width:min(34%,360px);}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-welcome-heading{top:32%;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-welcome-heading h1{font-size:clamp(26px,3.2cqw,30px);margin-bottom:0;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-welcome-heading p{display:none;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-prompt-card{padding:11px 7px 22px;gap:7px;font-size:14px;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-card-medallion{width:44px;height:44px;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-card-medallion-code .rose-card-icon{padding:5px;}\n [data-rose-hero-seat][data-rose-stage-compact] .rose-card-copy{min-height:38px;}\n}\n@container rose-main (max-width:900px){\n body[data-dsh-ekko-rose] [data-rose-hero-seat]{padding-inline:15px;}\n .rose-welcome-brand{width:65%;min-height:70px;gap:9px;}.rose-mark{width:38px;height:51px;}.rose-welcome-signature strong{font-size:18px;}.rose-welcome-signature span{font-size:11px;}\n .rose-stage{min-height:340px;--rose-cards-height:clamp(115px,16cqw,155px);}\n .rose-prompt-card{padding:12px 6px 27px;gap:9px;font-size:13px;}.rose-card-medallion{width:48px;height:48px;}.rose-card-heart{width:13px;height:13px;bottom:9px;}\n .rose-welcome-heading h1{font-size:clamp(23px,4cqw,34px);}.rose-welcome-heading p{font-size:13px;letter-spacing:.4px;}\n .rose-polaroid{width:155px;}.rose-welcome-figure{right:10%;max-width:44%;}\n body[data-dsh-ekko-rose][data-rose-polaroid='true'] [data-rose-hero-seat]{--rose-photo-reserve:160px;}\n}\n@container rose-main (max-width:640px){\n body[data-dsh-ekko-rose] [data-rose-hero-seat]{min-height:var(--rose-view-height,0px);}\n body[data-dsh-ekko-rose] [data-rose-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n body[data-dsh-ekko-rose] [data-rose-hero-seat]{padding:0 12px 12px;--rose-photo-reserve:0px!important;}\n .rose-welcome-brand{width:82%;min-height:70px;gap:8px;padding-block:6px 12px;}.rose-mark{width:27px;height:45px;}.rose-welcome-signature strong{font-size:15px;letter-spacing:.3px;}.rose-welcome-signature span{font-size:10px;letter-spacing:.2px;}\n .rose-stage{height:var(--rose-stage-limit,370px);min-height:180px;max-height:none;aspect-ratio:auto;border-radius:18px;--rose-cards-height:clamp(104px,calc(var(--rose-stage-limit,370px) * .34),150px);}\n .rose-welcome-backdrop{border-radius:17px;clip-path:inset(0 round 17px);content:url('./ekko-skins/assets/rose/293fcdad4c993ae040bdfe45dc2f0b7ed0532e530fd68c60d7e197fefbcfc14e.webp');}\n .rose-figure-layer{display:block;position:absolute;z-index:2;inset:-16px 0 0;overflow:hidden;border-radius:0 0 17px 17px;pointer-events:none;}\n .rose-welcome-figure{left:74%;right:auto;width:auto;height:min(360px,calc(100% - var(--rose-cards-height) - 10px));max-width:none;max-height:none;bottom:calc(var(--rose-cards-height) + 10px);transform:translateX(-58%);}\n .rose-welcome-heading{left:5%;top:21%;width:36%;max-width:110px;}.rose-welcome-heading h1{font-size:21px;white-space:normal;line-height:1.55;letter-spacing:0;margin-bottom:6px;}.rose-welcome-heading p{font-size:10px;max-width:106px;line-height:1.6;letter-spacing:0;}\n .rose-prompt-cards{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:9px;bottom:11px;left:4%;right:4%;}\n .rose-prompt-card{flex-direction:row;justify-content:flex-start;padding:9px 7px;gap:7px;border-radius:14px;font-size:10.5px;line-height:1.5;}.rose-card-medallion{width:32px;height:32px;flex:none;}.rose-card-medallion-code .rose-card-icon{padding:4px;}.rose-card-heart{display:none;}.rose-card-copy{display:block;min-height:0;text-align:left;letter-spacing:0;font-weight:500;}\n .rose-stage::before,.rose-prompt-card::before,.rose-prompt-card::after{display:none;}\n .rose-polaroid{display:none;}\n body[data-dsh-ekko-rose] [data-rose-editor-root] [class*='_card']{min-height:120px;background-image:none;}\n body[data-dsh-ekko-rose] [data-rose-editor-root] [class*='_scroll']{min-height:65px;}\n .rose-photo-switch{padding-inline:4px;}.rose-photo-switch span{display:none;}.rose-chat-figure{width:85%;height:60%;bottom:140px;}\n}\n@media(max-height:650px) and (max-width:640px){.rose-welcome-brand{min-height:52px;}.rose-card-copy{font-size:10px;}.rose-prompt-card{padding:3px 5px;}.rose-card-medallion{width:23px;height:23px;}.rose-welcome-heading{top:16%;}.rose-welcome-heading h1{font-size:21px;}.rose-welcome-heading p{display:none;}}\n@media(prefers-reduced-motion:reduce){.rose-prompt-card,.rose-polaroid,.rose-polaroid-close{transition:none;}.rose-prompt-card:hover,.rose-polaroid:hover{transform:none;}}\n\n/* Theme jewellery: paint layers only; the native controls retain their DOM and actions. */\nbody[data-dsh-ekko-rose]{\n --ekko-rim:#c5a18b;--ekko-rim-soft:#e8c7ca;--ekko-shine:#fffdf5;--ekko-panel:#fffaf6;--ekko-tint:#fae9ec;--ekko-shadow:#a26a7830;\n --ekko-ribbon:url('./ekko-skins/assets/rose/f3fe28454ef3c163607029ccb9791a0c5ae736cf35179927ec201f4a0b32dae6.webp');--ekko-trim:url('./ekko-skins/assets/rose/0f2f36e48225ed73186473b5ef7b140ad849fa525d3cc6c8158f3489386a4804.webp');--ekko-corners:url('./ekko-skins/assets/rose/3efe6c4697c4e889124ad74f7981679fa3d185ee62229186116dc314321a6921.svg');--ekko-crest:url('./ekko-skins/assets/rose/377a7904779d8b40cfe98687ffc87292bd9db45ee07120684465df8b52cdb0c0.svg');--ekko-trim-size:260px;\n}\nbody[data-dsh-ekko-rose][data-ds-dark-theme]{--ekko-rim:#a57a88;--ekko-rim-soft:#674752;--ekko-shine:#926877;--ekko-panel:#32252d;--ekko-tint:#4a303e;--ekko-shadow:#100a1499;}\n/* A complete frame: fine hanging trim above, a small engraved clasp below. */\nbody[data-dsh-ekko-rose] [data-rose-center]{border:2px solid var(--ekko-rim-soft);border-radius:20px;box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-shine),0 6px 22px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-rose-center]::before,\nbody[data-dsh-ekko-rose] [data-rose-center]::after{content:'';position:absolute;z-index:16;pointer-events:none;user-select:none;}\nbody[data-dsh-ekko-rose] [data-rose-center]::before{inset:1px 6px auto;height:20px;background:var(--ekko-trim) left top/var(--ekko-trim-size) auto repeat-x;border-radius:14px 14px 0 0;}\nbody[data-dsh-ekko-rose] [data-rose-center]::after{inset:auto 10px 0;height:10px;border-bottom:1px solid var(--ekko-rim);background:var(--ekko-crest) center bottom/126px 14px no-repeat;border-radius:0 0 12px 12px;}\nbody[data-dsh-ekko-rose] [data-rose-header-frame]{padding-top:23px;border-bottom-color:var(--ekko-rim-soft);}\nbody[data-dsh-ekko-rose] [data-rose-header-frame] [data-conversation-header-corner]{margin-right:0;}\nbody[data-dsh-ekko-rose][data-rose-page='welcome'] [data-rose-welcome-header]{padding:22px 16px 0;}\nbody[data-dsh-ekko-rose] .rose-welcome-brand{padding-top:13px;}\nbody[data-dsh-ekko-rose] [data-rose-header-frame] :is(button,[role='button']):hover{background:var(--ekko-tint);box-shadow:inset 0 0 0 1px var(--ekko-rim-soft);}\nbody[data-dsh-ekko-rose] [data-dsh-bottom-toggle]{border:1px solid var(--ekko-rim-soft);background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine),0 2px 5px var(--ekko-shadow);color:var(--rose-accent);}\nbody[data-dsh-ekko-rose] [data-dsh-bottom-toggle][aria-pressed='true']{background:var(--ekko-tint);border-color:var(--ekko-rim);}\n/* Sidebar stationery frame: full panel when expanded, narrow inlaid rail when folded. */\nbody[data-dsh-ekko-rose] [class*='_sidebarCol']{position:relative;isolation:isolate;border-right:1px solid var(--ekko-rim);box-shadow:inset -3px 0 0 var(--ekko-shine),inset -5px 0 0 var(--ekko-rim-soft);}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]{position:relative;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]::before{content:'';position:absolute;z-index:-1;inset:8px 7px;border:1px solid var(--ekko-rim-soft);border-radius:15px;pointer-events:none;box-shadow:inset 0 0 0 2px var(--ekko-shine);}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) [class*='_logoRow']{position:relative;min-height:62px;margin:1px 0 7px;padding-inline:7px;background:var(--ekko-corners) center/100% 100% no-repeat;border-bottom:1px solid var(--ekko-rim-soft);}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) [class*='_footArea']{position:relative;margin-top:7px;padding:11px 3px 2px;border-top:1px solid var(--ekko-rim-soft);background:var(--ekko-crest) center top -2px/114px 13px no-repeat;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) button[aria-label='\u8D26\u53F7\u83DC\u5355'],\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) button[aria-label='Account menu']{border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n/* The new-session button is one framed surface; no styling reaches its text spans. */\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']{corner-shape:round;border:1px solid var(--ekko-rim);border-radius:16px;background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-rim-soft),0 4px 9px var(--ekko-shadow);transition:background .18s ease,box-shadow .18s ease,transform .18s ease;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']::before{content:'';position:absolute;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-corners) center/100% 100% no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']{height:45px;margin:4px 3px 17px;padding-inline:12px;font-size:14px;letter-spacing:.09em;background-image:url('./ekko-skins/assets/rose/a6be9e1d42e29355bdad81b4f77062c12349adfb08ead5ef27a991b5adf32379.webp');background-position:14px center;background-size:26px 26px;background-repeat:no-repeat;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']::after{content:'';position:absolute;right:11px;top:50%;width:34px;height:20px;transform:translateY(-50%);background:var(--ekko-ribbon) center/contain no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession'] [class*='_newSessionContent']>svg{box-sizing:border-box;width:24px;height:24px;padding:4px;border:1px solid var(--ekko-rim-soft);border-radius:50%;background:var(--ekko-tint);color:var(--rose-accent);}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame][class*='_collapsed'] button[class*='_newSession']{border-radius:13px;}\nbody[data-dsh-ekko-rose] [data-rose-sidebar-frame][class*='_collapsed'] button[class*='_newSession']::before{inset:3px;border-radius:9px;background:none;}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']:hover{background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine),0 0 0 1px var(--ekko-rim),0 5px 12px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']:active{transform:translateY(1px);box-shadow:inset 1px 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']:focus-visible{outline:2px solid var(--rose-accent);outline-offset:4px;}\n/* A silk crest, tiny hanging trim and an inner engraving follow every native input card. */\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]{corner-shape:round;border:2px solid var(--ekko-rim);border-radius:24px;padding-top:20px;background-color:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 3px var(--ekko-rim-soft),0 4px 0 var(--ekko-tint),0 10px 24px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]::before{content:'';position:absolute;z-index:1;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:19px;background-image:var(--ekko-corners),var(--ekko-trim);background-position:center,left top;background-size:100% 100%,var(--ekko-trim-size) auto;background-repeat:no-repeat,repeat-x;pointer-events:none;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]::after{content:'';position:absolute;z-index:2;top:-23px;left:calc(50% - 49px);width:98px;height:49px;background:var(--ekko-ribbon) center/contain no-repeat;filter:drop-shadow(0 2px 1px var(--ekko-shadow));pointer-events:none;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:var(--rose-accent);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 4px var(--ekko-rim-soft),0 10px 26px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_row']{border-top:1px solid color-mix(in srgb,var(--ekko-rim-soft) 55%,transparent);background-color:color-mix(in srgb,var(--ekko-tint) 45%,transparent);box-shadow:inset 0 1px 0 var(--ekko-shine);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_add']{border-color:var(--ekko-rim);background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']){border:1px solid var(--ekko-rim);background:var(--rose-accent);color:var(--ekko-panel);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--ekko-shine) 45%,transparent),0 2px 6px var(--ekko-shadow);}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']):disabled{opacity:.4;}\nbody[data-dsh-ekko-rose] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){border-color:var(--ekko-rim-soft);background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n@container rose-main (max-width:640px){\n body[data-dsh-ekko-rose] [data-rose-center]::before{height:13px;background-size:190px auto;}\n body[data-dsh-ekko-rose] [data-rose-center]::after{height:8px;background-size:90px 11px;}\n body[data-dsh-ekko-rose][data-rose-page='welcome'] [data-rose-welcome-header]{padding:19px 12px 0;}\n body[data-dsh-ekko-rose] .rose-welcome-brand{padding-top:16px;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]{border-radius:21px;padding-top:15px;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]::before{border-radius:16px;background-size:100% 100%,210px auto;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [data-composer-card]::after{width:66px;height:33px;left:calc(50% - 33px);top:-16px;}\n body[data-dsh-ekko-rose] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 18px 18px;}\n}\n@media(prefers-reduced-motion:reduce){body[data-dsh-ekko-rose] [data-slot='sidebar'] button[class*='_newSession']{transition:none;}}\n";

// themes/rose/src/session-icons.mjs
var SESSION_ICON_KEY = "dsh:ekko-rose:session-icons:v1";
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

// themes/rose/src/dock-alignment.mjs
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

// themes/rose/src/client.jsx
var PRESENTATION_INJECT = ["theme", "slots", "layout"];
var ATTR = "data-dsh-ekko-rose";
var copy = {
  zh: {
    title: "\u6211\u4EEC\u8BE5\u6784\u5EFA\u4EC0\u4E48\uFF1F",
    subtitle: "\u4E0E\u73AB\u7470\u5973\u738B\u4E00\u8D77\uFF0C\u7528\u7075\u611F\u521B\u9020\u65E0\u9650\u53EF\u80FD\u3002",
    name: "\u73AB\u7470\u5973\u738B\u4E13\u5C5E\u5B9A\u5236\u76AE\u80A4",
    edition: "DeepSeek Harness \xB7 \u73AB\u7470\u9650\u5B9A\u7248",
    cards: ["\u63A2\u7D22\u5E76\u7406\u89E3\u4EE3\u7801", "\u6784\u5EFA\u65B0\u529F\u80FD\u3001\n\u5E94\u7528\u6216\u5DE5\u5177", "\u5BA1\u67E5\u4EE3\u7801\u5E76\u63D0\u51FA\n\u4FEE\u6539\u5EFA\u8BAE", "\u4FEE\u590D\u95EE\u9898\u548C\u5931\u8D25"],
    prompts: ["\u5E2E\u6211\u7406\u89E3\u8FD9\u4E2A\u9879\u76EE\u7684\u7ED3\u6784\u548C\u5173\u952E\u5B9E\u73B0\u3002", "\u4E00\u8D77\u6784\u5EFA\u4E00\u4E2A\u65B0\u529F\u80FD\uFF0C\u5148\u68B3\u7406\u9700\u6C42\u548C\u5B9E\u73B0\u65B9\u6848\u3002", "\u8BF7\u5BA1\u67E5\u5F53\u524D\u4EE3\u7801\uFF0C\u6307\u51FA\u5177\u4F53\u95EE\u9898\u548C\u6539\u8FDB\u5EFA\u8BAE\u3002", "\u5E2E\u6211\u6392\u67E5\u5F53\u524D\u9879\u76EE\u7684\u95EE\u9898\uFF0C\u5E76\u7ED9\u51FA\u4FEE\u590D\u65B9\u6848\u3002"],
    settings: "\u73AB\u7470\u5973\u738B\u4E3B\u9898",
    enabled: "\u542F\u7528\u73AB\u7470\u4E3B\u9898",
    artwork: "\u82B1\u623F\u4E0E\u4EBA\u7269\u88C5\u9970",
    companion: "\u804A\u5929\u4EBA\u7269\u80CC\u666F",
    polaroid: "\u53F3\u4E0B\u89D2\u62CD\u7ACB\u5F97",
    photo: "\u7167\u7247",
    hidePhoto: "\u6536\u8D77\u62CD\u7ACB\u5F97",
    opacity: "\u804A\u5929\u80CC\u666F\u6D53\u5EA6",
    reset: "\u6062\u590D\u9ED8\u8BA4",
    hint: "\u8DDF\u968F DSH \u7684\u6D45\u8272 / \u6DF1\u8272\u6A21\u5F0F\uFF1B\u4EC5\u8C03\u6574\u5916\u89C2\u3002"
  },
  en: {
    title: "What shall we build?",
    subtitle: "A little inspiration. A world of possibilities.",
    name: "Rose Queen \xB7 Rose Atelier",
    edition: "DeepSeek Harness \xB7 Rose edition",
    cards: ["Explore and understand code", "Build a feature,\napp or tool", "Review code and\nsuggest improvements", "Investigate and fix an issue"],
    prompts: ["Help me understand the structure and key implementation of this project.", "Let\u2019s build a feature. Start with the requirements and approach.", "Review this code and suggest concrete improvements.", "Investigate this project\u2019s issue and propose a fix."],
    settings: "Rose Queen theme",
    enabled: "Enable Rose theme",
    artwork: "Atelier and portrait artwork",
    companion: "Chat companion artwork",
    polaroid: "Corner polaroid",
    photo: "Photo",
    hidePhoto: "Hide polaroid",
    opacity: "Chat companion opacity",
    reset: "Restore defaults",
    hint: "Follows DSH light / dark appearance; presentation only."
  }
};
function language2() {
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
function node(tag, className, text2) {
  const el = document.createElement(tag);
  el.className = className;
  if (text2) el.textContent = text2;
  return el;
}
function fillComposer(text2, inputActions) {
  const editor = document.querySelector('[data-slot="conversation.composer"] [contenteditable="true"]');
  if (!editor || !inputActions) {
    document.querySelector('[data-slot="conversation.hero.workspace"] button')?.click();
    return false;
  }
  const captured = inputActions.captureInsertion();
  const span = { ...captured, start: captured.end, end: captured.end };
  const inserted = (editor.textContent.trim() ? "\n\n" : "") + text2;
  if (!inputActions.insertText(inserted, span)) return false;
  inputActions.persistDraft();
  requestAnimationFrame(() => editor.isConnected && editor.focus());
  return true;
}
function createWelcome(insert) {
  const lang = language2(), c = copy[lang], root = node("section", "rose-welcome");
  root.lang = lang;
  root.setAttribute("aria-label", c.name);
  const brand = node("header", "rose-welcome-brand"), labels = node("div", "rose-welcome-signature");
  labels.append(node("strong", "", c.name), node("span", "", c.edition));
  brand.append(img("rose", "rose-mark"), labels);
  const stage = node("div", "rose-stage"), figureLayer = node("div", "rose-figure-layer");
  figureLayer.append(img("figure", "rose-welcome-figure"));
  stage.append(img("hero-backdrop", "rose-welcome-backdrop"), figureLayer);
  const heading = node("div", "rose-welcome-heading");
  heading.append(node("h1", "", c.title), node("p", "", c.subtitle));
  stage.append(heading);
  const cards = node("div", "rose-prompt-cards");
  ["code", "puzzle", "clipboard", "wrench"].forEach((key, i) => {
    const button = node("button", "rose-prompt-card");
    button.type = "button";
    const circle = node("span", "rose-card-medallion" + (i === 0 ? " rose-card-medallion-code" : ""));
    circle.append(img(key, "rose-card-icon"));
    button.append(circle, node("span", "rose-card-copy", c.cards[i]), img("heart", "rose-card-heart"));
    button.addEventListener("click", () => insert(c.prompts[i]));
    cards.append(button);
  });
  stage.append(cards);
  root.append(brand, stage);
  return root;
}
function createPolaroid(hide) {
  const c = copy[language2()], photo = node("aside", "rose-polaroid");
  photo.setAttribute("aria-label", c.polaroid);
  photo.append(img("photo", "rose-polaroid-art"));
  const close = node("button", "rose-polaroid-close");
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
      const previous = marked.get(el)?.get("data-rose-stage-compact");
      previous == null ? el.removeAttribute("data-rose-stage-compact") : el.setAttribute("data-rose-stage-compact", previous);
    }
    layoutStyles.clear();
  }
  function fitStage(seat, editorRoot) {
    const stage = welcome?.querySelector(".rose-stage"), cards = welcome?.querySelector(".rose-prompt-cards"), viewport = seat?.closest('[class*="_scrollBody"]');
    if (!stage || !viewport) return;
    const shell = seat.querySelector("[data-rose-welcome-shell]"), row = seat.querySelector('[class*="_heroWorkspaceRow"]');
    for (const el of [seat, viewport, editorRoot, stage, cards, shell]) if (el && !sizeTargets.has(el)) {
      sizeTargets.add(el);
      sizingObserver?.observe(el);
    }
    const phone = (seat.closest("[data-rose-center]")?.clientWidth || viewport.clientWidth) <= 640;
    const visual = window.visualViewport, top = viewport.getBoundingClientRect().top;
    const height = phone && visual ? Math.min(viewport.clientHeight, Math.max(0, visual.height + visual.offsetTop - top)) : viewport.clientHeight;
    if (height <= 0) return;
    const flow = [shell, row, editorRoot].filter((el) => el && getComputedStyle(el).display !== "none");
    const seatStyle = getComputedStyle(seat), stageRect = stage.getBoundingClientRect();
    const overhead = flow.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0) - stageRect.height + (parseFloat(seatStyle.paddingTop) || 0) + (parseFloat(seatStyle.paddingBottom) || 0) + (parseFloat(seatStyle.rowGap) || 0) * Math.max(0, flow.length - 1);
    const figure = welcome.querySelector(".rose-welcome-figure"), ratio = figure?.naturalWidth ? figure.naturalHeight / figure.naturalWidth : 415 / 420;
    const portraitLimit = stageRect.width * 0.43 * ratio + (cards?.getBoundingClientRect().height || 140) - 32;
    const limit = Math.max(phone ? 180 : 220, Math.floor(phone ? height - overhead - 4 : Math.min(height - overhead - 4, portraitLimit))) + "px";
    mark(seat, "data-rose-stage-compact");
    seat.toggleAttribute("data-rose-stage-compact", !phone && parseFloat(limit) < 420);
    if (!layoutStyles.has(seat)) layoutStyles.set(seat, Object.fromEntries(["--rose-stage-limit", "--rose-view-height"].map((name) => [name, seat.style.getPropertyValue(name)])));
    for (const [name, value] of Object.entries({ "--rose-stage-limit": limit, "--rose-view-height": height + "px" })) if (seat.style.getPropertyValue(name) !== value) seat.style.setProperty(name, value);
  }
  const remove = (el) => {
    if (el) {
      owned.delete(el);
      el.remove();
    }
  };
  const style = node("style", "rose-theme-styles");
  style.dataset.dshRoseOwned = "";
  style.textContent = STYLES2;
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
      body.dataset.roseArtwork = String(current.artwork);
      body.dataset.roseCompanion = String(current.companion);
      body.dataset.rosePolaroid = String(current.artwork && current.polaroid);
      body.style.setProperty("--rose-companion-opacity", String(current.opacity));
      disposeTokens ||= theme.overrideTokens("dsh-plugin-rose-theme", TOKENS);
    } else {
      previousAttr === null ? body.removeAttribute(ATTR) : body.setAttribute(ATTR, previousAttr);
      for (const key of ["roseArtwork", "roseCompanion", "rosePolaroid"]) delete body.dataset[key];
      body.style.removeProperty("--rose-companion-opacity");
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
    window.dispatchEvent(new CustomEvent("dsh:ekko-skin-preferences", { detail: { id: "rose" } }));
  }
  function DraftBridge({ inputActions, sessionId }) {
    (0, import_react3.useEffect)(() => {
      const lease = { actions: inputActions, sessionId };
      activeInput = lease;
      return () => {
        if (activeInput === lease) activeInput = void 0;
      };
    }, [inputActions, sessionId]);
    return null;
  }
  ctx.slots.inject("conversation.input.left", () => ctx.slots.register({ name: "conversation.input.left", id: "ekko-rose-draft", order: 0 }, DraftBridge));
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
      body.dataset.rosePage = isWelcome ? "welcome" : "conversation";
      mark(center, "data-rose-center");
      mark(center?.querySelector('header[class*="_header"]'), "data-rose-header-frame");
      mark(document.querySelector('[data-slot="sidebar"]')?.firstElementChild, "data-rose-sidebar-frame");
    } else {
      delete body.dataset.rosePage;
      restoreMarks();
    }
    if (current.enabled) {
      for (const row of document.querySelectorAll('[data-slot="sidebar"] [data-row-key^="session:"]')) {
        const id = row.getAttribute("data-row-key").slice(8);
        if (!id) continue;
        mark(row, "data-rose-session-icon");
        const icon = sessionIcons.get(id);
        if (row.getAttribute("data-rose-session-icon") !== icon) row.setAttribute("data-rose-session-icon", icon);
      }
      sessionIcons.flush();
    }
    if (current.enabled && stack) {
      const seat = stack.closest('[class*="_composerHero"]');
      mark(seat, "data-rose-hero-seat");
      mark(stack, "data-rose-welcome-stack");
      mark(stack.parentElement, "data-rose-welcome-shell");
      mark(center?.querySelector('[class*="_headerBlank"]'), "data-rose-welcome-header");
      if (!welcome || !welcome.isConnected || welcome.lang !== language2()) {
        remove(welcome);
        welcome = createWelcome((text2) => fillComposer(text2, activeInput?.actions));
        owned.add(welcome);
        stack.prepend(welcome);
      }
      const bar = seat?.querySelector('[data-slot="conversation.composer.bar"]'), editorRoot = bar?.querySelector('[class*="_root"]');
      mark(editorRoot, "data-rose-editor-root");
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
          photoSwitch = node("button", "rose-photo-switch");
          photoSwitch.type = "button";
          photoSwitch.append(img("photo-icon"), node("span", "", copy[language2()].photo));
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
        companion = img("chat", "rose-chat-figure");
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
    if (records.some((r) => [...r.addedNodes, ...r.removedNodes].some((n) => n.nodeType === 1 && !n.classList?.contains("rose-chat-figure") && !n.classList?.contains("rose-welcome")))) schedule();
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
    for (const key of ["rosePage", "roseArtwork", "roseCompanion", "rosePolaroid"]) delete body.dataset[key];
    body.style.removeProperty("--rose-companion-opacity");
  }, "ekko-rose: restore presentation");
}
function apply2(ctx, config = {}) {
  acquireClient(ctx);
  const provider = { id: "rose", priority: config.bundled ? 10 : 0, plugin: { name: "ekko-rose-presentation", inject: PRESENTATION_INJECT, apply: mountPresentation }, assets: ASSETS, storageKey: STORAGE_KEY, readSettings, normalizeSettings };
  ctx.inject(["ekkoSkins"], (child) => child.effect(() => child.get("ekkoSkins").register(provider), "ekko-rose: provider registration"));
}

// src/client.jsx
var import_react4 = __toESM(require("react"), 1);

// src/palette.mjs
var colors2 = {
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
var TOKENS2 = Object.fromEntries(Object.entries(colors2).map(([key, [light, dark]]) => [`--dsw-${key}`, { light, dark }]));

// src/preferences.mjs
var STORAGE_KEY2 = "dsh:ekko-miku:v1";
var DEFAULTS2 = Object.freeze({ enabled: true, artwork: true, companion: true, polaroid: true, opacity: 0.12, mobileNav: "corner" });
function normalizeSettings2(value) {
  const v = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    enabled: typeof v.enabled === "boolean" ? v.enabled : true,
    artwork: typeof v.artwork === "boolean" ? v.artwork : true,
    companion: typeof v.companion === "boolean" ? v.companion : true,
    polaroid: typeof v.polaroid === "boolean" ? v.polaroid : true,
    mobileNav: v.mobileNav === "rail" ? "rail" : "corner",
    opacity: typeof v.opacity === "number" && Number.isFinite(v.opacity) ? Math.min(0.24, Math.max(0.04, v.opacity)) : DEFAULTS2.opacity
  };
}
function readSettings2(storage) {
  try {
    return normalizeSettings2(JSON.parse(storage.getItem(STORAGE_KEY2)));
  } catch {
    return { ...DEFAULTS2 };
  }
}

// src/generated.mjs
var ASSETS2 = { "wallpaper": "./ekko-skins/assets/miku/c7e78efdffa352c892eed75cf8246dd596f1728ab048761c39036b7de01579da.webp", "hero-backdrop": "./ekko-skins/assets/miku/e2e3499a6d286ad28feb6a22f9c01460b6751095dfe6988775a63bf4e23c8a8f.webp", "hero-mobile": "./ekko-skins/assets/miku/c431dce8f869f0f6e3b7a92b6f794aef192b6fb521b4c33f18f8764738ea9cc2.webp", "figure": "./ekko-skins/assets/miku/4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp", "figure-mobile": "./ekko-skins/assets/miku/bc4fb38eabc8a37402d5bd00233447fad10c80f9b3dde5a5960bd325af745ab0.webp", "photo": "./ekko-skins/assets/miku/eb43c95e8eff934c687cec69c9cf4c3965f9340779b74b96356ae06ca31cd9aa.webp", "chat": "./ekko-skins/assets/miku/4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp", "mark": "./ekko-skins/assets/miku/053a9ebff8574d554f8fb1e68b50c4f16724f78798bbb6329210c04247b39781.svg", "badge": "./ekko-skins/assets/miku/d685cf8b51a232c8dfa28e74024ab274913ed4c15acf2894a9f8ee015f4b42fa.webp", "exclusive": "./ekko-skins/assets/miku/9229b5f57f45b1b90a5cbff2c40cde4b7a64743a149e71260d08dd62634cd039.webp", "task-card": "./ekko-skins/assets/miku/445118cb0b5ae7156f1b81ff5e31e4986658f18d47c8649b401b2b2abaa68cdd.webp", "wave": "./ekko-skins/assets/miku/cbff7068eab03e957ad86ba135af8016eeeb2b565d17c2ebef71640ec38c2c4d.webp", "corners": "./ekko-skins/assets/miku/3acb883431c3ec4c0bc4f353673121ec93d0445c62b56d6b66fe8d4e7ea140f6.svg", "crest": "./ekko-skins/assets/miku/8bfe6b789ac16843ce566aa1bf2fb7d14444f0cfea003dc7dc60a7c46dd8115d.svg", "heart": "./ekko-skins/assets/miku/e8c928584d31e448bee1f481e14e763567e1d8db4bbf4c79b02e25dd014b0bbd.svg", "sparkle": "./ekko-skins/assets/miku/9eb321f3e042b0ab8e5215b2d1575c3eaa59a97fee58b216d6266e39556cf04e.svg", "code": "./ekko-skins/assets/miku/63442194f730bb59bb93b679640abb963a007345d982003ba6dbafd9978ff165.svg", "puzzle": "./ekko-skins/assets/miku/19b9a3b3ae87fc8f298cc07969024f591e0b6341ea28c8b8379d5ff8b7016109.svg", "clipboard": "./ekko-skins/assets/miku/05fd9694169628d159e4e9913f9eea0606d179e0c204da60d6861763c7a083be.svg", "wrench": "./ekko-skins/assets/miku/a2dadefdfef7ec7656b20a4dd1447be452532a2a9b856693bd2b793c4f7e1cb1.svg", "close": "./ekko-skins/assets/miku/2f88bcbd25182515d7962a9592322b08fece54303fbafc00bd032221b32e0f0b.svg", "photo-icon": "./ekko-skins/assets/miku/da723a54949b613a74dda7bd3792e9adb382e7b018458bad609b4a9c07a1917c.svg", "trim": "./ekko-skins/assets/miku/34325a82a74620c799c742cf17511e1fff309d7e6bd15b6dd9e721a9c185edc6.webp", "ribbon": "./ekko-skins/assets/miku/c3dda0a51cc5aa4ee1d61796e95d741a15587a703e55a0305755965d17b79481.webp", "sidebar-note": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTZhOGI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48L3N2Zz4K", "sidebar-star": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=", "sidebar-picture": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWU5YmM0IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZjRmMmZjIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZDRlZGYyIiBzdHJva2U9IiM4ZWI5YzciLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZWVkOWVmIiBzdHJva2U9IiNjMGE1ZDIiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==", "sidebar-shirt": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTFhZWI2IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmNWZkZmIiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNjZmYwZWQiIHN0cm9rZT0iIzc0YjdiYyIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2I5ZTFlMiIvPjwvc3ZnPgo=", "sidebar-heart": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2I5NmI1IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjZkOWU5Ii8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZmMiLz48L3N2Zz4K", "sidebar-planet": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjYTdiNWQ0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjYmNlY2YwIiBzdHJva2U9IiM1OWE5YmEiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNlZmZmZmYiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjN2ViNmNlIi8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2I5YTZkNyIvPjwvc3ZnPgo=" };
var STYLES3 = "/* Native DSH surfaces. Each selector is scoped to this independent skin. */\nbody[data-dsh-ekko-miku]{\n --miku-ink:#214b5d;--miku-muted:#557a8c;--miku-accent:#169fae;--miku-edge:#b9e2e9;--miku-paper:#f5fcff;--miku-card:#f9fdfff5;\n --miku-font:'Noto Sans CJK SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;\n --miku-display:'Noto Serif CJK SC','Source Han Serif SC','Songti SC','STSong',serif;\n --ds-font-family:var(--miku-font);--ds-font-family-text:var(--miku-font);--dsw-radius-sm:12px;--dsw-radius-md:16px;--dsw-radius-lg:23px;\n color:var(--miku-ink);background:#edfaff url('./ekko-skins/assets/miku/c7e78efdffa352c892eed75cf8246dd596f1728ab048761c39036b7de01579da.webp') center/cover fixed;\n}\nbody[data-dsh-ekko-miku][data-ds-dark-theme]{--miku-ink:#daf6f7;--miku-muted:#9dbcc9;--miku-accent:#6bd8df;--miku-edge:#365b6d;--miku-paper:#162935;--miku-card:#183340f5;background:#101d2a;}\nbody[data-dsh-ekko-miku] #root,body[data-dsh-ekko-miku] [data-slot='root']>[class*='_frame']{background:transparent;}\nbody[data-dsh-ekko-miku] .miku-welcome *,body[data-dsh-ekko-miku] [data-miku-editor-root] *,body[data-dsh-ekko-miku] .miku-polaroid *{corner-shape:round;}\nbody[data-dsh-ekko-miku] [data-miku-center]{position:relative;isolation:isolate;container:miku-main / inline-size;margin:7px 7px 7px 0;border:1px solid var(--miku-edge);border-radius:18px;background:color-mix(in srgb,var(--miku-paper) 80%,transparent);box-shadow:0 0 0 1px #ffffff80,0 3px 18px #4389ac12;}\nbody[data-dsh-ekko-miku] [data-miku-center]>[data-slot]{position:relative;z-index:1;}\nbody[data-dsh-ekko-miku] [class*='_sidebarCol']{border-color:var(--miku-edge);background:var(--dsw-specific-sidebar-fill);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar']>div{background:transparent;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button{color:var(--miku-ink);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar.brand.mark'],body[data-dsh-ekko-miku] [data-slot='sidebar.brand.name']{color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{border:1px solid var(--miku-edge);border-radius:18px;background:#d8f6f9a8;box-shadow:inset 1px 1px 1px #fff9,0 2px 6px #40b1bc12;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:hover{background:var(--dsw-alias-interactive-bg-hover);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] :is([class*='_panelRow'],[class*='_sessionRow']){border-radius:12px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_sectionHeader']{border-bottom:1px dashed var(--miku-edge);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']{min-height:37px;gap:9px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelGlyph']{display:inline-grid;place-items:center;width:27px;height:27px;color:#43a6b3;border:1px solid #c7e7ee;border-radius:9px;corner-shape:round;background:#effcff;box-shadow:2px 3px 6px #4596b01c,-2px -2px 6px #ffffffd1,inset 1px 1px 1px #fff;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']:nth-child(3n+2) [class*='_panelGlyph']{color:#a18ac8;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{background:#d8f5f8;box-shadow:inset 2px 2px 5px #72c1cf2e,inset -2px -2px 5px #fff;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] :is([class*='_iconButton'],[class*='_searchButton']){color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_slot']{width:24px;height:24px;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']{background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMSIgcnk9IjMuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI4IDEyIDEyKSIgc3Ryb2tlPSIjYTdiNWQ0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNi41IiBmaWxsPSIjYmNlY2YwIiBzdHJva2U9IiM1OWE5YmEiLz48cGF0aCBkPSJNOC41IDhhNC44IDQuOCAwIDAgMSA0LjctMS40IiBzdHJva2U9IiNlZmZmZmYiLz48cGF0aCBkPSJNMi4zIDE2LjdjMi4zIDMuOCAyMS44LTYuNiAxOS40LTkuNCIgc3Ryb2tlPSIjN2ViNmNlIi8+PHBhdGggZD0iTTE5LjcgMnYyLjZtLTEuMy0xLjNIMjEiIHN0cm9rZT0iI2I5YTZkNyIvPjwvc3ZnPgo=') center/24px no-repeat;filter:drop-shadow(0 2px 1px #4a9aa82b);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] [data-row-key^='workspace:']>[class*='_folder']>svg{visibility:hidden;}\n/* Fixed display motifs; native status badges, names and menus are retained. */\nbody[data-dsh-ekko-miku] [data-miku-session-icon]{min-height:34px;}\nbody[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']{position:relative;width:24px;height:24px;background:var(--miku-session-icon) center/22px no-repeat;filter:drop-shadow(0 1px 1px #528f9e24);}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-note']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTZhOGI4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTZWNS41bDktMlYxMy41TTEwIDguNWw5LTIiLz48ZWxsaXBzZSBjeD0iNy4yIiBjeT0iMTciIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48ZWxsaXBzZSBjeD0iMTYuMiIgY3k9IjE0LjUiIHJ4PSIyLjgiIHJ5PSIyLjIiIGZpbGw9IiNjNmVmZjIiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-star']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-picture']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWU5YmM0IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjZjRmMmZjIi8+PHBhdGggZD0ibTQgMTcgNS01IDQgMyAzLTQgNCA2IiBmaWxsPSIjZDRlZGYyIiBzdHJva2U9IiM4ZWI5YzciLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjguNSIgcj0iMS42IiBmaWxsPSIjZWVkOWVmIiBzdHJva2U9IiNjMGE1ZDIiLz48cGF0aCBkPSJNNiA2LjVoNCIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+Cg==');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-shirt']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTFhZWI2IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtOCAzLjUtNS41IDQgMyA0TDggMTB2MTBoOFYxMGwyLjUgMS41IDMtNC01LjUtNGE0LjEgNC4xIDAgMCAxLTggMFoiIGZpbGw9IiNmNWZkZmIiLz48cGF0aCBkPSJNOCAzLjVhNC4xIDQuMSAwIDAgMCA4IDAiIGZpbGw9IiNjZmYwZWQiIHN0cm9rZT0iIzc0YjdiYyIvPjxwYXRoIGQ9Ik0xMCAxNy41aDQiIHN0cm9rZT0iI2I5ZTFlMiIvPjwvc3ZnPgo=');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon='sidebar-heart']{--miku-session-icon:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2I5NmI1IiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjBTMyAxNC41IDMgOC42QzMgMy44IDguOCAyLjUgMTIgNmMzLjItMy41IDktMi4yIDkgMi42QzIxIDE0LjUgMTIgMjAgMTIgMjBaIiBmaWxsPSIjZjZkOWU5Ii8+PHBhdGggZD0iTTYgOGEyLjMgMi4zIDAgMCAxIDIuMi0yIiBzdHJva2U9IiNmZmY2ZmMiLz48L3N2Zz4K');}\nbody[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']>:not([data-slot]):not([class*='_visuallyHidden']),body[data-dsh-ekko-miku] [data-miku-session-icon]>[class*='_slot']>[data-slot]>*{position:absolute;right:-2px;bottom:-1px;z-index:1;border-radius:50%;box-shadow:0 0 0 2px var(--miku-paper);transform:scale(.72);transform-origin:bottom right;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.header']{background:color-mix(in srgb,var(--miku-paper) 80%,transparent);border-bottom:1px solid var(--miku-edge);}\nbody[data-dsh-ekko-miku] [class*='_headerBlank'],body[data-dsh-ekko-miku] [data-slot='main.conversation']>div,body[data-dsh-ekko-miku] [class*='_composerSeat']{background:transparent;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-center] [class*='_scrollBody']{justify-content:flex-start;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{position:absolute;inset:0 0 auto;z-index:12;min-height:0;padding:8px 16px 0;background:transparent;border:0;pointer-events:none;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header] :is(button,a,[role='button']){pointer-events:auto;}\n/* Align the native dock control beside the right-sidebar button, even on narrow screens. */\nbody[data-dsh-ekko-miku] [data-dsh-dock-fallback][data-ekko-theme-dock]{left:var(--ekko-dock-left)!important;top:var(--ekko-dock-top)!important;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat]{--dsh-composer-card-max-width:100%;--dsh-composer-text-max-height:min(26dvh,220px);--miku-photo-reserve:0px;position:relative;box-sizing:border-box;width:100%;max-width:none;align-self:stretch;padding:8px 24px 12px;gap:6px;}\nbody[data-dsh-ekko-miku][data-miku-polaroid='true'] [data-miku-hero-seat]{--miku-photo-reserve:174px;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-shell]{padding:0;align-items:stretch;height:auto;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-stack]{max-width:none;gap:0;}\nbody[data-dsh-ekko-miku] [data-miku-welcome-stack]>[class*='_headline']{display:none;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat] [data-slot='conversation.composer.bar']{box-sizing:border-box;width:100%;max-width:none;padding:0;margin-inline:0;align-self:stretch;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root]{box-sizing:border-box;width:calc(100% - var(--miku-photo-reserve));max-width:none;padding-inline:0;align-self:flex-start;}\nbody[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{width:calc(100% - var(--miku-photo-reserve));box-sizing:border-box;margin-top:0;padding-inline:7px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{position:relative;overflow:visible;border:1px solid #a8dce6;border-radius:22px;background-color:var(--dsw-specific-input-major);box-shadow:7px 9px 20px #4798b12b,-6px -6px 18px #ffffffd1,inset 1px 1px 1px #fff,inset -1px -1px 1px #aabfe83b;transition:box-shadow 200ms ease,border-color 200ms ease,transform 200ms ease;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root] [data-composer-card]{min-height:128px;background-image:url('./ekko-skins/assets/miku/cbff7068eab03e957ad86ba135af8016eeeb2b565d17c2ebef71640ec38c2c4d.webp');background-position:center bottom;background-size:min(48%,360px) auto;background-repeat:no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-editor-root] [class*='_scroll']{min-height:70px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_input']{font-family:var(--miku-font);color:var(--miku-ink);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 22px 22px;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [contenteditable]{caret-color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_placeholder']{color:var(--miku-muted);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_add']{width:34px;height:34px;border:1px solid var(--miku-edge);border-radius:50%;background:var(--miku-paper);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){min-height:32px;padding-inline:10px;border:1px solid var(--miku-edge);border-radius:11px;background:#e3f8fc;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:#24b6c1;box-shadow:0 0 0 3px #68dbe730,8px 10px 22px #6a9fc22b,-6px -6px 18px #fff9,inset 1px 1px 1px #fff;}\n/* The background clips separately; the character rises above the stage rim. */\n.miku-welcome{position:relative;isolation:isolate;min-height:0;width:100%;font-family:var(--miku-font);color:var(--miku-ink);}\n.miku-welcome-brand{position:relative;z-index:6;display:flex;align-items:center;gap:11px;box-sizing:border-box;min-height:67px;width:100%;padding:0 40px 9px 0;}\n.miku-mark{width:43px;height:43px;object-fit:contain;flex:none;filter:drop-shadow(2px 2px 0 #cbecf6);}\n.miku-welcome-signature{display:flex;flex-direction:column;gap:4px;min-width:0;}\n.miku-welcome-signature strong{font-size:17px;font-weight:650;line-height:1.5;color:#267f8c;}\n.miku-welcome-signature span{font-size:11px;line-height:1.5;color:#7892a0;letter-spacing:.5px;}\n.miku-brand-badge{width:145px;height:58px;object-fit:contain;margin-left:auto;}\n.miku-stage{--miku-cards-height:clamp(144px,min(20cqw,27dvh),215px);position:relative;isolation:isolate;container:miku-stage / inline-size;box-sizing:border-box;width:100%;min-width:0;aspect-ratio:1044/470;max-height:min(740px,var(--miku-stage-limit,calc(100dvh - 280px)));min-height:300px;border:2px solid #b5e8f0;border-radius:26px;background:#d9ecfb;overflow:visible;box-shadow:0 0 0 3px #fff9,9px 12px 26px #5b9fc22b,-6px -6px 20px #ffffffb3,inset 1px 1px 1px #fff9;transition:box-shadow 220ms ease,transform 220ms ease;}\n.miku-welcome-backdrop{position:absolute;z-index:0;inset:0;width:100%;height:100%;object-fit:cover;object-position:left top;border-radius:24px;clip-path:inset(0 round 24px);filter:saturate(.82) brightness(1.04);opacity:.85;pointer-events:none;}\n.miku-figure-layer{position:absolute;z-index:2;inset:-44px -1px 0;overflow:hidden;border-radius:0 0 24px 24px;pointer-events:none;}\n.miku-welcome-figure{position:absolute;top:0;right:15%;width:49%;max-width:680px;height:auto;object-fit:contain;pointer-events:none;user-select:none;opacity:1;filter:drop-shadow(0 6px 8px #23617d20);}\n.miku-stage-exclusive{position:absolute;z-index:3;top:8%;right:2.2%;width:11%;max-width:116px;height:auto;pointer-events:none;}\n.miku-stage-seal{position:absolute;z-index:3;top:38%;right:1.8%;box-sizing:border-box;max-width:24%;padding:9px 13px;border:1px solid #dcffff;border-radius:9px;background:#90d1e95c;box-shadow:0 0 10px #f6c8fd94,inset 0 0 0 2px #c5f7fc80;text-align:center;color:#efffff;text-shadow:0 1px 3px #3f6b9a;pointer-events:none;}\n.miku-stage-seal strong{display:block;font-size:clamp(10px,1.3cqw,14px);font-weight:500;letter-spacing:1px;}\n.miku-stage-seal span{display:block;margin-top:4px;font-size:10px;letter-spacing:2px;}\n.miku-welcome-heading{position:absolute;z-index:3;top:33%;left:3.8%;width:52%;color:#194b64;text-shadow:0 1px 4px #fff,0 0 14px #ffffffb3;}\n.miku-welcome-heading h1{margin:0 0 7px;font-family:var(--miku-display);font-size:clamp(25px,3.25cqw,36px);font-weight:700;line-height:1.45;letter-spacing:.1px;white-space:nowrap;color:#194b64;}\n.miku-welcome-heading p{margin:0;font-size:clamp(11px,1.48cqw,16px);line-height:1.7;letter-spacing:.3px;color:#47768b;}\n.miku-heading-phrase{white-space:nowrap;}\n.miku-prompt-cards{position:absolute;z-index:4;bottom:5px;left:1.5%;right:1.5%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:minmax(0,1fr);gap:1.5%;height:var(--miku-cards-height);}\n.miku-prompt-card{--miku-medallion:#d2f4f7;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:9px;box-sizing:border-box;min-width:0;min-height:0;height:100%;padding:19px 10px 24px;border:0;border-radius:23px;background:url('./ekko-skins/assets/miku/445118cb0b5ae7156f1b81ff5e31e4986658f18d47c8649b401b2b2abaa68cdd.webp') center/100% 100% no-repeat;color:#285b6e;cursor:pointer;font:600 clamp(12px,1.55cqw,17px)/1.5 var(--miku-font);transition:transform 180ms ease,filter 180ms ease;}\n.miku-prompt-card:nth-child(2){--miku-medallion:#f3e1f3;}.miku-prompt-card:nth-child(3){--miku-medallion:#e6dff8;}.miku-prompt-card:nth-child(4){--miku-medallion:#d8f4f1;}\n.miku-card-medallion{display:flex;align-items:center;justify-content:center;flex:none;width:clamp(47px,6.4cqw,66px);height:clamp(47px,6.4cqw,66px);border:1px solid #fff;border-radius:50%;background:var(--miku-medallion);box-shadow:0 0 0 2px #d6edf3b3,0 0 0 5px #ffffff80;}\n.miku-card-icon{display:block;object-fit:contain;width:68%;height:68%;filter:drop-shadow(1px 1px 0 #fff);}\n.miku-card-copy{display:flex;align-items:center;justify-content:center;min-height:45px;white-space:pre-line;text-align:center;line-height:1.45;}\n/* Hearts and tiny stars already belong to the supplied card artwork. */\n.miku-card-heart{display:none;}\n.miku-prompt-card:hover{transform:translateY(-3px);filter:drop-shadow(0 5px 7px #5b8cba33);}\n.miku-prompt-card:focus-visible,.miku-photo-switch:focus-visible,.miku-polaroid-close:focus-visible,.miku-preferences :is(input,button):focus-visible{outline:2px solid var(--miku-accent,#169fae);outline-offset:3px;}\n.miku-polaroid{position:absolute;z-index:8;pointer-events:none;right:0;bottom:4px;width:184px;aspect-ratio:520/600;filter:drop-shadow(0 4px 5px #47728d25);transform-origin:center 75%;transition:transform 180ms ease;}\n.miku-polaroid-art{display:block;width:100%;height:100%;object-fit:contain;user-select:none;}\n.miku-polaroid-close{pointer-events:auto;position:absolute;right:9%;top:5%;display:grid;place-items:center;box-sizing:border-box;width:22px;height:22px;padding:4px;border:1px solid var(--miku-edge);border-radius:50%;background:#f6ffffed;opacity:0;cursor:pointer;transition:opacity 150ms ease;}\n.miku-polaroid-close img{width:100%;height:100%;}\n.miku-polaroid:hover .miku-polaroid-close,.miku-polaroid:focus-within .miku-polaroid-close{opacity:1;}\n.miku-photo-switch{display:inline-flex;align-items:center;gap:4px;flex:none;padding:3px 7px;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--miku-muted);font:12px/1.5 var(--miku-font);cursor:pointer;}\n.miku-photo-switch img{width:15px;height:15px;}\n.miku-photo-switch[aria-pressed='true']{border-color:var(--miku-edge);background:var(--miku-paper);color:var(--miku-accent);}\n.miku-chat-figure{position:absolute;z-index:-1;pointer-events:none;right:1%;bottom:160px;height:min(70%,700px);width:min(50%,560px);object-fit:contain;object-position:right bottom;opacity:var(--miku-companion-opacity,.12);mask-image:radial-gradient(ellipse 85% 70% at 70% 55%,#000 35%,transparent 83%);}\n.miku-preferences{border:1px solid var(--miku-edge,#b9e2e9);border-radius:16px;padding:15px;background:var(--miku-paper,#f5fcff);color:var(--miku-ink,#214b5d);font:13px/1.6 var(--miku-font,system-ui);}\n.miku-preference-heading,.miku-preference-row{display:flex;align-items:center;justify-content:space-between;gap:16px;}\n.miku-preference-row{min-height:37px;border-top:1px solid var(--miku-edge,#b9e2e9);padding-block:6px;}\n.miku-preference-row input{accent-color:var(--miku-accent,#169fae);}.miku-preference-row input[type='range']{width:130px;}\n.miku-preference-heading button{border:1px solid var(--miku-edge,#b9e2e9);border-radius:8px;background:var(--miku-paper,#f5fcff);color:inherit;padding:4px 8px;cursor:pointer;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false']{background-image:none;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false'] :is(.miku-welcome-backdrop,.miku-figure-layer,.miku-stage-exclusive,.miku-stage-seal,.miku-chat-figure,.miku-brand-badge){display:none;}\nbody[data-dsh-ekko-miku][data-miku-artwork='false'] [data-miku-editor-root] [data-composer-card]{background-image:none;}\n/* Night performance: preserve character colors, dim only the star field. */\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='sidebar'] :is(button[class*='_newSession'],[class*='_panelGlyph']){background:#203d4d;border-color:#365b6d;color:#80d4dd;box-shadow:2px 3px 7px #070f1c66,inset 1px 1px 1px #98d8ea1f;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='sidebar'] [class*='_panelRow']:is(:hover,[aria-current='page']) [class*='_panelGlyph']{background:#2b5161;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-miku-center]{box-shadow:none;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-stage{background:#1c344e;border-color:#588aab;box-shadow:0 0 0 3px #71b6ce12,9px 12px 26px #030d1b80,-5px -5px 18px #70b7d324;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-backdrop{filter:brightness(.39) saturate(.75);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading{ text-shadow:0 1px 4px #071b2e;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading :is(h1,p){color:#e4faff;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-signature strong{color:var(--miku-accent);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-signature span{color:var(--miku-muted);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-prompt-card{border:1px solid #7ad4e385;background-color:#193a4a;background-blend-mode:multiply;color:#e4faff;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-card-medallion{background:#385769;border-color:#96c9d8;box-shadow:0 0 0 2px #71b6ce33;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] .miku-card-icon{filter:brightness(1.35) drop-shadow(0 1px 0 #060f1d);}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]{border-color:#4c7a91;box-shadow:7px 9px 20px #040c1a80,-5px -5px 16px #6bafd626,inset 1px 1px 1px #a6d8e52e;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){background:#234757;}\nbody[data-dsh-ekko-miku][data-ds-dark-theme] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:#76dce4;box-shadow:0 0 0 3px #73dce426,8px 10px 22px #030d1b80,inset 1px 1px 1px #95e1e93b;}\n@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){\n body[data-dsh-ekko-miku] .miku-stage:hover{transform:translateY(-2px);box-shadow:0 0 0 3px #fff9,12px 16px 30px #5b9fc23b,-7px -7px 22px #ffffffc2;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:hover{transform:translateY(-1px);border-color:#6bc5d2;}\n body[data-dsh-ekko-miku][data-ds-dark-theme] .miku-stage:hover{box-shadow:0 0 0 3px #71b6ce26,12px 16px 30px #030d1b99,-7px -7px 22px #70b7d32e;}\n}\n/* The available viewport and native editor height determine the desktop stage. */\n@container miku-main (min-width:641px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{min-height:var(--miku-view-height,0px);}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n [data-miku-hero-seat] .miku-stage{height:var(--miku-stage-limit,auto);max-height:var(--miku-stage-limit,calc(100dvh - 280px));}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-stage{--miku-cards-height:125px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading{top:30%;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading h1{font-size:clamp(22px,3.1cqw,30px);margin-bottom:0;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-heading p{font-size:11px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-prompt-card{padding:12px 7px 15px;gap:6px;font-size:13px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-card-medallion{width:43px;height:43px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-card-copy{min-height:36px;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-welcome-figure{width:49%;right:13%;}\n [data-miku-hero-seat][data-miku-stage-compact] .miku-stage-seal{top:26%;}\n}\n@container miku-main (max-width:900px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{padding-inline:15px;}\n .miku-welcome-brand{min-height:64px;gap:8px;padding-right:35px;}.miku-mark{width:33px;height:33px;}.miku-welcome-signature strong{font-size:14px;}.miku-welcome-signature span{font-size:10px;letter-spacing:.1px;}.miku-brand-badge{width:105px;height:45px;}\n .miku-stage{min-height:310px;--miku-cards-height:clamp(120px,17cqw,155px);}\n .miku-prompt-card{padding:15px 6px 19px;gap:8px;font-size:12px;}.miku-card-medallion{width:46px;height:46px;}.miku-card-copy{min-height:35px;}\n .miku-welcome-heading h1{font-size:clamp(22px,3.3cqw,29px);}.miku-welcome-heading p{font-size:11px;}\n .miku-polaroid{width:149px;}body[data-dsh-ekko-miku][data-miku-polaroid='true'] [data-miku-hero-seat]{--miku-photo-reserve:142px;}\n .miku-stage-seal{padding:6px 8px;}.miku-stage-seal span{font-size:8px;}\n}\n@container miku-main (max-width:640px){\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{min-height:var(--miku-view-height,0px);}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]>[class*='_heroWorkspaceRow']{margin-top:auto;}\n body[data-dsh-ekko-miku] [data-miku-hero-seat]{padding:0 12px 12px;--miku-photo-reserve:0px!important;}\n .miku-welcome-brand{min-height:70px;gap:7px;padding:6px 74px 12px 0;}.miku-mark{width:27px;height:27px;}.miku-welcome-signature strong{font-size:13px;line-height:1.5;}.miku-welcome-signature span{font-size:9px;letter-spacing:0;}.miku-brand-badge{display:none;}\n .miku-stage{height:var(--miku-stage-limit,370px);min-height:180px;max-height:none;aspect-ratio:auto;border-radius:18px;--miku-cards-height:clamp(104px,calc(var(--miku-stage-limit,370px) * .34),146px);}\n .miku-welcome-backdrop{border-radius:16px;clip-path:inset(0 round 16px);content:url('./ekko-skins/assets/miku/c431dce8f869f0f6e3b7a92b6f794aef192b6fb521b4c33f18f8764738ea9cc2.webp');}\n .miku-figure-layer{inset:-22px -1px 0;border-radius:0 0 16px 16px;}\n .miku-welcome-figure{content:url('./ekko-skins/assets/miku/bc4fb38eabc8a37402d5bd00233447fad10c80f9b3dde5a5960bd325af745ab0.webp');width:min(80%,calc(var(--miku-stage-limit,370px) * .72));right:-12%;max-width:none;}\n .miku-welcome-heading{left:4%;top:16%;box-sizing:border-box;width:53%;max-width:178px;padding:10px 8px;border:1px solid #ffffffb3;border-radius:13px;background:#f3fcffe6;text-shadow:0 1px 1px #fff;}.miku-welcome-heading h1{font-size:20px;white-space:normal;line-height:1.45;margin-bottom:7px;}.miku-welcome-heading p{font-size:10px;line-height:1.65;}\n body[data-dsh-ekko-miku][data-ds-dark-theme] .miku-welcome-heading{background:#193749ed;border-color:#78c9dc66;text-shadow:none;}\n .miku-stage-exclusive{width:42px;top:5px;right:6px;}.miku-stage-seal{display:none;}\n .miku-prompt-cards{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:5px;bottom:5px;left:2%;right:2%;}\n .miku-prompt-card{flex-direction:row;justify-content:flex-start;padding:9px 9px;gap:7px;border-radius:14px;font-size:10.5px;line-height:1.5;}\n .miku-card-medallion{width:29px;height:29px;flex:none;box-shadow:0 0 0 2px #d6edf3b3;}.miku-card-copy{display:block;min-height:0;text-align:left;letter-spacing:0;font-weight:600;}\n .miku-polaroid{display:none;}\n body[data-dsh-ekko-miku] [data-miku-editor-root] [data-composer-card]{min-height:120px;background-image:none;}\n body[data-dsh-ekko-miku] [data-miku-editor-root] [class*='_scroll']{min-height:65px;}\n .miku-photo-switch{padding-inline:4px;}.miku-photo-switch span{display:none;}.miku-chat-figure{width:85%;height:60%;bottom:140px;}\n}\n@media(max-height:650px) and (max-width:640px){.miku-welcome-brand{min-height:52px;}.miku-card-copy{font-size:10px;}.miku-prompt-card{padding:4px 6px;gap:5px;}.miku-card-medallion{width:23px;height:23px;}.miku-welcome-heading{top:14%;max-width:150px;width:45%;}.miku-welcome-heading h1{font-size:20px;}.miku-welcome-heading p{display:none;}.miku-stage-exclusive{display:none;}}\n@media(prefers-reduced-motion:reduce){.miku-stage,.miku-prompt-card,.miku-polaroid,.miku-polaroid-close,body[data-dsh-ekko-miku] [data-composer-card]{transition:none;}.miku-prompt-card:hover,.miku-polaroid:hover{transform:none;}}\n\n/* Theme jewellery: paint layers only; the native controls retain their DOM and actions. */\nbody[data-dsh-ekko-miku]{\n --ekko-rim:#89bdce;--ekko-rim-soft:#c8e3ed;--ekko-shine:#f7ffff;--ekko-panel:#f7fdff;--ekko-tint:#e3f8fb;--ekko-shadow:#4390b334;\n --ekko-ribbon:url('./ekko-skins/assets/miku/c3dda0a51cc5aa4ee1d61796e95d741a15587a703e55a0305755965d17b79481.webp');--ekko-trim:url('./ekko-skins/assets/miku/34325a82a74620c799c742cf17511e1fff309d7e6bd15b6dd9e721a9c185edc6.webp');--ekko-corners:url('./ekko-skins/assets/miku/3acb883431c3ec4c0bc4f353673121ec93d0445c62b56d6b66fe8d4e7ea140f6.svg');--ekko-crest:url('./ekko-skins/assets/miku/8bfe6b789ac16843ce566aa1bf2fb7d14444f0cfea003dc7dc60a7c46dd8115d.svg');--ekko-trim-size:360px;\n}\nbody[data-dsh-ekko-miku][data-ds-dark-theme]{--ekko-rim:#73a6bf;--ekko-rim-soft:#3c5c76;--ekko-shine:#729eb6;--ekko-panel:#172e3d;--ekko-tint:#25485c;--ekko-shadow:#030f2299;}\n/* A complete frame: fine hanging trim above, a small engraved clasp below. */\nbody[data-dsh-ekko-miku] [data-miku-center]{border:2px solid var(--ekko-rim-soft);border-radius:20px;box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-shine),0 6px 22px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-miku-center]::before,\nbody[data-dsh-ekko-miku] [data-miku-center]::after{content:'';position:absolute;z-index:16;pointer-events:none;user-select:none;}\nbody[data-dsh-ekko-miku] [data-miku-center]::before{inset:1px 6px auto;height:20px;background:var(--ekko-trim) left top/var(--ekko-trim-size) auto repeat-x;border-radius:14px 14px 0 0;}\nbody[data-dsh-ekko-miku] [data-miku-center]::after{inset:auto 10px 0;height:10px;border-bottom:1px solid var(--ekko-rim);background:var(--ekko-crest) center bottom/126px 14px no-repeat;border-radius:0 0 12px 12px;}\nbody[data-dsh-ekko-miku] [data-miku-header-frame]{padding-top:23px;border-bottom-color:var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-header-frame] [data-conversation-header-corner]{margin-right:0;}\nbody[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{padding:22px 16px 0;}\nbody[data-dsh-ekko-miku] .miku-welcome-brand{padding-top:13px;}\nbody[data-dsh-ekko-miku] [data-miku-header-frame] :is(button,[role='button']):hover{background:var(--ekko-tint);box-shadow:inset 0 0 0 1px var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-dsh-bottom-toggle]{border:1px solid var(--ekko-rim-soft);background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine),0 2px 5px var(--ekko-shadow);color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-dsh-bottom-toggle][aria-pressed='true']{background:var(--ekko-tint);border-color:var(--ekko-rim);}\n/* Sidebar stationery frame: full panel when expanded, narrow inlaid rail when folded. */\nbody[data-dsh-ekko-miku] [class*='_sidebarCol']{position:relative;isolation:isolate;border-right:1px solid var(--ekko-rim);box-shadow:inset -3px 0 0 var(--ekko-shine),inset -5px 0 0 var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]{position:relative;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]::before{content:'';position:absolute;z-index:-1;inset:8px 7px;border:1px solid var(--ekko-rim-soft);border-radius:15px;pointer-events:none;box-shadow:inset 0 0 0 2px var(--ekko-shine);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) [class*='_logoRow']{position:relative;min-height:62px;margin:1px 0 7px;padding-inline:7px;background:var(--ekko-corners) center/100% 100% no-repeat;border-bottom:1px solid var(--ekko-rim-soft);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) [class*='_footArea']{position:relative;margin-top:7px;padding:11px 3px 2px;border-top:1px solid var(--ekko-rim-soft);background:var(--ekko-crest) center top -2px/114px 13px no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[aria-label='\u8D26\u53F7\u83DC\u5355'],\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[aria-label='Account menu']{border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-panel);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n/* The new-session button is one framed surface; no styling reaches its text spans. */\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{corner-shape:round;border:1px solid var(--ekko-rim);border-radius:16px;background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 1px var(--ekko-rim-soft),0 4px 9px var(--ekko-shadow);transition:background .18s ease,box-shadow .18s ease,transform .18s ease;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']::before{content:'';position:absolute;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:12px;background:var(--ekko-corners) center/100% 100% no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']{height:45px;margin:4px 3px 17px;padding-inline:12px;font-size:14px;letter-spacing:.09em;background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBiNDcxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTIgMi44IDIuOCA1LjcgNi4zLjktNC42IDQuNSAxLjEgNi4zLTUuNi0zLTUuNiAzIDEuMS02LjMtNC42LTQuNSA2LjMtLjlaIiBmaWxsPSIjZmZmMWM3Ii8+PHBhdGggZD0ibTEwLjIgOC44IDEuNy0zLjIiIHN0cm9rZT0iI2ZmZmRmMiIvPjwvc3ZnPgo=');background-position:14px center;background-size:26px 26px;background-repeat:no-repeat;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession']::after{content:'';position:absolute;right:11px;top:50%;width:34px;height:20px;transform:translateY(-50%);background:var(--ekko-ribbon) center/contain no-repeat;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame]:not([class*='_collapsed']) button[class*='_newSession'] [class*='_newSessionContent']>svg{box-sizing:border-box;width:24px;height:24px;padding:4px;border:1px solid var(--ekko-rim-soft);border-radius:50%;background:var(--ekko-tint);color:var(--miku-accent);}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame][class*='_collapsed'] button[class*='_newSession']{border-radius:13px;}\nbody[data-dsh-ekko-miku] [data-miku-sidebar-frame][class*='_collapsed'] button[class*='_newSession']::before{inset:3px;border-radius:9px;background:none;}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:hover{background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine),0 0 0 1px var(--ekko-rim),0 5px 12px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:active{transform:translateY(1px);box-shadow:inset 1px 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']:focus-visible{outline:2px solid var(--miku-accent);outline-offset:4px;}\n/* A silk crest, tiny hanging trim and an inner engraving follow every native input card. */\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{corner-shape:round;border:2px solid var(--ekko-rim);border-radius:24px;padding-top:20px;background-color:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 3px var(--ekko-rim-soft),0 4px 0 var(--ekko-tint),0 10px 24px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::before{content:'';position:absolute;z-index:1;inset:3px;border:1px solid var(--ekko-rim-soft);border-radius:19px;background-image:var(--ekko-corners),var(--ekko-trim);background-position:center,left top;background-size:100% 100%,var(--ekko-trim-size) auto;background-repeat:no-repeat,repeat-x;pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::after{content:'';position:absolute;z-index:2;top:-23px;left:calc(50% - 49px);width:98px;height:49px;background:var(--ekko-ribbon) center/contain no-repeat;filter:drop-shadow(0 2px 1px var(--ekko-shadow));pointer-events:none;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]:focus-within{border-color:var(--miku-accent);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 0 0 2px var(--ekko-shine),0 0 0 4px var(--ekko-rim-soft),0 10px 26px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-top:1px solid color-mix(in srgb,var(--ekko-rim-soft) 55%,transparent);background-color:color-mix(in srgb,var(--ekko-tint) 45%,transparent);box-shadow:inset 0 1px 0 var(--ekko-shine);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_add']{border-color:var(--ekko-rim);background:var(--ekko-panel);box-shadow:inset 0 0 0 2px var(--ekko-shine),0 2px 5px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']){border:1px solid var(--ekko-rim);background:var(--miku-accent);color:var(--ekko-panel);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--ekko-shine) 45%,transparent),0 2px 6px var(--ekko-shadow);}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label='\u53D1\u9001\u6D88\u606F'],[aria-label='Send message']):disabled{opacity:.4;}\nbody[data-dsh-ekko-miku] [data-slot='conversation.composer'] button:is([aria-label^='\u8BBF\u95EE\u6A21\u5F0F'],[aria-label^='Access mode']){border-color:var(--ekko-rim-soft);background-color:var(--ekko-tint);box-shadow:inset 0 1px 0 var(--ekko-shine);}\n@container miku-main (max-width:640px){\n body[data-dsh-ekko-miku] [data-miku-center]::before{height:13px;background-size:190px auto;}\n body[data-dsh-ekko-miku] [data-miku-center]::after{height:8px;background-size:90px 11px;}\n body[data-dsh-ekko-miku][data-miku-page='welcome'] [data-miku-welcome-header]{padding:19px 12px 0;}\n body[data-dsh-ekko-miku] .miku-welcome-brand{padding-top:16px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]{border-radius:21px;padding-top:15px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::before{border-radius:16px;background-size:100% 100%,210px auto;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [data-composer-card]::after{width:66px;height:33px;left:calc(50% - 33px);top:-16px;}\n body[data-dsh-ekko-miku] [data-slot='conversation.composer'] [class*='_row']{border-radius:0 0 18px 18px;}\n}\n@media(prefers-reduced-motion:reduce){body[data-dsh-ekko-miku] [data-slot='sidebar'] button[class*='_newSession']{transition:none;}}\n";

// src/session-icons.mjs
var SESSION_ICON_KEY2 = "dsh:ekko-miku:session-icons:v1";
var SESSION_ICONS2 = ["sidebar-note", "sidebar-star", "sidebar-picture", "sidebar-shirt", "sidebar-heart"];
function createSessionIcons2(storage) {
  const entries = /* @__PURE__ */ new Map();
  let next = 0, dirty = false;
  try {
    const saved = JSON.parse(storage.getItem(SESSION_ICON_KEY2) || "null");
    if (Array.isArray(saved?.entries)) for (const item of saved.entries.slice(-2e3)) {
      if (Array.isArray(item) && typeof item[0] === "string" && item[0].length > 0 && item[0].length <= 256 && Number.isInteger(item[1]) && item[1] >= 0 && item[1] < SESSION_ICONS2.length) entries.set(item[0], item[1]);
    }
    next = Number.isInteger(saved?.next) && saved.next >= 0 ? saved.next % SESSION_ICONS2.length : entries.size % SESSION_ICONS2.length;
  } catch {
  }
  return {
    get(id) {
      if (!entries.has(id)) {
        entries.set(id, next);
        next = (next + 1) % SESSION_ICONS2.length;
        dirty = true;
        if (entries.size > 2e3) entries.delete(entries.keys().next().value);
      }
      return SESSION_ICONS2[entries.get(id)];
    },
    flush() {
      if (!dirty) return;
      dirty = false;
      try {
        storage.setItem(SESSION_ICON_KEY2, JSON.stringify({ next, entries: [...entries] }));
      } catch {
      }
    }
  };
}

// src/dock-alignment.mjs
function createDockAlignment2() {
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
var PRESENTATION_INJECT2 = ["theme", "slots", "layout"];
var ATTR2 = "data-dsh-ekko-miku";
var copy2 = {
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
function language3() {
  return /^zh/i.test(document.documentElement.lang || navigator.language) ? "zh" : "en";
}
function img2(key, className = "") {
  const el = document.createElement("img");
  el.src = ASSETS2[key];
  el.alt = "";
  el.className = className;
  el.draggable = false;
  el.setAttribute("aria-hidden", "true");
  return el;
}
function node2(tag, className, text2) {
  const el = document.createElement(tag);
  el.className = className;
  if (text2) el.textContent = text2;
  return el;
}
function fillComposer2(text2, inputActions) {
  const editor = document.querySelector('[data-slot="conversation.composer"] [contenteditable="true"]');
  if (!editor || !inputActions) {
    document.querySelector('[data-slot="conversation.hero.workspace"] button')?.click();
    return false;
  }
  const captured = inputActions.captureInsertion();
  const span = { ...captured, start: captured.end, end: captured.end };
  const inserted = (editor.textContent.trim() ? "\n\n" : "") + text2;
  if (!inputActions.insertText(inserted, span)) return false;
  inputActions.persistDraft();
  requestAnimationFrame(() => editor.isConnected && editor.focus());
  return true;
}
function createWelcome2(insert) {
  const lang = language3(), c = copy2[lang], root = node2("section", "miku-welcome");
  root.lang = lang;
  root.setAttribute("aria-label", c.name);
  const brand = node2("header", "miku-welcome-brand"), labels = node2("div", "miku-welcome-signature");
  labels.append(node2("strong", "", c.name), node2("span", "", c.edition));
  brand.append(img2("mark", "miku-mark"), labels, img2("badge", "miku-brand-badge"));
  const stage = node2("div", "miku-stage"), figureLayer = node2("div", "miku-figure-layer");
  figureLayer.append(img2("figure", "miku-welcome-figure"));
  stage.append(img2("hero-backdrop", "miku-welcome-backdrop"), figureLayer, img2("exclusive", "miku-stage-exclusive"));
  const seal = node2("div", "miku-stage-seal");
  seal.append(node2("strong", "", lang === "zh" ? "\u521D\u97F3\u672A\u6765\u4E3B\u9898\u5B9A\u5236" : "MIKU STARLIGHT STUDIO"), node2("span", "", "MIKU.3939"));
  stage.append(seal);
  const heading = node2("div", "miku-welcome-heading"), title = node2("h1", "");
  if (lang === "zh") {
    const split = c.title.indexOf("\u6784\u5EFA");
    title.append(document.createTextNode(c.title.slice(0, split)), node2("span", "miku-heading-phrase", c.title.slice(split)));
  } else title.textContent = c.title;
  heading.append(title, node2("p", "", c.subtitle));
  stage.append(heading);
  const cards = node2("div", "miku-prompt-cards");
  ["code", "puzzle", "clipboard", "wrench"].forEach((key, i) => {
    const button = node2("button", "miku-prompt-card");
    button.type = "button";
    const circle = node2("span", "miku-card-medallion" + (i === 0 ? " miku-card-medallion-code" : ""));
    circle.append(img2(key, "miku-card-icon"));
    button.append(circle, node2("span", "miku-card-copy", c.cards[i]), img2("heart", "miku-card-heart"));
    button.addEventListener("click", () => insert(c.prompts[i]));
    cards.append(button);
  });
  stage.append(cards);
  root.append(brand, stage);
  return root;
}
function createPolaroid2(hide) {
  const c = copy2[language3()], photo = node2("aside", "miku-polaroid");
  photo.setAttribute("aria-label", c.polaroid);
  photo.append(img2("photo", "miku-polaroid-art"));
  const close = node2("button", "miku-polaroid-close");
  close.type = "button";
  close.setAttribute("aria-label", c.hidePhoto);
  close.append(img2("close"));
  close.addEventListener("click", hide);
  photo.append(close);
  return photo;
}
function mountPresentation2(ctx) {
  const body = document.body, previousAttr = body.getAttribute(ATTR2), listeners = /* @__PURE__ */ new Set(), owned = /* @__PURE__ */ new Set(), marked = /* @__PURE__ */ new Map(), sizeTargets = /* @__PURE__ */ new Set(), layoutStyles = /* @__PURE__ */ new Map();
  const sessionIcons = createSessionIcons2(localStorage), dockAlignment = createDockAlignment2();
  const readCurrent = () => ({ ...readSettings2(localStorage), enabled: true });
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
  const style = node2("style", "miku-theme-styles");
  style.dataset.dshMikuOwned = "";
  style.textContent = STYLES3;
  document.head.append(style);
  owned.add(style);
  const theme = ctx.get("theme");
  function render() {
    if (!current.enabled) {
      disposeTokens?.();
      disposeTokens = void 0;
    }
    if (current.enabled) {
      body.setAttribute(ATTR2, "");
      body.dataset.mikuArtwork = String(current.artwork);
      body.dataset.mikuCompanion = String(current.companion);
      body.dataset.mikuPolaroid = String(current.artwork && current.polaroid);
      body.style.setProperty("--miku-companion-opacity", String(current.opacity));
      disposeTokens ||= theme.overrideTokens("dsh-plugin-miku-theme", TOKENS2);
    } else {
      previousAttr === null ? body.removeAttribute(ATTR2) : body.setAttribute(ATTR2, previousAttr);
      for (const key of ["mikuArtwork", "mikuCompanion", "mikuPolaroid"]) delete body.dataset[key];
      body.style.removeProperty("--miku-companion-opacity");
    }
    schedule();
  }
  function update(value) {
    current = normalizeSettings2({ ...current, ...value });
    try {
      localStorage.setItem(STORAGE_KEY2, JSON.stringify(current));
    } catch {
    }
    render();
    for (const fn of listeners) fn();
    window.dispatchEvent(new CustomEvent("dsh:ekko-skin-preferences", { detail: { id: "miku" } }));
  }
  function DraftBridge({ inputActions, sessionId }) {
    (0, import_react4.useEffect)(() => {
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
      if (!welcome || !welcome.isConnected || welcome.lang !== language3()) {
        remove(welcome);
        welcome = createWelcome2((text2) => fillComposer2(text2, activeInput?.actions));
        owned.add(welcome);
        stack.prepend(welcome);
      }
      const bar = seat?.querySelector('[data-slot="conversation.composer.bar"]'), editorRoot = bar?.querySelector('[class*="_root"]');
      mark(editorRoot, "data-miku-editor-root");
      if (current.artwork && current.polaroid && seat) {
        if (!photo || !photo.isConnected) {
          remove(photo);
          photo = createPolaroid2(() => update({ polaroid: false }));
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
          photoSwitch = node2("button", "miku-photo-switch");
          photoSwitch.type = "button";
          photoSwitch.append(img2("photo-icon"), node2("span", "", copy2[language3()].photo));
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
        companion = img2("chat", "miku-chat-figure");
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
    if (e.key === STORAGE_KEY2) {
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
    previousAttr === null ? body.removeAttribute(ATTR2) : body.setAttribute(ATTR2, previousAttr);
    for (const key of ["mikuPage", "mikuArtwork", "mikuCompanion", "mikuPolaroid"]) delete body.dataset[key];
    body.style.removeProperty("--miku-companion-opacity");
  }, "ekko-miku: restore presentation");
}
var inject2 = ["slots", "theme", "layout"];
function apply3(ctx) {
  acquireClient(ctx);
  apply2(ctx, { bundled: true });
  const provider = { id: "miku", plugin: { name: "ekko-miku-presentation", inject: PRESENTATION_INJECT2, apply: mountPresentation2 }, assets: ASSETS2, storageKey: STORAGE_KEY2, readSettings: readSettings2, normalizeSettings: normalizeSettings2 };
  ctx.inject(["ekkoSkins"], (child) => child.effect(() => child.get("ekkoSkins").register(provider), "ekko-miku: provider registration"));
}

return module.exports;}});
