const fs = require('node:fs'), path=require('node:path');
const root=path.resolve(__dirname,'../reference'), dest=path.resolve(__dirname,'../data');
fs.mkdirSync(dest,{recursive:true});
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,''));
const names=read('Data/items.en.json');
const hideout=read('Data/hideout.json');
const data={meta:{...read('Data/data_snapshot.json'),fresh:false}, tasks:read('Data/current_tasks.json'),items:Object.entries(names).map(([id,i])=>({id,...i})),
  hideout:hideout.stations.map(s=>({id:String(s.id),name:s.locales.en,description:s.function,levels:hideout.modules.filter(m=>m.stationId===s.id).map(m=>({level:m.level,requirements:m.require.map(r=>({...r,name:r.type==='item'?(names[r.name]?.name||r.name):String(r.name),itemId:r.type==='item'?r.name:null}))}))})),
  maps:read('Config/maps.json'),levels:read('Config/map_levels.json'),questMarkers:read('Config/tarkov_quest_markers.json'),extracts:read('Config/tarkov_extracts_raw.json').data.maps};
fs.writeFileSync(path.join(dest,'reference.json'),JSON.stringify(data));
console.log(`Prepared ${data.tasks.length} tasks, ${data.items.length} items, ${data.hideout.length} hideout stations and ${Object.keys(data.maps).length} maps. Reference cache: ${data.meta.updatedUtc}`);
