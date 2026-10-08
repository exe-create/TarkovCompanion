'use strict';
const {_electron}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=fs.mkdtempSync(path.join(__dirname,'../evidence/quiet-sync-')),game=path.join(root,'game'),logs=path.join(game,'Logs/session');fs.mkdirSync(logs,{recursive:true});const file=path.join(logs,'application.log');
 const stamp=()=>new Date().toISOString(),line=status=>`${stamp()}|1|Info|application|${JSON.stringify({questId:require('../data/live-pve.json').tasks[0].id,status})}\n`;
 fs.writeFileSync(file,`${stamp()}|1|Info|application|Session mode: Pve\n`);let app;
 try{
  app=await _electron.launch({executablePath:path.join(__dirname,'../node_modules/electron/dist/electron.exe'),args:[path.join(__dirname,'..')],env:{...process.env,TC_TEST_USER_DATA:path.join(root,'user'),TC_TEST_GAME_ROOT:game,TC_TEST_HIDDEN:'1'}});
  const main=await app.firstWindow(),errors=[];main.on('pageerror',e=>errors.push(e.message));await main.locator('.header-actions [data-sync-action=run]').waitFor();
  await main.evaluate(async logs=>{profile().mode='pve';profile().map='groundzero';state.settings.logsFolder=logs;state.settings.logProfile=profile().id;state.settings.logSync=true;state.settings.syncFollow=true;await loadData();await window.desktop.saveState(state);window.toastCalls=0;const old=toast;toast=(...args)=>{window.toastCalls++;return old(...args);};},path.dirname(logs));
  await app.evaluate(({ipcMain})=>{ipcMain.removeHandler('sync:run');ipcMain.handle('sync:run',()=>{global.testSyncCalls=(global.testSyncCalls||0)+1;if(global.testSyncFailure)throw Error('offline fixture');return{at:Date.now(),mode:'pve',sources:{logsFolder:process.env.TC_TEST_GAME_ROOT+'/Logs'},events:[],steps:[]};});});
  await main.evaluate(async()=>{Object.defineProperty(document,'hasFocus',{configurable:true,value:()=>true});const input=document.querySelector('#field-notes');input.value='Do not replace my note';input.focus();window.savedInput=input;await SyncUI.run({background:true});});
  assert.equal(await main.evaluate(()=>window.savedInput.isConnected&&document.activeElement===window.savedInput&&window.savedInput.value==='Do not replace my note'),true);
  await main.evaluate(()=>Object.defineProperty(document,'hasFocus',{configurable:true,value:()=>false}));
  const beforeCalls=await app.evaluate(()=>global.testSyncCalls);
  await main.evaluate(()=>{const now=Date.now;Date.now=()=>now()+700000;try{SyncUI.tick();}finally{Date.now=now;}});await main.waitForTimeout(100);
  assert.equal(await app.evaluate(()=>global.testSyncCalls),beforeCalls,'Public-data refresh waits while the planner is unfocused');
  fs.appendFileSync(file,line('AvailableForFinish'));const id=require('../data/live-pve.json').tasks[0].id;
  await main.waitForFunction(id=>profile().questSources?.[id]?.status==='ready',id,{timeout:10000});assert.equal(await main.evaluate(id=>profile().tasks[id],id),'active');
  await main.evaluate(()=>location.hash='quests');await main.locator('.quest-operations').waitFor();assert.match(await main.locator('.quest-operations').textContent(),/Ready to hand in/);assert.deepEqual(await main.evaluate(()=>profile().pinned),[]);
  fs.appendFileSync(file,line('Success'));await main.waitForFunction(id=>profile().tasks[id]==='done',id,{timeout:10000});assert.equal(await main.evaluate(()=>QuestUI.rows().length),0);
  await app.evaluate(()=>{global.testSyncFailure=true;});await main.evaluate(()=>SyncUI.run({background:true}));
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].webContents.send('position:update',{automatic:true,name:'unlabeled_163,5,-35_0,0,0,1.png',position:{x:163,y:5,z:-35}}));await main.waitForTimeout(400);
  assert.equal(await main.locator('dialog[open]').count(),0);assert.equal(await main.evaluate(()=>window.toastCalls),0);assert.equal(app.windows().length,1);
  assert.equal(await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows().some(w=>w.isVisible()||w.isFocused())),false);
  assert.match(await main.evaluate(()=>state.settings.backgroundStatus.sync.message),/offline fixture/);assert.deepEqual(errors,[]);
  console.log('PASS: background refresh preserves typing; log ready/completion sync updates own task board; failed refresh/unknown screenshots create no toasts, dialogs, focus or windows. Native test stays hidden and registers no hotkeys. Fixture quest events only.');
 }finally{await app?.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
