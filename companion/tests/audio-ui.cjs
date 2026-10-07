'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent('<main class="settings-grid"></main><div id="toast"></div>');
    await page.evaluate(() => {
      window.state = { settings: {} };
      window.saveCount = 0;
      window.save = () => { window.saveCount++; };
      const NativeOffline = window.OfflineAudioContext;
      window.AudioContext = function () {
        const context = new NativeOffline(1, 44100, 44100);
        Object.defineProperty(context, 'state', { value: 'running' });
        window.testAudioContext = context;
        return context;
      };
    });
    await page.addScriptTag({ path: path.join(__dirname, '../ui-audio.js') });
    await page.evaluate(() => window.UIAudio.enhance());
    assert.equal(await page.locator('.ui-audio-card').count(), 1);
    assert.equal(await page.locator('[data-ui-audio="enabled"]').isChecked(), true);
    assert.equal(await page.locator('[data-ui-audio-volume]').textContent(), '15%');

    const toggle = page.locator('[data-ui-audio="enabled"]');
    await toggle.uncheck();
    assert.equal(await page.evaluate(() => state.settings.uiSound), false);
    await toggle.check();
    assert.equal(await page.evaluate(() => state.settings.uiSound), true);
    await page.evaluate(() => window.UIAudio.play('confirm'));
    const peak = await page.evaluate(async () => {
      const rendered = await testAudioContext.startRendering();
      const channel = rendered.getChannelData(0);
      let maximum = 0;
      for (const sample of channel) maximum = Math.max(maximum, Math.abs(sample));
      return maximum;
    });
    assert.ok(peak > 0.001, `expected synthesized waveform, got peak=${peak}`);
    assert.ok(peak < 0.03, `default volume should stay quiet, got peak=${peak}`);
    assert.ok((await page.evaluate(() => saveCount)) >= 2);
    assert.deepEqual(errors, []);
    console.log('PASS: settings control renders, preferences persist, and quiet synthesized audio renders offline (no device playback tested).');
  } finally { await browser?.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
