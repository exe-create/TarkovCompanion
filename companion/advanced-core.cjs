'use strict';
function recordQuote(history,item,mode,at){
 if(!item||!Number.isFinite(item.lastLowPrice)||item.lastLowPrice<=0)return history||[];
 const rows=[...(history||[])];if(rows.some(r=>r.at===at&&r.mode===mode))return rows;
 rows.push({at,mode,price:item.lastLowPrice});return rows.slice(-120);
}
function bitcoinEstimate({hours,sale,fuelHourly,investment}){
 if(![hours,sale,fuelHourly,investment].every(Number.isFinite)||hours<=0||sale<0||fuelHourly<0||investment<0)return null;
 const daily=24/hours*sale-fuelHourly*24;
 return {perDay:24/hours,daily,payback:daily>0?investment/daily:null};
}
function weeklyRaids(raids){
 const bins={};for(const r of raids||[]){const date=new Date(r.at);if(!Number.isFinite(date.getTime()))continue;date.setUTCHours(0,0,0,0);date.setUTCDate(date.getUTCDate()-((date.getUTCDay()+6)%7));const key=date.toISOString().slice(0,10);const bin=bins[key]??={week:key,total:0,survived:0,maps:{}};bin.total++;if(r.outcome==='Survived')bin.survived++;bin.maps[r.map]=(bin.maps[r.map]||0)+1;}
 return Object.values(bins).sort((a,b)=>b.week.localeCompare(a.week));
}
if(typeof module!=='undefined')module.exports={recordQuote,bitcoinEstimate,weeklyRaids};
else window.AdvancedCore={recordQuote,bitcoinEstimate,weeklyRaids};
