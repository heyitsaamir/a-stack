import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderHtml } from './render.mjs';

const pr = JSON.parse(readFileSync(new URL('../samples/ky-873.pr.json', import.meta.url)));
const analysis = JSON.parse(readFileSync(new URL('../samples/ky-873.json', import.meta.url)));
const html = renderHtml(pr, analysis);
const interactiveHtml = renderHtml(pr, analysis, { interactive: true });

assert.match(html, /class="ad"/, 'keeps annotated before/after content');
assert.match(html, /data-pele-open/, 'renders an accessible diagram trigger');
assert.match(html, /<dialog class="pele-viewer" id="gpr-pele-dialog"/, 'renders the expanded viewer');
assert.match(html, /<form method="dialog"><button[^>]+>Close<\/button>/, 'renders a native close control');
assert.match(html, /peleDialog\.showModal\(\)/, 'opens the viewer with native dialog behavior');
assert.match(html, /event\.target === peleDialog/, 'closes the viewer from its backdrop');

const viewBox = html.match(/data-pele-open[\s\S]*?<svg[^>]+viewBox="0 0 ([\d.]+) ([\d.]+)"/);
assert.ok(viewBox, 'renders an inline Pele SVG');
assert.ok(Number(viewBox[2]) > Number(viewBox[1]), 'renders the sample flow top-to-bottom');

assert.match(interactiveHtml, /class="gpr-act-cell"/, 'renders a left-side line action column');
assert.match(interactiveHtml, /data-gpr-line="0"/, 'renders a single comment-icon trigger');
assert.match(interactiveHtml, /id="gpr-line-dialog"/, 'renders a persistent line action dialog');
assert.match(interactiveHtml, /data-gpr-action="ask"/, 'offers Ask Copilot from the line action dialog');
assert.match(interactiveHtml, /data-gpr-action="comment"/, 'offers Comment from the line action dialog');
assert.match(interactiveHtml, /submitOnEnter\('gpr-ask-text'/, 'submits dialogs with Enter');
assert.doesNotMatch(interactiveHtml, /gpr-line-actions/, 'removes right-side line actions');
