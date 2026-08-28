import type { MetadataRoute } from "next";
import { getServiceSupabase } from "@/lib/supabase-server";
import { products as defaultProducts } from "@/lib/data";

const BASE = "https://www.mybirkin.com";

const staticPaths = [
  "/shop",
  "/builder",
  "/craft",
  "/craft/leather",
  "/craft/hardware",
  "/craft/artisans",
  "/craft/process",
  "/about",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = defaultProducts.map((p) => p.slug);
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from("products").select("slug");
    if (!error && data && data.length > 0) {
      slugs = data.map((row: any) => row.slug).filter(Boolean);
    }
  } catch (e: any) {
    console.error("[sitemap] products fetch failed:", e?.message || e);
  }

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...staticPaths.map((path) => ({
      url: BASE + path,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${BASE}/product/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return entries;
}
