import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createController, readSelection, SELECTION_KEY} from '../integrated/src/controller.mjs';
import {createHandler} from '../integrated/src/index.mjs';

function memoryStorage(initial = {}) {
  const entries = new Map(Object.entries(initial));
  return {getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value)};
}

test('Skirk is a persisted manager selection and switching disposes the previous presentation first', async () => {
  const storage = memoryStorage();
  const events = [];
  let active = null;
  const controller = createController({storage, fallback: 'skirk', mount(provider) {
    assert.equal(active, null, 'only one theme presentation may be active');
    active = provider.id;
    events.push(`mount:${provider.id}`);
    return {
      async ready() { events.push(`ready:${provider.id}`); },
      async dispose() { events.push(`dispose:${provider.id}`); active = null; },
    };
  }});
  try {
    for (const id of ['rose', 'miku', 'skirk']) controller.register({id, plugin: {apply() {}}});
    await controller.initialize('skirk', ['rose', 'miku', 'skirk']);
    assert.equal(controller.getSnapshot().selected, 'skirk');
    assert.equal(readSelection(storage), 'skirk');
    await controller.choose('miku');
    await controller.choose('skirk');
    await controller.choose('default');
    assert.equal(active, null);
    assert.equal(controller.getSnapshot().selected, 'default');
    assert.equal(controller.getSnapshot().busy, false);
    assert.deepEqual(events, [
      'mount:skirk', 'ready:skirk', 'dispose:skirk',
      'mount:miku', 'ready:miku', 'dispose:miku',
      'mount:skirk', 'ready:skirk', 'dispose:skirk',
    ]);
  } finally { await controller.dispose(); }
});

test('a saved Skirk choice waits for its provider without mounting another theme', async () => {
  const storage = memoryStorage({[SELECTION_KEY]: JSON.stringify({version: 1, skin: 'skirk'})});
  const mounted = [];
  const controller = createController({storage, mount(provider) {
    mounted.push(provider.id);
    return {async ready() {}, async dispose() {}};
  }});
  try {
    controller.register({id: 'miku', plugin: {apply() {}}});
    await controller.initialize('miku', ['miku', 'skirk']);
    assert.deepEqual(mounted, []);
    assert.equal(controller.getSnapshot().desired, 'skirk');
    controller.register({id: 'skirk', plugin: {apply() {}}});
    await controller.settled();
    assert.deepEqual(mounted, ['skirk']);
    assert.equal(controller.getSnapshot().selected, 'skirk');
    await assert.rejects(controller.choose('../skirk'), /Unknown skin/);
  } finally { await controller.dispose(); }
});

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'dsh-skirk-manager-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const meta = {version: '0.3.2', dsh: {ekkoSkinProvider: 1}};
  await writeFile(join(root, 'package.json'), JSON.stringify(meta));
  for (const dir of ['assets/runtime', 'assets/skirk/runtime', 'preview/skirk']) await mkdir(join(root, dir), {recursive: true});
  const files = {};
  for (const id of ['miku', 'skirk']) {
    const bytes = Buffer.from(`private-to-${id}-artwork`);
    const filename = createHash('sha256').update(bytes).digest('hex') + '.png';
    const assetDir = id === 'skirk' ? 'assets/skirk' : 'assets';
    await writeFile(join(root, assetDir, 'manifest.json'), JSON.stringify({figure: filename}));
    await writeFile(join(root, assetDir, 'runtime', filename), bytes);
    files[id] = {filename, bytes};
  }
  const handler = createHandler({defaultSkin: 'skirk', resolvePackage(name) {
    if (name !== 'dsh-plugin-miku-theme') throw new Error('not installed');
    return root;
  }});
  return {root, meta, files, handler};
}

async function request(handler, url, method = 'GET', headers = {}) {
  const response = {status: null, headers: {}, body: Buffer.alloc(0),
    writeHead(status, values = {}) { this.status = status; this.headers = values; return this; },
    end(body) { this.body = body == null ? Buffer.alloc(0) : Buffer.from(body); return this; },
  };
  await handler({url, method, headers}, response);
  return response;
}

