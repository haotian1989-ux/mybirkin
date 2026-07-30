"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

interface Props {
  heroImage: string;
  heroTagline: string;
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  sections: any[];
  products: Product[];
}

export default function HomeClient({
  heroImage, heroTagline, heroHeadline, heroSubtext,
  heroPrimaryBtn, heroSecondaryBtn,
  sections, products,
}: Props) {
  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.newArrival);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[650px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/10 z-10" />
        {heroImage && <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="relative z-20 page-padding max-w-2xl">
          <p className="section-label mb-6 tracking-label">{heroTagline}</p>
          <h1 className="font-serif text-display text-paper mb-8 text-balance whitespace-pre-line">
            {heroHeadline}
          </h1>
          <p className="text-paper/70 text-base md:text-lg leading-relaxed mb-10 max-w-md font-light">
            {heroSubtext}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary bg-paper text-charcoal hover:bg-gold hover:text-charcoal border-0">
              {heroPrimaryBtn || '探索系列'}
            </Link>
            <Link href="/craft" className="btn-outline border-paper/30 text-paper hover:bg-paper/10 hover:border-paper/50">
              {heroSecondaryBtn || '匠心工艺'}
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
      {sections.length > 0 && (
        <section className="page-padding py-24 md:py-32">
          <h2 className="section-title text-center mb-16">Our Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
            {sections.map((sec: any, i: number) => (
              <Link key={i} href={sec.link || "#"} className="group relative aspect-[4/5] overflow-hidden bg-ivory/50">
                {sec.image && <img src={sec.image} alt={sec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-paper tracking-wide">{sec.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Promise */}
      <section className="bg-charcoal text-paper py-24 md:py-32">
        <div className="page-padding max-w-5xl mx-auto text-center">
          <p className="section-label mb-8 text-gold">The MYBIRKIN Promise</p>
          <h2 className="font-serif text-heading mb-16 text-balance">
            One artisan. One piece.<br />One promise.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div>
              <h3 className="font-serif text-lg text-gold mb-3">Italian Leather</h3>
              <p className="text-sm text-paper/50 leading-relaxed">Full-grain hides sourced exclusively from family-owned tanneries in Tuscany, vegetable-tanned using traditions passed down through generations.</p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-gold mb-3">Handcrafted to Order</h3>
              <p className="text-sm text-paper/50 leading-relaxed">No inventory, no mass production. Each piece is cut, stitched, and finished by a single artisan after you place your order.</p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-gold mb-3">Lifetime Care</h3>
              <p className="text-sm text-paper/50 leading-relaxed">Every MYBIRKIN piece includes complimentary conditioning and repair for life. We stand behind our work, forever.</p>
            </div>
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
