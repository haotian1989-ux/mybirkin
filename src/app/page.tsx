"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { products as defaultProducts } from "@/lib/data";

function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(defaultProducts);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("myb_admin_products");
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length > 0) setItems(p); }
    } catch {}
    const h = () => {
      try {
        const r = localStorage.getItem("myb_admin_products");
        if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length > 0) setItems(p); }
      } catch {}
    };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);
  return items;
}

function useHeroConfig() {
  const [hero, setHero] = useState({
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85",
    tagline: "Atelier · Est. 2024",
    headline: "Where Leather\nBecomes Art",
    subtext: "Bespoke leather goods handcrafted to order by master artisans. Italian full-grain leather, timeless design, made exclusively for you.",
    primaryBtnLabel: "Explore Collection",
    secondaryBtnLabel: "Our Craft",
  });
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
    try {
      const h = localStorage.getItem("myb_homepage_hero");
      if (h) setHero(JSON.parse(h));
      const p = localStorage.getItem("myb_homepage_sections");
      if (p) setPromise(JSON.parse(p));
    } catch {}
    const handler = () => {
      try {
        const h2 = localStorage.getItem("myb_homepage_hero");
        if (h2) setHero(JSON.parse(h2));
        const p2 = localStorage.getItem("myb_homepage_sections");
        if (p2) setPromise(JSON.parse(p2));
      } catch {}
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { hero, promise };
}

export default function Home() {
  const products = useProducts();
  const { hero, promise } = useHeroConfig();

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
              {hero.primaryBtnLabel}
            </Link>
            <Link href="/craft" className="btn-outline border-paper/30 text-paper hover:bg-paper/10 hover:border-paper/50">
              {hero.secondaryBtnLabel}
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
              <p className="section-label mb-3">新品上架</p>
              <h2 className="section-title">新品上架</h2>
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
            <p className="section-label mb-3">精选推荐</p>
            <h2 className="section-title mb-14">精选单品</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        </section>
      )}

      {/* Collections */}
      <section className="page-padding py-24 md:py-32">
        <h2 className="section-title text-center mb-16">系列分类</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
          {[
            { title: "手袋", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=85", href: "/shop?category=handbags" },
            { title: "挂件与配饰", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85", href: "/shop?category=charms" },
            { title: "宠物系列", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=85", href: "/shop?category=pet" },
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
        <p className="section-label mb-3">定制服务</p>
        <h2 className="section-title mb-6">设计您的专属</h2>
        <p className="body-text max-w-xl mx-auto mb-10">
          选择您的皮料、五金、款型和工匠。创造一件独一无二、属于您的作品。
        </p>
        <Link href="/builder" className="btn-primary">开始定制</Link>
      </section>
    </>
  );
}
