'use strict';
(()=>{let pending=false;function record(id,message){if(typeof state==='undefined'||!state)return;state.settings.backgroundStatus??={};state.settings.backgroundStatus[id]={at:Date.now(),message:String(message)};}
 function refresh(){if(document.hasFocus()||document.querySelector('dialog[open]')){pending=true;return;}pending=false;render();}
 window.addEventListener('blur',()=>setTimeout(()=>{if(pending)refresh();},50));document.addEventListener('close',()=>{if(pending)refresh();},true);
 window.QuietUI={record,refresh};
})();
