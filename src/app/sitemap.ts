import type { MetadataRoute } from "next";
import { getServiceSupabase } from "@/lib/supabase-server";
import { products as defaultProducts } from "@/lib/data";

// 每小时重新生成，保证新文章/新商品及时进入 sitemap
export const revalidate = 3600;

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
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = defaultProducts.map((p) => p.slug);
  let blogSlugs: string[] = [];
  try {
    const supabase = getServiceSupabase();
    const [{ data, error }, blogResult] = await Promise.all([
      supabase.from("products").select("slug"),
      supabase.from("blog_posts").select("slug").eq("status", "published"),
    ]);
    if (!error && data && data.length > 0) {
      slugs = data.map((row: any) => row.slug).filter(Boolean);
    }
    if (!blogResult.error && blogResult.data && blogResult.data.length > 0) {
      blogSlugs = blogResult.data.map((row: any) => row.slug).filter(Boolean);
    }
  } catch (e: any) {
    console.error("[sitemap] fetch failed:", e?.message || e);
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
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return entries;
}
