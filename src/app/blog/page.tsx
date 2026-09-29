import type { Metadata } from "next";
import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase-server";
import { BlogPost, BlogBlock } from "@/lib/types";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const BASE = "https://www.mybirkin.com";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "The MYBIRKIN Journal — expert guides to luxury leathers, atelier craftsmanship, and bespoke design.",
  alternates: { canonical: BASE + "/blog" },
};

const PLACEHOLDER = "https://placehold.co/1200x675/1a1a1a/d4af37?text=MYBIRKIN+Journal";

function mapRow(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    meta_description: row.meta_description || "",
    category: row.category || "",
    cover_image: row.cover_image || "",
    status: row.status,
    blocks: (row.blocks as BlogBlock[]) || [],
    published_at: row.published_at,
    created_at: row.created_at,
  };
}

function excerpt(post: BlogPost): string {
  const first = post.blocks.find((b) => b.type === "paragraph");
  if (!first) return post.meta_description;
  return first.text.length > 160 ? first.text.slice(0, 157).trimEnd() + "…" : first.text;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

async function fetchPublished(): Promise<BlogPost[]> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false });
    if (!error && data) return data.map(mapRow);
  } catch (e: any) {
    console.error("[blog] fetch failed:", e?.message || e);
  }
  return [];
}

export default async function BlogPage() {
  const posts = await fetchPublished();

  return (
    <>
      <section className="page-padding pt-20 pb-10 md:pt-28 md:pb-14 text-center">
        <p className="section-label mb-3">MYBIRKIN</p>
        <h1 className="font-serif text-display">The Journal</h1>
        <p className="body-text max-w-xl mx-auto mt-5">
          Expert guides to luxury leathers and the atelier craft behind every bespoke piece.
        </p>
      </section>

      <section className="page-padding pb-24">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-sm text-smoke/40 py-16 border border-dashed border-line">
              New stories are being crafted. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                  <div className="aspect-[16/9] overflow-hidden bg-charcoal/10 mb-5">
                    <img
                      src={p.cover_image || PLACEHOLDER}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <p className="section-label mb-2 text-gold">{p.category}</p>
                  <h2 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-gold transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-sm text-smoke/70 mt-2 leading-relaxed">{excerpt(p)}</p>
                  <p className="text-[10px] tracking-label uppercase text-smoke/40 mt-3">
                    {formatDate(p.published_at)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-padding py-20 bg-ivory/30 text-center">
        <p className="section-label mb-3">Bespoke</p>
        <h2 className="section-title mb-4">Design Your Own</h2>
        <p className="body-text max-w-md mx-auto mb-8">
          Choose your leather, hardware, and artisan. Create a one-of-a-kind piece.
        </p>
        <Link href="/builder" className="btn-primary">Start Customizing</Link>
      </section>
    </>
  );
}
