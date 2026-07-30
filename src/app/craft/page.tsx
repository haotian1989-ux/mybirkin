"use client";
import { optimizeImage } from "@/lib/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CraftPageData, DEFAULT_CRAFT, CRAFT_PAGE_LABELS } from "@/lib/craft-data";
import { supabase } from "@/lib/supabase";

function usePageData(): CraftPageData {
  const [data, setData] = useState<CraftPageData>(DEFAULT_CRAFT.overview);
  useEffect(() => {
    supabase.from("craft_pages").select("*").eq("page", "overview").maybeSingle().then(({ data: row, error }) => {
      if (!error && row) {
        setData({
          heroImage: row.hero_image || "",
          heroTagline: row.hero_tagline || "",
          heroTitle: row.hero_title || "",
          introText: row.intro_text || "",
          blocks: row.blocks || [],
        });
      }
    });
  }, []);
  return data;
}

const subPages = ["leather", "hardware", "artisans", "process"];

export default function CraftPage() {
  const data = usePageData();

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        {data.heroImage && <img src={data.heroImage} alt="Workshop" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">{data.heroTagline}</p>
          <h1 className="font-serif text-display text-paper">{data.heroTitle}</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          {data.introText && (
            <p className="text-center body-text max-w-2xl mx-auto mb-20">{data.introText}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {data.blocks.map((b, i) => {
              const href = subPages[i] ? `/craft/${subPages[i]}` : "#";
              return (
                <Link key={b.id} href={href} className="group relative aspect-[4/5] overflow-hidden">
                  {b.image && <img src={optimizeImage(b.image)} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                    <h2 className="font-serif text-2xl md:text-3xl text-paper mb-2">{b.title}</h2>
                    <p className="text-sm text-paper/60 max-w-xs">{b.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-padding py-24 bg-ivory/30 text-center">
        <p className="section-label mb-3">Bespoke</p>
        <h2 className="section-title mb-4">Design Your Own</h2>
        <p className="body-text max-w-md mx-auto mb-8">
          Choose your materials, hardware, and artisan. Create a one-of-a-kind piece.
        </p>
        <Link href="/builder" className="btn-primary">Start Customizing</Link>
      </section>
    </>
  );
}
