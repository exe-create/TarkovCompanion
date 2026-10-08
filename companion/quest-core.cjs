(function(root){
 const stateNames={0:'locked',1:'available',2:'active',3:'ready',4:'done',5:'failed',6:'failed',locked:'locked',notstarted:'locked',availableforstart:'available',started:'active',accepted:'active',availableforfinish:'ready',success:'done',completed:'done',complete:'done',fail:'failed',failed:'failed',failrestartable:'failed'};
 function sourceState(event){return stateNames[String(event.rawStatus??event.status).toLowerCase()]||event.status;}
 function apply(profile,event,task){if(!task||event.mode!==profile.mode)return false;const stamp=Date.parse(event.at),previous=profile.questSources?.[task.id],manual=profile.questEdits?.[task.id]||0;if(Number.isFinite(stamp)&&(stamp<(previous?.at||0)||stamp<=manual))return false;if(!Number.isFinite(stamp)&&manual)return false;
  const status=sourceState(event);if(!['active','ready','done','failed','locked','available'].includes(status))return false;
  profile.questSources??={};profile.questSources[task.id]={status,at:Number.isFinite(stamp)?stamp:Date.now(),source:'Client log'};
  if(['locked','available'].includes(status))delete profile.tasks[task.id];else profile.tasks[task.id]=status==='ready'?'active':status;
  if(status==='done'){profile.completedAt??={};profile.completedAt[task.id]=Number.isFinite(stamp)?stamp:Date.now();}
  for(const id of event.completedConditions||[]){const objective=task.objectives?.find(o=>o.id===id),edited=profile.objectiveEdits?.[id]||0;if(!objective||(edited&&(!Number.isFinite(stamp)||stamp<=edited)))continue;profile.objectives[id]=true;if(objective.count){profile.objectiveCounts??={};profile.objectiveCounts[id]=objective.count;}}
  return true;
 }
 function edit(profile,id){profile.questEdits??={};profile.questEdits[id]=Date.now();if(profile.questSources)delete profile.questSources[id];}
 function maps(task,profile){const objectives=task.objectives||[],known=objectives.some(o=>o.maps?.length);return [...new Set(objectives.filter(o=>!profile.objectives[o.id]).flatMap(o=>o.maps||[]).concat(!known&&task.map&&task.map!=='Any location'?[task.map]:[]))];}
 function plan(tasks,profile,status,currentMap){const rows=tasks.filter(t=>status(t)==='active'&&!profile.hiddenTasks?.includes(t.id)).map(task=>{const remaining=(task.objectives||[]).filter(o=>!o.optional&&!profile.objectives[o.id]),ready=profile.questSources?.[task.id]?.status==='ready',locations=maps(task,profile),unlocks=tasks.filter(q=>(q.requirements||[]).some(r=>(r.id||r.task?.id||r.taskId)===task.id)).length;return{task,ready,remaining,locations,unlocks,score:(ready?100:0)+(locations.includes(currentMap)?20:0)+unlocks*3+(profile.pinned.includes(task.id)?15:0)+(task.kappaRequired?4:0)+(task.lightkeeperRequired?5:0)};}).sort((a,b)=>b.score-a.score||a.task.name.localeCompare(b.task.name));return rows;}
 const api={apply,edit,maps,plan,sourceState};if(typeof module!=='undefined')module.exports=api;else root.QuestCore=api;
})(typeof window==='undefined'?globalThis:window);
