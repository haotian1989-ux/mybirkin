// 第四篇引流博客录入脚本（Box Calf: History, Character & Care）
// 用法: node scripts/seed-blog-4.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790910760/qs9dnzw2aznkj6xzlldw.jpg",
  bordeaux: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790910767/x6zex6ceipj1ghrxy682.jpg",
  black: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790910770/yfhn0bgbwfrwz9vavdog.jpg",
  grain: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790910774/ojxktyrbnp69gvlmssda.jpg",
};

const blocks = [
  { type: "paragraph", text: "Every heritage atelier is defined by one leather that anchors its history. For the world of bespoke leather goods, that hide is Box calf. Smooth, glossy, and deceptively delicate, Box is the oldest leather in Hermès' legendary lineup — a material with more than 130 years of continuous production, and the very leather that dressed the house's most iconic silhouettes through their golden decades." },
  { type: "paragraph", text: "If Togo is the everyday icon, Swift the velvet dream, and Epsom the structured performer, Box is the classicist's hide — the glossy, fine-grained calfskin that ages into something no factory finish can imitate. This guide unpacks its English origins, its signature character, how it compares to Barenia, and the care rules that keep it alive for decades." },
  { type: "h2", text: "The English Origins of Box Calf" },
  { type: "paragraph", text: "Box calf takes its name from the 'box' tanning technique that originated in England — a specific, highly skilled process that gives the leather its particular hand and appearance. The hide is cut from young male calfskins, typically around three to six months old, prized for their clean, tight, unpolluted grain." },
  { type: "paragraph", text: "Hermès adopted Box calf early in its history, and it has remained emblematic of the maison ever since — dating back to the 1890s, which makes it the oldest leather still in the house's repertoire today. For generations of collectors, a vintage Box piece is the purest expression of atelier-era luxury: formal, luminous, and quietly aristocratic." },
  { type: "image", text: "Box calf in Bordeaux — a full-grain hide whose fine, glossy surface defined the atelier era.", image: IMG.bordeaux },
  { type: "h2", text: "The Anatomy of a Heritage Hide" },
  { type: "paragraph", text: "Box calf is a vegetable-tanned, full-grain calfskin finished to a smooth, luminous surface. Its defining traits are immediately recognisable to anyone who has handled a vintage piece: an almost liquid gloss, a deep tonal richness, and a long, extremely fine grain that reads as flawless from arm's length." },
  { type: "list", text: "Appearance: smooth and glossy, with a deep, saturated tone and a long, fine grain.\nFeel: polished and ultra-smooth — softer to the touch than any embossed leather.\nHand: round, firm and full; famously 'boardy', meaning it holds its structured shape remarkably well.\nCharacter: stiff enough to cut crisp architectural silhouettes, yet light and elegant on the wrist." },
  { type: "image", text: "Jet-black Box calf: polished, ultra-smooth, and perfectly structured.", image: IMG.black },
  { type: "h2", text: "The Patina Journey: A Leather That Lives" },
  { type: "paragraph", text: "Box calf begins its life delicate and highly sensitive to scratches. New pieces can mark with surprising ease — a coin brushed across the surface, a fingernail, a careless moment. But this fragility is not a flaw; it is the opening chapter of the leather's biography." },
  { type: "paragraph", text: "Over years of use, Box develops a beautiful, individual patina. The initial gloss gradually softens, the surface takes on a mellow, matured tone, and the leather acquires the quiet depth that vintage collectors hunt for. Critically, it keeps its shape — the structure never collapses the way softer hides do. Where Barenia darkens dramatically in caramel tones, Box ages more subtly: the shine fades, the character deepens, and the piece becomes unmistakably yours." },
  { type: "image", text: "Years of light and touch bring a patina that no factory finish can replicate.", image: IMG.grain },
  { type: "h2", text: "How to Care for Box Calf" },
  { type: "list", text: "Keep water away: Box is one of the most water-sensitive luxury leathers. If it touches water, blot immediately with a soft, lint-free cloth — never rub, and never use heat.\nAvoid intense light and heat: direct sunlight, radiators and window sills can alter the colour permanently.\nDust regularly: a soft, lint-free cloth is all that is needed for day-to-day care.\nSkip commercial cleaners: off-the-shelf leather care products are not suitable for this heritage finish.\nDeep cleaning: a cloth barely dampened with distilled water, worked in small circles, then air-dried naturally.\nPolishing: a small amount of neutral cream polish, worked into the grain with a soft brush, then buffed with a dry cloth." },
  { type: "paragraph", text: "The golden rule of Box ownership is patience. Its scratches and marks are not damage — they are the first strokes of a patina that will make the piece uniquely yours over a lifetime. At MYBIRKIN, every bespoke order is handcrafted from premium vegetable-tanned hides by a single master artisan, hand-saddle stitched with continuous linen thread, and backed by our Lifetime Care promise — so your leather is conditioned and restored by the same hands that made it, for as long as you own it. Explore the collection at https://www.mybirkin.com/." },
  { type: "h2", text: "Box vs. Barenia: Two Faces of Heritage" },
  { type: "list", text: "Box — glossy, mirror-like finish; extremely fine grain; sensitive to scratches early on; patina softens the shine while the structure holds firm.\nBarenia — smooth with a subtle, waxy sheen; natural veining; scratch-resistant by comparison, with light marks often massaged away by a fingertip; darkens into a rich caramel patina.\nWater — Box is highly water-sensitive; Barenia is famously more forgiving of light rain.\nFeel — Box is firm, round and 'boardy'; Barenia is supple, oily and relaxed.\nHeritage — Box is the house's oldest leather (1890s); Barenia began life in the saddle room and entered handbags in the 1970s." },
];

const post = {
  id: "blog-box-calf-guide",
  title: "Box Calf: History, Character & Care — The Ultimate Collector's Guide",
  slug: "box-calf-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Box calf — the oldest leather in the Hermès repertoire. From its English tanning origins to its glossy fine grain, scratch-sensitive youth and legendary patina, plus the care rules collectors trust.",
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
  console.log("✅ 第四篇文章已写入 blog_posts");
  console.log("URL: /blog/box-calf-history-character-care-the-ultimate-collectors-guide");
})();
