export const SESSION_ICON_KEY='dsh:ekko-miku:session-icons:v1';
export const SESSION_ICONS=['sidebar-note','sidebar-star','sidebar-picture','sidebar-shirt','sidebar-heart'];

/** Display-only assignments: reordering or renaming a session keeps its motif. */
export function createSessionIcons(storage){
 const entries=new Map();let next=0,dirty=false;
 try{const saved=JSON.parse(storage.getItem(SESSION_ICON_KEY)||'null');
  if(Array.isArray(saved?.entries))for(const item of saved.entries.slice(-2000)){
   if(Array.isArray(item)&&typeof item[0]==='string'&&item[0].length>0&&item[0].length<=256&&Number.isInteger(item[1])&&item[1]>=0&&item[1]<SESSION_ICONS.length)entries.set(item[0],item[1]);
  }
  next=Number.isInteger(saved?.next)&&saved.next>=0?saved.next%SESSION_ICONS.length:entries.size%SESSION_ICONS.length;
 }catch{}
 return{
  get(id){
   if(!entries.has(id)){entries.set(id,next);next=(next+1)%SESSION_ICONS.length;dirty=true;if(entries.size>2000)entries.delete(entries.keys().next().value);}
   return SESSION_ICONS[entries.get(id)];
  },
  flush(){if(!dirty)return;dirty=false;try{storage.setItem(SESSION_ICON_KEY,JSON.stringify({next,entries:[...entries]}));}catch{}}
 };
}
