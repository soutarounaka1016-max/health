const test=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js');

const records=[
  {date:'2026-07-20',weight:75},
  {date:'2026-07-21',weight:74.6},
  {date:'2026-07-22',weight:74.8}
];

test('upsert replaces same date',()=>{
  const r=C.upsertRecord(records,{date:'2026-07-21',weight:74.2});
  assert.equal(r.length,3);
  assert.equal(r[1].weight,74.2);
});

test('day diff uses previous recorded day',()=>assert.equal(C.dayDiff(records,'2026-07-22'),0.2));
test('moving average works',()=>assert.equal(C.movingAverage(records,2),74.8));
test('range filter works',()=>assert.deepEqual(C.rangeRecords(records,2,'2026-07-22').map(x=>x.date),['2026-07-21','2026-07-22']));
test('backup validation rejects invalid data',()=>assert.throws(()=>C.validateBackup({version:2,records:[]})));
