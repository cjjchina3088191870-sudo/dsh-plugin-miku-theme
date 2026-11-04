/** Align Better Sidebar's blank-session dock entry with the native header.
 * Its collision scan treats a themed center column under 300px as an obstacle.
 * Keep the native button/action; only own and restore the positioning override.
 */
export function createDockAlignment() {
 let target, previous;
 const properties=['--ekko-dock-left','--ekko-dock-top'];
 function restore() {
  if(!target)return;
  for(const [name,value,priority] of previous.styles)value?target.style.setProperty(name,value,priority):target.style.removeProperty(name);
  if(previous.attr===null)target.removeAttribute('data-ekko-theme-dock');else target.setAttribute('data-ekko-theme-dock',previous.attr);
  target=previous=undefined;
 }
 function sync() {
  const fallback=document.querySelector('[data-dsh-dock-fallback]');
  const anchor=[...document.querySelectorAll('[data-sidebar-right-expand]')].find(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none';});
  if(target!==fallback||!anchor)restore();
  if(!fallback||!anchor)return;
  const rect=anchor.getBoundingClientRect(),button=fallback.querySelector('[data-dsh-bottom-toggle]');
  if(!button)return;
  if(!target){target=fallback;previous={attr:target.getAttribute('data-ekko-theme-dock'),styles:properties.map(name=>[name,target.style.getPropertyValue(name),target.style.getPropertyPriority(name)])};target.setAttribute('data-ekko-theme-dock','');}
  const box=button.getBoundingClientRect();
  const values=[rect.left-8-box.width,rect.top+(rect.height-box.height)/2];
  properties.forEach((name,i)=>{const value=values[i]+'px';if(target.style.getPropertyValue(name)!==value)target.style.setProperty(name,value);});
 }
 return {sync,dispose:restore};
}
