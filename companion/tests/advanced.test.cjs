const test=require('node:test'),assert=require('node:assert/strict');
const {parseScreenshotPose,projectedHeading}=require('../core.cjs'),{recordQuote,bitcoinEstimate,weeklyRaids}=require('../advanced-core.cjs');
test('screenshot quaternion gives projected last-recorded facing; invalid quaternion ignored',()=>{
 const p=parseScreenshotPose('2026_100,2,200_0,0.7071068,0,0.7071068_12.png');assert.ok(p.forward.x>.99);assert.ok(Math.abs(p.forward.z)<.001);
 assert.equal(parseScreenshotPose('2026_100,2,200_0,7,0,7_12.png').forward,undefined);
 const cfg={svg:{bounds:[[0,0],[400,400]]}};assert.ok(Math.abs(projectedHeading(p,cfg)-90)<.001);
 assert.equal(projectedHeading({x:1,z:1},cfg),null);
});
test('price observations dedupe cache snapshots and isolate mode without inventing historical quotes',()=>{
 let rows=recordQuote([],{lastLowPrice:100},'pve',1000);rows=recordQuote(rows,{lastLowPrice:200},'pve',1000);assert.equal(rows.length,1);
 rows=recordQuote(rows,{lastLowPrice:300},'regular',1000);assert.equal(rows.length,2);assert.equal(recordQuote(rows,{lastLowPrice:null},'pve',2000).length,2);
});
test('manual production interval accounts for fuel and returns no payback on loss',()=>{
 assert.deepEqual(bitcoinEstimate({hours:12,sale:500000,fuelHourly:1000,investment:1952000}),{perDay:2,daily:976000,payback:2});
 assert.equal(bitcoinEstimate({hours:24,sale:10,fuelHourly:10,investment:100}).payback,null);
 assert.equal(bitcoinEstimate({hours:0,sale:10,fuelHourly:0,investment:100}),null);
});
test('weekly raid stats use Monday UTC and actual outcomes/maps',()=>{
 const rows=weeklyRaids([{at:Date.parse('2026-10-04T23:00Z'),map:'customs',outcome:'Survived'},{at:Date.parse('2026-10-05T00:00Z'),map:'woods',outcome:'Killed in action'}]);assert.equal(rows[0].week,'2026-10-05');assert.equal(rows[1].survived,1);
});
