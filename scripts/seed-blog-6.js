// 第六篇引流博客录入脚本（Clemence: History, Character & Care）
// 用法: node scripts/seed-blog-6.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791192783/sotbgwmvmm2n78ld27xy.jpg",
  evelyne_red: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791192789/rocguzzdwvzsszvmkglo.jpg",
  evelyne_rose: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791192794/eiiphrtz826qimresdf3.jpg",
  evelyne_beige: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791192799/lqsqvprr4d68bqjyijas.jpg",
};

const blocks = [
  { type: "paragraph", text: "Among the great luxury leathers, most are praised for what they protect. Taurillon Clemence is different: it is loved for what it surrenders. Soft, slouchy and irresistibly tactile, Clemence is the generous-grained calfskin that gives the Evelyne, Picotin and Lindy their relaxed, lived-in soul — the leather that molds to your body instead of standing guard over it." },
  { type: "paragraph", text: "Where Box is glossy and formal, and Togo is pebbled and resilient, Clemence is the soft-focus dream of the atelier — a semi-matt, naturally textured hide that feels like it has been broken in since the day it was cut. This guide unpacks its luggage origins, its signature slouch, how it differs from Togo, and the care rules collectors trust." },
  { type: "h2", text: "A Name Tied to the Atelier: The Origins of Clemence" },
  { type: "paragraph", text: "Taurillon Clemence made its official debut in the Hermès collections in 1992, and its name is a tribute — given in honour of the daughter of the designer who first introduced the leather. It was developed for luggage, which explains everything about its character: a hide built to be packed, carried, and softened by the road." },
  { type: "paragraph", text: "The secret is in the tanning. Clemence is finished with a drum-tumbling process that softens the skin and brings a generous, natural grain boldly to the surface. Hermès' own description is the most honest: semi-matt, with a generous and irregular grain; soft and smooth to the touch; yielding in hand; and a leather that only becomes more supple with time." },
  { type: "image", text: "Taurillon Clemence — generous, irregular grain in a soft semi-matt finish.", image: IMG.cover },
  { type: "h2", text: "The Anatomy of a Slouch" },
  { type: "paragraph", text: "Clemence is the softest and most relaxed of the great grained leathers. Its grain is wider and flatter than Togo's, with a pebbled texture that feels substantial yet yielding — the leather drapes rather than stands, giving structured silhouettes a graceful, slightly slouchy personality. It is also noticeably heavier than Epsom or Togo, a physical reminder of its full-grain, luggage-ready construction." },
  { type: "list", text: "Appearance: semi-matt, with a wide, flat, generous grain and no artificial shine.\nFeel: soft, smooth and supple — the most yielding of the grained calfskins.\nHand: heavy and substantial, yet relaxed; the leather drapes into a natural slouch.\nCharacter: scratches blend invisibly into the grain, and the hide molds to your body over time.\nEvolution: becomes more supple and relaxed with every year of use." },
  { type: "image", text: "Evelyne in Clemence: the soft, pebbled grain that made the crossbody iconic.", image: IMG.evelyne_red },
  { type: "h2", text: "Clemence vs. Togo: Two Grains, Two Personalities" },
  { type: "paragraph", text: "Clemence and Togo are the two great pebbled leathers of the house, and collectors forever debate between them. Both are natural-grained calfskins, but their personalities could not differ more. Togo is the everyday icon — fine, raised grain, lightweight, and structured enough to hold its silhouette. Clemence is the comfort classic — larger, flatter grain, softer hand, and a silhouette that relaxes into a slouch as it ages. If Togo is the handbag you reach for, Clemence is the one you sink into." },
  { type: "list", text: "Clemence — wider, flatter grain; softer and more supple; heavier; visibly slouches over time.\nTogo — finer, raised grain; lighter and more structured; holds its shape with an elegant drape.\nDurability — both are scratch-resistant; Clemence's marks blend into its generous grain, Togo's shrugs them off entirely.\nWater — Clemence is the more vulnerable of the two: water spots must be dried promptly." },
  { type: "image", text: "Clemence's generous grain takes saturated colour with a natural, matte depth.", image: IMG.evelyne_rose },
  { type: "h2", text: "How to Care for Clemence" },
  { type: "list", text: "Dry water promptly: Clemence shows water spots — blot immediately with a soft, lint-free cloth.\nAvoid intense light and heat: prolonged sunlight or radiator heat can alter the colour.\nDust regularly: a soft dry cloth is all that is needed for day-to-day care.\nSkip commercial cleaners: off-the-shelf leather care products are not suitable for this natural finish.\nEmbrace the slouch: softening and relaxing are this leather's intended evolution — the more supple, the more beautiful.\nScratches: light marks blend into the generous grain; no special treatment required." },
  { type: "image", text: "Years of use: Clemence molds to the body and gains a soft, supple patina.", image: IMG.evelyne_beige },
  { type: "h2", text: "Clemence vs. Box vs. Chèvre" },
  { type: "list", text: "Clemence — soft, semi-matt, generous pebbled grain; heavy, slouchy and endlessly comfortable. The relaxed classic.\nBox — glossy, mirror-like calfskin; fine, structured and formal; sensitive to scratches; the shine mellows into patina.\nChèvre — fine-grained goatskin; light, firm and scratch-resistant; subtle sheen that grows satiny. The refined compact classic." },
  { type: "paragraph", text: "At MYBIRKIN, Taurillon Clemence is the soul of our Evelyne pieces — handcrafted from premium Italian full-grain hides, hand-saddle stitched by a single master artisan, and backed by our Lifetime Care promise, so your leather softens into perfection and we are with you for the whole journey. Explore the collection at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-clemence-guide",
  title: "Clemence: History, Character & Care — The Ultimate Collector's Guide",
  slug: "clemence-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Taurillon Clemence — the soft, slouchy grained calfskin behind the Evelyne, Picotin and Lindy. Its luggage origins, generous grain, and the care rules collectors trust.",
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
  console.log("✅ 第六篇文章已写入 blog_posts");
  console.log("URL: /blog/clemence-history-character-care-the-ultimate-collectors-guide");
})();
