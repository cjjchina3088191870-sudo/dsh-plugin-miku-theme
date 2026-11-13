import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';

const require = createRequire(process.env.DSH_MIKU_TOOLCHAIN || new URL('../package.json', import.meta.url));
const {JSDOM} = require('jsdom');

test('Skirk presentation owns its scene and releases tokens, layout marks and listeners without replacing the native editor', async () => {
  const dom = new JSDOM(`<!doctype html><html lang="zh-CN"><head></head><body>
    <aside data-slot="sidebar"><button class="sidebar_newSession">新会话</button></aside>
    <main class="app_frame"><section class="app_centerCol" data-skirk-center="native-mark">
      <div data-slot="conversation.header"><header><strong>原生会话标题</strong></header></div>
      <div data-slot="main.conversation"><div data-phase="hero">
        <div class="chat_composerHero"><div class="hero_root"><div class="hero_stack">
          <span data-slot="conversation.hero.brand.mark"></span>
        </div></div>
        <div data-slot="conversation.composer.bar"><div class="composer_root">
          <div data-slot="conversation.composer"><div contenteditable="true">已有草稿与附件标记</div></div>
        </div></div>
        </div>
      </div></div>
    </section></main>
  </body></html>`, {url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true});
  const w = dom.window;
  const providers = new Map();
  const registrationEffects = [];
  const presentationEffects = [];
  const tokenClaims = [];
  const tokenReleases = [];
  let plugin;
  w.__ModuleLoader__ = {load(entry) {
    plugin = entry.factory(id => id === 'react' ? {createElement() {}, useEffect() {}, useSyncExternalStore() {}} : require(id));
  }};
  w.eval(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'));
  const editor = w.document.querySelector('[contenteditable]');
  const composer = w.document.querySelector('.composer_root');
  let nativeInputCount = 0;
  editor.addEventListener('input', () => nativeInputCount++);
  plugin.apply({
    root: {plugin() {return {dispose() {}};}},
    inject(names, callback) {callback({get() {return {register(provider) {
      providers.set(provider.id, provider);
      return () => providers.delete(provider.id);
    }};}, effect(callback) {registrationEffects.push(callback());}});},
    effect(callback) {registrationEffects.push(callback());},
  });
  const provider = providers.get('skirk');
  assert.ok(provider, 'bundled theme registers the third provider');
  assert.equal(w.document.querySelector('.skirk-scene'), null, 'registration alone is passive');
  const settingsKey = provider.storageKey;
  try {
    assert.equal(provider.normalizeSettings({opacity: 200}).opacity, .24);
    assert.equal(provider.normalizeSettings({opacity: -20}).opacity, .04);
    assert.equal(provider.normalizeSettings({opacity: NaN, mobileNav: 'invalid'}).opacity, .18);
    assert.equal(provider.normalizeSettings({mobileNav: 'invalid'}).mobileNav, 'corner');
    provider.plugin.apply({
      get(name) {
        if (name === 'theme') return {overrideTokens(owner, tokens) {
          tokenClaims.push(owner);
          assert.ok(Object.values(tokens).every(v => typeof v.light === 'string' && typeof v.dark === 'string'));
          return () => tokenReleases.push(owner);
        }};
        return {};
      },
      slots: {inject(name, callback) {callback();}, register() {return () => {}; }},
      effect(callback) {presentationEffects.push(callback());},
    });
    assert.equal(w.document.body.hasAttribute('data-dsh-ekko-skirk'), true);
    assert.equal(w.document.body.dataset.skirkPage, 'welcome');
    assert.equal(w.document.querySelectorAll('.skirk-welcome').length, 1);
    assert.equal(w.document.querySelectorAll('.skirk-scene').length, 1);
    assert.equal(w.document.querySelectorAll('.skirk-scene img').length, 3);
    assert.equal(w.document.querySelectorAll('.skirk-shortcut').length, 3);
    assert.equal(w.document.querySelector('[contenteditable]'), editor);
    assert.equal(composer.hasAttribute('data-skirk-editor'), true);
    assert.equal(w.document.querySelectorAll('.skirk-header-label').length, 1);
    const root = w.document.querySelector('[data-phase]');
    const seat = w.document.querySelector('.chat_composerHero');
    // Native React first changes phase while retaining the composer and can
    // leave its hero descendants in place until the rest of the commit lands.
    root.dataset.phase = 'active';
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(w.document.body.dataset.skirkPage, 'conversation');
    assert.equal(w.document.querySelector('[data-skirk-hero]'), null);
    assert.equal(w.document.querySelector('[data-skirk-hero-shell]'), null);
    assert.equal(w.document.querySelector('[data-skirk-hero-content]'), null);
    assert.equal(w.document.querySelector('.skirk-welcome'), null);
    assert.equal(w.document.querySelector('.skirk-runner-lane'), null);
    assert.equal(w.document.querySelector('.skirk-header-label'), null);
    assert.equal(w.document.body.style.getPropertyValue('--skirk-home-height'), '');
    assert.equal(seat.contains(editor), true);
    assert.equal(w.document.querySelector('[contenteditable]'), editor);
    root.dataset.phase = 'hero';
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(w.document.body.dataset.skirkPage, 'welcome');
    assert.equal(w.document.querySelectorAll('.skirk-welcome').length, 1);
    assert.equal(w.document.querySelectorAll('.skirk-runner-lane').length, 1);
    assert.equal(w.document.querySelectorAll('.skirk-runner').length, 3);
    assert.equal(seat.hasAttribute('data-skirk-hero'), true);
    const mutations = new w.MutationObserver(() => {});
    mutations.observe(w.document.body, {attributes: true, childList: true, subtree: true});
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(mutations.takeRecords().length, 0, 'idle phase observers do not keep rewriting the DOM');
    mutations.disconnect();
    root.dataset.phase = 'active';
    seat.className = 'chat_composerStack';
    w.document.querySelector('.hero_root').remove();
    root.prepend(w.document.createElement('article'));
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(w.document.querySelector('.skirk-welcome'), null);
    assert.equal(w.document.querySelector('.skirk-header-label'), null);
    assert.equal(w.document.body.dataset.skirkPage, 'conversation');
    assert.equal(w.document.querySelectorAll('.skirk-scene').length, 1, 'transition reuses its scene');
    assert.equal(w.document.querySelectorAll('.skirk-scene img').length, 3);
    assert.equal(w.document.querySelector('[contenteditable]'), editor);
    assert.equal(w.document.querySelector('.chat_composerStack'), seat, 'the native composer wrapper is reused');
    assert.equal(seat.hasAttribute('data-skirk-hero'), false);
    assert.equal(editor.textContent, '已有草稿与附件标记');
    w.localStorage.setItem(settingsKey, JSON.stringify({opacity: 99, artwork: false, companion: false}));
    w.dispatchEvent(new w.StorageEvent('storage', {key: settingsKey}));
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(w.document.body.dataset.skirkArtwork, 'false');
    assert.equal(w.document.body.dataset.skirkCompanion, 'false');
    assert.equal(w.document.body.style.getPropertyValue('--skirk-mobile-figure-opacity'), '0.24');
    editor.dispatchEvent(new w.Event('input', {bubbles: true}));
    assert.equal(nativeInputCount, 1, 'native editor listeners survive');
    for (const cleanup of presentationEffects.splice(0).reverse()) cleanup?.();
    assert.equal(w.document.querySelector('.skirk-styles'), null);
    assert.equal(w.document.querySelector('.skirk-scene'), null);
    assert.equal(w.document.querySelector('.skirk-desktop-rail'), null);
    assert.equal(w.document.body.hasAttribute('data-dsh-ekko-skirk'), false);
    assert.equal(w.document.body.hasAttribute('data-skirk-page'), false);
    assert.equal(w.document.body.style.getPropertyValue('--skirk-mobile-figure-opacity'), '');
    assert.equal(w.document.querySelector('.app_centerCol').getAttribute('data-skirk-center'), 'native-mark');
    assert.equal(w.document.querySelector('[data-skirk-frame]'), null);
    assert.equal(w.document.querySelector('[data-skirk-editor]'), null);
    assert.equal(w.document.querySelector('[data-skirk-header]'), null);
    assert.deepEqual(tokenReleases, tokenClaims);
    w.dispatchEvent(new w.StorageEvent('storage', {key: settingsKey}));
    w.dispatchEvent(new w.Event('resize'));
    await new Promise(resolve => w.setTimeout(resolve, 60));
    assert.equal(w.document.querySelector('.skirk-scene'), null, 'disposed listeners cannot remount presentation');
    assert.equal(w.document.querySelector('[contenteditable]'), editor);
  } finally {
    for (const cleanup of presentationEffects.reverse()) cleanup?.();
    for (const cleanup of registrationEffects.reverse()) cleanup?.();
    assert.equal(providers.size, 0);
    w.close();
  }
});
