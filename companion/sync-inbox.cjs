'use strict';
const fs=require('node:fs'),path=require('node:path');
function createSyncInbox(userData){const file=path.join(userData,'sync-inbox.json');let events=[];try{const value=JSON.parse(fs.readFileSync(file,'utf8'));if(Array.isArray(value))events=value.filter(e=>e&&typeof e.dedupeKey==='string'&&['regular','pve','pvp-season'].includes(e.mode));}catch{}
 function write(next){fs.mkdirSync(userData,{recursive:true});fs.writeFileSync(file+'.tmp',JSON.stringify(next));fs.renameSync(file+'.tmp',file);events=next;}
 return{enqueue:rows=>{const known=new Set(events.map(e=>e.dedupeKey)),next=[...events];for(const e of rows)if(e.dedupeKey&&!known.has(e.dedupeKey)){next.push(e);known.add(e.dedupeKey);}if(next.length!==events.length)write(next);},pending:()=>events.map(e=>({...e})),ack:keys=>{const done=new Set(keys);write(events.filter(e=>!done.has(e.dedupeKey)));}};
}
module.exports={createSyncInbox};
