import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://whzxyyggajsovyjxwfpq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TeDY2jFuABMT-_jSr2iw3g_Vf7h16VX";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getClient() as any)[prop];
  },
});
