import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://whzxyyggajsovyjxwfpq.supabase.co";
const SERVICE_KEY = "sb_secret_bftFd8ZctJMLE0SoYCt2VQ_w3FEvd8f";

export function getServiceSupabase() {
  return createClient(SUPABASE_URL, SERVICE_KEY);
}

export function getAnonSupabase() {
  return createClient(
    SUPABASE_URL,
    "sb_publishable_TeDY2jFuABMT-_jSr2iw3g_Vf7h16VX"
  );
}
