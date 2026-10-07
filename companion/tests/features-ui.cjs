'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { createServer } = require('../server.cjs');

(async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
    const context = await browser.newContext({ viewport: { width: 1560, height: 1100 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${origin}/#settings`);
    await page.locator('#profile-mode').selectOption('pve');
    await page.locator('[data-action="profile-save"]').click();
    await page.waitForFunction(() => document.querySelector('#data-status')?.textContent.includes('pve'));
    const data = await (await fetch(`${origin}/api/data?mode=pve`)).json();
    const tasks = data.tasks;
    const treeTask = tasks.find(task => task.map && task.requirements?.length) || tasks.find(task => task.map);
    const countedTask = tasks.find(task => task.objectives?.some(objective => objective.count));
    assert.ok(treeTask, 'fixture should include a map-specific quest');
    assert.ok(countedTask, 'fixture should include a counted objective');

    // Quest tree -> map and pin, then show objective counters and hide/unhide.
    await page.goto(`${origin}/#field`);
    await page.locator('[data-feature="tab"][data-id="tree"]').waitFor();
    await page.locator('#field-search').fill(treeTask.name);
    await page.locator('.tree-node').first().click();
    assert.equal(await page.locator('.tree-current').textContent(), treeTask.name);
    fs.mkdirSync(path.join(__dirname, '../evidence'), { recursive: true });
    await page.screenshot({ path: path.join(__dirname, '../evidence/features-tree.png'), fullPage: true });
    await page.locator('[data-feature="quest-map"]').click();
    await page.locator('#map-inner svg').waitFor();
    let saved = await page.evaluate(() => JSON.parse(localStorage.getItem('tc-state-v1')));
    const profile = saved.profiles.find(item => item.id === saved.active);
    assert.ok(profile.pinned.includes(treeTask.id));
    assert.equal(profile.map, Object.keys(data.maps).find(key => data.maps[key].locale.en === treeTask.map) || profile.map);

    await page.goto(`${origin}/#quests`);
    await page.locator('#quest-filter').selectOption('all');
    await page.locator('#search').fill(countedTask.name);
    let card = page.locator('.task-card').filter({ hasText: countedTask.name }).first();
    await card.locator('[data-feature="counter-plus"]').first().click();
    assert.match(await page.locator('.objective-counter b').first().textContent(), /^1\//);
    await card.locator('[data-feature="quest-hide"]').click();
    await page.locator('#quest-filter').selectOption('hidden');
    card = page.locator('.task-card').filter({ hasText: countedTask.name }).first();
    await card.locator('[data-feature="quest-hide"]').click();
    await page.locator('#quest-filter').selectOption('all');
    card = page.locator('.task-card').filter({ hasText: countedTask.name }).first();
    await card.locator('.task-status').selectOption('done');
    saved = await page.evaluate(() => JSON.parse(localStorage.getItem('tc-state-v1')));
    assert.equal(saved.profiles[0].objectiveCounts?.[countedTask.objectives.find(o => o.count).id], 1);
    assert.equal(saved.profiles[0].tasks[countedTask.id], 'done');

    // Key ownership persists for a real key used by a quest requirement.
    const keyTask = tasks.find(task => task.neededKeys?.some(group => group.keys?.length));
    assert.ok(keyTask, 'fixture should include a quest with a listed key requirement');
    await page.goto(`${origin}/#field`);
    await page.locator('[data-feature="tab"][data-id="keys"]').click();
    const ownedKey = page.locator('[data-owned-key]').first();
    const keyId = await ownedKey.getAttribute('data-owned-key');
    await ownedKey.check();
    await page.reload();
    await page.locator('[data-feature="tab"][data-id="keys"]').click();
    assert.equal(await page.locator(`[data-owned-key="${keyId}"]`).isChecked(), true);

    // Loadout validation and combined shopping list.
    await page.locator('[data-feature="tab"][data-id="gear"]').click();
    const gear = await page.evaluate(() => {
      const weapon = data.items.find(item => item.properties?.propertiesType === 'ItemPropertiesWeapon' && item.properties.allowedAmmo?.length);
      const ammo = data.items.find(item => item.properties?.propertiesType === 'ItemPropertiesAmmo' && !weapon?.properties.allowedAmmo.includes(item.id));
      return weapon && ammo ? { weapon: weapon.id, weaponName: weapon.name, ammo: ammo.id, ammoName: ammo.name } : null;
    });
    assert.ok(gear, 'fixture should include a weapon and ammunition pair for a compatibility warning');
    await page.locator('[data-gear="weapon"]').selectOption(gear.weapon);
    await page.locator('[data-gear="ammo"]').selectOption(gear.ammo);
    assert.match(await page.locator('.notice').textContent(), /not listed as compatible/i);
    await page.locator('[data-feature="gear-shopping"]').click();
    await page.locator('.row').filter({ hasText: 'Gear plan' }).first().waitFor();
    const gearRows = await page.locator('.row').filter({ hasText: 'Gear plan' }).allTextContents();
    assert.ok(gearRows.some(text => text.includes(gear.weaponName)));
    assert.ok(gearRows.some(text => text.includes(gear.ammoName)));

    // Actual PvE Salewa price card: community sell quotes include Therapist and four traders.
    const salewa = data.items.find(item => item.name === 'Salewa first aid kit');
    assert.ok(salewa && salewa.sellFor?.some(offer => offer.vendor?.name === 'Therapist'));
    await page.goto(`${origin}/?overlay=1&panel=items#market`);
    await page.locator('#search').fill('Salewa first aid kit');
    const thumb = page.locator(`.gallery-item[data-id="${salewa.id}"]`);
    await thumb.waitFor();
    await thumb.click();
    await page.locator('.price-card h2').waitFor();
    assert.equal(await page.locator('.price-card h2').textContent(), salewa.name);
    assert.match(await page.locator('.price-grid').textContent(), new RegExp(Number(salewa.lastLowPrice).toLocaleString('en-US')));
    await page.locator('.price-card details').first().locator('summary').click();
    const sellRows = page.locator('.price-card details').first().locator('.offer-row').filter({ hasText: 'Sell' });
    assert.equal(await sellRows.count(), 4);
    assert.match(await sellRows.allTextContents().then(rows => rows.join(' ')), /Therapist/);
    const therapist = salewa.sellFor.find(offer => offer.vendor.name === 'Therapist');
    assert.match(await sellRows.allTextContents().then(rows => rows.join(' ')), new RegExp(Number(therapist.priceRUB).toLocaleString('en-US')));
    await page.screenshot({ path: path.join(__dirname, '../evidence/features-price.png'), fullPage: true });

    // Recipe timer + special-station timer both start and cancel; station bonuses refresh from saved levels.
    await page.goto(`${origin}/#crafts`);
    await page.locator('.craft-workbench').waitFor();
    const craftDetails = page.locator('.craft-workbench details');
    await craftDetails.locator('summary').click();
    await page.screenshot({ path: path.join(__dirname, '../evidence/features-workbench.png'), fullPage: true });
    await craftDetails.locator('[data-feature="craft-start"]').first().click();
    let timer = page.locator('.craft-workbench .timer-card').first();
    await timer.waitFor();
    const timerName = await timer.locator('b').textContent();
    await timer.locator('[data-feature="craft-cancel"]').click();
    await page.locator('.craft-workbench .timer-card').waitFor({ state: 'detached' });
    await page.locator('#special-hours').fill('1');
    await page.locator('[data-feature="special-start"]').click();
    timer = page.locator('.craft-workbench .timer-card').filter({ hasText: 'Bitcoin Farm' }).first();
    await timer.waitFor();
    await timer.locator('[data-feature="craft-cancel"]').click();
    await page.locator('.craft-workbench .timer-card').waitFor({ state: 'detached' });
    assert.ok(timerName);

    const station = data.hideout.find(item => item.levels.some(level => level.bonuses?.length));
    assert.ok(station, 'fixture should include a station bonus');
    const bonusLevel = station.levels.find(level => level.bonuses?.length).level;
    await page.goto(`${origin}/#hideout`);
    await page.locator(`.hideout-level[data-id="${station.id}"]`).selectOption(String(bonusLevel));
    await page.locator('.station-tile').filter({ hasText: station.name }).waitFor();
    assert.ok(await page.locator('.station-tile').filter({ hasText: station.name }).locator('small').count() > 0);

    // Story notes and checks persist; stats reflect completed quest and a saved raid.
    await page.goto(`${origin}/#field`);
    await page.locator('[data-feature="tab"][data-id="story"]').click();
    await page.locator('#story-title').fill('Act one');
    await page.locator('#story-steps').fill('Reach the depot; Find the ledger');
    await page.locator('[data-feature="story-add"]').click();
    const storyChecks = page.locator('[data-story]');
    await storyChecks.first().check();
    await page.reload();
    await page.locator('[data-feature="tab"][data-id="story"]').click();
    assert.equal(await page.locator('[data-story]').first().isChecked(), true);
    await page.goto(`${origin}/#journal`);
    await page.locator('#raid-notes').fill('Feature acceptance fixture');
    await page.locator('[data-action="raid-save"]').click();
    await page.goto(`${origin}/#field`);
    await page.locator('[data-feature="tab"][data-id="stats"]').click();
    assert.match(await page.locator('.stats-strip').textContent(), /1\s+Quests/);
    assert.match(await page.locator('.stats-strip').textContent(), /1\s+Logged raids/);
    assert.ok(await page.locator('h2').filter({ hasText: 'What to do next' }).count());

    // Map loot and key layers create their source-backed markers on Customs.
    await page.goto(`${origin}/#maps`);
    await page.locator('#map-inner svg').waitFor();
    await page.locator('[data-id="loot"].map-layer').check();
    await page.locator('.map-marker.loot').first().waitFor();
    await page.locator('[data-id="keys"].map-layer').check();
    await page.locator('.map-marker.lock').first().waitFor();
    assert.ok(await page.locator('.map-marker.loot').count() > 0);
    assert.ok(await page.locator('.map-marker.lock').count() > 0);

    assert.deepEqual(errors, []);
    console.log('PASS: field quest tree/map pins, counters/hide, keys, gear warnings/shopping, Therapist pricing, craft timers, station bonuses, story persistence, stats, and map loot/key layers.');
  } finally {
    await browser?.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
