// Decorative only: the native composer owns its layout and hit targets.
export function createRunnerParade(document, assets) {
 const lane=document.createElement('div');
 lane.className='skirk-runner-lane';lane.setAttribute('aria-hidden','true');
 const train=document.createElement('div');train.className='skirk-runner-train';
 // Moving right makes the rightmost character the leader.
 for(const name of ['paimon','skirk','aether']){
  const sprite=document.createElement('span');sprite.className='skirk-runner skirk-runner-'+name;
  sprite.style.backgroundImage=`url("${assets['runner-'+name]}")`;train.append(sprite);
 }
 lane.append(train);return lane;
}

export function positionRunnerParade(lane, home, card) {
 if(!card){lane.dataset.ready='false';return;}
 const h=home.getBoundingClientRect(),c=card.getBoundingClientRect();
 // Use the existing gap; never reserve space or change composer dimensions.
 const gap=h.bottom-c.bottom,available=gap-20;
 if(available<38||c.width<180){lane.dataset.ready='false';return;}
 const height=Math.min(104,available),size=Math.min(100,height);
 const values={left:c.left-h.left,top:c.bottom-h.top+10+(available-height)/2,width:c.width,height};
 for(const[key,value]of Object.entries(values))lane.style[key]=Math.round(value)+'px';
 lane.style.setProperty('--skirk-lane-width',Math.round(c.width)+'px');
 lane.style.setProperty('--skirk-parade-size',Math.floor(size)+'px');
 // Similar travel speed on a narrow phone and a large desktop.
 lane.style.setProperty('--skirk-parade-duration',Math.max(10,Math.min(24,(c.width+size*3)/62))+'s');
 lane.dataset.ready='true';
}
