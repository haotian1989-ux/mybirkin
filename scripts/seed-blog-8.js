// 第八篇引流博客录入脚本（Barénia vs. Barénia Faubourg）
// 用法: node scripts/seed-blog-8.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286874/k2dvc05aoxnstcyfr7yr.jpg", // Barénia 特写 (Madison Avenue Couture)
  birkin_barenia: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286954/w9znj7mw0sz9y91u7pov.jpg", // Birkin 40 Fauve Barénia 1994 (JaneFinds)
  faubourg_tex: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286875/v2lzg1cq0eipm0pdelow.jpg", // Faubourg 特写 (Madison Avenue Couture)
  birkin_faubourg: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286876/cjzwvzisovi1xhwxqim9.jpg", // Birkin 35 Fauve Faubourg (Sotheby's)
  kelly_faubourg: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286876/od8bcclbxj3dlfepujdv.jpg", // Kelly 28 Faubourg (Collector Square)
  strap_barenia: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791286874/en4sfqelwtjcipwbb946.jpg", // Barénia 表带 (Aug Leather)
};

const blocks = [
  { type: "paragraph", text: "Barénia is the rarest and most romantic of the great Hermès calfskins — the saddle leather that made the house famous, prized for its smooth, honeyed surface and its refusal to stay pristine. Barénia Faubourg is its modern heir: the same double-tanned hide, the same rich oil saturation, but pressed with a fine, barely-there grain that changes everything about how it lives. Collectors often confuse the two — understandably, since both are fauve, both patina, and both are almost impossible to find. This guide separates them once and for all." },
  { type: "h2", text: "The Saddle Heritage: What Classic Barénia Is" },
  { type: "paragraph", text: "Barénia traces its lineage to the harness workshop that founded Hermès in 1837. First used in the 1920s for saddles and equestrian tack, it was developed to withstand the friction, weather and repeated flexing of working gear — and that heritage defines it to this day. The hide is tanned with an aniline process and finished with a light wax coating, producing a nearly smooth, un-grained surface in a warm honey fauve that absorbs light rather than reflecting it." },
  { type: "paragraph", text: "Its signature is memory. Light scratches and scuffs mark the surface — then soften, blend and even disappear with warmth and gentle friction, often fading under a fingertip's pressure. Over the years the leather darkens and develops a rich, personal patina in the areas you touch most. It is naturally water-resistant and famously durable; its one true enemy is oil, which can leave a permanent mark. Hermès only produces it in tiny allocations, which is why a Fauve Barénia Birkin is among the most sought-after bags at auction." },
  { type: "image", text: "A 1994 Fauve Barénia Birkin 40: the smooth, honeyed surface of the original saddle leather.", image: IMG.birkin_barenia },
  { type: "h2", text: "The Heir Apparent: Barénia Faubourg" },
  { type: "paragraph", text: "Barénia Faubourg first appeared in the Hermès collections in 2016 (some sources date its wider release to 2017), named in homage to the house's legendary flagship at 24, Faubourg Saint-Honoré in Paris. Hermès describes it as 'an all-new heritage leather and re-interpretation of Barénia calfskin' — and its defining feature is a minuscule printed grain that reproduces a drummed, rolled texture across the surface." },
  { type: "paragraph", text: "That fine grain changes the personality of the leather. Where classic Barénia is smooth and glossy-lean, Faubourg feels waxy and velvety, with a relaxed, generous hand that is noticeably more supple than the original. To the untrained eye it can look remarkably like Togo or Clemence — but up close it is finer, and it retains the exact same double-tanned formula and rich oil saturation as classic Barénia. And just like its ancestor, it acquires a patina over time and darkens in the most exposed areas." },
  { type: "image", text: "Barénia Faubourg's micro-printed grain: finer than Togo, softer than classic Barénia.", image: IMG.faubourg_tex },
  { type: "image", text: "A Fauve Barénia Faubourg Birkin 35: the grained heir, built for everyday wear.", image: IMG.birkin_faubourg },
  { type: "h2", text: "Head to Head: Five Differences That Matter" },
  { type: "list", text: "Grain: Classic Barénia is nearly smooth with a natural, un-grained surface; Faubourg carries a minuscule printed grain that mimics a drummed hide.\nHand: Classic Barénia is firmer, glossier and more traditional; Faubourg is noticeably more supple, waxy and velvety — closer to Togo in softness.\nScratch behaviour: On classic Barénia, scratches mark the surface and then fade with warmth and friction; on Faubourg, the fine grain hides and resists scratches far more effectively from the start.\nPatina: Both darken and patina with use; classic Barénia does so more dramatically and visibly, Faubourg more evenly.\nAvailability: Classic Barénia is legendary for its scarcity; Faubourg is also rare but appears more frequently in recent production, especially in Kelly and Birkin formats." },
  { type: "image", text: "A Kelly 28 in Barénia Faubourg with gold hardware: heritage saddle leather, modern grain.", image: IMG.kelly_faubourg },
  { type: "h2", text: "Which One Should You Choose?" },
  { type: "list", text: "Choose classic Barénia if you are a purist: you want the smooth honeyed surface, the scent of saddle heritage, and a bag that records your life in soft marks and deepens into something irreplaceable.\nChoose Barénia Faubourg if you want the heritage character with everyday resilience: a leather that still patinas and smells of the tannery, but shrugs off scratches, rain and the realities of daily carry.\nBoth reward care and punish oil — but Faubourg forgives far more of the small accidents of modern life." },
  { type: "h2", text: "How to Care for Both" },
  { type: "list", text: "Keep oil away: oil-based creams, body oils and food can leave permanent dark marks — the single most important rule for both hides.\nLet scratches live: light marks on classic Barénia fade with warmth and gentle finger friction; do not scrub.\nBlot water promptly: both are naturally water-resistant, but standing water should be dried with a soft cloth.\nUse only neutral care: avoid alcohol, perfumes and generic cleaners; a dry microfiber cloth is enough for daily upkeep.\nStore with structure: use the dust bag and keep the bag stuffed, away from direct light and heat.\nAccept the patina: it is not damage — it is the entire point of Barénia." },
  { type: "image", text: "Barénia beyond bags: the same hide wrapped around a watch strap, patinating with daily wear.", image: IMG.strap_barenia },
  { type: "h2", text: "The MYBIRKIN Promise" },
  { type: "paragraph", text: "At MYBIRKIN, we work with premium Italian full-grain hides in the Barénia tradition — smooth heritage leather and lightly grained versions alike, hand-saddle stitched by a single master artisan and finished with solid, non-tarnish hardware. Every bespoke order carries our Lifetime Care promise, because a leather this personal deserves a partnership that lasts as long as the bag. Start your custom piece at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-barenia-faubourg-guide",
  title: "Barénia vs. Barénia Faubourg: The Heritage Hide and Its Modern Heir — The Ultimate Collector's Guide",
  slug: "barenia-vs-barenia-faubourg-heritage-hide-and-its-modern-heir",
  meta_description:
    "Classic Barénia or Barénia Faubourg? How Hermès' heritage saddle leather differs from its 2016 micro-grained heir — grain, hand, patina, care and value.",
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
  console.log("✅ 第八篇（Barénia vs Faubourg）已写入 blog_posts");
  console.log("URL: /blog/barenia-vs-barenia-faubourg-heritage-hide-and-its-modern-heir");
})();
