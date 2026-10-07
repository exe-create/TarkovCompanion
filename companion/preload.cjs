const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktop',{
 syncAll:(mode,options)=>ipcRenderer.invoke('sync:run',mode,options),
 pendingSync:()=>ipcRenderer.invoke('sync:pending'),ackSync:keys=>ipcRenderer.invoke('sync:ack',keys),
 loadState:()=>ipcRenderer.invoke('state:load'),saveState:s=>ipcRenderer.invoke('state:save',s),
 importPosition:()=>ipcRenderer.invoke('position:import'),chooseFolder:()=>ipcRenderer.invoke('folder:choose'),
 scan:capture=>ipcRenderer.invoke('scan:run',capture),overlay:show=>ipcRenderer.invoke('overlay:toggle',show),opacity:value=>ipcRenderer.invoke('overlay:opacity',value),
 overlayStatus:()=>ipcRenderer.invoke('overlay:status'),lockOverlay:()=>ipcRenderer.invoke('overlay:lock'),resetOverlay:()=>ipcRenderer.invoke('overlay:reset'),resizeOverlay:bounds=>ipcRenderer.invoke('overlay:resize',bounds),saveShortcuts:values=>ipcRenderer.invoke('shortcuts:save',values),
 onOverlayStatus:callback=>ipcRenderer.on('overlay:status',(_e,value)=>callback(value)),onOverlayCommand:callback=>ipcRenderer.on('overlay:command',(_e,value)=>callback(value)),
 openOverlay:(kind,show)=>ipcRenderer.invoke('overlay:open',kind,show),useFreeKeys:()=>ipcRenderer.invoke('shortcuts:preset'),latestScan:()=>ipcRenderer.invoke('scan:latest'),publishScan:value=>ipcRenderer.invoke('scan:publish',value),onScanResult:callback=>ipcRenderer.on('scan:result',(_e,value)=>callback(value)),
 chooseLogs:()=>ipcRenderer.invoke('logs:choose'),importLogs:()=>ipcRenderer.invoke('logs:import'),onLogs:callback=>ipcRenderer.on('logs:events',(_e,value)=>callback(value)),
 startSharing:value=>ipcRenderer.invoke('sharing:start',value),stopSharing:()=>ipcRenderer.invoke('sharing:stop'),updateSharing:value=>ipcRenderer.invoke('sharing:update',value),joinSharing:(url,value)=>ipcRenderer.invoke('sharing:join',url,value),onSquad:callback=>ipcRenderer.on('squad:update',(_e,value)=>callback(value)),
 onPosition:callback=>ipcRenderer.on('position:update',(_e,result)=>callback(result)),onScan:callback=>ipcRenderer.on('scan:request',(_e,value)=>callback(value))
});
