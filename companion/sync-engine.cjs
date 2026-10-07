'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const {parseScreenshotPose}=require('./core.cjs');
const {inspect}=require('./keybinds.cjs');
function directory(p){try{return typeof p==='string'&&fs.statSync(p).isDirectory();}catch{return false;}}
function logActivity(folder){try{const roots=[folder,...fs.readdirSync(folder,{withFileTypes:true}).filter(e=>e.isDirectory()).slice(-16).map(e=>path.join(folder,e.name))];let newest=0;for(const root of roots)for(const name of fs.readdirSync(root).slice(0,100))if(/application.*\.(log|txt)$/i.test(name))newest=Math.max(newest,fs.statSync(path.join(root,name)).mtimeMs);return newest;}catch{return 0;}}
function steamRoots(){
 const bases=['C:/Program Files (x86)/Steam','C:/Program Files/Steam'];
 if(process.platform==='win32')try{const raw=cp.execFileSync('reg',['query','HKCU\\Software\\Valve\\Steam','/v','SteamPath'],{timeout:2000,windowsHide:true,stdio:['ignore','pipe','ignore']}).toString(),value=/SteamPath\s+REG_SZ\s+(.+)/i.exec(raw)?.[1]?.trim();if(value)bases.unshift(value);}catch{}
 for(const base of [...bases])try{const vdf=fs.readFileSync(path.join(base,'steamapps/libraryfolders.vdf'),'utf8');for(const m of vdf.matchAll(/"path"\s*"([^"\r\n]+)"/g))if(bases.length<16)bases.push(m[1].replace(/\\\\/g,'\\'));}catch{}
 return [...new Set(bases)].flatMap(b=>[path.join(b,'steamapps/common/Escape from Tarkov'),path.join(b,'steamapps/common/Escape from Tarkov/build')]);
}
function discover(settings={},locations={}){
 const home=locations.home||os.homedir(),documents=locations.documents||path.join(home,'Documents'),pictures=locations.pictures||path.join(home,'Pictures');
 const roots=[...(locations.installRoots||['C:/Battlestate Games','C:/Battlestate Games/EFT','C:/Games/EFT','C:/Program Files/Escape from Tarkov','C:/Program Files (x86)/Escape from Tarkov',...steamRoots()])];
 const candidates=(configured,rest)=>[configured,...rest].filter(Boolean).map(p=>path.resolve(p));
 const logCandidates=candidates(settings.logsFolder,roots.flatMap(r=>[path.join(r,'Logs'),path.join(r,'Escape from Tarkov/Logs')]));
 const screenshotCandidates=candidates(settings.screenshotFolder,[path.join(documents,'Escape from Tarkov/Screenshots'),path.join(documents,'Escape From Tarkov/Screenshots'),path.join(pictures,'Escape from Tarkov/Screenshots'),...roots.map(r=>path.join(r,'Screenshots'))]);
 const validLogs=[...new Set(logCandidates)].filter(directory).sort((a,b)=>logActivity(b)-logActivity(a));
 const logsFolder=directory(settings.logsFolder)?path.resolve(settings.logsFolder):validLogs[0]||null;
 const screenshotFolder=[...new Set(screenshotCandidates)].find(directory)||null;
 const controls=inspect(locations.controlsFile);
 return{logsFolder,screenshotFolder,controls:{verified:controls.verified,file:controls.verified?controls.file:null,screenshot:controls.screenshot||[]},searched:{logs:logCandidates.length,screenshots:screenshotCandidates.length}};
}
function latestScreenshot(folder,maps={}){
 if(!directory(folder))return null;
 let candidates=[];try{for(const name of fs.readdirSync(folder)){const position=parseScreenshotPose(name);if(!position)continue;try{const stat=fs.statSync(path.join(folder,name));if(stat.isFile())candidates.push({name,position,at:stat.mtimeMs});}catch{}}}catch{return null;}
 candidates.sort((a,b)=>b.at-a.at);const result=candidates[0];if(!result)return null;
 const stem=' '+result.name.toLowerCase().replace(/[^a-z0-9]+/g,' ')+' ',hints=Object.entries(maps).filter(([id,m])=>[id,m.locale?.en].filter(Boolean).some(n=>stem.includes(' '+String(n).toLowerCase().replace(/[^a-z0-9]+/g,' ')+' ')));
 result.mapHint=hints.length===1?hints[0][0]:null;return result;
}
function createSyncEngine({getSettings,logSync,refresh,locations={},getMaps=()=>({}),inbox}){let pending=null;
 async function perform(mode,{detectMode=true}={}){
  const sources=discover(getSettings(),locations),context=sources.logsFolder?logSync.inspect(sources.logsFolder):{mode:null,files:0,at:null};
  const age=Date.now()-context.at,detectedMode=context.at&&age>=-300000&&age<86400000?context.mode||null:null,gameMode=detectMode?detectedMode||mode:mode,result={at:Date.now(),sources,context,mode:gameMode,detectedMode,events:[],steps:[]};
  result.steps.push({id:'discovery',status:sources.logsFolder||sources.screenshotFolder?'ready':'attention',detail:sources.logsFolder?'Client logs found automatically.':'No client Logs folder found in known locations.'});
  result.steps.push({id:'mode',status:detectedMode?'ready':'attention',detail:detectedMode?`Last logged session: ${detectedMode}.`:'No verified session mode; keeping your selected profile.'});
  if(sources.logsFolder){try{result.events=logSync.importNow({folder:sources.logsFolder,emit:false});result.steps.push({id:'progress',status:result.events.length?'updated':'attention',detail:result.events.length?`${result.events.length} recognized quest/raid events found.`:'No recognized quest or raid changes in the readable logs.'});}catch(e){result.steps.push({id:'progress',status:'error',detail:'Log import failed: '+e.message});}}
  else result.steps.push({id:'progress',status:'unavailable',detail:'Quest/raid sync needs a readable client Logs folder.'});
  if(inbox)result.events=inbox.pending();
  result.steps.push({id:'hideout',status:'unavailable',detail:'Built hideout levels, inventory and station timers are not exposed by the verified local sources. Your tracked progress is preserved.'});
  result.screenshot=latestScreenshot(sources.screenshotFolder,getMaps());
  result.steps.push({id:'position',status:result.screenshot?.mapHint?'ready':'attention',detail:result.screenshot?result.screenshot.mapHint?'Coordinate screenshot with an explicit map label found.':'Coordinate screenshot found, but its map is not identified. No map guessed.':'No coordinate-bearing screenshot found.'});
  try{result.data=await refresh(gameMode);result.steps.push({id:'data',status:'updated',detail:'Quest/hideout requirements, maps, recipes and flea/trader quotes refreshed.'});}catch(e){result.steps.push({id:'data',status:'error',detail:'Refresh failed; existing cache kept. '+e.message});}
  return result;
 }
 return{run:(mode,options={})=>{if(!['regular','pve','pvp-season'].includes(mode))return Promise.reject(Error('Invalid game mode'));if(!pending)pending=perform(mode,options).finally(()=>{pending=null;});return pending;},discover:()=>discover(getSettings(),locations),latestScreenshot};
}
module.exports={discover,latestScreenshot,createSyncEngine};
