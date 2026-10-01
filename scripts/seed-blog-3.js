// 第三篇引流博客录入脚本（Barenia Leather: History, Character & Care）
// 用法: node scripts/seed-blog-3.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790848113/g4gbbr8q42o931sqibxu.jpg",
  atelier: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790848129/lg0ivit49lmi2mm7dqk1.jpg",
  fingertip: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790848125/u1rznf2zc37fzo0xeslx.jpg",
};

const blocks = [
  { type: "paragraph", text: "In the world of luxury leather, most hides are chosen for how they look on day one. Barenia is different. It is chosen for how it becomes. Known as the connoisseur's leather, Barenia is the smooth, waxy, vegetable-tanned saddle calfskin that collectors speak about with unmistakable reverence — the hide that records your life and rewards you with a deepening, caramelized patina with every year of use." },
  { type: "paragraph", text: "If Togo is the everyday icon and Epsom is the structured sharpener, Barenia is the heritage soul of the atelier. This guide unpacks its equestrian origins, its living character, how it compares to the great luxury leathers, and the care rules that keep it healthy for decades." },
  { type: "h2", text: "The Heritage of a Saddle Leather" },
  { type: "paragraph", text: "Barenia's story begins in the saddle room, not the salon. It was developed within Hermès' equestrian tradition, where leather had to do something most luxury hides never need to: survive a working horse. Saddles demand strength, suppleness, and resistance to the weather — qualities that shaped Barenia's entire personality. The name itself is inseparable from the house's saddlery roots, and for decades the hide remained reserved for harnesses and riding equipment." },
  { type: "paragraph", text: "The transition from stable to handbag came in the 1970s, when Hermès officially began using Barenia in its leather goods collections. It has remained rare ever since. Production is slow and exacting: a full-grain calfskin, vegetable-tanned, then double-tanned and soaked in oils over several weeks until it reaches its characteristic waxy, supple hand. Demand has run ahead of supply for decades, which is precisely why Barenia pieces are so coveted on the collector market." },
  { type: "image", text: "Vegetable-tanned hides, beeswax and brass — the saddlery heritage lives on in the atelier.", image: IMG.atelier },
  { type: "h2", text: "What Makes Barenia Different" },
  { type: "paragraph", text: "Unlike embossed or heavily finished leathers, Barenia is a natural, full-grain hide. The surface is smooth and almost luminous, with fine natural veining that varies from hide to hide. It feels rich, full and waxy — slightly oily to the touch, as if the leather has been gently polished with wax. Its signature detail is the contrasting white saddle stitching, a visual echo of its equestrian past." },
  { type: "list", text: "Smooth, waxy, full-grain surface with visible natural veining\nSlightly oily, supple hand that softens beautifully with use\nSignature contrast saddle stitching in natural white linen\nRapid living patina — deepest colour exactly where you touch it most\nLight scratches that can often be massaged away with a fingertip" },
  { type: "h2", text: "The Living Patina" },
  { type: "paragraph", text: "The patina is the entire point. While Togo and Epsom are engineered to look identical for years, Barenia is engineered to evolve. The leather absorbs the natural oils of your skin, darkening and glossing precisely where you touch it most. Over time a Barenia bag develops a rich, caramelized depth that no other Hermès leather replicates in the same way. It is not a surface finish; it is the leather's biography, written in light and handling." },
  { type: "paragraph", text: "This is also why Barenia feels almost magical under your fingertips. Its intense oil treatment gives it a near-miraculous scratch response: most light scratches can be massaged back into the surface with a warm fingertip, as the oils redistribute and the mark simply disappears. Deep creases and honest wear do not diminish the hide — they blend into the patina and become part of its character. Collectors describe Barenia as a living material, and they mean it literally." },
  { type: "image", text: "A gentle fingertip press — the oils redistribute and light scratches melt back into the surface.", image: IMG.fingertip },
  { type: "h2", text: "Barenia vs. Togo vs. Epsom" },
  { type: "paragraph", text: "Choosing between the great luxury leathers comes down to what you want your bag to do across a decade. If you want a hide that stays pristine and stiff, choose Epsom. If you want a resilient pebbled texture that shrugs off scratches, choose Togo. If you want a smooth, organic leather that ages with you and develops character money cannot buy, Barenia is the answer." },
  { type: "list", text: "Barenia — smooth, waxy, water-sensitive; evolves into a deep caramel patina. The connoisseur's choice for heritage pieces.\nTogo — pebbled, semi-matte, highly scratch-resistant; holds shape with a soft, elegant slouch. The everyday icon.\nEpsom — embossed, rigid and lightweight; effortlessly scratch- and water-resistant. The structured, sharp-edged performer." },
  { type: "paragraph", text: "For a deep dive into Togo, Swift and Epsom, revisit our earlier Journal entry: Togo vs. Swift vs. Epsom: The Ultimate Guide to Luxury Leather Choice." },
  { type: "h2", text: "Barenia Faubourg: The Modern Heir" },
  { type: "paragraph", text: "In 2016, Hermès introduced Barenia Faubourg — a modern interpretation inspired by the house's iconic address, 24 Faubourg Saint-Honoré. It carries the same heritage DNA as classic Barenia but is engineered to be more durable for contemporary daily wear: slightly more supple and relaxed in hand, with an even finer, waxy grain, while still acquiring a patina that darkens in the most exposed areas. For collectors who love Barenia's soul but want a little more forgiveness in day-to-day use, Faubourg is the bridge." },
  { type: "h2", text: "How to Care for Barenia" },
  { type: "list", text: "Light scratches: massage gently with a fingertip or soft cloth — the natural oils redistribute and the mark fades away.\nDeeper marks: use a soft horsehair brush with gentle, circular strokes to work the oils back into the surface.\nWater spots: blot immediately with a dry cloth and air-dry at room temperature. Never use a hairdryer or any heat source.\nKeep water and oil away: both can permanently alter the colour of this natural, uncoated hide.\nEmbrace the patina: darkening is not damage. It is the leather recording its journey — the very reason collectors seek Barenia out." },
  { type: "paragraph", text: "At MYBIRKIN, we honor this philosophy with every bespoke order. Every piece is handcrafted from premium vegetable-tanned hides by a single master artisan, hand-saddle stitched with continuous linen thread, and backed by our Lifetime Care promise — so your leather ages beautifully, and we are with you for the whole journey. Explore the collection at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-barenia-leather-guide",
  title: "Barenia Leather: History, Character & Care — The Ultimate Collector's Guide",
  slug: "barenia-leather-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover the equestrian origins, living patina, and scratch-healing character of Barenia leather — and how it compares to Togo & Epsom, with the care rules collectors trust.",
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
  console.log("✅ 第三篇文章已写入 blog_posts");
  console.log("URL: /blog/barenia-leather-history-character-care-the-ultimate-collectors-guide");
})();
