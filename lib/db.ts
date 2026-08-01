import { supabase } from './supabase';

/**
 * Generic access to the collection tables.
 *
 * Every collection is stored in a table with the same shape:
 *   id text primary key, position int, data jsonb, updated_at timestamptz
 * The `data` column holds the full record exactly as the app's TypeScript
 * types expect it, so no per-field mapping is needed and the same code path
 * serves any collection.
 *
 * Returns `null` (rather than throwing) when Supabase is not configured or a
 * request fails, so callers can fall back to bundled mock data.
 */
export async function fetchCollection<T>(table: string): Promise<T[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from(table)
      .select('data, position')
      .order('position', { ascending: true });
    if (error) {
      if (typeof console !== 'undefined') console.warn(`[supabase] ${table}: ${error.message}`);
      return null;
    }
    return (data ?? []).map((row) => (row as { data: T }).data);
  } catch (err) {
    if (typeof console !== 'undefined') console.warn(`[supabase] ${table}:`, err);
    return null;
  }
}
