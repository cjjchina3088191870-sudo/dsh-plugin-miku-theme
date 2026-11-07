import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFile} from 'node:fs/promises';import {createRequire} from 'node:module';
const require=createRequire(process.env.DSH_MIKU_TOOLCHAIN || new URL('../package.json',import.meta.url));
const {JSDOM}=require('jsdom');
test('passive provider mounts only through the manager and releases its complete presentation',async()=>{
 const dom=new JSDOM('<html lang="zh"><head></head><body><aside data-slot="sidebar"><div data-row-key="session:example"><span class="row_slot"></span></div></aside><main class="prefix_centerCol"><section data-slot="main.conversation"><div class="hero_root"><div class="hero_stack"><span data-slot="conversation.hero.brand.mark"></span></div></div></section></main></body></html>',{url:'http://localhost',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;let plugin,provider,unregistered=false,overrides=0,released=0;const effects=[],rows=[];
 w.__ModuleLoader__={load(entry){plugin=entry.factory(id=>id==='react'?{createElement(){},useSyncExternalStore(){}}:require(id))}};
 w.eval(await readFile(new URL('../lib/client.js',import.meta.url),'utf8'));
 const ctx={get:()=>({overrideTokens(source,tokens){assert.equal(source,'dsh-plugin-miku-theme');assert.ok(Object.values(tokens).every(t=>typeof t.light==='string'&&typeof t.dark==='string'));overrides++;return()=>released++;}}),slots:{inject(name,fn){fn()},register(def){rows.push(def);return()=>rows.pop()}},effect(fn){effects.push(fn())}};
 const registration=[];plugin.apply({root:{plugin(){return{dispose(){}}}},inject(names,fn){fn({get:()=>({register(value){if(value.id==='miku')provider=value;else assert.equal(value.id,'rose');return()=>{unregistered=true};}}),effect(fn){registration.push(fn())}})},effect(fn){registration.push(fn())}});
 assert.equal(w.document.querySelectorAll('.miku-welcome').length,0);assert.equal(w.document.querySelector('.miku-theme-styles'),null);
 provider.plugin.apply(ctx);assert.equal(w.document.body.hasAttribute('data-dsh-ekko-miku'),true);assert.equal(w.document.querySelectorAll('.miku-welcome').length,1);assert.equal(rows[0].id,'ekko-miku-draft');
 assert.equal(w.document.querySelector('[data-row-key]').getAttribute('data-miku-session-icon'),'sidebar-note');
 w.document.querySelector('[data-slot="main.conversation"]').replaceChildren(w.document.createElement('article'));await new Promise(r=>w.setTimeout(r,35));
 assert.equal(w.document.querySelector('.miku-welcome'),null);assert.ok(w.document.querySelector('.miku-chat-figure'));
 const article=w.document.querySelector('article');article.innerHTML='<div data-slot="conversation.composer"><div contenteditable="true">保留已有草稿</div></div>';let inserted,persisted=false;
 const actions={captureInsertion:()=>({start:2,end:4,draftRev:7}),insertText:(text,span)=>{inserted={text,span};return true;},persistDraft:()=>{persisted=true;}};
 assert.equal(plugin.fillComposer('追加灵感',actions),true);assert.equal(inserted.text,'\n\n追加灵感');assert.deepEqual({...inserted.span},{start:4,end:4,draftRev:7});assert.equal(persisted,true);assert.equal(article.textContent,'保留已有草稿');
 w.localStorage.setItem('dsh:ekko-miku:v1',JSON.stringify({enabled:false}));w.dispatchEvent(new w.StorageEvent('storage',{key:'dsh:ekko-miku:v1'}));await new Promise(r=>w.setTimeout(r,35));
 assert.equal(w.document.body.hasAttribute('data-dsh-ekko-miku'),true); // Legacy enabled flags cannot start a second presentation.
 for(const cleanup of effects.reverse())cleanup?.();assert.equal(w.document.querySelector('.miku-theme-styles'),null);assert.equal(w.document.querySelector('[data-miku-center]'),null);for(const cleanup of registration)cleanup();assert.equal(unregistered,true);assert.equal(released,overrides);w.close();
});
