// 第五篇引流博客录入脚本（Chèvre: History, Character & Care）
// 用法: node scripts/seed-blog-5.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791009088/fuvu0mympghdmru1j6wc.jpg",
  constance_gold: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791009093/nrdfly01ftrw5cjz0owq.jpg",
  constance_blue: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791009099/ugu9b4s13qkqnsfvavax.jpg",
  constance_dore: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791009234/svklwxjzlwknxsrvqqm0.jpg",
};

const blocks = [
  { type: "paragraph", text: "Every great atelier has a workhorse that never gets the credit it deserves. For the world of bespoke luxury leather goods, that material is Chèvre — goatskin. Light as a feather, fine-grained, and quietly indestructible, Chèvre performs a rare double duty: it is both the refined outer skin of some of the most coveted small bags ever made, and the buttery interior lining that cushions the world's most expensive handbags." },
  { type: "paragraph", text: "If Box is the classicist's glossy calfskin and Togo is the everyday icon, Chèvre is the connoisseur's secret — the leather that feels weightless on the wrist, shrugs off scratches, and ages into a satiny, supple finish. This guide unpacks its Indian origins, the two legendary varieties, why it lines the best bags in the world, and the care rules that keep it pristine." },
  { type: "h2", text: "From India to the Atelier: The Origins of Chèvre" },
  { type: "paragraph", text: "Chèvre is French for goat, and the leather's most celebrated variety takes its name from the city of Mysore in southern India, a region with a centuries-old tradition of fine goatskin tanning. Hermès has used goatskin for generations — both as an exterior leather for compact, elegant pieces and as the standard-bearer for luxury interiors, where its combination of softness, strength and minimal weight is unmatched." },
  { type: "paragraph", text: "The modern era of Chèvre began in the 1990s, when the house introduced Chamkila goatskin — a leather finished by rolling the hide against itself, grain against grain, to coax out a fine, harmonious texture. Official Hermès notes describe it perfectly: an irregular but harmonious grain, a slight shine that reveals all the natural features of goatskin, a fairly dry feel that softens with time, and a hand that becomes more supple and satiny with every passing year." },
  { type: "image", text: "Chèvre Mysore — fine-grained, lightweight and subtly lustrous.", image: IMG.cover },
  { type: "h2", text: "Chèvre Mysore: The Refined Workhorse" },
  { type: "paragraph", text: "Chèvre Mysore is today the most widely used goatskin in the Hermès repertoire. Its grain is more defined than its older cousin, yet it remains lightweight, firm and famously scratch-resistant — properties that have made it the preferred hide for the Mini Kelly II and countless Constance pieces. Many Mysore bags carry a visible spine running down the centre of the hide, a natural hallmark of the animal that collectors have come to love." },
  { type: "image", text: "Constance in Chèvre: light, firm and famously scratch-resistant.", image: IMG.constance_gold },
  { type: "h2", text: "Chèvre de Coromandel: The Vivid Classic" },
  { type: "paragraph", text: "Chèvre de Coromandel is the older, more classical variety, made from the hide of mountain goat and prized for its vivid sheen and unique, moderate embossing. Where Mysore reads more casual and defined, Coromandel is finer, glossier and distinctly elegant. In 2008 the house renamed it 'Souple' — French for supple — a fitting tribute to a leather that combines structure with remarkable pliability." },
  { type: "image", text: "Vivid colour on Chèvre — goatskin takes saturated tones with extraordinary depth.", image: IMG.constance_blue },
  { type: "h2", text: "The Interior Hero: Chèvre Linings" },
  { type: "paragraph", text: "If you have ever looked inside a truly exceptional handbag, you have met Chèvre. Buttery-soft, feather-light and remarkably durable, goatskin is the gold standard for luxury interiors — the lining that protects your belongings while adding almost no weight to the bag itself. It is the quiet detail that separates genuine atelier craftsmanship from factory shortcuts, and it is precisely the finish MYBIRKIN specifies for every bespoke piece." },
  { type: "image", text: "Chèvre develops a supple, satiny finish with years of use.", image: IMG.constance_dore },
  { type: "h2", text: "How to Care for Chèvre" },
  { type: "list", text: "Keep water and oil away: like all fine leathers, Chèvre dislikes moisture — blot any contact immediately with a soft, lint-free cloth.\nAvoid intense light and heat: prolonged sunlight or radiator heat can alter the colour permanently.\nDust regularly: a soft dry cloth is all that is needed for day-to-day care.\nSkip commercial cleaners: off-the-shelf leather care products are not suitable for this delicate grain.\nEmbrace the softening: Chèvre begins fairly dry and becomes more supple and satiny with use — this is its intended evolution, not a defect.\nScratches: Mysore's tight grain resists marking well; light surface marks generally blend into the finish over time." },
  { type: "h2", text: "Chèvre vs. Box vs. Togo" },
  { type: "list", text: "Chèvre — fine-grained goatskin; light, firm and scratch-resistant; subtle sheen that grows satiny with age. The connoisseur's compact classic.\nBox — glossy, mirror-like calfskin; extremely fine grain; sensitive to scratches early on; structure holds firm while the shine mellows.\nTogo — pebbled, semi-matte calfskin; highly scratch-resistant; holds shape with a soft, elegant slouch. The everyday icon." },
  { type: "paragraph", text: "At MYBIRKIN, every bespoke order is handcrafted from premium hides by a single master artisan, hand-saddle stitched with continuous linen thread, and lined with buttery-soft chevre for that true atelier finish — all backed by our Lifetime Care promise. Explore the collection at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-chevre-guide",
  title: "Chèvre: History, Character & Care — The Ultimate Collector's Guide",
  slug: "chevre-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Chèvre — the goatskin behind Hermès' most refined small bags and luxury interiors. From Mysore's fine grain to Coromandel's vivid sheen, plus the care rules collectors trust.",
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
  console.log("✅ 第五篇文章已写入 blog_posts");
  console.log("URL: /blog/chevre-history-character-care-the-ultimate-collectors-guide");
})();
