/** Adaptive desktop navigation mirrors native controls without moving React-owned DOM.
 * Popup triggers are temporarily positioned over their visible proxy so native
 * menus keep the correct anchor. Native sidebar rows remain the session owner. */
export function createSkirkNavigation({document:doc=document,layout,assets={}}={}){
 const view=doc.defaultView,body=doc.body;
 let rail,actions,footer,brand,strip,stripItems,drawerHead,sidebar,center,topbar,topTabs,workspaceButton,newTab,draftTab,disposed=false,open=false,anchor=null,nativeObserver=null,scheduled=0;
 const buttons=new Map(),tabs=new Map(),headerTabs=new Map(),marked=new Map();
 const initialDrawer=body.getAttribute('data-skirk-drawer');
 const language=()=>/^zh/i.test(doc.documentElement.lang||view.navigator.language);
 const desktop=()=>view.innerWidth>=1001;
 const mark=(node,key,value='')=>{if(!node)return;if(!marked.has(node))marked.set(node,new Map());if(!marked.get(node).has(key))marked.get(node).set(key,node.getAttribute(key));if(node.getAttribute(key)!==value)node.setAttribute(key,value);};
 const element=(tag,cls,text)=>{const n=doc.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 const restore=node=>{const values=marked.get(node);if(!values)return;for(const[key,value]of values)value===null?node.removeAttribute(key):node.setAttribute(key,value);marked.delete(node);};
 function native(key){
  if(!sidebar)return null;
  if(key==='new')return sidebar.querySelector('button[class*="_newSession"]');
  if(key==='account')return sidebar.querySelector('button[aria-label="账号菜单"],button[aria-label="Account menu"]');
  if(key==='workspace')return center?.querySelector('[class*="_heroWorkspaceRow"]>button[aria-haspopup]');
  return [...sidebar.querySelectorAll('button[class*="_panelRow"]')].find(n=>n.getAttribute('aria-label')===key.slice(6));
 }
 function closeDrawer({focus=false}={}){open=false;body.dataset.skirkDrawer='false';if(focus)buttons.get('menu')?.button.focus();}
 function releaseAnchor({focus=false}={}){
  if(!anchor)return;const previous=anchor;anchor=null;
  restore(previous.target);for(const node of previous.paths||[])restore(node);restore(body);
  for(const name of ['--skirk-anchor-x','--skirk-anchor-y','--skirk-anchor-w','--skirk-anchor-h'])previous.target.style.removeProperty(name);
  if(focus&&previous.proxy.isConnected)previous.proxy.focus();
 }
 function anchorNative(target,proxy){
  releaseAnchor();const r=proxy.getBoundingClientRect();mark(body,'data-skirk-proxy-popup');
  mark(target,'data-skirk-popup-anchor');mark(target,'tabindex','-1');
  for(const[name,value]of Object.entries({'--skirk-anchor-x':r.left+'px','--skirk-anchor-y':r.top+'px','--skirk-anchor-w':r.width+'px','--skirk-anchor-h':r.height+'px'}))target.style.setProperty(name,value);
  const paths=[];for(let node=target.parentElement;node&&node!==sidebar;node=node.parentElement){if(node.matches('nav[class*="_panelList"],[class*="_foot"]')){mark(node,'data-skirk-anchor-container');paths.push(node);}}
  anchor={target,proxy,paths,wasExpanded:false};
 }
 function activate(key,proxy){
  if(key==='menu'){open=!open;body.dataset.skirkDrawer=String(open);sync(center);return;}
  if(key==='workspace'&&!native(key)){open=true;body.dataset.skirkDrawer='true';sync(center);return;}
  const target=native(key);if(!target||target.disabled)return;
  closeDrawer();
  if(target.hasAttribute('aria-haspopup')||key==='account')anchorNative(target,proxy);
  target.click();
 }
 function iconFor(key,target){
  const preferred=key==='new'?assets.plus:key==='account'?assets.settings:undefined;
  if(preferred){const image=element('img','');image.src=preferred;image.alt='';return image;}
  const node=target?.querySelector('svg,img');if(node)return node.cloneNode(true);
  const source=assets[key==='menu'?'history':key==='new'?'plus':key==='account'?'settings':key==='workspace'?'layers':'plugin']||assets[key==='new'?'new':'mark'];
  if(source){const image=element('img','');image.src=source;image.alt='';return image;}
  return null;
 }
 function paintButton(key,target,parent,label){
  let item=buttons.get(key);
  if(!item){const button=element('button','skirk-rail-button');button.type='button';button.dataset.action=key;const glyph=element('span','skirk-rail-glyph');glyph.setAttribute('aria-hidden','true');const text=element('span','skirk-rail-label');button.append(glyph,text);button.addEventListener('click',()=>activate(key,button));item={button,glyph,text,signature:''};buttons.set(key,item);}
  const {button,glyph,text}=item;if(button.parentElement!==parent)parent.append(button);
  const labelText=label||target?.getAttribute('aria-label')||target?.textContent.trim()||'';
  button.setAttribute('aria-label',labelText);button.title=labelText;text.textContent=labelText;button.disabled=!!target?.disabled;
  for(const name of ['aria-current','aria-haspopup','aria-expanded']){const value=key==='menu'&&name==='aria-expanded'?String(open):target?.getAttribute(name);value==null?button.removeAttribute(name):button.setAttribute(name,value);}
  if(key==='menu'){button.setAttribute('aria-controls','skirk-native-session-list');button.setAttribute('aria-haspopup','dialog');}
  const icon=iconFor(key,target),signature=icon?.outerHTML||'';if(signature!==item.signature){glyph.replaceChildren(...(icon?[icon]:[]));item.signature=signature;}
  return button;
 }
 function mountRail(){
  rail=element('nav','skirk-desktop-rail');rail.setAttribute('aria-label',language()?'主导航':'Main navigation');rail.dataset.skirkNavigation='';
  brand=element('div','skirk-rail-brand');brand.setAttribute('aria-hidden','true');
  const nativeMark=sidebar.querySelector('[data-slot="sidebar.brand.mark"] svg');
  if(nativeMark)brand.append(nativeMark.cloneNode(true));
  else if(assets.mark){const image=element('img','');image.src=assets.mark;image.alt='';brand.append(image);}
  brand.append(element('strong','','DSH'),element('small','','DeepSeek\nHarness'));
  actions=element('div','skirk-rail-actions');footer=element('div','skirk-rail-footer');rail.append(brand,actions,footer);body.append(rail);
 }
 function mountDrawer(){
  mark(sidebar,'data-skirk-session-drawer');mark(sidebar,'id','skirk-native-session-list');
  drawerHead=element('header','skirk-session-drawer-heading');const title=element('div','skirk-session-drawer-title');title.append(element('small','','SKIRK / VOID STAR'),element('strong','',language()?'会话列表':'Sessions'));drawerHead.append(title);
  const close=element('button','skirk-session-drawer-close');close.type='button';close.setAttribute('aria-label',language()?'关闭会话列表':'Close sessions');
  // Clone the host's own close glyph when available; retain a text affordance otherwise.
  close.textContent=language()?'收起':'Close';close.addEventListener('click',()=>closeDrawer({focus:true}));drawerHead.append(close);sidebar.prepend(drawerHead);
 }
 function sessionLabel(row){return row?.querySelector(':scope > [class*="_title"]')?.textContent?.trim()||row?.textContent?.trim()||'';}
 function openSession(id){const row=[...sidebar.querySelectorAll('[data-row-key^="session:"]')].find(n=>n.getAttribute('data-row-key')===id);row?.click();closeDrawer();}
 function paintIcon(container,key,target){
  const icon=iconFor(key,target),signature=icon?.outerHTML||'';
  if(container.dataset.signature!==signature){container.replaceChildren(...(icon?[icon]:[]));container.dataset.signature=signature;}
 }
 function paintHeader(root,rows){
  const header=root.querySelector(':scope > [data-slot="conversation.header"] > header');
  if(!header){topbar?.remove();topbar=topTabs=workspaceButton=newTab=undefined;headerTabs.clear();return;}
  if(!topbar?.isConnected){
   topbar=element('nav','skirk-topbar');topbar.setAttribute('aria-label',language()?'工作区与会话':'Workspace and sessions');
   workspaceButton=element('button','skirk-topbar-workspace');workspaceButton.type='button';workspaceButton.dataset.action='workspace';workspaceButton.append(element('span','skirk-topbar-icon'),element('span','skirk-topbar-label'),element('span','skirk-topbar-chevron'));workspaceButton.addEventListener('click',()=>activate('workspace',workspaceButton));
   topTabs=element('div','skirk-topbar-tabs');topbar.append(workspaceButton,topTabs);header.prepend(topbar);
  }else if(topbar.parentElement!==header)header.prepend(topbar);
  const workspaceTarget=native('workspace'),workspaceLabel=workspaceTarget?.querySelector('[class*="_workspaceLabel"]')?.textContent?.trim()||workspaceTarget?.textContent?.trim()||(language()?'选择工作区':'Choose workspace');
  workspaceButton.title=workspaceLabel;workspaceButton.setAttribute('aria-label',workspaceTarget?.getAttribute('aria-label')||(language()?'工作区会话列表':'Workspace sessions'));
  workspaceButton.querySelector('.skirk-topbar-label').textContent=workspaceLabel;
  paintIcon(workspaceButton.querySelector('.skirk-topbar-icon'),'workspace',null);
  const chevron=workspaceButton.querySelector('.skirk-topbar-chevron');
  if(assets.chevron&&!chevron.hasChildNodes()){const image=element('img','');image.src=assets.chevron;image.alt='';chevron.append(image);}
  workspaceButton.setAttribute('aria-haspopup',workspaceTarget?'menu':'dialog');workspaceButton.setAttribute('aria-expanded',workspaceTarget?.getAttribute('aria-expanded')||String(open));
  const isHome=root.dataset.phase==='hero',wanted=new Set();
  if(!newTab){newTab=element('button','skirk-topbar-tab skirk-topbar-new');newTab.type='button';newTab.append(element('span','skirk-topbar-icon'),element('span','skirk-topbar-label',language()?'新会话':'New chat'));newTab.setAttribute('aria-label',language()?'新会话':'New chat');newTab.addEventListener('click',()=>activate('new',newTab));paintIcon(newTab.firstElementChild,'new',null);}
  newTab.classList.toggle('skirk-topbar-new-active',isHome);isHome?newTab.setAttribute('aria-current','page'):newTab.removeAttribute('aria-current');
  const limit=isHome?2:3;
  for(const row of rows.slice(0,limit)){
   const id=row.getAttribute('data-row-key');wanted.add(id);let button=headerTabs.get(id);
   if(!button){button=element('button','skirk-topbar-tab');button.type='button';button.dataset.skirkHeaderSession=id;button.append(element('span','skirk-topbar-icon'),element('span','skirk-topbar-label'));button.addEventListener('click',()=>openSession(id));headerTabs.set(id,button);paintIcon(button.firstElementChild,'menu',null);}
   const label=sessionLabel(row);button.querySelector('.skirk-topbar-label').textContent=label;button.title=label;button.setAttribute('aria-label',label);
   !isHome&&row.getAttribute('aria-selected')==='true'?button.setAttribute('aria-current','page'):button.removeAttribute('aria-current');
   const index=wanted.size-(isHome?0:1);if(topTabs.children[index]!==button)topTabs.insertBefore(button,topTabs.children[index]||null);
  }
  for(const[id,button]of headerTabs)if(!wanted.has(id)){button.remove();headerTabs.delete(id);}
  if(isHome){if(topTabs.firstElementChild!==newTab)topTabs.prepend(newTab);}else if(topTabs.lastElementChild!==newTab)topTabs.append(newTab);
 }
 function blank(row){return !row.querySelector('[class*="_rowResting"],[class*="_rowActions"]')&&!row.querySelector('[data-slot="sidebar.session.row.leading"]');}
 function updateStrip(root){
  if(!root){strip?.remove();topbar?.remove();strip=stripItems=topbar=topTabs=workspaceButton=newTab=draftTab=undefined;tabs.clear();headerTabs.clear();return;}
  if(!strip?.isConnected){strip=element('nav','skirk-session-strip');strip.dataset.skirkSessionStrip='';strip.setAttribute('aria-label',language()?'最近会话':'Recent sessions');strip.append(element('span','skirk-session-strip-label',language()?'最近会话':'Recent'));stripItems=element('div','skirk-session-strip-items');strip.append(stripItems);const all=element('button','skirk-session-strip-all');all.type='button';all.textContent=language()?'全部会话':'All sessions';all.addEventListener('click',()=>{open=true;body.dataset.skirkDrawer='true';sync(center);});strip.append(all);}
  const header=root.querySelector(':scope > [data-slot="conversation.header"]');
  if(header&&strip.previousElementSibling!==header)header.after(strip);else if(!header&&strip.parentElement!==root)root.prepend(strip);
  const rows=[...sidebar.querySelectorAll('[data-row-key^="session:"]')].filter(row=>!blank(row));
  rows.sort((a,b)=>Number(b.getAttribute('aria-selected')==='true')-Number(a.getAttribute('aria-selected')==='true'));
  paintHeader(root,rows);
  const isHome=root.dataset.phase==='hero';
  if(isHome){if(!draftTab){draftTab=element('button','skirk-session-current-draft');draftTab.type='button';draftTab.textContent=language()?'新会话 · 当前':'New chat · Current';draftTab.setAttribute('aria-current','page');draftTab.addEventListener('click',()=>activate('new',draftTab));}if(stripItems.firstElementChild!==draftTab)stripItems.prepend(draftTab);}else{draftTab?.remove();draftTab=undefined;}
  const wanted=new Set();
  for(const row of rows.slice(0,5)){
   const id=row.getAttribute('data-row-key');wanted.add(id);let button=tabs.get(id);
   if(!button){button=element('button','skirk-session-tab');button.type='button';button.dataset.skirkSession=id;button.addEventListener('click',()=>openSession(id));tabs.set(id,button);}
   const label=sessionLabel(row);button.textContent=label;button.title=label;button.setAttribute('aria-label',label);
   const selected=!isHome&&row.getAttribute('aria-selected')==='true';selected?button.setAttribute('aria-current','page'):button.removeAttribute('aria-current');
   const index=wanted.size-1+(isHome?1:0);if(stripItems.children[index]!==button)stripItems.insertBefore(button,stripItems.children[index]||null);
  }
  for(const[id,button]of tabs)if(!wanted.has(id)){button.remove();tabs.delete(id);}
  strip.hidden=rows.length===0&&!isHome;
 }
 function clear(){
  nativeObserver?.disconnect();nativeObserver=null;if(scheduled){view.cancelAnimationFrame(scheduled);scheduled=0;}
  releaseAnchor();rail?.remove();strip?.remove();drawerHead?.remove();topbar?.remove();rail=actions=footer=brand=strip=stripItems=drawerHead=topbar=topTabs=workspaceButton=newTab=draftTab=undefined;buttons.clear();tabs.clear();headerTabs.clear();
  for(const n of [...marked.keys()])restore(n);sidebar=undefined;open=false;body.removeAttribute('data-skirk-desktop-navigation');body.removeAttribute('data-skirk-drawer');
 }
 function sync(nextCenter){
  if(disposed)return;center=nextCenter||center||doc.querySelector('[data-skirk-center]');
  if(!desktop()||!body.hasAttribute('data-dsh-ekko-skirk')){if(rail||marked.size)clear();return;}
  const nextSidebar=doc.querySelector('[data-slot="sidebar"]');if(!nextSidebar||!center)return;
  if(sidebar&&sidebar!==nextSidebar)clear();sidebar=nextSidebar;
  if(!nativeObserver){nativeObserver=new view.MutationObserver(records=>{
   if(records.some(record=>!record.target.parentElement?.closest('.skirk-session-drawer-heading'))&&!scheduled&&!disposed)scheduled=view.requestAnimationFrame(()=>{scheduled=0;sync(center);});
  });nativeObserver.observe(sidebar,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-current','aria-expanded','aria-selected','aria-label','disabled']});}

  body.dataset.skirkDesktopNavigation='';body.dataset.skirkDrawer=String(open);
  if(!rail?.isConnected)mountRail();if(!drawerHead?.isConnected)mountDrawer();
  const wanted=new Set(['new','menu','account']);
  paintButton('new',native('new'),actions,language()?'新会话':'New chat');paintButton('menu',null,actions,language()?'会话历史':'History');
  for(const target of sidebar.querySelectorAll('button[class*="_panelRow"]')){const label=target.getAttribute('aria-label');if(!label)continue;const key='panel:'+label;wanted.add(key);paintButton(key,target,actions);}
  const account=native('account');if(account)paintButton('account',account,footer,language()?'账号与设置':'Account & settings');
  for(const[key,item]of buttons)if(!wanted.has(key)){item.button.remove();buttons.delete(key);}
  // Ordering follows the host, including newly registered third-party panel entries.
  ['new','menu',...[...sidebar.querySelectorAll('button[class*="_panelRow"]')].map(n=>'panel:'+n.getAttribute('aria-label'))].forEach((key,index)=>{const item=buttons.get(key);if(item&&actions.children[index]!==item.button)actions.insertBefore(item.button,actions.children[index]||null);});
  for(const row of sidebar.querySelectorAll('[data-row-key^="session:"]')){if(blank(row))mark(row,'data-skirk-blank-session');}
  if(anchor){if(!anchor.target.isConnected)releaseAnchor();else{const expanded=anchor.target.getAttribute('aria-expanded')==='true';if(expanded)anchor.wasExpanded=true;else if(anchor.wasExpanded)releaseAnchor();}}
  updateStrip(center.querySelector('[data-slot="main.conversation"] > [data-phase]'));
 }
 const onKey=event=>{if(event.key==='Escape'){releaseAnchor();if(open){event.preventDefault();closeDrawer({focus:true});}}};
 const onClick=event=>{if(!open||!sidebar?.contains(event.target))return;const row=event.target.closest?.('[data-row-key^="session:"]');if(row&&!event.target.closest?.('button,[aria-haspopup]'))closeDrawer();};
 const onPointer=event=>{if(anchor&&!rail?.contains(event.target)&&!topbar?.contains(event.target)&&!event.target.closest?.('[role="menu"],[role="dialog"],[role="listbox"], [data-floating-ui-portal]'))releaseAnchor();if(open&&!sidebar?.contains(event.target)&&!rail?.contains(event.target)&&!strip?.contains(event.target)&&!topbar?.contains(event.target))closeDrawer();};
 const onFocus=event=>{if(anchor?.wasExpanded&&event.target===anchor.target)releaseAnchor({focus:true});};
 doc.addEventListener('keydown',onKey);doc.addEventListener('click',onClick);doc.addEventListener('pointerdown',onPointer);doc.addEventListener('focusin',onFocus);
 return{sync,dispose(){if(disposed)return;disposed=true;clear();doc.removeEventListener('keydown',onKey);doc.removeEventListener('click',onClick);doc.removeEventListener('pointerdown',onPointer);doc.removeEventListener('focusin',onFocus);initialDrawer===null?body.removeAttribute('data-skirk-drawer'):body.setAttribute('data-skirk-drawer',initialDrawer);}};
}
