// 首篇引流博客录入脚本（表存在后运行）
// 用法: node scripts/seed-blog.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 读取 .env.local
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

const blocks = [
  { type: "paragraph", text: "Investing in a bespoke, handcrafted leather bag is an intimate experience. Beyond choosing the silhouette, the most critical decision that dictates the look, longevity, and feel of your bag is the leather itself." },
  { type: "paragraph", text: "If you are entering the world of high-end custom ateliers, you will constantly encounter three legendary tanneries terms: Togo, Swift, and Epsom. To help you design your perfect piece, let's dissect the anatomy of these premium Italian full-grain leathers." },
  { type: "h2", text: "1. Togo Leather: The Textured Icon" },
  { type: "paragraph", text: "Togo is arguably the most coveted leather for structured everyday handbags. Sourced from male calfskins, it is a natural grained leather, meaning its beautiful texture is not artificially pressed into the hide." },
  { type: "h3", text: "The Look & Feel" },
  { type: "paragraph", text: "It features a defined, round grain with a soft matte finish. You might notice fine veins running through the hide, which is a hallmark of authenticity." },
  { type: "h3", text: "The Performance" },
  { type: "paragraph", text: "Togo is incredibly resilient. It naturally resists scratches, holds its shape remarkably well over time (though it will develop a subtle, elegant slouch years later), and can easily handle a light drizzle." },
  { type: "h3", text: "Best Used For" },
  { type: "paragraph", text: "Larger structured silhouettes like the Birkin 30 or Kelly 32 where durability is paramount." },
  { type: "h2", text: "2. Swift Leather: The Matte Velvet" },
  { type: "paragraph", text: "Formerly known as Gulliver, Swift leather is a supple, semi-smooth calfskin engineered for those who appreciate deep, saturated color and a luxurious tactile experience." },
  { type: "h3", text: "The Look & Feel" },
  { type: "paragraph", text: "Swift has an ultra-fine, almost micro-grain texture that appears smooth from afar. It possesses a distinct, velvety softness and reflects light beautifully, making jewel tones look remarkably vibrant." },
  { type: "h3", text: "The Performance" },
  { type: "paragraph", text: "Because it is soft, it is more prone to surface scratches than Togo. However, light scratches can often be rubbed out gently with a clean, warm thumb. It yields a more fluid, relaxed silhouette." },
  { type: "h3", text: "Best Used For" },
  { type: "paragraph", text: "Smaller, elegant pieces like the Constance 18 or Lindy 26 that demand a delicate, high-fashion hand-feel." },
  { type: "h2", text: "3. Epsom Leather: The Rigid Protector" },
  { type: "paragraph", text: "Unlike Togo and Swift, Epsom is an embossed leather. This means the grain pattern is mechanically pressed into the leather under intense heat, creating a uniquely rigid and highly uniform surface." },
  { type: "h3", text: "The Look & Feel" },
  { type: "paragraph", text: "It showcases a tight, cross-hatched grain pattern. The leather is completely stiff and structured, giving the bag a pristine, architectural shape that will never bend or sag." },
  { type: "h3", text: "The Performance" },
  { type: "paragraph", text: "Epsom is the undisputed king of durability. It is highly scratch-resistant, water-resistant, and practically effortless to clean. Colors appear sharp and bright on its embossed surface." },
  { type: "h3", text: "Best Used For" },
  { type: "paragraph", text: "Geometric and structured bags like the Kelly 25 Sellier or Constance 24, designed to look sharp forever." },
  { type: "h2", text: "The Artisan Promise" },
  { type: "paragraph", text: "For complete material and workshop details, please visit MYBIRKIN website." },
];

const post = {
  id: "blog-togo-swift-epsom",
  title: "Togo vs. Swift vs. Epsom: The Ultimate Guide to Luxury Leather Choice",
  slug: "togo-vs-swift-vs-epsom-the-ultimate-guide-to-luxury-leather-choice",
  meta_description:
    "Demystifying luxury leathers. Discover the structural differences, scratch resistance, and slouch factors between Togo, Swift, and Epsom full-grain hides.",
  category: "Leather Guide",
  cover_image: "",
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
  console.log("✅ 文章已写入 blog_posts");
  console.log("URL: /blog/togo-vs-swift-vs-epsom-the-ultimate-guide-to-luxury-leather-choice");
})();
