import {acquireHost} from '../../../integrated/src/host-entry.mjs';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import manifest from '../assets/manifest.json' with { type: 'json' };
export const PREFIX = '/skin-assets/ekko-rose';
export function createAssetHandler(files = manifest, directory = new URL('../assets/runtime/', import.meta.url)) {
  const allowed = new Set(Object.values(files));
  return async function handler(req, res) {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{Allow:'GET, HEAD'}).end(); return; }
    const url = new URL(req.url || '/', 'http://localhost');
    const name = url.pathname.slice(PREFIX.length + 1);
    if (!url.pathname.startsWith(`${PREFIX}/`) || !allowed.has(name) || !/^[a-f0-9]{64}\.(png|webp|svg|woff2)$/.test(name)) { res.writeHead(404).end(); return; }
    let bytes;
    try { bytes = await readFile(new URL(name, directory)); } catch (error) { if (error.code !== 'ENOENT') throw error; res.writeHead(404).end(); return; }
    const etag = `"${createHash('sha256').update(bytes).digest('hex')}"`;
    const headers = {'Content-Type': name.endsWith('.svg') ? 'image/svg+xml' : name.endsWith('.woff2') ? 'font/woff2' : name.endsWith('.png') ? 'image/png' : 'image/webp',
      'Cache-Control':'public, max-age=31536000, immutable','ETag':etag,'X-Content-Type-Options':'nosniff','Cross-Origin-Resource-Policy':'same-origin'};
    if (req.headers['if-none-match'] === etag) { res.writeHead(304,headers).end(); return; }
    res.writeHead(200,{...headers,'Content-Length':bytes.length}); res.end(req.method === 'HEAD' ? undefined : bytes);
  };
}
export function apply(ctx) {
  acquireHost(ctx,{defaultSkin:'rose'});
  ctx.inject(['webServer'], scoped => { scoped.effect(() => scoped.get('webServer').register({kind:'prefix',path:PREFIX,handler:createAssetHandler()})); });
}
