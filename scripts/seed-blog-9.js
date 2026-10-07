// 第九篇引流博客录入脚本（Ostrich 鸵鸟皮深度篇）
// 用法: node scripts/seed-blog-9.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791366973/fx9pkb03edzhjazahwi0.jpg", // 黑色鸵鸟皮特写 (Gentleman's Gazette)
  tex: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791367038/ngiqgtp2ymkbermgihje.jpg", // 棕褐鸵鸟皮特写 (Bikerringshop)
  birkin: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791366976/y2sziuucyduigm1dztn5.jpg", // Cognac Ostrich Birkin 35 金扣 1995 (Christie's)
  kelly_mouse: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791366973/ttdkdjiail7cxayyuvsn.jpg", // 慕斯灰 Ostrich Kelly 32 金扣 1993 (Poly Auctions)
  constance: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791366972/gmptf4zkimmfwe4bibrz.jpg", // Constance 18 Black Ostrich 玫瑰金 (SACLÀB)
  kelly_rose: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791366971/fpsfzwmsaojr7oqeqlbr.jpg", // Kelly Rose Tyrien Ostrich 银扣 (Vestiaire Collective)
};

const blocks = [
  { type: "paragraph", text: "Among the great exotic leathers, ostrich is the quiet aristocrat. It has no crocodile's menace and no lizard's sheen — instead, its surface is dotted with hundreds of tiny raised quill follicles, like a constellation frozen in leather. It is soft as butter from the very first day, lighter than most calfskins, and famously durable. And because only a fraction of each hide actually carries those signature bumps, every full-quill ostrich piece is inherently scarce. This is the complete collector's guide to Hermès ostrich." },
  { type: "h2", text: "The Feather Legacy: Where Ostrich Comes From" },
  { type: "paragraph", text: "Ostrich leather comes from ostriches farmed principally in South Africa, where commercial ostrich farming has been established for generations (they are also raised in Australia). The species — Struthio camelus — sits technically outside the CITES protected-exotic classification, yet Hermès treats ostrich as an exotic in price and in allocation, which is exactly why ostrich bags carry the mystique of the far rarer skins." },
  { type: "paragraph", text: "The leather's calling card is the quill follicle: the raised dot where a feather once anchored into the hide. Only roughly one-third of a single ostrich skin bears this pattern, concentrated along the back and neck in the region tanners call the 'crown'. The rest of the hide is comparatively smooth. This is why full-quill ostrich is so expensive — a single hide yields very little of the pattern collectors actually prize." },
  { type: "image", text: "The signature of ostrich: black full-quill hide with raised feather follicles.", image: IMG.cover },
  { type: "h2", text: "Why Ostrich Feels Different" },
  { type: "paragraph", text: "The bumps are empty feather follicles — keratin structures that once anchored each feather to the skin, left as raised dots after plucking and tanning. Ostrich leather is unusually rich in natural oils, which is why it feels almost creamy under the fingers from the first touch, where most leathers need months of wear to soften. It is also remarkably lightweight and, for its suppleness, extremely tough." },
  { type: "paragraph", text: "Two more quirks make it unforgettable. Ostrich darkens where it touches skin — the natural oils of your hands deepen the color of the areas you handle most — yet it lightens where it is exposed to light, whether sunlight or a lamp. A new ostrich bag may feel slightly firm; with use it relaxes and 'breaks in' like a fine pair of shoes. It also absorbs dye like almost no other exotic, which is why ostrich appears in saturated jewel tones that seem to glow from within." },
  { type: "image", text: "A 1995 Cognac ostrich Birkin 35 with gold hardware (Christie's): collectors' benchmark for the hide.", image: IMG.birkin },
  { type: "h2", text: "Full Quill vs. Half Quill: Why Pattern Matters" },
  { type: "paragraph", text: "Because the quill pattern exists only on the crown area, tanners and ateliers divide ostrich into full-quill hides — where the follicles are distributed evenly across the visible front and back panels of a bag — and half-quill hides, where smooth sections share the surface. Full-quill Birkin and Kelly pieces command a clear premium, because the scarce patterned area of the hide has been used to maximum effect." },
  { type: "paragraph", text: "When inspecting a pre-owned ostrich bag, buyers check symmetry: the quills should be roughly the same size and density on the front and back panels. This evenness is a mark of a carefully selected hide — and of an authentic one." },
  { type: "image", text: "Up close: natural oil-rich ostrich grain with round, evenly-spaced quill follicles.", image: IMG.tex },
  { type: "h2", text: "How to Spot the Real Thing" },
  { type: "list", text: "Follicle placement: genuine quills follow a natural, slightly irregular spacing; fakes show unnaturally uniform or embossed patterns that sit flat on the surface.\nFollicle feel: authentic quill bumps are firm yet slightly yielding to pressure; flat or mushy follicles signal a badly aged or poorly stored hide.\nSheen: well-kept ostrich glows softly from within; it should never look greasy or artificially shiny.\nSurface: real ostrich has a distinct, slightly waxy feel that printed or embossed imitations cannot replicate.\nAlways cross-check the interior stamp, stitching and hardware: a convincing exterior texture alone is not proof." },
  { type: "image", text: "A 1993 mouse-grey ostrich Sellier Kelly 32 with gold hardware (Poly Auction, Beijing).", image: IMG.kelly_mouse },
  { type: "h2", text: "How to Care for Ostrich" },
  { type: "list", text: "Water is the enemy: ostrich is extremely sensitive to water and humidity. If it touches water, blot immediately with a soft, lint-free cloth — never rub — to prevent stains and blisters.\nAvoid intense light and heat: prolonged direct sunlight, window placement or radiator heat will alter the colour.\nKeep oil away: the leather is oil-rich itself; external oils, creams and body contact in heavy doses will darken it permanently.\nNo generic cleaners: avoid alcohol, perfume and commercial leather care products; a dry microfiber cloth is the daily ritual.\nStore correctly: keep the bag in its dust bag, stuffed to hold its shape, in a warm, dry place away from light.\nRestoration is specialist work: deep cleaning and re-conditioning must be done by artisans trained in exotic skins." },
  { type: "image", text: "Black ostrich Constance 18 with rose gold hardware (SACLÀB): the everyday exotic.", image: IMG.constance },
  { type: "h2", text: "Why Collectors Pay a Premium" },
  { type: "paragraph", text: "Ostrich occupies a unique position in the exotic market. Relative to Togo, it typically commands a price premium of roughly 1.5x to 2.5x, and its resale ceiling sits well above what any calfskin bag can achieve — especially in rare colors or larger sizes. Recent auction results underline the point: a Fuchsia ostrich Birkin 35 was offered at Sotheby's with estimates up to USD 20,000, while Christie's has listed a 1995 Cognac ostrich Birkin 35 and a 2005 Saffron ostrich Birkin 35 with estimates around USD 12,000–15,000 each. The hide is the scarcity; the collector supplies the patience." },
  { type: "image", text: "Rose Tyrien ostrich Kelly, palladium hardware (Vestiaire Collective): the proof of ostrich's colour depth.", image: IMG.kelly_rose },
  { type: "h2", text: "The MYBIRKIN Promise" },
  { type: "paragraph", text: "At MYBIRKIN, we believe exotic craft deserves the same discipline as the classics. Every bespoke order is executed by a single master artisan using hand-saddle stitching and premium hides, with hardware plated to luxury standards and our Lifetime Care promise standing behind the work. Explore the atelier and start your custom piece at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-ostrich-guide",
  title: "Ostrich: History, Character & Care — The Ultimate Collector's Guide",
  slug: "ostrich-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Hermès ostrich leather: the exotic hide with the signature quill follicles. South African origins, full-quill vs half-quill, authentication signs and the care that protects a six-figure investment.",
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
  console.log("✅ 第九篇（Ostrich）已写入 blog_posts");
  console.log("URL: /blog/ostrich-history-character-care-the-ultimate-collectors-guide");
})();
