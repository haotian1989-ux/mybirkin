// 硬件篇引流博客录入脚本（Gold vs. Palladium Hardware）
// 用法: node scripts/seed-blog-hardware.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(__dirname, "..", ".env.local");
const env = fs.readFileSync(envPath, "utf8");
const get = (k) => {
  const m = env.match(new RegExp(`^${k}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
};

const URL = get("NEXT_PUBLIC_SUPABASE_URL");
const ANON_KEY = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");
if (!URL || !ANON_KEY) {
  console.error("缺少 SUPABASE 环境变量");
  process.exit(1);
}
const supabase = createClient(URL, ANON_KEY);

const IMG = {
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791207707/d3bighnokne69gcyppjr.jpg",
  gold_kelly: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791207707/bwhnoxapgs5rmzdmzs3l.jpg",
  palladium_kelly: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791207708/ooi1c4w4iuz7b7hywpx7.jpg",
  gold_lock: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791207708/bqolobgprtr9qe493igd.jpg",
};

const blocks = [
  { type: "paragraph", text: "When commissioning a custom, handcrafted leather masterpiece, selecting the perfect hide—be it natural-grained Togo or architectural Epsom—is only half the battle. The defining personality of a bespoke bag often hinges on a single aesthetic and structural choice: the hardware." },
  { type: "paragraph", text: "The debate between Gold Hardware (GHW) and Palladium Hardware (PHW) is timeless. While most collectors choose based on skin tone or jewelry preference, serious connoisseurs look deeper. They examine the metallurgy, the scratching vulnerability, and the long-term oxidation resistance." },
  { type: "paragraph", text: "Let's look at the scientific and practical performance of luxury metal platings to help you secure a legacy piece that maintains its luster forever." },
  { type: "h2", text: "1. Gold Hardware (GHW): The Classic Warmth" },
  { type: "paragraph", text: "Gold hardware exudes an unmissable, regal warmth that complements richer leather tones like Gold, Noir, and Vert Amande beautifully." },
  { type: "h3", text: "The Metallurgy" },
  { type: "paragraph", text: "In premium independent leather ateliers like MYBIRKIN, genuine gold hardware is created through an advanced electroplating process. A base of solid brass or premium stainless steel is meticulously coated with layers of 24K or 18K yellow gold." },
  { type: "h3", text: "The Durability Reality" },
  { type: "paragraph", text: "Scratch Resistance: Gold is inherently a soft metal. While the base metal underneath is incredibly tough, the surface gold plating can develop micro-scratches (often called \"hairline scratches\") over months of opening and closing the turnlock." },
  { type: "paragraph", text: "Oxidation & Tarnish: True gold plating does not tarnish easily. However, over decades, rare environmental factors or heavy exposure to salty sea air can cause a highly superficial, vintage-like copper patina to develop on edges." },
  { type: "h3", text: "Best Suited For" },
  { type: "paragraph", text: "Collectors who appreciate heritage luxury, favor warm undertones, and don't mind a bag that gains an elegant, lived-in character over time." },
  { type: "image", text: "Gold hardware on a Kelly Retourne in Gold Togo: warm, regal, and gracefully lived-in.", image: IMG.gold_kelly },
  { type: "h2", text: "2. Palladium Hardware (PHW): The Modern Shield" },
  { type: "paragraph", text: "Palladium hardware delivers a sleek, silvery, and ultra-modern finish. It offers a stunning, high-contrast pop against cool leather shades like Bleu Nuit, Beton, and Etain." },
  { type: "h3", text: "The Metallurgy" },
  { type: "paragraph", text: "Palladium belongs to the platinum group of precious metals. It is rarer, harder, and significantly scarcer than silver or white gold. In our bespoke workshop, a heavy-duty layer of pure palladium is electroplated over high-grade steel components." },
  { type: "h3", text: "The Durability Reality" },
  { type: "paragraph", text: "Scratch Resistance: Palladium is physically harder than yellow gold. This makes PHW noticeably more resilient against structural scratches, daily friction from keychains, and the snapping mechanism of the clasp plates." },
  { type: "paragraph", text: "Oxidation & Tarnish: Palladium is chemically inert. It does not react with oxygen, meaning it will never tarnish, rust, or turn green, regardless of humidity or dry winter conditions. It remains blindingly bright and mirror-like for life." },
  { type: "h3", text: "Best Suited For" },
  { type: "paragraph", text: "Daily-use bags, contemporary styling, and collectors who demand an absolute low-maintenance, pristine aesthetic that looks brand-new forever." },
  { type: "image", text: "Palladium hardware on a Kelly in Swift: cool, mirror-bright, and built for daily wear.", image: IMG.palladium_kelly },
  { type: "h2", text: "How to Protect Your Luxury At Ateliers Hardware" },
  { type: "paragraph", text: "Regardless of which metallic alloy fits your personal style, preventing early degradation comes down to daily operational care:" },
  { type: "paragraph", text: "Avoid Alcohol Stripping: Never let perfume, hand sanitizer, or harsh leather cleaners touch your hardware. The chemical solvents can slowly dissolve the microscopic clear lacquer seal protecting the gold or palladium plating." },
  { type: "paragraph", text: "The Microfiber Buff: After a rainy day or heavy handling, use a completely dry, clean microfiber jewelry cloth to wipe down the turnlock plates. This lifts corrosive skin acidity and sweat off the metal." },
  { type: "paragraph", text: "Say No to Protective Plastic Forever: Many owners keep the original factory plastic stickers on the hardware to prevent scratches. This is a critical mistake. Over time, trapped moisture underneath the plastic reacts with the metal, creating irreversible bubbling and irreversible chemical tarnishing. Peel the plastic off and let the metal breathe." },
  { type: "image", text: "Solid, non-tarnish hardware: the lock, plate, and turnlock that outlive decades of use.", image: IMG.gold_lock },
  { type: "h2", text: "The Bespoke Standard" },
  { type: "paragraph", text: "At MYBIRKIN, we recognize that a handbag is only as strong as its weakest closure. That is why every custom order is assembled using solid-weight, non-tarnish hardware components precision-plated to luxury standards. Paired with our meticulous diamond-awl hand-saddle stitching and a lifetime of complimentary hardware polishing spa treatments, your bag is built to withstand the test of time." },
  { type: "paragraph", text: "Explore our custom options and pick your perfect hardware setting at https://www.mybirkin.com/ ." },
];

const post = {
  id: "blog-gold-vs-palladium-hardware",
  title: "Gold vs. Palladium Hardware: Which Lasts Longer on Bespoke Bags?",
  slug: "gold-vs-palladium-hardware-which-lasts-longer-on-bespoke-bags",
  meta_description:
    "Gold hardware or Palladium? Discover the molecular and structural durability differences between luxury metal platings on bespoke handcrafted leather bags.",
  category: "Atelier",
  cover_image: IMG.cover,
  status: "published",
  blocks,
  published_at: new Date().toISOString(),
};

(async () => {
  const { data, error } = await supabase.from("blog_posts").upsert(post);
  if (error) {
    console.error("插入失败:", error.message);
    process.exit(1);
  }
  console.log("✅ 硬件篇已写入 blog_posts");
  console.log("URL: /blog/gold-vs-palladium-hardware-which-lasts-longer-on-bespoke-bags");
})();
