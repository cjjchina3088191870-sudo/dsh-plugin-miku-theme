import test from 'node:test';import assert from 'node:assert/strict';import http from 'node:http';import {readFile} from 'node:fs/promises';
import {createAssetHandler,PREFIX,apply} from '../lib/index.js';
const files=JSON.parse(await readFile(new URL('../assets/manifest.json',import.meta.url),'utf8'));
test('native artwork route serves immutable package assets and rejects paths and writes',async t=>{
 const server=http.createServer(createAssetHandler());await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));
 const root=`http://127.0.0.1:${server.address().port}`,url=root+PREFIX+'/'+files.wallpaper;
 const first=await fetch(url);assert.equal(first.status,200);assert.equal(first.headers.get('content-type'),'image/webp');const bytes=await first.arrayBuffer();assert.ok(bytes.byteLength>1000);
 const head=await fetch(url,{method:'HEAD'});assert.equal(head.status,200);assert.equal(head.headers.get('content-length'),String(bytes.byteLength));assert.equal((await head.arrayBuffer()).byteLength,0);
 const cached=await fetch(url,{headers:{'If-None-Match':first.headers.get('etag')}});assert.equal(cached.status,304);
 for(const path of ['/../package.json','/%2e%2e/cordis.yml','/manifest.json','/'+('f'.repeat(64))+'.webp'])assert.equal((await fetch(root+PREFIX+path)).status,404);
 assert.equal((await fetch(url,{method:'POST'})).status,405);
});
test('host route is owned by the plugin effect and removed on disposal',()=>{
 let installed=false,disposed=false;const ctx={inject(keys,fn){assert.deepEqual(keys,['webServer']);fn({get:()=>({register(route){assert.equal(route.path,PREFIX);installed=true;return()=>{disposed=true}}}),effect(fn){const cleanup=fn();assert.equal(installed,true);cleanup();}})}};
 apply(ctx);assert.equal(disposed,true);
});
