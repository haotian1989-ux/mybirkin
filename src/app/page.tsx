import { optimizeImage } from "@/lib/image";
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { products as defaultProducts } from "@/lib/data";
import { supabase } from "@/lib/supabase";

function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(defaultProducts);
  useEffect(() => {
    supabase.from("products").select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(data.map((row: any) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          category: row.category,
          price: row.price,
          description: row.description || "",
          details: row.details || [],
          materials: row.materials || "",
          dimensions: row.dimensions || "",
          colors: row.colors || [],
          images: row.images || [],
          inStock: row.in_stock,
          featured: row.featured,
          newArrival: row.new_arrival,
        })));
      }
    });
  }, []);
  return items;
}

function useHeroConfig() {
  const [hero, setHero] = useState({
    image: "",
    tagline: "Atelier · Est. 2024",
    headline: "Where Leather\nBecomes Art",
    subtext: "Bespoke leather goods handcrafted to order by master artisans. Italian full-grain leather, timeless design, made exclusively for you.",
    primaryBtnLabel: "Explore Collection",
    secondaryBtnLabel: "Our Craft",
  });
  const [sections, setSections] = useState<any[]>([]);
  const [promise, setPromise] = useState({
    promiseTitle: "The MYBIRKIN Promise",
    promise1Title: "Italian Leather",
    promise1Text: "Full-grain hides sourced exclusively from family-owned tanneries in Tuscany, vegetable-tanned using traditions passed down through generations.",
    promise2Title: "Handcrafted to Order",
    promise2Text: "No inventory, no mass production. Each piece is cut, stitched, and finished by a single artisan after you place your order.",
    promise3Title: "Lifetime Care",
    promise3Text: "Every MYBIRKIN piece includes complimentary conditioning and repair for life. We stand behind our work, forever.",
  });

  useEffect(() => {
    supabase.from("homepage_hero").select("*").limit(1).maybeSingle().then(({ data: h }) => {
      if (h) {
        setHero((prev) => ({
          ...prev,
          image: h.image || prev.image,
          tagline: h.tagline || prev.tagline,
          headline: h.headline || prev.headline,
          subtext: h.subtext || prev.subtext,
          primaryBtnLabel: h.primary_btn_label || prev.primaryBtnLabel,
          secondaryBtnLabel: h.secondary_btn_label || prev.secondaryBtnLabel,
        }));
      }
    });
    supabase.from("homepage_sections").select("*").order("sort_order").then(({ data: s }) => {
      if (s && s.length > 0) {
        setPromise(s[0] as any);
      }
      setSections(s || []);
    });
  }, []);

  return { hero, promise, sections };
}

export default function Home() {
  const products = useProducts();
  const { hero, promise, sections } = useHeroConfig();

  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.newArrival);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[650px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/10 z-10" />
        <img src={hero.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding max-w-2xl">
          <p className="section-label mb-6 tracking-label">{hero.tagline}</p>
          <h1 className="font-serif text-display text-paper mb-8 text-balance whitespace-pre-line">
            {hero.headline}
          </h1>
          <p className="text-paper/70 text-base md:text-lg leading-relaxed mb-10 max-w-md font-light">
            {hero.subtext}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary bg-paper text-charcoal hover:bg-gold hover:text-charcoal border-0">
              {hero.primaryBtnLabel || '探索系列'}
            </Link>
            <Link href="/craft" className="btn-outline border-paper/30 text-paper hover:bg-paper/10 hover:border-paper/50">
              {hero.secondaryBtnLabel || '匠心工艺'}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="w-5 h-8 border border-paper/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-paper/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="page-padding py-24 md:py-32">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-label mb-3">Just Landed</p>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link href="/shop" className="hidden md:block btn-ghost">View All →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {newArrivals.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-24 md:py-32 bg-ivory/30">
          <div className="page-padding">
            <p className="section-label mb-3">Curated Selection</p>
            <h2 className="section-title mb-14">Featured Pieces</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        </section>
      )}

      {/* Collections */}
      <section className="page-padding py-24 md:py-32">
        <h2 className="section-title text-center mb-16">Our Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
          {[
            { title: "Handbags", image: "", href: "/shop?category=handbags" },
            { title: "Charms & Accents", image: "", href: "/shop?category=charms" },
            { title: "Pet Collection", image: "", href: "/shop?category=pet" },
          ].map((cat) => (
            <Link key={cat.title} href={cat.href} className="group relative aspect-[4/5] overflow-hidden">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-paper tracking-wide">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="bg-charcoal text-paper py-24 md:py-32">
        <div className="page-padding max-w-5xl mx-auto text-center">
          <p className="section-label mb-8 text-gold">{promise.promiseTitle}</p>
          <h2 className="font-serif text-heading mb-16 text-balance">
            One artisan. One piece.<br />One promise.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              { title: promise.promise1Title, desc: promise.promise1Text },
              { title: promise.promise2Title, desc: promise.promise2Text },
              { title: promise.promise3Title, desc: promise.promise3Text },
            ].map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-lg text-gold mb-3">{p.title}</h3>
                <p className="text-sm text-paper/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="page-padding py-24 md:py-32 text-center max-w-3xl mx-auto">
        <p className="section-label mb-3">Bespoke</p>
        <h2 className="section-title mb-6">Design Your Own</h2>
        <p className="body-text max-w-xl mx-auto mb-10">
          Choose your leather, hardware, silhouette, and artisan. Create a piece that is unmistakably yours.
        </p>
        <Link href="/builder" className="btn-primary">Start Customizing</Link>
      </section>
    </>
  );
}

