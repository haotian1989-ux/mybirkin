// 第十篇引流博客录入脚本（Lizard 蜥蜴皮深度篇）
// 用法: node scripts/seed-blog-10.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765687/pcziuushpcwcngdpamii.jpg", // 绿色蜥蜴皮特写+缝线 (Purseblog via Leather Art Center)
  salvator_tex: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765508/lhjmuqhpjnohon34h8vb.jpg", // Salvator 蜥蜴皮米底棕环特写 (The Birkin's & Kelly's House)
  kelly_sav: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765508/jusxaixcg90exveatexq.jpg", // ébène salvator Kelly 25 钌金 2005 (Christie's)
  kelly_beige: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765506/q4plzijhfqitnqtv2qx0.jpg", // beige lizard Kelly 32 sellier 金扣 (Maison Vivienne)
  kelly_fuchsia: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765507/zhsukmhlbdqkucygslhw.jpg", // Fuchsia lizard Kelly 25 钌金 (Mightychic)
  kelly_green: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765508/lbjxfoqpb62octphiw9b.jpg", // 1991 中绿迷你 Kelly Sellier 金扣 (dokodemo)
};

const blocks = [
  { type: "paragraph", text: "Lizard is the quiet virtuoso of the exotic leathers. Where crocodile announces itself with bold scales and ostrich with raised quills, lizard whispers — its surface is a fine, tessellated mosaic of tiny scales that catches the light like liquid metal. It is the most delicate of the exotics, prized for small leather goods and the most refined of the petite Kellys, and it demands a level of care that separates serious collectors from everyone else. This is the complete guide to Hermès lizard." },
  { type: "h2", text: "The Two Lizards of Hermès" },
  { type: "paragraph", text: "Hermès works principally with two lizard species. Lizard Varanus Niloticus — the Nile monitor, native to sub-Saharan Africa — yields petite, rounded scales arranged in neat rows, with a delicate, textured grain and a lustrous finish. It is used mainly for wallets, clutches and small accessories, where its fineness can be appreciated up close." },
  { type: "paragraph", text: "Lizard Varanus Salvator — the water monitor of Southeast Asia — carries small, consecutive scales with natural brown rings against a beige base, a pattern that immediately distinguishes it. Salvator is the lizard most often seen in larger formats, including the Kelly and Constance, and it is the skin behind some of the most collectible lizard bags of the 1990s and 2000s." },
  { type: "image", text: "Salvator lizard close-up: beige base with natural brown rings — the signature pattern of Hermès' second lizard.", image: IMG.salvator_tex },
  { type: "image", text: "Hermès lizard in green: fine, tessellated scales with hand-stitched edges.", image: IMG.cover },
  { type: "h2", text: "Why Lizard Looks Like Liquid Metal" },
  { type: "paragraph", text: "Compared with crocodile, lizard scales are dramatically smaller and more uniform, creating a geometric, almost tiled texture that reflects light in constantly changing patterns. Each scale acts like a tiny mirror, giving lizard bags a subtle shimmer that makes the surface feel alive as it moves. Hermès finishes lizard in two ways: 'lisse' (polished, mirror-smooth) and 'mat' (softly muted) — the same hide, two very different personalities." },
  { type: "paragraph", text: "Because a lizard's body is small, a single hide yields only limited surface area — which is why lizard appears almost exclusively in compact silhouettes: wallets, cardholders, Constance 18s and Kelly 20–25. A large lizard Birkin or Kelly is exceptionally rare and commands a corresponding premium." },
  { type: "image", text: "A matte ébène Salvator lizard Kelly 25 with ruthenium hardware, 2005 — sold for USD 37,500 at Christie's.", image: IMG.kelly_sav },
  { type: "h2", text: "The Fragility Paradox" },
  { type: "paragraph", text: "Lizard is often described as the 'entry-level' exotic — yet it is in fact more fragile than crocodile or alligator. Its tiny scales feel almost like fabric, and they punish carelessness. Water is the great enemy: even a single droplet can leave a permanent tide mark, and wiping with liquid is forbidden. Light, heat and oils (perfume, lipstick, perspiration) permanently alter or mark the skin. This is why Hermès officially designates lizard a 'precious leather' and recommends that all cleaning be performed by its own craftsmen." },
  { type: "image", text: "A beige lizard Sellier Kelly 32 with gold hardware: the classic small-format exotic.", image: IMG.kelly_beige },
  { type: "h2", text: "How to Spot the Real Thing" },
  { type: "list", text: "Scale pattern: genuine lizard scales are natural, slightly irregular and sit proud of the surface; embossed fakes look unnaturally uniform and flat.\nMovement: real lizard catches light scale by scale, with a subtle shifting shimmer; imitation prints reflect evenly.\nFinish: lisse lizard is mirror-polished yet still shows individual scale edges; mat lizard is softly muted but never plastic-looking.\nFlexibility: genuine lizard is supple and drapes, while coated fakes feel stiff.\nAlways cross-check the hardware, interior stamp and stitching: convincing texture alone is never proof." },
  { type: "image", text: "Fuchsia lizard Kelly 25 Sellier with palladium hardware: colour depth only an exotic can hold.", image: IMG.kelly_fuchsia },
  { type: "h2", text: "How to Care for Lizard" },
  { type: "list", text: "Water is forbidden: never wet-wipe lizard; even small droplets leave permanent tide marks. Blot with a dry, lint-free cloth and nothing more.\nStable environment: keep the bag away from humidity, direct sun, radiators and temperature swings.\nKeep oils off: perfume, lipstick, hand creams and sweat permanently alter the colour.\nNo commercial products: Hermès states clearly that store-bought care products are unsuitable for precious leathers.\nStore correctly: dust bag, padded interior, warm dry place away from light — and no moisture-absorbing sachets, which dry the skin.\nLeave restoration to experts: lizard must be cleaned and re-conditioned by Hermès or a specialist trained in exotic skins." },
  { type: "image", text: "A 1991 mini Kelly Sellier in green lizard with gold hardware: three decades on, still collectible.", image: IMG.kelly_green },
  { type: "h2", text: "The MYBIRKIN Promise" },
  { type: "paragraph", text: "At MYBIRKIN, we treat every skin with the discipline it deserves. Each bespoke piece is hand-cut and hand-saddle stitched by a single master artisan, finished with solid, non-tarnish hardware and backed by our Lifetime Care promise — because true craft is a long-term relationship, not a transaction. Explore the atelier and commission your piece at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-lizard-guide",
  title: "Lizard: History, Character & Care — The Ultimate Collector's Guide",
  slug: "lizard-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Hermès lizard leather: Niloticus vs Salvator, the two exotics behind the finest Kellys. Scale patterns, lisse vs mat finishes, fragility, authentication and the care that keeps it flawless.",
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
  console.log("✅ 第十篇（Lizard）已写入 blog_posts");
  console.log("URL: /blog/lizard-history-character-care-the-ultimate-collectors-guide");
})();
