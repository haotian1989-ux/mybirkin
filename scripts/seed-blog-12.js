// 第十二篇引流博客录入脚本（Swift 小牛皮深度篇）
// 用法: node scripts/seed-blog-12.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409918/uvneqv7idqmaanxtr98e.jpg", // Swift calfskin close-up, fine grain (Madison Avenue Couture)
  togo: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409923/vwlqvbq4hmhbuhk0u7nt.jpg", // Togo calfskin close-up, pronounced pebbled grain (Madison Avenue Couture)
  birkin30: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409927/iunr9rzfbzex87zr1o2j.jpg", // Beige Swift Birkin 30 with palladium hardware, 2009 (Christie's)
  kelly_yellow: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409932/pckbkcouvx4cctrslbaj.jpg", // Kelly 25 Swift Jaune Poussin (SACLÀB)
  kelly_etoupe: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409935/taqxigfsip4p1vr5rq6q.jpg", // Kelly 25 Swift Étoupe, side profile (Collector Square)
  birkin35_side: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1793409939/tfyottoexnrq45vanvik.jpg", // Birkin 35 Swift Acajou Foncé, three-quarter view (Drouot)
};

const blocks = [
  { type: "paragraph", text: "Of all the calfskins in the Hermès repertoire, Swift is the quiet radical. It refuses to announce itself the way Togo does with its pebbled grain, and it makes no attempt at the architectural stiffness of Epsom. Instead it arrives almost smooth, faintly lustrous, and astonishingly soft — and then spends the next decade becoming softer still. That quietness is precisely why it carries the house's most saturated colours, and why a Swift bag at five years old looks nothing like the same bag on the day it left the workshop." },
  { type: "h2", text: "A Skin Named After a Novelist" },
  { type: "paragraph", text: "Hermès records Swift as first appearing in its collections in 2004. The name is a deliberate literary nod: the leather is named after Jonathan Swift, the author of Gulliver's Travels, because it closely resembles Gulliver calfskin — a leather the house no longer uses in today's collections. In other words, Swift is not a new invention but a resurrection, carrying forward the character of a discontinued skin under a new name. Some secondary-market guides date the Gulliver discontinuation to 1999 and Swift's reintroduction to 2005; Hermès' own product copy gives 2004 as its first appearance, and that is the figure worth trusting when the two accounts diverge." },
  { type: "paragraph", text: "The house describes it plainly: almost smooth with a delicate shine, a grain so light it is sometimes hardly noticeable; soft and tender to the touch, supple and generous in hand. Sotheby's puts it more poetically — Swift reflects light rather than absorbing it, giving bags a luminous, almost liquid finish. If you have ever wondered why a Hermès bag in a pale pink or a clear yellow seems lit from inside the leather rather than painted onto it, Swift is usually the answer." },
  { type: "image", text: "Swift calfskin up close: an almost invisible grain, a delicate sheen, and a surface that reads as silk rather than leather.", image: IMG.cover },
  { type: "h2", text: "Reading the Grain: Swift vs Togo" },
  { type: "paragraph", text: "The single most useful comparison for a buyer is Swift against Togo, because the two are confused constantly in photographs and even in listings. Togo — introduced in 1997 and still the most requested Hermès leather — is a naturally grained calfskin with a matte finish and a clearly visible, irregular pebble pattern. Its grain is large enough to catch a fingernail; its surface is designed to swallow minor scuffs." },
  { type: "paragraph", text: "Swift is the opposite proposition. Its grain is so fine that at arm's length the surface looks smooth, and the tell is not texture but behaviour: light runs across it in a continuous sheen, and the leather yields immediately under a thumb. Put the two side by side under the same light and the difference is unmistakable — one is a landscape, the other is a mirror with a whisper of grain." },
  { type: "image", text: "Togo calfskin, photographed under the same conditions: a pronounced, irregular pebbled grain that Swift deliberately does not have.", image: IMG.togo },
  { type: "h2", text: "Why Colour Lives Differently on Swift" },
  { type: "paragraph", text: "Swift absorbs dye exceptionally well, and that single property explains most of its appeal. On a textured leather, colour sits on the surface and is broken up by shadow inside every grain; on Swift, colour enters the fibre and returns through a smooth, slightly reflective skin. The practical result is saturation with depth: the same colour code looks clearer, brighter and more jewel-like on Swift than on Togo or Epsom." },
  { type: "paragraph", text: "This is why the house's most chromatic shades — the pale yellows, the clear pinks, the vivid purples and greens — so often appear on Swift. It is also why collectors treat a Swift bag in a strong colour as a different object from the same bag in a neutral: the leather is doing half the work." },
  { type: "image", text: "A Kelly 25 in Swift, Jaune Poussin: pale yellow that reads as luminous rather than flat, the signature of dye absorbed into a smooth skin.", image: IMG.kelly_yellow },
  { type: "h2", text: "The Trade-off: Softness vs Structure" },
  { type: "paragraph", text: "Nothing about Swift is engineered for hardness. Independent leather guides consistently rate its structure as low: it is light, it drapes, and it will not hold a rigid architectural line the way Epsom or Box Calf does. It also shows scratches, scuffs and even finger marks more readily than a grained leather, because there is no pebble texture to hide them." },
  { type: "paragraph", text: "What that means in practice is a division of labour inside the Hermès range. Swift belongs to the silhouettes that are meant to soften: the Lindy, the Picotin, the 24/24, the relaxed Birkin, and the Kelly in its retourné (soft-bodied) construction. It is the wrong choice for a sellier Kelly, whose entire appeal is a hard, upright, formal line — that construction belongs to firmer skins." },
  { type: "paragraph", text: "Read that as a limitation and you will avoid Swift. Read it as a design intention and the logic becomes elegant: a bag that moves with the body, weighs little, and grows more personal every year." },
  { type: "image", text: "Kelly 25 in Swift, Étoupe, seen from the side: the softened, slightly inward-curving profile that Swift produces and a firmer skin cannot.", image: IMG.kelly_etoupe },
  { type: "h2", text: "What Swift Does to a Silhouette" },
  { type: "paragraph", text: "The most convincing argument for Swift is not a specification but a photograph of a used bag. A Birkin 30 in Swift does not stand at attention; the handles arc, the body relaxes slightly at the base, and the flap acquires a gentle break where the leather has learned the shape of the turnlock. Christie's has offered exactly this object — a beige Swift Birkin 30 with palladium hardware from 2009 — and what the catalogue image shows is a bag that has already begun its own biography." },
  { type: "paragraph", text: "This is also the reason Swift rewards patience rather than punishing it. Hermès states plainly that the leather becomes even more supple over time. A Swift bag at year one is a clean, slightly formal object; at year ten it is a soft, personal one. Collectors who buy Swift for its colour often end up keeping it for that trajectory." },
  { type: "image", text: "A beige Swift calfskin Birkin 30 with palladium hardware, 2009 — Christie's. Note the softened handle arc and the relaxed body line.", image: IMG.birkin30 },
  { type: "h2", text: "How to Care for Swift — and What to Check Before You Buy" },
  { type: "paragraph", text: "Hermès applies the same care philosophy to all its leathers, and Swift is no exception: it dislikes water, intense heat, direct sunlight, and air that is either too humid or too dry. The house's guidance is specific and worth quoting rather than paraphrasing — if the leather contacts water, wipe it immediately with a soft, lint-free cloth to prevent stains and blisters forming as it dries; keep it away from prolonged intense light and heat, which can alter the colour; and do not attempt to treat it with commercial care products, which are not suitable for Hermès leather. Cleaning belongs to Hermès craftsmen." },
  { type: "list", text: "Daily handling: hand cream, perfume, sanitiser and sunscreen are the four most common causes of darkening and blotching on Swift — apply them, let them dry, then pick up the bag.\nSharp edges: keys, rings and claw-set jewellery scratch Swift far more visibly than Togo; keep them out of the same hand as the bag.\nDenim and dark clothing: pale Swift picks up dye transfer at the handle and the back panel; this is the single most common irreversible mark on light-coloured examples.\nStorage: stuff the bag lightly to preserve its curve, keep it in its dust bag, and avoid hanging it by the strap for long periods.\nWhen buying pre-owned: check the four corners first (Swift wears there before anywhere else), then the handles for darkened hand contact, then the base and back panel for dye transfer, and finally press the leather — genuine Swift yields and springs back softly, while coated imitation feels stiff and uniform.\nAlways judge authenticity on the whole object — hardware engraving, interior stamp, blind stamp, stitching and proportions together — never on texture alone." },
  { type: "image", text: "Birkin 35 in Swift, Acajou Foncé, three-quarter view: the continuous sheen and soft fold lines that identify a well-used Swift bag.", image: IMG.birkin35_side },
  { type: "h2", text: "The MYBIRKIN Approach" },
  { type: "paragraph", text: "At MYBIRKIN, leather is selected for the silhouette it has to serve, not for the label it carries. Every piece is cut and hand-saddle stitched by a single master artisan using continuous linen thread, finished with solid, non-tarnish hardware, and backed by our Lifetime Care promise — so the skin you choose on day one is still the skin you carry on day one thousand. Explore the atelier and commission your piece at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-swift-guide",
  title: "Swift: History, Character & Care — The Ultimate Collector's Guide",
  slug: "swift-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Hermès Swift calfskin explained: its Gulliver heritage, how its near-invisible grain differs from Togo, why it carries the house's most saturated colours, its structural trade-offs, and the care that keeps it luminous.",
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
  console.log("✅ 第十二篇（Swift）已写入 blog_posts");
  console.log("URL: /blog/swift-history-character-care-the-ultimate-collectors-guide");
})();
