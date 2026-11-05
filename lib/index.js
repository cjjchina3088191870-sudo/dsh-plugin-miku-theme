// src/index.mjs
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// assets/manifest.json
var manifest_default = {
  wallpaper: "c7e78efdffa352c892eed75cf8246dd596f1728ab048761c39036b7de01579da.webp",
  "hero-backdrop": "e2e3499a6d286ad28feb6a22f9c01460b6751095dfe6988775a63bf4e23c8a8f.webp",
  "hero-mobile": "c431dce8f869f0f6e3b7a92b6f794aef192b6fb521b4c33f18f8764738ea9cc2.webp",
  figure: "4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp",
  "figure-mobile": "bc4fb38eabc8a37402d5bd00233447fad10c80f9b3dde5a5960bd325af745ab0.webp",
  photo: "eb43c95e8eff934c687cec69c9cf4c3965f9340779b74b96356ae06ca31cd9aa.webp",
  chat: "4e8da5d878880cf7c8253330f56d6e43af25af91095a7d71891529ebb6165b4c.webp",
  mark: "053a9ebff8574d554f8fb1e68b50c4f16724f78798bbb6329210c04247b39781.svg",
  badge: "d685cf8b51a232c8dfa28e74024ab274913ed4c15acf2894a9f8ee015f4b42fa.webp",
  exclusive: "9229b5f57f45b1b90a5cbff2c40cde4b7a64743a149e71260d08dd62634cd039.webp",
  "task-card": "445118cb0b5ae7156f1b81ff5e31e4986658f18d47c8649b401b2b2abaa68cdd.webp",
  wave: "cbff7068eab03e957ad86ba135af8016eeeb2b565d17c2ebef71640ec38c2c4d.webp",
  corners: "3acb883431c3ec4c0bc4f353673121ec93d0445c62b56d6b66fe8d4e7ea140f6.svg",
  crest: "8bfe6b789ac16843ce566aa1bf2fb7d14444f0cfea003dc7dc60a7c46dd8115d.svg",
  heart: "e8c928584d31e448bee1f481e14e763567e1d8db4bbf4c79b02e25dd014b0bbd.svg",
  sparkle: "9eb321f3e042b0ab8e5215b2d1575c3eaa59a97fee58b216d6266e39556cf04e.svg",
  code: "63442194f730bb59bb93b679640abb963a007345d982003ba6dbafd9978ff165.svg",
  puzzle: "19b9a3b3ae87fc8f298cc07969024f591e0b6341ea28c8b8379d5ff8b7016109.svg",
  clipboard: "05fd9694169628d159e4e9913f9eea0606d179e0c204da60d6861763c7a083be.svg",
  wrench: "a2dadefdfef7ec7656b20a4dd1447be452532a2a9b856693bd2b793c4f7e1cb1.svg",
  close: "2f88bcbd25182515d7962a9592322b08fece54303fbafc00bd032221b32e0f0b.svg",
  "photo-icon": "da723a54949b613a74dda7bd3792e9adb382e7b018458bad609b4a9c07a1917c.svg",
  trim: "34325a82a74620c799c742cf17511e1fff309d7e6bd15b6dd9e721a9c185edc6.webp",
  ribbon: "c3dda0a51cc5aa4ee1d61796e95d741a15587a703e55a0305755965d17b79481.webp",
  "sidebar-note": "f4d4daf765e46a33f83bb4458cc2ea5ff356c989a79fc4f626bf81002ea69002.svg",
  "sidebar-star": "053a9ebff8574d554f8fb1e68b50c4f16724f78798bbb6329210c04247b39781.svg",
  "sidebar-picture": "da723a54949b613a74dda7bd3792e9adb382e7b018458bad609b4a9c07a1917c.svg",
  "sidebar-shirt": "b0bc71aef26fa5c496558d5133130844236013e9c405f8e0ec5767b76c7cf654.svg",
  "sidebar-heart": "709152d65bfcbc86d6990e05857745e252ad5a8204170a04c97a62effbd43e6c.svg",
  "sidebar-planet": "67f27c6310c51b227920f13d71e14e866d2ee8c6ccf0a6eec66451ac6423fe3d.svg"
};

// src/index.mjs
var PREFIX = "/skin-assets/ekko-miku";
function createAssetHandler(files = manifest_default, directory = new URL("../assets/runtime/", import.meta.url)) {
  const allowed = new Set(Object.values(files));
  return async function handler(req, res) {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const url = new URL(req.url || "/", "http://localhost");
    const name = url.pathname.slice(PREFIX.length + 1);
    if (!url.pathname.startsWith(`${PREFIX}/`) || !allowed.has(name) || !/^[a-f0-9]{64}\.(png|webp|svg|woff2)$/.test(name)) {
      res.writeHead(404).end();
      return;
    }
    let bytes;
    try {
      bytes = await readFile(new URL(name, directory));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      res.writeHead(404).end();
      return;
    }
    const etag = `"${createHash("sha256").update(bytes).digest("hex")}"`;
    const headers = {
      "Content-Type": name.endsWith(".svg") ? "image/svg+xml" : name.endsWith(".woff2") ? "font/woff2" : name.endsWith(".png") ? "image/png" : "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "ETag": etag,
      "X-Content-Type-Options": "nosniff",
      "Cross-Origin-Resource-Policy": "same-origin"
    };
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers).end();
      return;
    }
    res.writeHead(200, { ...headers, "Content-Length": bytes.length });
    res.end(req.method === "HEAD" ? void 0 : bytes);
  };
}
function apply(ctx) {
  ctx.inject(["webServer"], (scoped) => {
    scoped.effect(() => scoped.get("webServer").register({ kind: "prefix", path: PREFIX, handler: createAssetHandler() }));
  });
}
export {
  PREFIX,
  apply,
  createAssetHandler
};
