import test from 'node:test';
import assert from 'node:assert/strict';
import{createRequire}from'node:module';
import{createSkirkNavigation}from'../src/skirk/navigation.mjs';
const require=createRequire(process.env.DSH_MIKU_TOOLCHAIN||new URL('../package.json',import.meta.url));
const {JSDOM}=require('jsdom');
function fixture(){
 const dom=new JSDOM(`<!doctype html><html lang="zh-CN"><body data-dsh-ekko-skirk>
 <aside data-slot="sidebar"><div class="ui_logoRow"><span data-slot="sidebar.brand.mark"><svg></svg></span></div><button class="ui_newSession" aria-label="新建会话">新会话</button>
 <nav class="ui_panelList"><button class="ui_panelRow" aria-label="插件"><svg data-icon="plugins"></svg></button><button class="ui_panelRow" aria-label="Aurabot"><svg data-icon="aurabot"></svg></button><button class="ui_panelRow" aria-label="更多" aria-haspopup="menu" aria-expanded="false"><svg data-icon="more"></svg></button></nav>
 <div class="ui_regionArea"><div data-row-key="session:blank"><span class="ui_slot"></span><span class="ui_title">新会话</span></div><div data-row-key="session:one" aria-selected="true"><span class="ui_title">真实会话一</span><span class="ui_rowResting">今天</span></div><div data-row-key="session:two"><span class="ui_title">真实会话二</span><span class="ui_rowActions"></span></div></div>
 <footer class="ui_foot"><button aria-label="账号菜单" aria-haspopup="menu" aria-expanded="false"><svg data-icon="account"></svg></button></footer></aside>
 <main data-skirk-center><section data-slot="main.conversation"><div data-phase="hero"><div data-slot="conversation.header"><header>原生标题<button>右上原生功能</button></header></div><div class="ui_heroWorkspaceRow"><button aria-label="选择工作区" aria-haspopup="menu" aria-expanded="false"><svg data-icon="native-workspace"></svg><span class="ui_workspaceLabel">科研代码工作区</span><svg data-icon="native-chevron"></svg></button></div><div>真实编辑器</div></div></section></main>
 </body></html>`,{url:'http://localhost',pretendToBeVisual:true});
 dom.window.innerWidth=1600;return dom;
}
test('desktop rail discovers plugin entries, mirrors state, owns a session-only drawer and cleans up',()=>{
 const dom=fixture(),w=dom.window,doc=w.document;
 const nav=createSkirkNavigation({document:doc,assets:{mark:'mark.svg'}}),nativeMore=doc.querySelector('[aria-label="更多"]');
 let clicked=0;nativeMore.addEventListener('click',()=>{clicked++;nativeMore.setAttribute('aria-expanded',String(clicked%2===1));});
 nav.sync(doc.querySelector('main'));
 const label=n=>n.getAttribute('aria-label');
 assert.deepEqual([...doc.querySelectorAll('.skirk-rail-actions button')].map(label),['新会话','会话历史','插件','Aurabot','更多']);
 assert.equal(doc.querySelectorAll('.skirk-session-tab').length,2);
 assert.equal(doc.querySelector('[data-row-key="session:blank"]').hasAttribute('data-skirk-blank-session'),true);
 assert.equal(doc.querySelector('[data-slot="conversation.header"]').nextElementSibling.className,'skirk-session-strip');
 doc.querySelector('.skirk-rail-button[data-action="menu"]').click();assert.equal(doc.body.dataset.skirkDrawer,'true');
 doc.querySelector('.skirk-rail-button[data-action="panel:更多"]').click();assert.equal(clicked,1);assert.equal(doc.body.dataset.skirkDrawer,'false');assert.equal(nativeMore.hasAttribute('data-skirk-popup-anchor'),true);assert.equal(nativeMore.parentElement.hasAttribute('data-skirk-anchor-container'),true);
 nav.sync();assert.equal(doc.querySelector('.skirk-rail-button[data-action="panel:更多"]').getAttribute('aria-expanded'),'true');
 nativeMore.setAttribute('aria-expanded','false');nav.sync();assert.equal(nativeMore.hasAttribute('data-skirk-popup-anchor'),false);assert.equal(nativeMore.parentElement.hasAttribute('data-skirk-anchor-container'),false);
 const custom=doc.createElement('button');custom.className='ui_panelRow';custom.setAttribute('aria-label','自定义插件');custom.setAttribute('aria-current','page');custom.disabled=true;doc.querySelector('nav.ui_panelList').append(custom);nav.sync();
 const proxy=doc.querySelector('.skirk-rail-button[data-action="panel:自定义插件"]');assert.ok(proxy);assert.equal(proxy.disabled,true);assert.equal(proxy.getAttribute('aria-current'),'page');
 const savedNative=doc.querySelector('[data-row-key="session:one"]');let sessionOpened=0;savedNative.addEventListener('click',()=>sessionOpened++);doc.querySelector('.skirk-session-tab[data-skirk-session="session:one"]').click();assert.equal(sessionOpened,1);
 const observer=new w.MutationObserver(()=>{});observer.observe(doc.body,{childList:true,subtree:true});nav.sync();nav.sync();assert.equal(observer.takeRecords().filter(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)).length,0,'stable sync must not cause a DOM mutation loop');observer.disconnect();
 nav.dispose();assert.equal(doc.querySelector('.skirk-desktop-rail'),null);assert.equal(doc.querySelector('.skirk-session-strip'),null);assert.equal(doc.querySelector('[data-skirk-session-drawer]'),null);assert.equal(doc.querySelector('[data-skirk-blank-session]'),null);assert.equal(savedNative.isConnected,true);w.close();
});
test('phone viewport leaves shared mobile navigation and native sidebar intact',()=>{
 const dom=fixture(),w=dom.window;w.innerWidth=390;const nav=createSkirkNavigation({document:w.document});nav.sync(w.document.querySelector('main'));assert.equal(w.document.querySelector('.skirk-desktop-rail'),null);assert.equal(w.document.querySelector('[data-skirk-session-drawer]'),null);nav.dispose();w.close();
});

