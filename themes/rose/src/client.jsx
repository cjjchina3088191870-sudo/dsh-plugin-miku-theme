import {acquireClient} from '../../../integrated/src/client-entry.mjs';
import React, { useEffect } from 'react';
import { TOKENS } from './palette.mjs';
import { normalizeSettings, readSettings, STORAGE_KEY } from './preferences.mjs';
import { ASSETS, STYLES } from './generated.mjs';
import { createSessionIcons } from './session-icons.mjs';
import { createDockAlignment } from './dock-alignment.mjs';

const PRESENTATION_INJECT = ['theme','slots','layout'];
const ATTR='data-dsh-ekko-rose';
const copy={
 zh:{title:'我们该构建什么？',subtitle:'与玫瑰女王一起，用灵感创造无限可能。',name:'玫瑰女王专属定制皮肤',edition:'DeepSeek Harness · 玫瑰限定版',
  cards:['探索并理解代码','构建新功能、\n应用或工具','审查代码并提出\n修改建议','修复问题和失败'],
  prompts:['帮我理解这个项目的结构和关键实现。','一起构建一个新功能，先梳理需求和实现方案。','请审查当前代码，指出具体问题和改进建议。','帮我排查当前项目的问题，并给出修复方案。'],
  settings:'玫瑰女王主题',enabled:'启用玫瑰主题',artwork:'花房与人物装饰',companion:'聊天人物背景',polaroid:'右下角拍立得',photo:'照片',hidePhoto:'收起拍立得',opacity:'聊天背景浓度',reset:'恢复默认',hint:'跟随 DSH 的浅色 / 深色模式；仅调整外观。'},
 en:{title:'What shall we build?',subtitle:'A little inspiration. A world of possibilities.',name:'Rose Queen · Rose Atelier',edition:'DeepSeek Harness · Rose edition',
  cards:['Explore and understand code','Build a feature,\napp or tool','Review code and\nsuggest improvements','Investigate and fix an issue'],
  prompts:['Help me understand the structure and key implementation of this project.','Let’s build a feature. Start with the requirements and approach.','Review this code and suggest concrete improvements.','Investigate this project’s issue and propose a fix.'],
  settings:'Rose Queen theme',enabled:'Enable Rose theme',artwork:'Atelier and portrait artwork',companion:'Chat companion artwork',polaroid:'Corner polaroid',photo:'Photo',hidePhoto:'Hide polaroid',opacity:'Chat companion opacity',reset:'Restore defaults',hint:'Follows DSH light / dark appearance; presentation only.'}
};
function language(){return /^zh/i.test(document.documentElement.lang||navigator.language)?'zh':'en';}
function img(key,className=''){const el=document.createElement('img');el.src=ASSETS[key];el.alt='';el.className=className;el.draggable=false;el.setAttribute('aria-hidden','true');return el;}
function node(tag,className,text){const el=document.createElement(tag);el.className=className;if(text)el.textContent=text;return el;}

