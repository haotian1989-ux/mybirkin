// 第七篇引流博客录入脚本（Epsom: History, Character & Care）
// 用法: node scripts/seed-blog-7.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791245732/q7wodgccz3qqbubwupop.jpg",
  kelly_rose: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791245733/rta74isaprmocooxmzm3.jpg",
  constance: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791245732/mcxvxsh1hwanefqp2pew.jpg",
  kelly_feu: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791245732/hn6cj4zt9anh6wjrs9cf.jpg",
};

const blocks = [
  { type: "paragraph", text: "Among the great Hermès leathers, most are celebrated for what they become over time. Epsom is celebrated for what it refuses to become. This embossed calfskin — its grain pressed in, not grown — is the most structured, most lightweight, and most colour-vibrant leather in the modern house range, built to hold a crisp architectural silhouette for decades." },
  { type: "paragraph", text: "Where Togo softens, Clemence slouches, and Swift shines, Epsom stands firm. It is the leather behind the Sellier Kelly, the Constance, and the Mini Kelly — the collector's choice when the brief is simple: a bag that still looks brand-new twenty years from now. This guide unpacks its pressed origins, its signature cross-hatch character, how it differs from the great grained leathers, and the care rules that keep it sharp." },
  { type: "h2", text: "The Origin of Epsom: A Pressed Perfection" },
  { type: "paragraph", text: "Epsom took its name from a town in south-east England famous for its horse races — a fitting tribute for a leather born into the harness-maker's house. It first appeared in the Hermès collections in 2004, introduced as the successor to Courchevel, which was discontinued the same year." },
  { type: "paragraph", text: "The defining fact of Epsom is that its grain is not natural. Where Togo and Clemence reveal the hide's own texture, Epsom's fine, regular cross-hatch pattern is machine-printed onto the calfskin under intense heat and pressure. This is a deliberate engineering choice: the embossing gives the leather a rigidity, a uniformity, and a resistance to moisture that no naturally grained leather can match. Hermès itself describes the result with surgical precision: a small, regular and slightly glossy grain; uniform; deep colours; a dry feel with a slightly 'up and down' grain; a round and firm hand." },
  { type: "image", text: "Epsom's signature cross-hatch grain — fine, regular, and machine-pressed into the hide.", image: IMG.cover },
  { type: "h2", text: "The Anatomy of Epsom" },
  { type: "paragraph", text: "Hold an Epsom bag and the first thing you notice is the hand. The leather is firm, dry, and round — almost architectural. The second thing is the weight: Epsom is among the lightest leathers Hermès makes, a surprising lightness for a material with this much structure." },
  { type: "list", text: "Grain: fine, regular cross-hatch pattern, uniform across the entire surface.\nFinish: semi-matt with a subtle sheen and a striking two-tone depth in the grain.\nHand: round, firm and dry — the most rigid leather in the regular range.\nWeight: among the lightest Hermès leathers, ideal for daily wear.\nColour: absorbs dye with exceptional vibrancy — the brightest shades in the house look most brilliant in Epsom.\nEvolution: keeps its shape and its colour; no patina develops, and the grain may fade slightly in areas of heavy rubbing." },
  { type: "image", text: "An Epsom Sellier Kelly 32: crisp edges, structured silhouette, brilliant colour.", image: IMG.kelly_rose },
  { type: "h2", text: "Why Collectors Choose Epsom" },
  { type: "paragraph", text: "Epsom is the most practical leather Hermès makes for daily use. Its embossed surface resists scratches, shrugs off light water, and even stands up to minor dents, while the rigid structure holds its form through years of wear. Collectors often note that an Epsom Sellier Kelly 25 can appear as sharp decades later as the day it was made." },
  { type: "list", text: "Scratch resistance: the pressed grain shrugs off surface marks better than any natural-grain leather.\nWater: handles light rain far better than most hides — though it is not waterproof; blot wet surfaces promptly.\nStructure: bags stand up on their own and never sag — ideal for Sellier constructions.\nColour: holds Hermès' brilliant shades with a vividness that barely fades in fifteen years.\nCare: effortless to clean compared with more porous leathers.\nInvestment: Epsom Kelly Selliers and Constances consistently outperform other leathers at resale." },
  { type: "paragraph", text: "One caveat collectors should know: deep scratches from keys or sharp objects can still mark the surface, and because the grain is pressed rather than natural, marks cannot be buffed out the way they can on Togo. Corners on Sellier bags remain the most vulnerable point. But for a bag that simply will not age, nothing in the Hermès range is tougher." },
  { type: "image", text: "Epsom's colour performance: a vivid orange that stays luminous for years.", image: IMG.kelly_feu },
  { type: "h2", text: "Epsom vs. Togo vs. Clemence vs. Chèvre" },
  { type: "list", text: "Epsom — embossed, fine cross-hatch grain; firm and rigid; the most structured and shape-retentive. Best for Sellier Kelly, Constance, Mini Kelly.\nTogo — natural raised pebble grain; soft, matte and resilient; lightweight with an elegant drape. The everyday icon for Birkin and Kelly Retourne.\nClemence — natural generous grain; soft, supple and heavy; drapes into a relaxed slouch. The comfort classic for Evelyne, Picotin and Lindy.\nChèvre — fine-grained goatskin; light, firm and scratch-resistant; a subtle sheen that grows satiny. The refined compact classic for Constance and small formats." },
  { type: "image", text: "The Constance in Epsom: the H clasp and crisp lines that made it a collector's icon.", image: IMG.constance },
  { type: "h2", text: "How to Care for Epsom" },
  { type: "list", text: "Dust regularly: a soft, dry microfiber cloth is all that is needed for day-to-day care.\nDry water promptly: blot any wet surface immediately with a soft, lint-free cloth — Epsom is water-resistant, not waterproof.\nAvoid overloading: stuffing the bag too tightly can distort its structured silhouette.\nNever bend or fold: the pressed, rigid texture can develop visible, irreversible creases.\nSkip harsh chemicals: no alcohol-based cleaners, perfumes, or generic conditioners — they can damage the embossed coating.\nStore stuffed: use tissue paper or a shaper and keep the bag in its dust bag, away from light and heat.\nTrust the professionals: for stains or deep marks, specialist cleaning is safer than home remedies." },
  { type: "h2", text: "The MYBIRKIN Promise" },
  { type: "paragraph", text: "At MYBIRKIN, Epsom is the soul of our Kelly Sellier and Constance pieces — premium Italian full-grain hides, hand-saddle stitched by a single master artisan with diamond-awl precision, and finished with solid, non-tarnish hardware. Every custom order is backed by our Lifetime Care promise, so your structured silhouette stays sharp and we are with you for the whole journey. Explore the collection at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-epsom-guide",
  title: "Epsom: History, Character & Care — The Ultimate Collector's Guide",
  slug: "epsom-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Epsom — Hermès' embossed, cross-hatched calfskin built for structure. Its 2004 origins, crisp Sellier character, scratch-resistant surface, and the care rules collectors trust.",
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
  console.log("✅ 第七篇（Epsom）已写入 blog_posts");
  console.log("URL: /blog/epsom-history-character-care-the-ultimate-collectors-guide");
})();
