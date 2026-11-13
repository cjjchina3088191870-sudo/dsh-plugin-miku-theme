import React,{useEffect} from 'react';
import {fillComposer} from '../client.jsx';
import {createSkirkNavigation} from './navigation.mjs';
import {createDockAlignment} from '../dock-alignment.mjs';
import {ASSETS,STYLES} from './generated.mjs';
import {TOKENS as BASE_TOKENS} from '../palette.mjs';
export const STORAGE_KEY='dsh:ekko-skirk:v1';
export const DEFAULTS={enabled:true,artwork:true,companion:true,polaroid:false,opacity:.18,mobileNav:'corner'};
export function normalizeSettings(value){const v=value||{};return {...DEFAULTS,...Object.fromEntries(['enabled','artwork','companion'].map(k=>[k,typeof v[k]==='boolean'?v[k]:true])),mobileNav:v.mobileNav==='rail'?'rail':'corner',opacity:typeof v.opacity==='number'&&Number.isFinite(v.opacity)?Math.max(.04,Math.min(.24,v.opacity)):.18};}
export function readSettings(storage){try{return normalizeSettings(JSON.parse(storage.getItem(STORAGE_KEY)));}catch{return {...DEFAULTS};}}
const TOKENS=Object.fromEntries(Object.entries(BASE_TOKENS).map(([key])=>{
 let c='#161a35';
 if(/inverted|invert|toast-label/.test(key))c='#11162c';
 else if(/label-primary|primary-foreground/.test(key))c='#f0efff';
 else if(/label|menu-icon/.test(key))c='#b3b7db';
 else if(/brand|link|state-business-primary/.test(key))c='#a3aaff';
 else if(/border|separator/.test(key))c='#484b77';
 else if(/interactive|hover|selected|info-fill/.test(key))c='#35355b';
 else if(/code-block|code-segment/.test(key))c='#11162c';
 else if(/bubble/.test(key))c='#494078';
 else if(/input-major|login-input|settings-card-fill|menu|selector/.test(key))c='#20233f';
 else if(/primary-fill|contrast-fill|elevated-fill/.test(key))c='#7668c3';
 return[key,{light:c,dark:c}];
}));
// Current DSH menu materials use this token independently of specific-menu.
// Keep the same dark surface with both light and dark host appearances.
TOKENS['--dsw-menu-surface-fill']={light:'#20233ff5',dark:'#20233ff5'};
const zh=()=>/^zh/i.test(document.documentElement.lang||navigator.language);
const el=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
const art=(key,cls)=>{const n=el('img',cls);n.src=ASSETS[key];n.alt='';n.draggable=false;n.setAttribute('aria-hidden','true');return n;};
function welcome(insert){
 const n=el('section','skirk-welcome'),label=el('div','skirk-home-copy');
 const title=el('h1','skirk-title'),words=zh()?['与星海之外，','共同构建']:['Beyond the stars, ','build together.'];
 const lettered=zh()&&ASSETS['title-lead']&&ASSETS['title-tail'];
 if(lettered){title.classList.add('skirk-lettered-title');title.setAttribute('aria-label',words.join(''));}
 words.forEach((text,i)=>{const part=el('span',i?'skirk-title-tail':'skirk-title-lead');if(lettered)part.append(art(i?'title-tail':'title-lead','skirk-title-art'),el('span','skirk-title-copy',text));else part.textContent=text;title.append(part);});
 const signature=el('div','skirk-signature');signature.append(el('span','skirk-signature-line'),el('span','skirk-eyebrow','SKIRK / VOID STAR'),el('span','skirk-signature-line'));
 label.append(title,signature,el('p','skirk-home-subtitle',zh()?'让灵感，化作下一道星光。':'Let inspiration become the next starlight.'));
 const shortcuts=el('div','skirk-shortcuts');
 const rows=zh()?['探索与理解代码','构建新功能','修复问题与报错']:['Explore the code','Build a new feature','Investigate an issue'];
 const descriptions=zh()?['探索并理解现有代码，给出重构建议','基于需求编写或完善功能，并提供可运行的代码','定位问题与修复错误，解释原因并给出改进方案']:['Explore existing code and propose a refactoring plan','Build or improve a feature with working code','Find and fix errors, explaining the cause and solution'];
 const prompts=zh()?['帮我梳理这个项目的结构和关键实现。','帮我构建一个新功能，先分析需求和实现方案。','排查当前项目的问题，并给出修复方案。']:['Explain the structure and key implementation of this project.','Help me build a feature. Start with requirements and an implementation plan.','Investigate the issue and propose a fix.'];
 rows.forEach((text,i)=>{const b=el('button','skirk-shortcut');b.type='button';b.append(art(['code','wrench','bug'][i],'skirk-shortcut-icon'),el('span','skirk-shortcut-copy',descriptions[i]),el('span','skirk-shortcut-mobile-copy',text));const arrow=art('arrow','skirk-shortcut-arrow');b.append(arrow);b.addEventListener('click',()=>insert(prompts[i]));shortcuts.append(b);});
 n.append(label,shortcuts);return n;
}
export function mountPresentation(ctx){
 const body=document.body,marked=new Map(),owned=new Set(),layout=ctx.get('layout');let frame=0,disposed=false,activeInput,home,center,scene,homeLabel,current=readSettings(localStorage);
 const dock=createDockAlignment(),navigation=createSkirkNavigation({document,layout,assets:ASSETS});
 const mark=(n,key,value='')=>{if(!n)return;if(!marked.has(n))marked.set(n,new Map());if(!marked.get(n).has(key))marked.get(n).set(key,n.getAttribute(key));if(n.getAttribute(key)!==value)n.setAttribute(key,value);};
 const unmark=(n,key)=>{const attrs=marked.get(n);if(!attrs?.has(key))return;const previous=attrs.get(key);previous===null?n.removeAttribute(key):n.setAttribute(key,previous);attrs.delete(key);if(!attrs.size)marked.delete(n);};
 const homeKeys=new Set(['data-skirk-hero','data-skirk-hero-shell','data-skirk-hero-content']);
 function syncHomeMarks(targets){
  for(const[n,attrs]of marked)for(const key of [...attrs.keys()])if(homeKeys.has(key)&&targets.get(key)!==n)unmark(n,key);
  for(const[key,n]of targets)mark(n,key);
 }
 const own=n=>{owned.add(n);return n;};
 const remove=n=>{if(n){owned.delete(n);n.remove();}};
 const style=own(el('style','skirk-styles'));style.textContent=STYLES;document.head.append(style);
 const previous=body.getAttribute('data-dsh-ekko-skirk');body.setAttribute('data-dsh-ekko-skirk','');
 const release=ctx.get('theme').overrideTokens('ekko-skirk',TOKENS);
 function Bridge({inputActions,sessionId}){useEffect(()=>{const v={actions:inputActions,sessionId};activeInput=v;return()=>{if(activeInput===v)activeInput=undefined;};},[inputActions,sessionId]);return null;}
 ctx.slots.inject('conversation.input.left',()=>ctx.slots.register({name:'conversation.input.left',id:'ekko-skirk-draft',order:0},Bridge));
 function sync(){
  if(disposed)return;dock.sync();for(const[n,attrs]of marked)if(!n.isConnected)for(const key of [...attrs.keys()])unmark(n,key);
  const next=document.querySelector('[class*="_centerCol"]');if(!next)return;center=next;body.style.setProperty('--skirk-viewport-height',Math.max(200,(window.visualViewport?.height||innerHeight)-Math.max(0,center.getBoundingClientRect().top))+'px');mark(center,'data-skirk-center');mark(center.closest('[class*="_frame"]'),'data-skirk-frame');
  const root=center.querySelector('[data-slot="main.conversation"] > [data-phase]');
  const isHome=root?.dataset.phase==='hero';body.dataset.skirkPage=isHome?'welcome':'conversation';body.dataset.skirkActive=String(!!root);body.dataset.skirkArtwork=String(current.artwork);body.dataset.skirkCompanion=String(current.companion);
  body.style.setProperty('--skirk-mobile-figure-opacity',String(current.opacity));body.style.setProperty('--skirk-figure-opacity',String(Math.min(1,current.opacity/.18)));
  mark(center.querySelector('[data-slot="conversation.header"]>header'),'data-skirk-header');
  const header=center.querySelector('[data-slot="conversation.header"]>header');
  if(isHome&&header){if(!homeLabel?.isConnected){remove(homeLabel);homeLabel=own(el('div','skirk-header-label'));homeLabel.append(el('span','skirk-header-title',zh()?'磷星环轨':'Stellar Orbit'),el('small','skirk-header-subtitle','DSH'));header.prepend(homeLabel);}}else{remove(homeLabel);homeLabel=undefined;}

  navigation.sync(center);
  if(!scene?.isConnected||scene.parentElement!==center){scene?.remove();scene=own(el('div','skirk-scene'));scene.setAttribute('aria-hidden','true');scene.append(art('seated','skirk-seated'),art('standing','skirk-standing'),art('hero','skirk-hero-figure'));center.prepend(scene);}
  const stack=root?.querySelector('[class*="_composerHero"]'),brand=stack?.querySelector('[data-slot="conversation.hero.brand.mark"]');
  const shell=isHome?brand?.closest('[class*="_root"]'):null,content=shell?.querySelector('[class*="_stack"]');
  syncHomeMarks(new Map(isHome&&content?[['data-skirk-hero',stack],['data-skirk-hero-shell',shell],['data-skirk-hero-content',content]]:[]));
  if(isHome&&brand){
   if(!home?.isConnected){remove(home);home=own(welcome(text=>fillComposer(text,activeInput?.actions)));content?.prepend(home);}
  }else{remove(home);home=undefined;}
  if(isHome){const viewport=center.querySelector('[data-conversation-scroll]'),available=viewport?.clientHeight||Math.max(620,innerHeight-92);body.style.setProperty('--skirk-home-height',available+'px');body.style.setProperty('--skirk-home-composer-height',Math.max(220,Math.round(available*.294))+'px');}
  else{body.style.removeProperty('--skirk-home-height');body.style.removeProperty('--skirk-home-composer-height');}
  const composer=center.querySelector('[data-slot="conversation.composer.bar"] [class*="_root"]');mark(composer,'data-skirk-editor');
 }
 function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(()=>{frame=0;sync();});}
 const observer=new MutationObserver(records=>{if(records.some(r=>r.type==='attributes'?r.target.matches('[data-slot="main.conversation"] > [data-phase], [data-skirk-hero], [data-skirk-hero-shell], [data-skirk-hero-content], [data-skirk-editor]'):[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&!n.classList?.contains('skirk-scene'))))schedule();});observer.observe(body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-phase','class']});
 const onStorage=e=>{if(e.key===STORAGE_KEY){current=readSettings(localStorage);schedule();}};
 window.addEventListener('storage',onStorage);window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);
 sync();
 ctx.effect(()=>()=>{disposed=true;observer.disconnect();navigation.dispose();dock.dispose();if(frame)cancelAnimationFrame(frame);release?.();window.removeEventListener('storage',onStorage);window.removeEventListener('resize',schedule);window.visualViewport?.removeEventListener('resize',schedule);for(const n of owned)n.remove();for(const[n,attrs]of marked)for(const[k,v]of attrs)v===null?n.removeAttribute(k):n.setAttribute(k,v);for(const k of ['skirkPage','skirkActive','skirkArtwork','skirkCompanion','skirkDrawer'])delete body.dataset[k];body.style.removeProperty('--skirk-mobile-figure-opacity');body.style.removeProperty('--skirk-figure-opacity');body.style.removeProperty('--skirk-viewport-height');body.style.removeProperty('--skirk-home-height');body.style.removeProperty('--skirk-home-composer-height');previous===null?body.removeAttribute('data-dsh-ekko-skirk'):body.setAttribute('data-dsh-ekko-skirk',previous);},'skirk: restore native layout and presentation');
}
export function registerSkirk(ctx){const provider={id:'skirk',plugin:{name:'ekko-skirk-presentation',inject:['theme','slots','layout'],apply:mountPresentation},assets:Object.fromEntries(Object.entries(ASSETS).filter(([key])=>key!=='display-font')),storageKey:STORAGE_KEY,defaults:DEFAULTS,readSettings,normalizeSettings};ctx.inject(['ekkoSkins'],child=>child.effect(()=>child.get('ekkoSkins').register(provider),'skirk provider'));}
