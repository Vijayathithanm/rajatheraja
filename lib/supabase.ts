import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for the browser.
 *
 * Configured via public env vars (safe to expose — the anon key is designed to
 * be public and is protected by Row-Level Security):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * When they are not set, `supabase` is null and the app transparently falls
 * back to the bundled mock data, so the site works with or without a database.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, { auth: { persistSession: false } })
  : null;
