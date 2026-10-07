'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { StringDecoder } = require('node:string_decoder');
const PlannerCore = require('./planner-core.cjs');

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_FILES = 12;
const POLL_MS = 2500;

function canonicalMode(value) {
  const key = String(value || '').trim().toLowerCase().replace(/[ _-]/g, '');
  if (key === 'pve' || key === 'coop') return 'pve';
  if (key === 'pvp' || key === 'regular' || key === 'pvpregular') return 'regular';
  if (key === 'pvpseason' || key === 'seasonalpvp') return 'pvp-season';
  return null;
}

function createLogSync({ getSettings = () => ({}), onEvents = () => {}, onRecords = () => {}, userData, pollIntervalMs = POLL_MS }) {
  if (!userData) throw new TypeError('userData directory is required');
  const cursorPath = path.join(userData, 'log-cursors.json');
  let cursors = {};
  try {
    const saved = JSON.parse(fs.readFileSync(cursorPath, 'utf8'));
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) cursors = saved;
  } catch {}
  let timer = null;
  let closed = false;
  let busy = false;

  function save() {
    fs.mkdirSync(userData, { recursive: true });
    const tmp = `${cursorPath}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(cursors));
    fs.renameSync(tmp, cursorPath);
  }

  function settings() {
    try { return getSettings() || {}; } catch { return {}; }
  }

  function getFiles(folder) {
    let sessions;
    try { sessions = fs.readdirSync(folder, { withFileTypes: true }); } catch { return []; }
    const roots = [];
    for (const entry of sessions) {
      if (!entry.isDirectory()) continue;
      const full = path.join(folder, entry.name);
      try { roots.push({ full, mtime: fs.statSync(full).mtimeMs }); } catch {}
    }
    roots.sort((a, b) => b.mtime - a.mtime);
    const candidates = [];
    const add = dir => {
      let names;
      try { names = fs.readdirSync(dir); } catch { return; }
      for (const name of names) {
        if (!/\.(?:log|txt)$/i.test(name) || !/(?:application|push-notifications)/i.test(name)) continue;
        const full = path.join(dir, name);
        try {
          const stat = fs.statSync(full);
          if (stat.isFile()) candidates.push({ full, mtime: stat.mtimeMs, size: stat.size, session: dir });
        } catch {}
      }
    };
    // Include files directly in a selected session folder, or files in the recent session folders under Logs.
    if (roots.length === 0) add(folder);
    else for (const root of roots.slice(0, 8)) add(root.full);
    return candidates.sort((a, b) => b.mtime - a.mtime).slice(0, MAX_FILES);
  }

  function lineHash(file, lineNumber, line) {
    return createHash('sha256').update(file).update('\0').update(String(lineNumber)).update('\0').update(line).digest('hex');
  }

  function processLine(file, lineNumber, line, mode, profile, emit) {
    const context = /^\d{4}-\d\d-\d\d[^|]*\|[^|]*\|[^|]*\|application\|Session mode:\s*([^\s|]+)/i.exec(line);
    if (context) return { mode: canonicalMode(context[1]) || mode };
    const events = PlannerCore.parseLogLine(line);
    for (const event of events) {
      if (mode) event.mode = mode;
      else if (event.mode) event.mode = canonicalMode(event.mode);
      if (!event.mode) continue;
      event.profile = profile || null;
      event.source = 'disk-log';
      event.dedupeKey = createHash('sha256').update(lineHash(file,lineNumber,line)).update(JSON.stringify([event.type,event.id,event.status,event.map])).digest('hex');
      if (emit.some(existing => existing.dedupeKey === event.dedupeKey)) continue;
      emit.push(event);
    }
    return { mode };
  }

  function scan({ initialImport = false, emit = true, folder: overrideFolder } = {}) {
    if (closed || busy) return [];
    busy = true;
    const previousCursors={...cursors};
    const emitted = [];
    try {
      const cfg = settings();
      const folder = typeof overrideFolder === 'string' ? overrideFolder : typeof cfg.logsFolder === 'string' ? cfg.logsFolder.trim() : '';
      if (!folder || !fs.existsSync(folder)) return [];
      const profile = typeof cfg.logProfile === 'string' ? cfg.logProfile : '';
      const files = getFiles(folder);
      // Establish mode context from application lines before parsing push notification lines.
      files.sort((a, b) => {
        const app = /application/i.test(a.full) ? 0 : 1;
        const bp = /application/i.test(b.full) ? 0 : 1;
        return app - bp || a.session.localeCompare(b.session) || a.full.localeCompare(b.full);
      });
      const emittedHashes = new Set();
      for (const file of files) {
        const key = path.resolve(file.full);
        let cursor = cursors[key]?{...cursors[key]}:null;
        const isNew = !cursor || !Number.isFinite(cursor.offset);
        if (isNew && !initialImport) {
          cursors[key] = { offset: file.size, partial: '', lineNumber: 0, mode:/application/i.test(file.full)?latestMode(file.full):null };
          continue;
        }
        if (isNew && initialImport) {
          cursor = { offset: Math.max(0, file.size - MAX_FILE_BYTES), partial: '', lineNumber: 0 };
        } else if (file.size < cursor.offset) {
          cursor = { offset: file.size, partial: '', lineNumber: 0 };
          cursors[key] = cursor;
          continue;
        }
        const readLength = Math.min(file.size - cursor.offset, MAX_FILE_BYTES);
        if (readLength <= 0) continue;
        const fd = fs.openSync(file.full, 'r');
        let bytes;
        try { bytes = Buffer.alloc(readLength); fs.readSync(fd, bytes, 0, readLength, cursor.offset); }
        finally { fs.closeSync(fd); }
        const previous = cursor.partial ? Buffer.from(cursor.partial, 'base64') : Buffer.alloc(0);
        const decoder = new StringDecoder('utf8');
        const text = decoder.write(Buffer.concat([previous, bytes]));
        const lastNewline = text.lastIndexOf('\n');
        const complete = lastNewline < 0 ? '' : text.slice(0, lastNewline + 1);
        const remainder = lastNewline < 0 ? text : text.slice(lastNewline + 1);
        // Persist undecoded and incomplete bytes without advancing past their start.
        const completeBytes = Buffer.byteLength(complete, 'utf8');
        const consumedNew = Math.max(0, completeBytes - previous.length);
        const nextOffset = cursor.offset + readLength;
        const partialBytes = Buffer.concat([previous, bytes.subarray(consumedNew)]);
        const state = { mode: /application/i.test(file.full) ? cursor.mode||null : null };
        // Re-read at most the bounded current application tail to restore session mode context.
        if (!/application/i.test(file.full)) {
          const appFile = files.find(other => other.session === file.session && /application/i.test(other.full));
          if (appFile) state.mode = latestMode(appFile.full);
        }
        const lines = complete.split(/\r?\n/);
        for (const line of lines) {
          if (!line) continue;
          cursor.lineNumber = (cursor.lineNumber || 0) + 1;
          const result = processLine(file.full, cursor.lineNumber, line, state.mode, profile, emitted);
          if (result.mode) state.mode = result.mode;
          const hash = lineHash(file.full, cursor.lineNumber, line);
          if (emittedHashes.has(hash)) continue;
          emittedHashes.add(hash);
        }
        cursors[key] = { offset: nextOffset, partial: partialBytes.toString('base64'), lineNumber: cursor.lineNumber || 0, mode:state.mode };
      }
      if (emitted.length) onRecords(emitted);
      if (emit && emitted.length) onEvents(emitted);
      if (files.length) save();
      return emitted;
    } catch(error){cursors=previousCursors;throw error;} finally { busy = false; }
  }

  function latestMode(file) {
    try {
      const size = fs.statSync(file).size;
      const length = Math.min(size, MAX_FILE_BYTES);
      const fd = fs.openSync(file, 'r');
      let buf;
      try { buf = Buffer.alloc(length); fs.readSync(fd, buf, 0, length, size - length); }
      finally { fs.closeSync(fd); }
      const text = buf.toString('utf8');
      const matches = [...text.matchAll(/^\d{4}-\d\d-\d\d[^|]*\|[^|]*\|[^|]*\|application\|Session mode:\s*([^\s|]+)/gmi)];
      return matches.length ? canonicalMode(matches[matches.length - 1][1]) : null;
    } catch { return null; }
  }

  function configure() {
    if (closed) return false;
    if (timer) clearInterval(timer);
    timer = null;
    if (settings().logSync === true) {
      // Baseline existing files so enabling watch never silently replays old content.
      const poll=()=>{try{scan();}catch{/* Preserve cursors and retry on the next poll; manual Sync reports errors. */}};
      poll();
      timer = setInterval(poll, pollIntervalMs);
      timer.unref?.();
    }
    return true;
  }

  function inspect(folder = settings().logsFolder) {
    const files=getFiles(folder||''),apps=files.filter(f=>/application/i.test(f.full)).sort((a,b)=>b.mtime-a.mtime);
    return {files:files.length,mode:apps.length?latestMode(apps[0].full):null,at:apps[0]?.mtime||null};
  }
  function importNow(options = {}) { return scan({ ...options, initialImport: true }); }
  function close() {
    closed = true;
    if (timer) clearInterval(timer);
    timer = null;
    save();
  }

  return { configure, importNow, inspect, close };
}

module.exports = { createLogSync, canonicalMode, MAX_FILE_BYTES, MAX_FILES };
