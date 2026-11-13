// A finite decorative timeline. It never owns native UI, input or navigation.
const DURATION=2800;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=v=>1-Math.pow(1-clamp(v),3);
const pulse=(t,inAt,peak,outAt)=>t<peak?ease((t-inAt)/(peak-inAt)):1-ease((t-peak)/(outAt-peak));

// Resolve the real painted image rectangle, including mobile object-fit:cover.
export function figureGeometry(figure,scene,view){
 const r=figure.getBoundingClientRect(),s=scene.getBoundingClientRect();
 if(r.width<=0||r.height<=0||!figure.naturalWidth||!figure.naturalHeight)return null;
 const css=view.getComputedStyle(figure),cover=css.objectFit==='cover';
 const scale=(cover?Math.max:Math.min)(r.width/figure.naturalWidth,r.height/figure.naturalHeight);
 const w=figure.naturalWidth*scale,h=figure.naturalHeight*scale;
 const parts=css.objectPosition.split(' '),factor=(part,fallback)=>part==='left'||part==='top'?0:part==='right'||part==='bottom'?1:part==='center'?.5:part?.endsWith('%')?parseFloat(part)/100:fallback;
 const left=r.left-s.left+(r.width-w)*factor(parts[0],.5),top=r.top-s.top+(r.height-h)*factor(parts[1],.5);
 const phone=view.innerWidth<=700;
 return{width:s.width,height:s.height,phone,
  handX:clamp(left+w*.835,26,s.width-32),handY:clamp(top+h*.245,28,s.height-32),
  chestX:left+w*.49,chestY:top+h*.38,unit:Math.min(phone?100:210,w*.31)};
}

