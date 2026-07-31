import { getServiceSupabase } from "@/lib/supabase-server";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

async function fetchHomeData() {
  const supabase = getServiceSupabase();

  const [{ data: heroRow }, { data: products }, { data: sections }] = await Promise.all([
    supabase.from("homepage_hero").select("*").limit(1).maybeSingle(),
    supabase.from("products").select("*"),
    supabase.from("homepage_sections").select("*").order("sort_order"),
  ]);

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
  }));

  return {
    heroImage: image,
    heroTagline: heroRow?.tagline || "Atelier · Est. 2024",
    heroHeadline: heroRow?.headline || "Where Leather\nBecomes Art",
    heroSubtext: heroRow?.subtext || "Bespoke leather goods handcrafted to order by master artisans. Italian full-grain leather, timeless design, made exclusively for you.",
    heroPrimaryBtn: heroRow?.primary_btn_label || "Explore Collection",
    heroSecondaryBtn: heroRow?.secondary_btn_label || "Our Craft",
    sections: (sections && sections.length > 0) ? sections : [
      { title: "Handbags", description: "Explore our handbag collection", image: "", link: "/shop?category=handbags", sort_order: 0 },
      { title: "Charms & Accents", description: "Discover our charms", image: "", link: "/shop?category=charms", sort_order: 1 },
      { title: "Pet Collection", description: "Shop pet accessories", image: "", link: "/shop?category=pet", sort_order: 2 },
    ],
    products: mappedProducts,
  };
}

export default async function HomePage() {
  const data = await fetchHomeData();
  return <HomeClient {...data} />;
}