/** Use DSH's public, revision-guarded input actions, preserving native chips and draft state. */
export function fillComposer(text,inputActions){
 const editor=document.querySelector('[data-slot="conversation.composer"] [contenteditable="true"]');
 if(!editor||!inputActions){document.querySelector('[data-slot="conversation.hero.workspace"] button')?.click();return false;}
 const captured=inputActions.captureInsertion();
 const span={...captured,start:captured.end,end:captured.end};
 const inserted=(editor.textContent.trim()?'\n\n':'')+text;
 if(!inputActions.insertText(inserted,span))return false;
 inputActions.persistDraft();requestAnimationFrame(()=>editor.isConnected&&editor.focus());return true;
}
function createWelcome(insert){
 const lang=language(),c=copy[lang],root=node('section','rose-welcome');root.lang=lang;root.setAttribute('aria-label',c.name);
 const brand=node('header','rose-welcome-brand'),labels=node('div','rose-welcome-signature');labels.append(node('strong','',c.name),node('span','',c.edition));brand.append(img('rose','rose-mark'),labels);
 const stage=node('div','rose-stage'),figureLayer=node('div','rose-figure-layer');figureLayer.append(img('figure','rose-welcome-figure'));stage.append(img('hero-backdrop','rose-welcome-backdrop'),figureLayer);
 const heading=node('div','rose-welcome-heading');heading.append(node('h1','',c.title),node('p','',c.subtitle));stage.append(heading);
 const cards=node('div','rose-prompt-cards');['code','puzzle','clipboard','wrench'].forEach((key,i)=>{
  const button=node('button','rose-prompt-card');button.type='button';const circle=node('span','rose-card-medallion'+(i===0?' rose-card-medallion-code':''));circle.append(img(key,'rose-card-icon'));
  button.append(circle,node('span','rose-card-copy',c.cards[i]),img('heart','rose-card-heart'));button.addEventListener('click',()=>insert(c.prompts[i]));cards.append(button);
 });stage.append(cards);root.append(brand,stage);return root;
}
function createPolaroid(hide){
 const c=copy[language()],photo=node('aside','rose-polaroid');photo.setAttribute('aria-label',c.polaroid);photo.append(img('photo','rose-polaroid-art'));
 const close=node('button','rose-polaroid-close');close.type='button';close.setAttribute('aria-label',c.hidePhoto);close.append(img('close'));close.addEventListener('click',hide);photo.append(close);return photo;
}
function mountPresentation(ctx){
 const body=document.body,previousAttr=body.getAttribute(ATTR),listeners=new Set(),owned=new Set(),marked=new Map(),sizeTargets=new Set(),layoutStyles=new Map();
 const sessionIcons=createSessionIcons(localStorage),dockAlignment=createDockAlignment();
 const readCurrent=()=>({...readSettings(localStorage),enabled:true});
 let current=readCurrent(),disposeTokens,disposed=false,frame=0,welcome,companion,photo,photoSwitch,activeInput;
 const mark=(el,name)=>{if(!el)return;if(!marked.has(el))marked.set(el,new Map());const attrs=marked.get(el);if(!attrs.has(name))attrs.set(name,el.getAttribute(name));if(!el.hasAttribute(name))el.setAttribute(name,'');};
 const restoreMarks=()=>{for(const [el,attrs]of marked)for(const [name,value]of attrs)value===null?el.removeAttribute(name):el.setAttribute(name,value);marked.clear();};
 const sizingObserver=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
 function clearSizing(){sizingObserver?.disconnect();sizeTargets.clear();for(const [el,values]of layoutStyles){for(const [name,value]of Object.entries(values))value?el.style.setProperty(name,value):el.style.removeProperty(name);const previous=marked.get(el)?.get('data-rose-stage-compact');previous==null?el.removeAttribute('data-rose-stage-compact'):el.setAttribute('data-rose-stage-compact',previous);}layoutStyles.clear();}
 function fitStage(seat,editorRoot){
  const stage=welcome?.querySelector('.rose-stage'),cards=welcome?.querySelector('.rose-prompt-cards'),viewport=seat?.closest('[class*="_scrollBody"]');
  if(!stage||!viewport)return;
  const shell=seat.querySelector('[data-rose-welcome-shell]'),row=seat.querySelector('[class*="_heroWorkspaceRow"]');
  for(const el of [seat,viewport,editorRoot,stage,cards,shell])if(el&&!sizeTargets.has(el)){sizeTargets.add(el);sizingObserver?.observe(el);}
  const phone=(seat.closest('[data-rose-center]')?.clientWidth||viewport.clientWidth)<=640;
  const visual=window.visualViewport,top=viewport.getBoundingClientRect().top;
  const height=phone&&visual?Math.min(viewport.clientHeight,Math.max(0,visual.height+visual.offsetTop-top)):viewport.clientHeight;
  if(height<=0)return;
  // Sum intrinsic rows, excluding the flexible margin above the footer.
  // Measuring the stretched seat itself would count free space as content.
  const flow=[shell,row,editorRoot].filter(el=>el&&getComputedStyle(el).display!=='none');
  const seatStyle=getComputedStyle(seat),stageRect=stage.getBoundingClientRect();
  const overhead=flow.reduce((sum,el)=>sum+el.getBoundingClientRect().height,0)-stageRect.height
   +(parseFloat(seatStyle.paddingTop)||0)+(parseFloat(seatStyle.paddingBottom)||0)
   +(parseFloat(seatStyle.rowGap)||0)*Math.max(0,flow.length-1);
  const figure=welcome.querySelector('.rose-welcome-figure'),ratio=figure?.naturalWidth?figure.naturalHeight/figure.naturalWidth:415/420;
  const portraitLimit=stageRect.width*.43*ratio+(cards?.getBoundingClientRect().height||140)-32;
  const limit=Math.max(phone?180:220,Math.floor(phone?height-overhead-4:Math.min(height-overhead-4,portraitLimit)))+'px';
  mark(seat,'data-rose-stage-compact');seat.toggleAttribute('data-rose-stage-compact',!phone&&parseFloat(limit)<420);
  if(!layoutStyles.has(seat))layoutStyles.set(seat,Object.fromEntries(['--rose-stage-limit','--rose-view-height'].map(name=>[name,seat.style.getPropertyValue(name)])));
  for(const [name,value]of Object.entries({'--rose-stage-limit':limit,'--rose-view-height':height+'px'}))if(seat.style.getPropertyValue(name)!==value)seat.style.setProperty(name,value);
 }
 const remove=el=>{if(el){owned.delete(el);el.remove();}};
 const style=node('style','rose-theme-styles');style.dataset.dshRoseOwned='';style.textContent=STYLES;document.head.append(style);owned.add(style);
 const theme=ctx.get('theme');
 function render(){
  if(!current.enabled){disposeTokens?.();disposeTokens=undefined;}
  if(current.enabled){body.setAttribute(ATTR,'');body.dataset.roseArtwork=String(current.artwork);body.dataset.roseCompanion=String(current.companion);body.dataset.rosePolaroid=String(current.artwork&&current.polaroid);body.style.setProperty('--rose-companion-opacity',String(current.opacity));disposeTokens||=theme.overrideTokens('dsh-plugin-rose-theme',TOKENS);}
  else{previousAttr===null?body.removeAttribute(ATTR):body.setAttribute(ATTR,previousAttr);for(const key of ['roseArtwork','roseCompanion','rosePolaroid'])delete body.dataset[key];body.style.removeProperty('--rose-companion-opacity');}
  schedule();
 }
 function update(value){current=normalizeSettings({...current,...value});try{localStorage.setItem(STORAGE_KEY,JSON.stringify(current));}catch{}render();for(const fn of listeners)fn();window.dispatchEvent(new CustomEvent('dsh:ekko-skin-preferences',{detail:{id:'rose'}}));}
 function DraftBridge({inputActions,sessionId}){
  useEffect(()=>{const lease={actions:inputActions,sessionId};activeInput=lease;return()=>{if(activeInput===lease)activeInput=undefined;};},[inputActions,sessionId]);return null;
 }
 ctx.slots.inject('conversation.input.left',()=>ctx.slots.register({name:'conversation.input.left',id:'ekko-rose-draft',order:0},DraftBridge));
 function sync(){
  if(disposed)return;dockAlignment.sync();for(const el of marked.keys())if(!el.isConnected)marked.delete(el);
  for(const el of sizeTargets)if(!el.isConnected){sizingObserver?.unobserve(el);sizeTargets.delete(el);layoutStyles.delete(el);}
  const center=document.querySelector('[class*="_centerCol"]'),brand=document.querySelector('[data-slot="conversation.hero.brand.mark"]');
  const stack=brand?.closest('[class*="_root"]')?.querySelector('[class*="_stack"]'),isWelcome=!!stack;
  if(current.enabled){body.dataset.rosePage=isWelcome?'welcome':'conversation';mark(center,'data-rose-center');mark(center?.querySelector('header[class*="_header"]'),'data-rose-header-frame');mark(document.querySelector('[data-slot="sidebar"]')?.firstElementChild,'data-rose-sidebar-frame');}else{delete body.dataset.rosePage;restoreMarks();}
  if(current.enabled){
   for(const row of document.querySelectorAll('[data-slot="sidebar"] [data-row-key^="session:"]')){
    const id=row.getAttribute('data-row-key').slice(8);if(!id)continue;
    mark(row,'data-rose-session-icon');const icon=sessionIcons.get(id);
    if(row.getAttribute('data-rose-session-icon')!==icon)row.setAttribute('data-rose-session-icon',icon);
   }
   sessionIcons.flush();
  }
  if(current.enabled&&stack){
   const seat=stack.closest('[class*="_composerHero"]');mark(seat,'data-rose-hero-seat');mark(stack,'data-rose-welcome-stack');mark(stack.parentElement,'data-rose-welcome-shell');
   mark(center?.querySelector('[class*="_headerBlank"]'),'data-rose-welcome-header');
   if(!welcome||!welcome.isConnected||welcome.lang!==language()){remove(welcome);welcome=createWelcome(text=>fillComposer(text,activeInput?.actions));owned.add(welcome);stack.prepend(welcome);}
   const bar=seat?.querySelector('[data-slot="conversation.composer.bar"]'),editorRoot=bar?.querySelector('[class*="_root"]');mark(editorRoot,'data-rose-editor-root');
   if(current.artwork&&current.polaroid&&seat){if(!photo||!photo.isConnected){remove(photo);photo=createPolaroid(()=>update({polaroid:false}));owned.add(photo);seat.append(photo);}}else{remove(photo);photo=undefined;}
   const row=seat?.querySelector('[class*="_heroWorkspaceRow"]');
   if(row){if(!photoSwitch||!photoSwitch.isConnected){remove(photoSwitch);photoSwitch=node('button','rose-photo-switch');photoSwitch.type='button';photoSwitch.append(img('photo-icon'),node('span','',copy[language()].photo));photoSwitch.addEventListener('click',()=>update({polaroid:!current.polaroid}));owned.add(photoSwitch);row.append(photoSwitch);}photoSwitch.setAttribute('aria-pressed',String(current.polaroid));}
   fitStage(seat,editorRoot);
  }else{clearSizing();remove(welcome);welcome=undefined;remove(photo);photo=undefined;remove(photoSwitch);photoSwitch=undefined;}
  if(current.enabled&&center&&!isWelcome&&current.artwork&&current.companion&&document.querySelector('[data-slot="main.conversation"]')){if(!companion||!companion.isConnected){remove(companion);companion=img('chat','rose-chat-figure');owned.add(companion);center.prepend(companion);}}else{remove(companion);companion=undefined;}
 }
 function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(()=>{frame=0;sync();});}
 const observer=new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&!n.classList?.contains('rose-chat-figure')&&!n.classList?.contains('rose-welcome'))))schedule();});observer.observe(body,{childList:true,subtree:true});
 const localeObserver=new MutationObserver(()=>{current={...current};for(const fn of listeners)fn();schedule();});localeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 const storage=e=>{if(e.key===STORAGE_KEY){current=readCurrent();render();for(const fn of listeners)fn();}};window.addEventListener('storage',storage);window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);window.visualViewport?.addEventListener('scroll',schedule);render();sync();
 ctx.effect(()=>()=>{disposed=true;dockAlignment.dispose();observer.disconnect();localeObserver.disconnect();clearSizing();if(frame)cancelAnimationFrame(frame);window.removeEventListener('storage',storage);window.removeEventListener('resize',schedule);window.visualViewport?.removeEventListener('resize',schedule);window.visualViewport?.removeEventListener('scroll',schedule);disposeTokens?.();restoreMarks();for(const el of owned)el.remove();listeners.clear();previousAttr===null?body.removeAttribute(ATTR):body.setAttribute(ATTR,previousAttr);for(const key of ['rosePage','roseArtwork','roseCompanion','rosePolaroid'])delete body.dataset[key];body.style.removeProperty('--rose-companion-opacity');},'ekko-rose: restore presentation');
}

export const inject=['slots','theme','layout'];
export function apply(ctx,config={}){
 acquireClient(ctx);
 const provider={id:'rose',priority:config.bundled?10:0,plugin:{name:'ekko-rose-presentation',inject:PRESENTATION_INJECT,apply:mountPresentation},assets:ASSETS,storageKey:STORAGE_KEY,readSettings,normalizeSettings};
 ctx.inject(['ekkoSkins'],child=>child.effect(()=>child.get('ekkoSkins').register(provider),'ekko-rose: provider registration'));
}
