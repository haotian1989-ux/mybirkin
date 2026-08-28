import { getServiceSupabase } from "@/lib/supabase-server";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const DEFAULT_SECTIONS = [
  { title: "Handbags", description: "Explore our handbag collection", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Handbags", link: "/shop?category=handbags", sort_order: 0 },
  { title: "Charms & Accents", description: "Discover our charms", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Charms", link: "/shop?category=charms", sort_order: 1 },
  { title: "Pet Collection", description: "Shop pet accessories", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Pets", link: "/shop?category=pet", sort_order: 2 },
];

async function fetchHomeData() {
  const supabase = getServiceSupabase();

  try {
    const [heroResult, productsResult, sectionsResult] = await Promise.all([
      supabase.from("homepage_hero").select("*").limit(1).maybeSingle(),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("homepage_sections").select("*").order("sort_order"),
    ]);

    const heroRow = heroResult.data;
    const products = productsResult.data;
    const sections = sectionsResult.data;

    if (sectionsResult.error) {
      console.error("[fetchHomeData] sections query error:", sectionsResult.error.message);
    }

    const image = heroRow?.image || "";

    const mappedProducts = (products || []).map((row: any) => ({
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
      createdAt: row.created_at,
    }));

    const promiseTitle = heroRow?.promise_title || "The MYBIRKIN Promise";
    const promiseItems = [
      { title: heroRow?.promise_1_title || "Italian Leather", text: heroRow?.promise_1_text || "Full-grain hides sourced exclusively from family-owned tanneries in Tuscany, vegetable-tanned using traditions passed down through generations." },
      { title: heroRow?.promise_2_title || "Handcrafted to Order", text: heroRow?.promise_2_text || "No inventory, no mass production. Each piece is cut, stitched, and finished by a single artisan after you place your order." },
      { title: heroRow?.promise_3_title || "Lifetime Care", text: heroRow?.promise_3_text || "Every MYBIRKIN piece includes complimentary conditioning and repair for life. We stand behind our work, forever." },
    ];

    return {
      heroImage: image,
      heroTagline: heroRow?.tagline || "Atelier · Est. 2024",
      heroHeadline: heroRow?.headline || "Where Leather\nBecomes Art",
      heroSubtext: heroRow?.subtext || "Bespoke leather goods handcrafted to order by master artisans. Italian full-grain leather, timeless design, made exclusively for you.",
      heroPrimaryBtn: heroRow?.primary_btn_label || "Explore Collection",
      heroSecondaryBtn: heroRow?.secondary_btn_label || "Our Craft",
      promiseTitle,
      promiseItems,
      sections: (sections && sections.length > 0) ? sections : DEFAULT_SECTIONS,
      products: mappedProducts,
    };
  } catch (err: any) {
    console.error("[fetchHomeData] fatal error:", err.message || err);
    return {
      heroImage: "",
      heroTagline: "Atelier · Est. 2024",
      heroHeadline: "Where Leather\nBecomes Art",
      heroSubtext: "Bespoke leather goods handcrafted to order by master artisans.",
      heroPrimaryBtn: "Explore Collection",
      heroSecondaryBtn: "Our Craft",
      promiseTitle: "The MYBIRKIN Promise",
      promiseItems: [
        { title: "Italian Leather", text: "Full-grain hides sourced exclusively from family-owned tanneries in Tuscany." },
        { title: "Handcrafted to Order", text: "No inventory, no mass production. Each piece made to order." },
        { title: "Lifetime Care", text: "Every MYBIRKIN piece includes complimentary conditioning and repair for life." },
      ],
      sections: DEFAULT_SECTIONS,
      products: [],
    };
  }
}

export default async function HomePage() {
  const data = await fetchHomeData();
  return <HomeClient {...data} />;
}
