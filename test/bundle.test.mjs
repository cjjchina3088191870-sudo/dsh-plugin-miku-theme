import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHandler,resolveSkinPackage} from '../integrated/src/index.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
test('one package contains all three themes, serves Queen artwork and has no previous portrait assets',async t=>{
 const resolvePackage=name=>{if(name!=='dsh-plugin-miku-theme')throw Error('not installed');return root;};
 const server=http.createServer(createHandler({resolvePackage}));await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));const url='http://127.0.0.1:'+server.address().port;
 const catalog=await(await fetch(url+'/ekko-skins/catalog')).json();assert.deepEqual(catalog.skins.map(s=>[s.id,s.available]),[['rose',true],['miku',true],['skirk',true]]);
 const queen=resolveSkinPackage(resolvePackage,'rose'),manifest=JSON.parse(await readFile(queen+'/assets/manifest.json','utf8'));
 const retired=['5802d00ca5804005e31ad835e4117246e27ef78d1f5882216785c716710a42c3.png','9e766f4e698520de3ae65242edbeed83da32ba591b320dbebbbd64d35e95946b.png','44e89839c76ce3a5c3e4a4bcba562247ce5c3d120437b9b18e4ee27051c92eae.png','5f87bff73cd7ddd462a978452ff86b7ff253b0ef34c126a927b500b46d94cad6.png'];
 for(const key of ['figure','photo','chat'])assert.ok(!retired.includes(manifest[key]));
 const r=await fetch(url+'/ekko-skins/assets/rose/'+manifest.figure);assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'image/png');assert.ok((await r.arrayBuffer()).byteLength>10000);
 assert.equal((await fetch(url+'/ekko-skins/assets/rose/5802d00ca5804005e31ad835e4117246e27ef78d1f5882216785c716710a42c3.png')).status,404);
 for(const file of retired.slice(2))assert.equal((await fetch(url+'/ekko-skins/assets/rose/'+file)).status,404);
});
