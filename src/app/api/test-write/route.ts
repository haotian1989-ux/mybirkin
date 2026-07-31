import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServiceSupabase();
  const steps: any[] = [];

  // 1. Check current state
  const { data: before, error: beforeErr } = await supabase
    .from("homepage_sections")
    .select("*");
  steps.push({ step: "before", count: before?.length, error: beforeErr?.message || null });

  // 2. Insert a test row
  const { data: inserted, error: insErr } = await supabase
    .from("homepage_sections")
    .insert({ title: "TEST", description: "test", image: "", link: "/test", sort_order: 99 })
    .select();
  steps.push({ step: "insert", ok: !insErr, error: insErr?.message || null, inserted: inserted });

  // 3. Read back
  const { data: after, error: afterErr } = await supabase
    .from("homepage_sections")
    .select("*");
  steps.push({ step: "after_insert", count: after?.length, error: afterErr?.message || null });

  // 4. Delete test row
  if (inserted && inserted.length > 0) {
    const { error: delErr } = await supabase
      .from("homepage_sections")
      .delete()
      .eq("title", "TEST");
    steps.push({ step: "cleanup", ok: !delErr, error: delErr?.message || null });
  }

  // 5. Final state
  const { data: final } = await supabase
    .from("homepage_sections")
    .select("*");
  steps.push({ step: "final", count: final?.length });

  return NextResponse.json({ supabaseUrl: "https://whzxyyggajsovyjxwfpq.supabase.co", steps });
}
