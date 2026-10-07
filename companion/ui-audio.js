'use strict';
(()=>{
 let audio=null,toastObserver=null,lastToast='',toastTimer=0;
 const defaultVolume=15;

 function settings(){
  try{
   if(typeof state==='undefined'||!state||typeof state!=='object')return null;
   if(!state.settings||typeof state.settings!=='object')state.settings={};
   return state.settings;
  }catch{return null;}
 }
 function persist(){try{if(typeof save==='function')save();}catch{}}
 function enabled(){return settings()?.uiSound!==false;}
 function volume(){const value=Number(settings()?.uiVolume??defaultVolume);return Math.max(0,Math.min(100,Number.isFinite(value)?value:defaultVolume))/100;}
 function context(){
  if(audio)return audio;
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextClass)return null;
  try{audio=new AudioContextClass();}catch{return null;}
  return audio;
 }
 function tone(ac,{start,end=start,at,duration=.045,type='sine',gain=.12}){
  const osc=ac.createOscillator(),amp=ac.createGain(),peak=gain*volume();
  if(peak<=0)return;
  osc.type=type;osc.frequency.setValueAtTime(start,at);
  if(end!==start)osc.frequency.exponentialRampToValueAtTime(end,at+duration*.72);
  amp.gain.setValueAtTime(.0001,at);amp.gain.exponentialRampToValueAtTime(peak,at+.004);amp.gain.exponentialRampToValueAtTime(.0001,at+duration);
  osc.connect(amp);amp.connect(ac.destination);osc.start(at);osc.stop(at+duration+.006);
 }
 function play(kind='click'){
  if(!enabled()||volume()===0)return;
  const ac=context();if(!ac)return;
  if(ac.state==='suspended')ac.resume().catch(()=>{});
  const at=ac.currentTime;
  if(kind==='switch')tone(ac,{start:560,end:760,at,duration:.035,gain:.10});
  else if(kind==='navigation')tone(ac,{start:410,end:535,at,duration:.055,type:'triangle',gain:.11});
  else if(kind==='confirm'){
   tone(ac,{start:480,end:620,at,duration:.048,gain:.11});
   tone(ac,{start:700,end:820,at:at+.065,duration:.052,gain:.095});
  }else if(kind==='error'){
   tone(ac,{start:260,end:205,at,duration:.075,type:'triangle',gain:.12});
   tone(ac,{start:180,end:155,at:at+.085,duration:.075,type:'triangle',gain:.09});
  }else tone(ac,{start:880,end:650,at,duration:.026,type:'sine',gain:.10});
 }
 function toastKind(message){return /\b(error|failed|failure|invalid|unable|outside|unavailable|could not|not found|no confident|missing)\b/i.test(message)?'error':'confirm';}
 function watchToast(){
  const toast=document.querySelector('#toast');if(!toast||toastObserver)return;
  toastObserver=new MutationObserver(()=>{
   if(!toast.classList.contains('visible')){lastToast='';return;}
   const message=(toast.textContent||'').trim();if(!message||message===lastToast)return;
   lastToast=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{if(toast.classList.contains('visible'))play(toastKind(message));},0);
  });
  toastObserver.observe(toast,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
 }
 function panel(){
  const s=settings(),grid=document.querySelector('.settings-grid');if(!s||!grid||grid.querySelector('.ui-audio-card'))return;
  const rawLevel=Number(s.uiVolume??defaultVolume),level=Number.isFinite(rawLevel)?Math.max(0,Math.min(100,rawLevel)):defaultVolume;
  grid.insertAdjacentHTML('beforeend',`<section class="card ui-audio-card"><h2>Interface sounds</h2><p class="subtext">Quiet, locally synthesized feedback for navigation and actions. Text entry stays silent.</p><label class="ui-audio-toggle"><input type="checkbox" data-ui-audio="enabled" ${s.uiSound!==false?'checked':''}><span>Enable interface sounds</span></label><label class="ui-audio-volume"><span>Volume <output data-ui-audio-volume>${level}%</output></span><input type="range" min="0" max="100" step="1" value="${level}" data-ui-audio="volume" aria-label="Interface sound volume"></label></section>`);
 }
 function enhance(){panel();watchToast();}

 document.addEventListener('click',event=>{
  const target=event.target instanceof Element?event.target:null;if(!target)return;
  if(target.closest('[data-ui-audio]'))return;
  const link=target.closest('a[href^="#"]');if(link||target.closest('[data-route]'))return;
  const control=target.closest('button,[role="button"],[data-action],[data-tool],[data-map-action]');
  if(control)play('click');
 },true);
 document.addEventListener('change',event=>{
  const target=event.target;if(!(target instanceof HTMLInputElement||target instanceof HTMLSelectElement))return;
  if(target.dataset.uiAudio){
   const s=settings();if(!s)return;
   if(target.dataset.uiAudio==='enabled')s.uiSound=target.checked;
   if(target.dataset.uiAudio==='volume')s.uiVolume=Math.max(0,Math.min(100,Number(target.value)||0));
   const output=document.querySelector('[data-ui-audio-volume]');if(output)output.textContent=`${s.uiVolume??defaultVolume}%`;
   persist();if(s.uiSound!==false)play('switch');return;
  }
  if(target.id==='overlay-page')play('navigation');
  else if(target.matches('select,input[type="checkbox"],input[type="radio"]'))play('switch');
 });
 window.addEventListener('hashchange',()=>play('navigation'));
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watchToast,{once:true});else watchToast();
 window.UIAudio={enhance,play};
})();
