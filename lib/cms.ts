/**
 * cms.ts — a tiny client-side content store.
 *
 * Because the site is a static export with no backend, the Admin dashboard
 * persists edits to `localStorage`. `readCollection` merges any saved override
 * on top of the bundled seed data so the rest of the app transparently sees
 * admin changes. In a production deployment this module would be replaced by
 * calls to a real CMS / database.
 */

const PREFIX = 'ilaiyaraaja.cms.';

function isBrowser() {
  return typeof window !== 'undefined';
}

/** Read a collection, preferring an admin override if one exists. */
export function readCollection<T>(key: string, seed: T[]): T[] {
  if (!isBrowser()) return seed;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : seed;
  } catch {
    return seed;
  }
}

export function writeCollection<T>(key: string, value: T[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('cms:update', { detail: { key } }));
}

export function resetCollection(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(PREFIX + key);
  window.dispatchEvent(new CustomEvent('cms:update', { detail: { key } }));
}

/** Simple demo auth flag for the admin area. */
export function isAdminAuthed() {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(PREFIX + 'auth') === 'true';
}
export function setAdminAuthed(v: boolean) {
  if (!isBrowser()) return;
  if (v) window.localStorage.setItem(PREFIX + 'auth', 'true');
  else window.localStorage.removeItem(PREFIX + 'auth');
}
