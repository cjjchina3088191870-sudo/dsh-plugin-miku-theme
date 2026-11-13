import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFile} from 'node:fs/promises';import {createRequire} from 'node:module';
const require=createRequire(process.env.DSH_MIKU_TOOLCHAIN || new URL('../package.json',import.meta.url));
const {JSDOM}=require('jsdom');
test('passive provider mounts only through the manager and releases its complete presentation',async()=>{
 const dom=new JSDOM('<html lang="zh"><head></head><body><aside data-slot="sidebar"><div data-row-key="session:example"><span class="row_slot"></span></div></aside><main class="prefix_centerCol"><section data-slot="main.conversation"><div class="hero_root"><div class="hero_stack"><span data-slot="conversation.hero.brand.mark"></span></div></div></section></main></body></html>',{url:'http://localhost',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;let plugin,provider,unregistered=false,overrides=0,released=0;const effects=[],rows=[];
 w.__ModuleLoader__={load(entry){plugin=entry.factory(id=>id==='react'?{createElement(){},useSyncExternalStore(){}}:require(id))}};
 w.eval(await readFile(new URL('../lib/client.js',import.meta.url),'utf8'));
 const ctx={get:()=>({overrideTokens(source,tokens){assert.equal(source,'dsh-plugin-miku-theme');assert.ok(Object.values(tokens).every(t=>typeof t.light==='string'&&typeof t.dark==='string'));overrides++;return()=>released++;}}),slots:{inject(name,fn){fn()},register(def){rows.push(def);return()=>rows.pop()}},effect(fn){effects.push(fn())}};
 const registration=[];plugin.apply({root:{plugin(){return{dispose(){}}}},inject(names,fn){fn({get:()=>({register(value){provider=value;return()=>{unregistered=true};}}),effect(fn){registration.push(fn())}})},effect(fn){registration.push(fn())}});
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


test('first-session phase changes restore home layout on reused native nodes',async()=>{
 const dom=new JSDOM(`<html lang="zh"><head></head><body>
  <aside data-slot="sidebar"><div></div></aside>
  <main class="prefix_centerCol" data-miku-center="before-theme">
   <section data-slot="main.conversation"><div data-phase="hero">
    <header class="native_headerBlank"></header><div class="native_scrollBody">
     <div class="native_composerHero" style="--miku-stage-limit:287px;--miku-view-height:777px">
      <div class="hero_root"><div class="hero_stack"><span data-slot="conversation.hero.brand.mark"></span><article class="native_headline">已有会话内容</article></div></div>
      <div class="native_heroWorkspaceRow"></div>
      <div data-slot="conversation.composer.bar"><div class="composer_root" style="left:12px"><div data-slot="conversation.composer"><div contenteditable="true">保留原生编辑器与草稿</div></div></div></div>
     </div>
    </div>
   </div></section>
  </main></body></html>`,{url:'http://localhost',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window,doc=w.document,phase=doc.querySelector('[data-phase]'),seat=doc.querySelector('.native_composerHero');
 const viewport=doc.querySelector('.native_scrollBody'),editor=doc.querySelector('[contenteditable]'),article=doc.querySelector('article');
 Object.defineProperty(viewport,'clientHeight',{value:720});Object.defineProperty(viewport,'clientWidth',{value:1400});
 const observed=new Set();let disconnected=0;
 w.ResizeObserver=class{observe(n){observed.add(n);}unobserve(n){observed.delete(n);}disconnect(){observed.clear();disconnected++;}};
 let plugin,provider,tokenReleases=0,nativeInputs=0;const effects=[],registration=[];
 editor.addEventListener('input',()=>nativeInputs++);
 w.__ModuleLoader__={load(entry){plugin=entry.factory(id=>id==='react'?{createElement(){},useEffect(){},useSyncExternalStore(){}}:require(id))}};
 w.eval(await readFile(new URL('../lib/client.js',import.meta.url),'utf8'));
 plugin.apply({root:{plugin(){return{dispose(){}}}},inject(names,fn){fn({get:()=>({register(value){if(value.id==='miku')provider=value;return()=>{};}}),effect(fn){registration.push(fn())}})},effect(fn){registration.push(fn())}});
 provider.plugin.apply({get:()=>({overrideTokens(){return()=>tokenReleases++;}}),slots:{inject(name,fn){fn();},register(){return()=>{};}},effect(fn){effects.push(fn());}});
 // Flush native phase MutationObserver -> presentation RAF -> any follow-up
 // RAF caused by the new owned decorations. Wall-clock delays race CPU load.
 const settle=async()=>{for(let frame=0;frame<3;frame++)await new Promise(resolve=>w.requestAnimationFrame(resolve));};
 const homeMarks='[data-miku-hero-seat],[data-miku-welcome-stack],[data-miku-welcome-shell],[data-miku-welcome-header],[data-miku-editor-root],[data-miku-stage-compact]';
 try{
  await settle();
  assert.equal(doc.body.dataset.mikuPage,'welcome');assert.ok(doc.querySelector(homeMarks));
  assert.notEqual(seat.style.getPropertyValue('--miku-stage-limit'),'287px');assert.ok(observed.size>0);
  assert.equal(w.getComputedStyle(article).display,'none','home-only hiding rules apply before first send');
  const range=doc.createRange();range.selectNodeContents(editor);range.collapse(false);w.getSelection().removeAllRanges();w.getSelection().addRange(range);
  const caret=w.getSelection().anchorNode;
  // No child insertion/removal: this is the native first-send reuse path that
  // a test replacing the whole home element cannot exercise.
  phase.dataset.phase='active';await settle();
  assert.equal(doc.body.dataset.mikuPage,'conversation');assert.equal(doc.querySelector('.miku-welcome'),null);
  assert.equal(doc.querySelector(homeMarks),null,'all home sizing/position selectors are released');
  assert.notEqual(w.getComputedStyle(article).display,'none','the reused transcript is no longer hidden by home CSS');
  assert.equal(seat.style.getPropertyValue('--miku-stage-limit'),'287px');assert.equal(seat.style.getPropertyValue('--miku-view-height'),'777px');
  assert.equal(observed.size,0);assert.ok(disconnected>0);
  assert.equal(doc.querySelector('[contenteditable]'),editor);assert.equal(editor.textContent,'保留原生编辑器与草稿');assert.equal(w.getSelection().anchorNode,caret);
  editor.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(nativeInputs,1);assert.equal(doc.querySelector('.composer_root').style.left,'12px');
  phase.dataset.phase='hero';await settle();assert.equal(doc.querySelectorAll('.miku-welcome').length,1);assert.ok(seat.hasAttribute('data-miku-hero-seat'));
  // Detached native nodes can later be reattached as a chat composer. Restore
  // their leases before forgetting them, including the original inline values.
  phase.dataset.phase='active';seat.remove();await settle();
  assert.equal(seat.querySelector(homeMarks),null);assert.equal(seat.hasAttribute('data-miku-hero-seat'),false);assert.equal(seat.style.getPropertyValue('--miku-stage-limit'),'287px');
  viewport.append(seat);await settle();assert.equal(doc.querySelector(homeMarks),null);assert.equal(doc.querySelector('[contenteditable]'),editor);
  phase.dataset.phase='hero';await settle();assert.equal(doc.querySelectorAll('.miku-welcome').length,1);
  const mutations=[];const observer=new w.MutationObserver(records=>mutations.push(...records));observer.observe(doc.body,{childList:true,subtree:true,attributes:true});await settle();observer.disconnect();assert.equal(mutations.length,0,'settled native reuse must not create a mutation/sync loop: '+mutations.map(r=>r.type+':'+r.attributeName+':'+r.target.tagName+'.'+r.target.className).join(', '));
  for(const cleanup of effects.splice(0).reverse())cleanup?.();
  assert.equal(doc.querySelector(homeMarks),null);assert.equal(doc.querySelector('.miku-welcome'),null);assert.equal(doc.querySelector('[contenteditable]'),editor);
  assert.equal(seat.style.getPropertyValue('--miku-stage-limit'),'287px');assert.equal(seat.style.getPropertyValue('--miku-view-height'),'777px');assert.equal(doc.querySelector('main').getAttribute('data-miku-center'),'before-theme');assert.equal(tokenReleases,1);
 }finally{for(const cleanup of effects.reverse())cleanup?.();for(const cleanup of registration.reverse())cleanup?.();w.close();}
});