test('header tabs follow the real new draft and selected session, and workspace delegates to its native picker',()=>{
 const dom=fixture(),w=dom.window,doc=w.document,center=doc.querySelector('main'),root=doc.querySelector('[data-phase]');
 const nav=createSkirkNavigation({document:doc,assets:{plus:'plus.svg',settings:'settings.svg',layers:'layers.svg',chevron:'chevron.svg'}});
 const workspace=doc.querySelector('.ui_heroWorkspaceRow>button'),nativeNew=doc.querySelector('.ui_newSession');let picked=0,created=0,opened=0;
 workspace.addEventListener('click',()=>{picked++;workspace.setAttribute('aria-expanded','true');});nativeNew.addEventListener('click',()=>created++);
 doc.querySelector('[data-row-key="session:two"]').addEventListener('click',()=>opened++);
 nav.sync(center);
 assert.equal(doc.querySelector('.skirk-topbar-workspace .skirk-topbar-label').textContent,'科研代码工作区');
 assert.equal(doc.querySelector('.skirk-topbar-tab[aria-current]').textContent,'新会话');
 assert.equal(doc.querySelector('.skirk-session-current-draft[aria-current]').textContent,'新会话 · 当前');
 assert.equal(doc.querySelectorAll('.skirk-session-tab[aria-current]').length,0,'the real blank draft must not falsely select a previous saved session');
 assert.equal(doc.querySelector('.skirk-rail-button[data-action="new"] img').getAttribute('src'),'plus.svg');
 assert.equal(doc.querySelector('.skirk-rail-button[data-action="account"] img').getAttribute('src'),'settings.svg');
 doc.querySelector('.skirk-topbar-workspace').click();nav.sync();assert.equal(picked,1);assert.equal(doc.querySelector('.skirk-topbar-workspace').getAttribute('aria-expanded'),'true');assert.equal(workspace.hasAttribute('data-skirk-popup-anchor'),true);
 doc.querySelector('.skirk-topbar-new').click();assert.equal(created,1);
 root.dataset.phase='active';doc.querySelector('[data-row-key="session:one"]').setAttribute('aria-selected','false');doc.querySelector('[data-row-key="session:two"]').setAttribute('aria-selected','true');nav.sync();
 assert.equal(doc.querySelector('.skirk-session-current-draft'),null);
 assert.equal(doc.querySelector('.skirk-topbar-tab[aria-current]').dataset.skirkHeaderSession,'session:two');assert.equal(doc.querySelector('.skirk-session-tab[aria-current]').dataset.skirkSession,'session:two');
 doc.querySelector('[data-skirk-header-session="session:two"]').click();assert.equal(opened,1);
 workspace.parentElement.remove();nav.sync();assert.equal(doc.querySelector('.skirk-topbar-workspace').getAttribute('aria-haspopup'),'dialog');doc.querySelector('.skirk-topbar-workspace').click();assert.equal(doc.body.dataset.skirkDrawer,'true');
 const observer=new w.MutationObserver(()=>{});observer.observe(doc.body,{subtree:true,childList:true});nav.sync();nav.sync();assert.equal(observer.takeRecords().filter(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)).length,0,'active-tab and workspace sync must not rebuild its own element tree');observer.disconnect();
 nav.dispose();assert.equal(doc.querySelector('.skirk-topbar'),null);assert.equal(workspace.hasAttribute('data-skirk-popup-anchor'),false);w.close();
});
