import test from 'node:test';import assert from 'node:assert/strict';
import {normalizeSettings,readSettings,DEFAULTS} from '../src/preferences.mjs';
test('untrusted saved presentation values are clamped and never affect host configuration',()=>{
 assert.deepEqual(normalizeSettings({enabled:'no',opacity:100,unknown:'ignore'}),{...DEFAULTS,opacity:.24});
 assert.equal(normalizeSettings({opacity:NaN}).opacity,.12);assert.equal(normalizeSettings({opacity:-1}).opacity,.04);
 assert.deepEqual(readSettings({getItem(){throw new Error('Storage disabled')}}),DEFAULTS);
 assert.deepEqual(readSettings({getItem:()=>'{malformed'}),DEFAULTS);
 assert.equal(normalizeSettings({mobileNav:'rail'}).mobileNav,'rail');
 assert.equal(normalizeSettings({mobileNav:'topbar'}).mobileNav,'corner');
});
