const basename = name => String(name).split(/[\\/]/).pop();
function parseScreenshot(name) {
  if(!/\.(?:png|jpe?g)$/i.test(basename(name)))return null;
  // EFT's own screenshot filename includes the world position, when supported.
  const match = basename(name).match(/_(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)_/)
    || basename(name).match(/(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)\s*\)?\.(?:png|jpe?g)$/i);
  if (!match) return null;
  const [x,y,z] = match.slice(1).map(v => Number(v.replace(',', '.')));
  return [x,y,z].every(Number.isFinite) ? {x,y,z} : null;
}
function parseScreenshotPose(name){
  const position=parseScreenshot(name);if(!position)return null;
  const part=basename(name).match(/_-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?_(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)_/);
  if(!part)return position;
  const q=part.slice(1).map(Number),length=Math.hypot(...q);
  if(length<.95||length>1.05)return position;
  const [x,y,z,w]=q.map(n=>n/length),forward={x:2*(x*z+w*y),z:1-2*(x*x+y*y)};
  if(Math.hypot(forward.x,forward.z)>.05)position.forward=forward;
  return position;
}
function projectedHeading(position,config){
  if(!position?.forward)return null;
  const a=worldToMap(position,config),b=worldToMap({...position,x:position.x+position.forward.x,z:position.z+position.forward.z},config);
  return Math.atan2(b.ny-a.ny,b.nx-a.nx)*180/Math.PI+90;
}
function worldToMap(position, config) {
  const s=config.svg, [[x1,z1],[x2,z2]]=s.svgBounds||s.bounds;
  let nx,ny;
  if(s.transform){const angle=(s.coordinateRotation||0)*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle),[sx,mx,sy,my]=s.transform;
    const project=(x,z)=>({x:sx*(x*cos-z*sin)+mx,y:-sy*(x*sin+z*cos)+my});const point=project(position.x,position.z);
    if(s.mapPixelSize){const scale=2**(s.nativeZoom||4);nx=point.x*scale/s.mapPixelSize;ny=point.y*scale/s.mapPixelSize;}
    else{const corners=[project(x1,z1),project(x2,z1),project(x1,z2),project(x2,z2)],minX=Math.min(...corners.map(p=>p.x)),maxX=Math.max(...corners.map(p=>p.x)),minY=Math.min(...corners.map(p=>p.y)),maxY=Math.max(...corners.map(p=>p.y));nx=(point.x-minX)/(maxX-minX);ny=(point.y-minY)/(maxY-minY);}
  }else{nx=(position.x-Math.min(x1,x2))/Math.abs(x2-x1);ny=(position.z-Math.min(z1,z2))/Math.abs(z2-z1);if(s.coordinateRotation===90)[nx,ny]=[1-ny,1-nx];else if(s.coordinateRotation===180)nx=1-nx;else if(s.coordinateRotation===270)[nx,ny]=[1-ny,nx];}
  return {nx,ny,inBounds:nx>=0&&nx<=1&&ny>=0&&ny<=1};
}
function matchItems(text, items) {
  const clean = s => String(s).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const lines = text.split('\n').map(clean).filter(s=>s.length>3);
  return items.map(item=>{const name=clean(item.name);const short=clean(item.shortName); let score=0;
    for(const line of lines) { if(line.includes(name)) score=Math.max(score,1); else if(short.length>4&&line.includes(short)) score=Math.max(score,.85); else {const words=name.split(' ').filter(s=>s.length>2);const hit=words.filter(s=>line.split(' ').includes(s)).length; if(words.length>1) score=Math.max(score,hit/words.length*.75);}}
    return {item,score}; }).filter(x=>x.score>=.55).sort((a,b)=>b.score-a.score).slice(0,8);
}
function cultistTotal(slots) {return slots.reduce((n,s)=>n+Math.max(0,Number(s.value)||0),0);}
if(typeof module!=='undefined')module.exports = {parseScreenshot,parseScreenshotPose,projectedHeading,worldToMap,matchItems,cultistTotal};
else window.TarkovCore={parseScreenshot,parseScreenshotPose,projectedHeading,worldToMap,matchItems,cultistTotal};
