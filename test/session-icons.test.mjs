import test from 'node:test';
import assert from 'node:assert/strict';
import {createSessionIcons,SESSION_ICON_KEY,SESSION_ICONS} from '../src/session-icons.mjs';

test('five conversation motifs stay assigned after reordering and a reload',()=>{
 const saved=new Map(),storage={getItem:key=>saved.get(key),setItem:(key,value)=>saved.set(key,value)};
 const icons=createSessionIcons(storage),ids=['first','second','third','fourth','fifth'];
 assert.deepEqual(ids.map(id=>icons.get(id)),SESSION_ICONS);icons.flush();
 const restored=createSessionIcons(storage);
 assert.deepEqual([...ids].reverse().map(id=>restored.get(id)),[...SESSION_ICONS].reverse());
 assert.equal(restored.get('new-session'),SESSION_ICONS[0]);
 assert.deepEqual([...saved.keys()],[SESSION_ICON_KEY]);
});

test('invalid local display metadata and unavailable storage do not break conversation rows',()=>{
 const icons=createSessionIcons({getItem:()=>'{"next":-8,"entries":[["valid",2],["bad",99],["bad-type","0"]]}',setItem(){throw new Error('quota')}});
 assert.equal(icons.get('valid'),SESSION_ICONS[2]);assert.ok(SESSION_ICONS.includes(icons.get('bad')));assert.doesNotThrow(()=>icons.flush());
 assert.doesNotThrow(()=>createSessionIcons({getItem(){throw new Error('denied')},setItem(){}}).get('session'));
});
