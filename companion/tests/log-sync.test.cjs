'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createLogSync } = require('../log-sync.cjs');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tarkov-log-sync-'));
  const logs = path.join(root, 'Logs');
  const session = path.join(logs, 'log_2026.10.07_test');
  const userData = path.join(root, 'user');
  fs.mkdirSync(session, { recursive: true });
  const app = path.join(session, 'application_000.log');
  const push = path.join(session, 'push-notifications_000.log');
  fs.writeFileSync(app, '2026-10-07 07:29:24.433|1.2.0.0|Info|application|Session mode: Pve\n');
  fs.writeFileSync(push, '');
  return { root, logs, userData, app, push, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

function questLine(status = 'Started') {
  const questId = 'a'.repeat(24);
  return `2026-10-07 07:30:00.000|1.2.0.0|Info|push-notifications|QuestStatusChanged {"questId":"${questId}","status":"${status}"}`;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

test('watch baselines old lines, imports appended complete lines once with session mode', async () => {
  const f = fixture();
  try {
    fs.writeFileSync(f.push, `${questLine('Success')}\n`); // existing history is not replayed on opt-in
    const events = [];
    const sync = createLogSync({ getSettings: () => ({ logSync: true, logsFolder: f.logs, logProfile: 'pve-profile' }), onEvents: batch => events.push(...batch), userData: f.userData, pollIntervalMs: 20 });
    sync.configure();
    await sleep(40);
    assert.equal(events.length, 0);
    fs.appendFileSync(f.push, `${questLine('Started')}\n`);
    await sleep(80);
    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'quest');
    assert.equal(events[0].status, 'active');
    assert.equal(events[0].mode, 'pve');
    assert.equal(events[0].profile, 'pve-profile');
    assert.equal(events[0].source, 'disk-log');
    assert.match(events[0].dedupeKey, /^[a-f0-9]{64}$/);
    await sleep(50);
    assert.equal(events.length, 1);
    sync.close();
  } finally { f.cleanup(); }
});

test('polling retains partial lines and ignores unknown mode and payload schemas', async () => {
  const f = fixture();
  try {
    const events = [];
    const sync = createLogSync({ getSettings: () => ({ logSync: true, logsFolder: f.logs, logProfile: 'profile' }), onEvents: batch => events.push(...batch), userData: f.userData, pollIntervalMs: 20 });
    sync.configure();
    await sleep(35);
    const line = questLine('Completed');
    fs.appendFileSync(f.push, line.slice(0, 40));
    await sleep(50);
    assert.equal(events.length, 0);
    fs.appendFileSync(f.push, `${line.slice(40)}\n2026-10-07 07:31:00.000|1.2|Info|application|Session mode: Experimental\n2026-10-07 07:31:01.000|1.2|Info|push-notifications|{ "unrecognized": true }\n`);
    await sleep(80);
    assert.equal(events.length, 1);
    assert.equal(events[0].status, 'done');
    assert.equal(events[0].mode, 'pve'); // unknown later label does not erase known context
    sync.close();
  } finally { f.cleanup(); }
});

test('manual import works while watcher is off and recognizes known labels only', () => {
  const f = fixture();
  try {
    fs.writeFileSync(f.app, '2026-10-07 07:29:24.433|1.2.0.0|Info|application|Session mode: PvpSeason\n');
    fs.writeFileSync(f.push, `${questLine('Failed')}\n`);
    const events = [];
    const sync = createLogSync({ getSettings: () => ({ logSync: false, logsFolder: f.logs, logProfile: 'season-profile' }), onEvents: batch => events.push(...batch), userData: f.userData });
    const imported = sync.importNow();
    assert.equal(imported.length, 1);
    assert.equal(events.length, 1);
    assert.equal(events[0].status, 'failed');
    assert.equal(events[0].mode, 'pvp-season');
    assert.equal(events[0].profile, 'season-profile');
    sync.close();
  } finally { f.cleanup(); }
});
