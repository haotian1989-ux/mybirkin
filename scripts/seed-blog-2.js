// 第二篇引流博客录入脚本（Hand-Stitched vs. Machine-Stitched）
// 用法: node scripts/seed-blog-2.js
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
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790664864/cfjrjsbzqz9i2qenzbtl.jpg",
  saddle: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790664867/ns946wzduopmql5natkw.jpg",
  machine: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790664869/yi8fqybm2iisbcsttgpc.jpg",
  tools: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1790664872/p1uoxpk16bhaxhgupl3a.jpg",
};

const blocks = [
  { type: "paragraph", text: "In the realm of high-end luxury leather goods, the word \"handcrafted\" is frequently thrown around by marketing departments. However, there is a monumental difference between a bag assembled on a commercial sewing machine and one created through true, heritage hand-saddle stitching." },
  { type: "paragraph", text: "For collectors looking to acquire a bespoke masterpiece, understanding this mechanical difference is crucial. Let's look under the magnifying glass to see why hand-stitching remains the undisputed gold standard of luxury outerwear and accessories." },
  { type: "h2", text: "The Engineering Behind the Saddle Stitch" },
  { type: "paragraph", text: "To understand why hand-stitching is superior, we must look at how a standard sewing machine operates." },
  { type: "paragraph", text: "A sewing machine uses two separate threads: a top thread and a bobbin thread. The machine punches a straight hole, pushes the top thread through, loops it around the bobbin thread, and pulls it back up. This creates a lock stitch." },
  { type: "paragraph", text: "The fatal flaw of a machine lock stitch is dependency. If the thread snaps at any single point due to friction or wear, the entire seam loses its tension. Pulling on one loose end can unravel the entire side of a bag like a zipper." },
  { type: "paragraph", text: "In contrast, an artisan performing a traditional saddle stitch uses a single continuous linen thread with a needle attached to each end. The artisan manually pierces the hide using a diamond-shaped awl, then passes both needles through the exact same hole from opposite directions, creating an internal knot inside every single perforation." },
  { type: "paragraph", text: "If a hand-saddle stitch breaks, the two threads remain securely knotted within the leather. The rest of the seam remains completely intact, ensuring the bag will never fall apart." },
  { type: "image", text: "A true hand-saddle stitch sits at a subtle, elegant diagonal angle.", image: IMG.saddle },
  { type: "h2", text: "How to Spot the Difference in Seconds" },
  { type: "paragraph", text: "You don't need to rip a bag open to know how it was made. You can spot a machine-made replica or mass-produced bag instantly by observing these visual hallmarks:" },
  { type: "image", text: "A machine lock stitch — perfectly flat and mathematically uniform.", image: IMG.machine },
  { type: "paragraph", text: "The Angle of the Stitch: A machine needle punches straight up and down, resulting in perfectly flat, horizontal stitches. A hand-saddle stitch naturally sits at a subtle, elegant diagonal angle (a distinct slanted slant) because of the diamond awl's piercing path." },
  { type: "paragraph", text: "The Back of the Seam: On a machine-sewn product, the back of the seam often looks slightly different or less neat than the front. A master artisan's hand-saddle stitch looks virtually identical, flawless, and perfectly tensioned on both the interior and exterior of the leather." },
  { type: "paragraph", text: "Perfect Imperfection: Machines produce cold, mathematically identical stitches. Hand-stitching carries a human soul—infinitesimal variations in spacing and tension that signal authentic human craftsmanship." },
  { type: "h2", text: "The Investment Value" },
  { type: "image", text: "The artisan's toolkit: twin needles and a diamond awl.", image: IMG.tools },
  { type: "paragraph", text: "While machine-stitching takes seconds, fully hand-saddle stitching a classic Birkin 30 or Kelly 28 can take an artisan over 20 to 30 hours of continuous manual labor. This intense devotion to detail is why true bespoke pieces command respect." },
  { type: "paragraph", text: "At ateliers like MYBIRKIN, we refuse to cut corners. Every custom order is executed using authentic vegetable-tanned Italian hides and meticulous hand-saddle stitching, backed by our Lifetime Care promise. Explore our process at https://www.mybirkin.com/." },
];

const post = {
  id: "blog-hand-stitched-machine-stitched",
  title: "Hand-Stitched vs. Machine-Stitched: The Hidden Details of Luxury Leather Bags",
  slug: "hand-stitched-vs-machine-stitched-the-hidden-details-of-luxury-leather-bags",
  meta_description:
    "Discover the mechanical and structural differences between true artisan hand-saddle stitching and luxury factory machine sewing. Learn how to spot the difference.",
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
  console.log("✅ 第二篇文章已写入 blog_posts");
  console.log("URL: /blog/hand-stitched-vs-machine-stitched-the-hidden-details-of-luxury-leather-bags");
})();
