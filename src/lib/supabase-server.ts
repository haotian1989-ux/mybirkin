import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://whzxyyggajsovyjxwfpq.supabase.co";
const ANON_KEY = "sb_publishable_TeDY2jFuABMT-_jSr2iw3g_Vf7h16VX";

export function getServiceSupabase() {
  return createClient(SUPABASE_URL, ANON_KEY);
}

export function getAnonSupabase() {
  return createClient(SUPABASE_URL, ANON_KEY);
}
