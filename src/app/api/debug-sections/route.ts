import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServiceSupabase();

  const { data: sections, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("sort_order");

  const { data: hero } = await supabase
    .from("homepage_hero")
    .select("*")
    .limit(1)
    .maybeSingle();

  return NextResponse.json({
    sections: sections || [],
    sectionsCount: sections?.length || 0,
    sectionsError: error?.message || null,
    hero: hero || null,
  });
}
