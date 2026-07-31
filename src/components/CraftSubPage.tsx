"use client";
import { optimizeImage } from "@/lib/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CraftPageData, DEFAULT_CRAFT } from "@/lib/craft-data";
import { supabase } from "@/lib/supabase";
import ImageLightbox from "./ImageLightbox";

function usePageData(key: string): CraftPageData {
  const [data, setData] = useState<CraftPageData>(DEFAULT_CRAFT[key] || DEFAULT_CRAFT.overview);
  useEffect(() => {
    supabase.from("craft_pages").select("*").eq("page", key).maybeSingle().then(({ data: row, error }) => {
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
  }, [key]);
  return data;
}

export default function CraftSubPage({ pageKey }: { pageKey: string }) {
  const data = usePageData(pageKey);

  const hasImages = data.blocks.some((b) => b.image);
  const isProcess = pageKey === "process";

  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        {data.heroImage && <img src={optimizeImage(data.heroImage)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">{data.heroTagline}</p>
          <h1 className="font-serif text-display text-paper">{data.heroTitle}</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        {data.introText && (
          <p className="body-text text-center max-w-2xl mx-auto mb-20">{data.introText}</p>
        )}

        {isProcess ? (
          <div className="max-w-3xl mx-auto space-y-16">
            {data.blocks.map((b, i) => (
              <div key={b.id} className="flex gap-6 md:gap-10">
                <div className="flex-shrink-0 w-12 md:w-16">
                  <span className="font-serif text-2xl md:text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2">{b.title}</h3>
                  <p className="body-text whitespace-pre-line">{b.description}</p>
                  {b.image && <img src={optimizeImage(b.image)} alt={b.title} className="mt-4 w-full max-w-md" />}
                  {b.videoUrl && (
                    <div className="mt-4 aspect-video max-w-md">
                      <iframe src={b.videoUrl} className="w-full h-full" allowFullScreen />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : hasImages ? (
          <div className="space-y-20">
            {data.blocks.map((b, i) => (
              <div key={b.id} className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <div className="aspect-[4/5] overflow-hidden">
                    {b.image ? (
                      <ImageLightbox src={optimizeImage(b.image)} alt={b.title} />
                    ) : (
                      <div className="w-full h-full bg-ivory/50" />
                    )}
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <p className="section-label mb-3">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-serif text-2xl md:text-3xl mb-4">{b.title}</h2>
                  <p className="body-text whitespace-pre-line">{b.description}</p>
                  {b.videoUrl && (
                    <div className="mt-6 aspect-video">
                      <iframe src={b.videoUrl} className="w-full h-full" allowFullScreen />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {data.blocks.map((b, i) => (
              <div key={b.id} className="group">
                {b.image && (
                  <div className="aspect-[4/5] overflow-hidden mb-6 bg-ivory/50 group">
                    <ImageLightbox src={optimizeImage(b.image)} alt={b.title} className="grayscale group-hover:grayscale-0 transition-all duration-600" />
                  </div>
                )}
                <h3 className="font-serif text-xl mb-0.5">{b.title}</h3>
                <p className="body-text whitespace-pre-line">{b.description}</p>
                {b.videoUrl && (
                  <div className="mt-4 aspect-video">
                    <iframe src={b.videoUrl} className="w-full h-full" allowFullScreen />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <Link href="/builder" className="btn-primary">Start Your Custom Order</Link>
        </div>
      </section>
    </>
  );
}
