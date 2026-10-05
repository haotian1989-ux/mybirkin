import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase-server";
import { BlogPost, BlogBlock } from "@/lib/types";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const BASE = "https://www.mybirkin.com";

// 品牌词自动加内部链接（SEO 内链）：正文中的 MYBIRKIN 统一指向首页，
// 裸写的 mybirkin.com URL 也转为可点击外链
function linkify(text: string) {
  const parts = text.split(/(MYBIRKIN|https:\/\/www\.mybirkin\.com\/?)/g);
  if (parts.length <= 1) return text;
  return parts.map((part, i) => {
    if (part === "MYBIRKIN") {
      return (
        <a
          key={i}
          href="/"
          className="underline decoration-gold/40 underline-offset-4 hover:text-gold transition-colors"
        >
          MYBIRKIN
        </a>
      );
    }
    if (/^https:\/\/www\.mybirkin\.com\/?$/.test(part)) {
      return (
        <a
          key={i}
          href="https://www.mybirkin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gold/40 underline-offset-4 hover:text-gold transition-colors break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

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

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (!error && data) return mapRow(data);
  } catch (e: any) {
    console.error("[blog post] fetch failed:", e?.message || e);
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) return { title: "Article Not Found" };

  const description = post.meta_description
    ? post.meta_description
    : `Read "${post.title}" — from the MYBIRKIN Journal.`;

  return {
    title: { absolute: post.title },
    description,
    alternates: { canonical: `${BASE}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${BASE}/blog/${post.slug}`,
      siteName: "MYBIRKIN",
      images: post.cover_image ? [post.cover_image] : undefined,
      publishedTime: post.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderBlocks(blocks: BlogBlock[]) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case "h2":
        return (
          <h2 key={i} className="font-serif text-2xl md:text-3xl mt-12 mb-5 leading-snug">
            {linkify(b.text)}
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} className="font-serif text-xl mt-10 mb-4">
            {linkify(b.text)}
          </h3>
        );
      case "list":
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 my-5 text-[15px] leading-relaxed text-charcoal/80">
            {b.text.split("\n").filter(Boolean).map((line, li) => (
              <li key={li}>{linkify(line)}</li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote key={i} className="border-l-2 border-gold pl-6 my-8 font-serif text-lg italic text-smoke">
            {linkify(b.text)}
          </blockquote>
        );
      case "image":
        return b.image ? (
          <figure key={i} className="my-10">
            <img src={b.image} alt={b.text || "MYBIRKIN atelier craftsmanship"} className="w-full" />
            {b.text && (
              <figcaption className="text-[11px] tracking-label uppercase text-smoke/40 mt-3 text-center">
                {b.text}
              </figcaption>
            )}
          </figure>
        ) : null;
      default:
        return (
          <p key={i} className="text-[15px] leading-[1.9] text-charcoal/80 my-5">
            {linkify(b.text)}
          </p>
        );
    }
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || undefined,
    image: post.cover_image || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.published_at || undefined,
    articleSection: post.category || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "MYBIRKIN Bespoke Leather Atelier",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "MYBIRKIN",
      url: BASE,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article className="page-padding pt-16 pb-10 md:pt-24">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4 text-gold">{post.category}</p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-6">{post.title}</h1>
          <p className="text-[10px] tracking-label uppercase text-smoke/50 mb-10">
            {formatDate(post.published_at)} · The MYBIRKIN Atelier
          </p>
          {post.cover_image && (
            <div className="aspect-[16/9] overflow-hidden mb-12 bg-charcoal/10">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="max-w-2xl mx-auto">
            {post.blocks.length > 0 ? (
              renderBlocks(post.blocks)
            ) : (
              <p className="text-sm text-smoke/40">This article is being completed.</p>
            )}
          </div>
        </div>
      </article>

      <section className="page-padding py-20 bg-ivory/30 text-center">
        <p className="section-label mb-3">Handcrafted to Order</p>
        <h2 className="section-title mb-4">Design Your Own Piece</h2>
        <p className="body-text max-w-md mx-auto mb-8">
          Choose your leather, hardware, and artisan. Create a one-of-a-kind MYBIRKIN piece.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">Explore the Collection</Link>
          <Link href="/builder" className="btn-outline">Start Customizing</Link>
          <Link href="/blog" className="btn-outline">Back to Journal</Link>
        </div>
      </section>
    </>
  );
}
