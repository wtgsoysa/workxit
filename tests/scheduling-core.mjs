import assert from 'node:assert/strict';
import {toUTC,validDetails,calendarDraft} from '../dist/scheduling-core.mjs';
assert.equal(toUTC('2026-10-14','09:00','Asia/Colombo').toISOString(),'2026-10-14T03:30:00.000Z');
assert.equal(toUTC('2026-07-14','09:00','America/New_York').toISOString(),'2026-07-14T13:00:00.000Z');
assert.equal(toUTC('2026-01-14','09:00','America/New_York').toISOString(),'2026-01-14T14:00:00.000Z');
assert.throws(()=>toUTC('2026-02-30','09:00','UTC'));
assert.throws(()=>toUTC('2026-03-08','02:30','America/New_York'));
const details={name:'Example Person',email:'example@example.com',phone:''};
assert.deepEqual(validDetails(details,'zoom'),{});
assert.ok(validDetails(details,'whatsapp').phone);
assert.deepEqual(validDetails({...details,phone:'+61 412 345 678'},'whatsapp'),{});
const ics=calendarDraft({date:'2026-10-14',time:'09:00',zone:'Asia/Colombo',platform:'whatsapp',callType:'voice',focus:'Website development',uid:'export-check@example.invalid'},new Date('2026-10-01T00:00:00Z'));
assert.ok(ics.includes('DTSTART:20261014T033000Z'));
assert.ok(ics.includes('DTEND:20261014T040000Z'));
assert.ok(ics.includes('STATUS:TENTATIVE'));
assert.ok(ics.includes('PREVIEW'));
assert.ok(!ics.includes('ATTENDEE'));
console.log('Scheduling helper checks passed.');

