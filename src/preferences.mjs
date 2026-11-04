export const STORAGE_KEY = 'dsh:ekko-miku:v1';
export const DEFAULTS = Object.freeze({ enabled: true, artwork: true, companion: true, polaroid: true, opacity: 0.12 });
export function normalizeSettings(value) {
  const v = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return { enabled: typeof v.enabled === 'boolean' ? v.enabled : true,
    artwork: typeof v.artwork === 'boolean' ? v.artwork : true,
    companion: typeof v.companion === 'boolean' ? v.companion : true,
    polaroid: typeof v.polaroid === 'boolean' ? v.polaroid : true,
    opacity: typeof v.opacity === 'number' && Number.isFinite(v.opacity) ? Math.min(0.24, Math.max(0.04, v.opacity)) : DEFAULTS.opacity };
}
export function readSettings(storage) {
  try { return normalizeSettings(JSON.parse(storage.getItem(STORAGE_KEY))); } catch { return { ...DEFAULTS }; }
}
