import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

const TABLE_MAP: Record<string, string> = {
  products: "products",
  leathers: "builder_leathers",
  colors: "builder_colors",
  hardware: "builder_hardware",
  silhouettes: "builder_silhouettes",
  artisans: "builder_artisans",
  craft: "craft_pages",
  homepage_hero: "homepage_hero",
  homepage_sections: "homepage_sections",
  contact: "contact_links",
  reviews: "reviews",
};

const FIELD_MAP: Record<string, string> = {
  products: "in_stock->inStock,new_arrival->newArrival,base_price->basePrice",
};

function toSnakeRow(obj: Record<string, any>, table: string): Record<string, any> {
  if (table === "products") {
    return {
      id: obj.id,
      name: obj.name,
      slug: obj.slug,
      category: obj.category,
      price: obj.price,
      description: obj.description,
      details: obj.details,
      materials: obj.materials,
      dimensions: obj.dimensions,
      colors: obj.colors,
      images: obj.images,
      in_stock: obj.inStock,
      featured: obj.featured,
      new_arrival: obj.newArrival,
    };
  }
  if (table === "builder_leathers") {
    return {
      id: obj.id,
      name: obj.name,
      hermes_equivalent: obj.hermesEquivalent ?? obj.hermes_equivalent,
      grain: obj.grain,
      characteristics: obj.characteristics,
      best_for: obj.bestFor ?? obj.best_for,
      image: obj.image,
    };
  }
  if (table === "builder_silhouettes") {
    return {
      id: obj.id,
      name: obj.name,
      description: obj.desc ?? obj.description,
      dimensions: obj.dimensions,
      image: obj.image,
      base_price: obj.basePrice ?? obj.base_price,
    };
  }
  if (table === "builder_hardware") {
    return {
      id: obj.id,
      name: obj.name,
      material: obj.material,
      hex: obj.hex,
      description: obj.description,
      price: obj.price,
    };
  }
  if (table === "builder_colors") {
    return { id: obj.id, name: obj.name, hex: obj.hex, swatch_image: obj.swatchImage ?? obj.swatch_image ?? "" };
  }
  if (table === "builder_artisans") {
    return { id: obj.id, name: obj.name, role: obj.role, years: obj.years, quote: obj.quote, image: obj.image };
  }
  if (table === "craft_pages") {
    return {
      page: obj.page ?? obj.id,
      hero_image: obj.heroImage ?? obj.hero_image,
      hero_tagline: obj.heroTagline ?? obj.hero_tagline,
      hero_title: obj.heroTitle ?? obj.hero_title,
      intro_text: obj.introText ?? obj.intro_text,
      blocks: obj.blocks ?? [],
    };
  }
  if (table === "homepage_hero") {
    return {
      id: true,
      image: obj.image,
      tagline: obj.tagline,
      headline: obj.headline,
      subtext: obj.subtext,
      primary_btn_label: obj.primaryBtnLabel ?? obj.primary_btn_label,
      secondary_btn_label: obj.secondaryBtnLabel ?? obj.secondary_btn_label,
    };
  }
  if (table === "homepage_sections") {
    return { title: obj.title, description: obj.description, image: obj.image, link: obj.link, sort_order: obj.sort_order ?? obj.sortOrder ?? 0 };
  }
  if (table === "contact_links") {
    return { type: obj.type, label: obj.label, url: obj.url };
  }
  if (table === "reviews") {
    return { id: obj.id, product_id: obj.product_id ?? obj.productId, author: obj.author, rating: obj.rating, title: obj.title, content: obj.content };
  }
  return obj;
}


export async function POST(req: NextRequest) {
  const pw = req.headers.get("x-admin-password"); if (pw !== "mybirkin2024") {
    const pw = req.headers.get("x-admin-password"); return NextResponse.json({ error: "密码错误: 收到=" + (pw ? pw.substring(0,3)+"..." : "空") }, { status: 401 });
  }

  const { table, action, data, id } = await req.json();
  const dbTable = TABLE_MAP[table];
  if (!dbTable) return NextResponse.json({ error: "未知表" }, { status: 400 });

  const supabase = getServiceSupabase();

  try {
    if (action === "save_all") {
      // Replace all rows for this table (used for array-type data)
      await supabase.from(dbTable).delete().neq("id", "__never_match__");
      if (Array.isArray(data) && data.length > 0) {
        const rows = data.map((d: any) => toSnakeRow(d, dbTable));
        const { error } = await supabase.from(dbTable).insert(rows);
        if (error) throw error;
      }
    } else if (action === "add") {
      const { error } = await supabase.from(dbTable).insert(toSnakeRow(data, dbTable));
      if (error) throw error;
    } else if (action === "update") {
      const { error } = await supabase.from(dbTable).update(toSnakeRow(data, dbTable)).eq("id", id);
      if (error) throw error;
    } else if (action === "delete") {
      const { error } = await supabase.from(dbTable).delete().eq("id", id);
      if (error) throw error;
    } else if (action === "upsert") {
      // For single-row tables like homepage_hero, craft pages
      const { error } = await supabase.from(dbTable).upsert(toSnakeRow(data, dbTable));
      if (error) throw error;
    } else if (action === "save_homepage_sections") {
      await supabase.from(dbTable).delete().neq("id", -1);
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const { error } = await supabase.from(dbTable).insert({ ...toSnakeRow(data[i], dbTable), sort_order: i });
          if (error) throw error;
        }
      }
    } else if (action === "save_contact") {
      await supabase.from(dbTable).delete().neq("id", -1);
      if (Array.isArray(data)) {
        for (const item of data) {
          const { error } = await supabase.from(dbTable).insert(toSnakeRow(item, dbTable));
          if (error) throw error;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