export function createSkirkEntrance({document,window:view,textureUrl}){
 let scene,figure,home=false,enabled=false,disposed=false,raf=0,canvas,animation,serial=0,sequence=0;
 const reduced=view.matchMedia?.('(prefers-reduced-motion: reduce)');
 const texture=new view.Image();texture.src=textureUrl;
 function stop(reason){
  if(scene&&canvas)scene.dataset.skirkEntranceEnd=String(reason);
  serial++;if(raf)view.cancelAnimationFrame(raf);raf=0;animation?.cancel();animation=undefined;
  canvas?.remove();canvas=undefined;if(scene){delete scene.dataset.skirkEntrance;delete scene.dataset.skirkEntranceStage;}
 }
 function render(ctx,g,ms){
  const t=ms/1000,{width:w,height:h,handX:x,handY:y,unit:u,phone}=g;
  ctx.clearRect(0,0,w,h);ctx.save();
  // Soft local falloff leaves the right-hand workspace usable and legible.
  const shade=ctx.createRadialGradient(g.chestX,g.chestY,0,g.chestX,g.chestY,u*3.5);
  shade.addColorStop(0,'rgba(5,4,28,'+(.3*pulse(t,0,.55,1.65))+')');shade.addColorStop(1,'rgba(5,4,28,0)');
  ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);
  const charge=clamp(t/1.1),release=ease((t-1.08)/.18),fade=1-ease((t-1.35)/1.3);
  const aura=ctx.createRadialGradient(x,y,0,x,y,u*1.25);
  aura.addColorStop(0,'rgba(197,180,255,'+(.2*pulse(t,.05,1.1,2.25))+')');aura.addColorStop(.3,'rgba(113,88,255,'+(.18*pulse(t,.05,1.1,2.25))+')');aura.addColorStop(1,'rgba(58,80,225,0)');
  ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
  // A single generated crystalline singularity texture supplies the core.
  const ringSize=u*(.18+ease(charge)*.87+release*.55);
  ctx.save();ctx.translate(x,y);ctx.rotate(-.65+t*.7);ctx.globalAlpha=clamp(t/.22)*fade*.92;
  ctx.drawImage(texture,-ringSize/2,-ringSize/2,ringSize,ringSize);ctx.restore();
  // Strands of starlight converge, then break into angular crystal fragments.
  const count=phone?25:62;
  for(let i=0;i<count;i++){
   const a=i*2.399963,seed=(Math.sin(i*17.7)*.5+.5),delay=seed*.18;
   let px,py,alpha,size,angle;
   if(t<1.12){
    const q=clamp((t-delay)/1.05),radius=u*(1.9-1.76*ease(q));
    const theta=a+t*(1.05+seed*.45);px=x+Math.cos(theta)*radius;py=y+Math.sin(theta)*radius*.68;
    alpha=Math.sin(q*Math.PI)*.68;size=1.1+seed*2.4;angle=theta;
    ctx.strokeStyle='rgba(155,170,255,'+(alpha*.32)+')';ctx.lineWidth=.7;
    ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+Math.cos(theta+.25)*u*.09,py+Math.sin(theta+.25)*u*.06);ctx.stroke();
   }else{
    const q=clamp((t-1.1-delay)/1.5),radius=u*(.12+ease(q)*(1.8+seed));
    px=x+Math.cos(a)*radius;py=y+Math.sin(a)*radius*.7+q*q*u*.28;
    alpha=(1-q)*(1-q)*.82;size=(2+seed*6)*(1-q*.4);angle=a+q*3;
   }
   if(alpha<=0)continue;
   ctx.save();ctx.translate(px,py);ctx.rotate(angle);ctx.globalAlpha=alpha;
   ctx.fillStyle=i%3===0?'#dcfaff':i%3===1?'#a69cff':'#7379e8';
   ctx.beginPath();ctx.moveTo(-size*1.8,0);ctx.lineTo(0,-size*.48);ctx.lineTo(size*.75,0);ctx.lineTo(0,size*.55);ctx.closePath();ctx.fill();
   if(size>3){ctx.strokeStyle='#c5edff';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(-size*1.8,0);ctx.lineTo(size*.75,0);ctx.stroke();}ctx.restore();
  }
  // Three brief cuts, with a narrow core rather than a full-screen flash.
  for(let i=0;i<3;i++){
   const start=1.08+i*.085,q=clamp((t-start)/.2),alpha=pulse(t,start,start+.08,start+.48);
   if(alpha<=0)continue;
   const angle=[-.61,.53,-.12][i],length=u*[3.1,2.3,2.05][i]*ease(q);
   ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.globalAlpha=alpha;
   const beam=ctx.createLinearGradient(-length,0,length,0);
   beam.addColorStop(0,'#7e74ff00');beam.addColorStop(.38,'#8a97ffc0');beam.addColorStop(.5,'#e0faff');beam.addColorStop(.62,'#89cfffaa');beam.addColorStop(1,'#7e74ff00');
   ctx.fillStyle=beam;ctx.shadowColor='#8e7cff';ctx.shadowBlur=phone?6:12;
   ctx.beginPath();ctx.moveTo(-length,0);ctx.lineTo(0,-(i?1.5:3.5));ctx.lineTo(length,0);ctx.lineTo(0,i?1.5:3.5);ctx.closePath();ctx.fill();ctx.restore();
  }
  const wave=clamp((t-1.2)/.7);
  if(wave>0&&wave<1){ctx.save();ctx.translate(x,y);ctx.scale(1,.45);ctx.strokeStyle='rgba(156,196,255,'+((1-wave)*.45)+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(0,0,u*(.2+wave*2.2),0,Math.PI*2);ctx.stroke();ctx.restore();}
  ctx.restore();
 }
 function start(ticket){
  if(disposed||ticket!==serial||!home||!enabled||reduced?.matches||document.hidden)return;
  const g=figureGeometry(figure,scene,view);if(!g)return;
  const node=document.createElement('canvas');node.className='skirk-entrance-fx';node.setAttribute('aria-hidden','true');
  const ratio=Math.min(view.devicePixelRatio||1,g.phone?1.5:2);
  node.width=Math.round(g.width*ratio);node.height=Math.round(g.height*ratio);
  const ctx=node.getContext('2d');if(!ctx)return;ctx.scale(ratio,ratio);canvas=node;scene.append(node);
  scene.dataset.skirkEntrance='playing';scene.dataset.skirkEntranceSequence=String(++sequence);
  // The existing image remains the final frame: cancel restores its exact CSS.
  animation=figure.animate?.([
   {transform:'translate3d(-12px,4px,0) scale(1.025)',filter:'brightness(.8) saturate(.9)'},
   {transform:'translate3d(0,0,0) scale(1.008)',filter:'brightness(1.06) saturate(1.08)',offset:.38},
   {transform:'translate3d(2px,-1px,0) scale(1.012)',filter:'brightness(1.1) saturate(1.08)',offset:.45},
   {transform:'none',filter:'none'}
  ],{duration:DURATION,easing:'cubic-bezier(.2,.6,.3,1)'});
  const began=view.performance.now();scene.dataset.skirkEntranceStart=String(began);
  function tick(now){
   if(ticket!==serial||disposed)return;
   const elapsed=now-began;
   if(elapsed>=DURATION){stop('complete');return;}
   const stage=elapsed<1080?'charge':elapsed<1600?'cleave':'settle';
   if(scene.dataset.skirkEntranceStage!==stage)scene.dataset.skirkEntranceStage=stage;
   render(ctx,g,elapsed);raf=view.requestAnimationFrame(tick);
  }
  raf=view.requestAnimationFrame(tick);
 }
 function play(){
  stop();if(!home||!enabled||reduced?.matches||document.hidden||disposed)return;
  const ticket=serial;
  // Decode before drawing; stale completions cannot resurrect an abandoned page.
  Promise.all([texture.decode?.()||Promise.resolve(),figure.decode?.()||Promise.resolve()]).then(()=>start(ticket)).catch(()=>{});
 }
 const visibility=()=>{if(document.hidden)stop('hidden');};
 const resize=()=>stop('resize'),motion=()=>{if(reduced?.matches)stop('reduced-motion');};
 document.addEventListener('visibilitychange',visibility);view.addEventListener('resize',resize);reduced?.addEventListener?.('change',motion);
 return{
  update(next){
   const changed=scene!==next.scene||figure!==next.figure;
   const enter=next.home&&next.enabled&&(!home||!enabled||changed);
   if(changed||!next.home||!next.enabled)stop('page-or-preference');
   scene=next.scene;figure=next.figure;home=next.home;enabled=next.enabled;
   if(enter&&scene&&figure)play();
  },
  replay(){if(home&&enabled)play();},
  dispose(){disposed=true;stop();document.removeEventListener('visibilitychange',visibility);view.removeEventListener('resize',resize);reduced?.removeEventListener?.('change',motion);}
 };
}