test('catalog advertises Skirk only when the installed provider explicitly declares it', async t => {
  const {root, meta, handler} = await fixture(t);
  let result = JSON.parse((await request(handler, '/ekko-skins/catalog')).body);
  assert.equal(result.skins.find(skin => skin.id === 'skirk').available, false);
  assert.equal(result.skins.find(skin => skin.id === 'miku').available, true);
  assert.equal(result.defaultSkin, 'miku');
  meta.dsh.ekkoSkins = 'skirk';
  await writeFile(join(root, 'package.json'), JSON.stringify(meta));
  result = JSON.parse((await request(handler, '/ekko-skins/catalog')).body);
  assert.equal(result.skins.find(skin => skin.id === 'skirk').available, false, 'a string is not a skin-id declaration array');
  meta.dsh.ekkoSkins = ['miku', 'skirk'];
  await writeFile(join(root, 'package.json'), JSON.stringify(meta));
  result = JSON.parse((await request(handler, '/ekko-skins/catalog')).body);
  assert.equal(result.skins.find(skin => skin.id === 'skirk').available, true);
  assert.equal(result.defaultSkin, 'skirk');
  meta.dsh.ekkoSkinProvider = 0;
  await writeFile(join(root, 'package.json'), JSON.stringify(meta));
  result = JSON.parse((await request(handler, '/ekko-skins/catalog')).body);
  assert.equal(result.skins.find(skin => skin.id === 'skirk').available, false);
  assert.equal(result.defaultSkin, 'default');
});

test('Skirk and Miku artwork routes use independent manifests and directories', async t => {
  const {files, handler} = await fixture(t);
  for (const [id, other] of [['skirk', 'miku'], ['miku', 'skirk']]) {
    const path = `/ekko-skins/assets/${id}/${files[id].filename}`;
    const response = await request(handler, path);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, files[id].bytes);
    assert.equal(response.headers['Content-Type'], 'image/png');
    assert.match(response.headers['Cache-Control'], /immutable/);
    assert.equal((await request(handler, `/ekko-skins/assets/${id}/${files[other].filename}`)).status, 404);
    const head = await request(handler, path, 'HEAD');
    assert.equal(head.status, 200);
    assert.equal(head.body.length, 0);
    assert.equal(head.headers['Content-Length'], files[id].bytes.length);
    const cached = await request(handler, path, 'GET', {'if-none-match': response.headers.ETag});
    assert.equal(cached.status, 304);
    assert.equal(cached.body.length, 0);
  }
});

test('artwork must be allowlisted even when the file exists, and traversal is rejected', async t => {
  const {root, handler} = await fixture(t);
  const hidden = 'a'.repeat(64) + '.png';
  await writeFile(join(root, 'assets/skirk/runtime', hidden), 'not public');
  const paths = [
    `/ekko-skins/assets/skirk/${hidden}`,
    '/ekko-skins/assets/skirk/../../../package.json',
    '/ekko-skins/assets/skirk/%2e%2e%2fpackage.json',
    '/ekko-skins/assets/skirk/%252e%252e%252fpackage.json',
    '/ekko-skins/assets/skirk/manifest.json',
    '/ekko-skins/assets/skirk/not-a-content-hash.png',
    '/ekko-skins/preview/skirk/../../package.json',
    '/ekko-skins/preview/skirk/package.json',
  ];
  for (const path of paths) {
    const response = await request(handler, path);
    assert.equal(response.status, 404, path);
    assert.equal(response.body.length, 0, path);
  }
});

test('Skirk preview uses its own directory and asset endpoints reject write methods', async t => {
  const {root, handler, files} = await fixture(t);
  await writeFile(join(root, 'preview/skirk/light.webp'), 'skirk-preview');
  assert.equal((await request(handler, '/ekko-skins/preview/skirk/light.webp')).body.toString(), 'skirk-preview');
  assert.equal((await request(handler, '/ekko-skins/preview/miku/light.webp')).status, 404);
  for (const method of ['POST', 'PUT', 'DELETE', 'PATCH']) {
    const response = await request(handler, `/ekko-skins/assets/skirk/${files.skirk.filename}`, method);
    assert.equal(response.status, 405);
    assert.equal(response.headers.Allow, 'GET, HEAD');
    assert.equal(response.body.length, 0);
  }
});
