import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const DEFAULT_ABOUT = {
  heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85",
  heroTagline: "Since 2024",
  heroTitle: "Our Story",
  section1Label: "Philosophy",
  section1Heading: "One artisan.\nOne piece.\nOne promise.",
  section1Text: "At MYBIRKIN, we believe true luxury is personal. Every piece is handcrafted to order by a single artisan, from the first cut of leather to the final stitch of thread. No assembly lines. No mass production. Just one person pouring their craft into your piece.",
  section1Image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85",
  section2Label: "Materials",
  section2Heading: "Sourced from the finest.",
  section2Text: "We source our leathers exclusively from family-owned tanneries in Tuscany, Italy. Full-grain and top-grain hides, vegetable-tanned using traditional methods passed down through generations.",
  section2Image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85",
  ctaText: "Discover Our Craft",
  ctaLink: "/craft",
};

async function fetchAboutData() {
  const supabase = getServiceSupabase();
  try {
    const { data, error } = await supabase.from("about_page").select("*").limit(1).maybeSingle();
    if (error) {
      console.error("[about] query error:", error.message);
      return DEFAULT_ABOUT;
    }
    const row: any = data;
    if (!row) return DEFAULT_ABOUT;
    return {
      heroImage: row.hero_image || DEFAULT_ABOUT.heroImage,
      heroTagline: row.hero_tagline || DEFAULT_ABOUT.heroTagline,
      heroTitle: row.hero_title || DEFAULT_ABOUT.heroTitle,
      section1Label: row.section1_label || DEFAULT_ABOUT.section1Label,
      section1Heading: row.section1_heading || DEFAULT_ABOUT.section1Heading,
      section1Text: row.section1_text || DEFAULT_ABOUT.section1Text,
      section1Image: row.section1_image || DEFAULT_ABOUT.section1Image,
      section2Label: row.section2_label || DEFAULT_ABOUT.section2Label,
      section2Heading: row.section2_heading || DEFAULT_ABOUT.section2Heading,
      section2Text: row.section2_text || DEFAULT_ABOUT.section2Text,
      section2Image: row.section2_image || DEFAULT_ABOUT.section2Image,
      ctaText: row.cta_text || DEFAULT_ABOUT.ctaText,
      ctaLink: row.cta_link || DEFAULT_ABOUT.ctaLink,
    };
  } catch (err: any) {
    console.error("[about] fatal error:", err?.message || err);
    return DEFAULT_ABOUT;
  }
}

export default async function AboutPage() {
  const c = await fetchAboutData();

  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        {c.heroImage && <img src={c.heroImage} alt="Atelier" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">{c.heroTagline}</p>
          <h1 className="font-serif text-display text-paper">{c.heroTitle}</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <p className="section-label mb-4">{c.section1Label}</p>
            <h2 className="font-serif text-heading mb-6 whitespace-pre-line">{c.section1Heading}</h2>
            <p className="body-text whitespace-pre-line">{c.section1Text}</p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            {c.section1Image && <img src={c.section1Image} alt="Crafting" className="w-full h-full object-cover" />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div className="aspect-[4/5] overflow-hidden md:order-1 order-2">
            {c.section2Image && <img src={c.section2Image} alt="Workshop" className="w-full h-full object-cover" />}
          </div>
          <div className="md:order-2 order-1">
            <p className="section-label mb-4">{c.section2Label}</p>
            <h2 className="font-serif text-heading mb-6 whitespace-pre-line">{c.section2Heading}</h2>
            <p className="body-text whitespace-pre-line">{c.section2Text}</p>
          </div>
        </div>

        <div className="text-center">
          <Link href={c.ctaLink || "/craft"} className="btn-primary">{c.ctaText || "Discover Our Craft"}</Link>
        </div>
      </section>
    </>
  );
}
