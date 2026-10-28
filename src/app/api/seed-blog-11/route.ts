// 临时中转：Crocodile 篇入库（用后即删）
import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const IMG = {
  cover: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765507/gc7tzr60ebrunviprodf.jpg",
  lisse_mat: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765507/mgnmcr3tqb1qbeamzhkq.jpg",
  himalaya: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765508/wihe8o9f09xi2zjo7krz.jpg",
  fuchsia: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765506/qvlzgy22id0dikzhdwbw.jpg",
  blackmiel: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765506/midm8scc2xi8bmbqb8dy.jpg",
  matteblack: "https://res.cloudinary.com/vzsmwu1w/image/upload/v1791765506/bxliyqnb57llqyeph2ot.jpg",
};

const post = {
  id: "blog-crocodile-guide",
  title: "Crocodile: History, Character & Care — The Ultimate Collector's Guide",
  slug: "crocodile-history-character-care-the-ultimate-collectors-guide",
  meta_description:
    "Discover Hermès crocodile leather: Porosus vs Niloticus vs Alligator, lisse vs mat finishes, the Himalaya phenomenon, authentication and the care that protects the world's most valuable handbag leather.",
  category: "Atelier",
  cover_image: IMG.cover,
  status: "published",
  blocks: [
    { type: "paragraph", text: "At the very top of the luxury-leather pyramid sits crocodile. More than any other skin, it embodies what Hermès calls a 'precious leather' — rare, disciplined, and instantly recognised by its natural scale pattern. Yet 'crocodile' is not one material: Hermès works with three distinct species — Porosus, Niloticus and Alligator — each with its own grain, character and price tier. This is the complete collector's guide to Hermès crocodile." },
    { type: "h2", text: "The Three Crocodiles of Hermès" },
    { type: "paragraph", text: "Porosus — the saltwater crocodile of Southeast Asia and northern Australia — is the most coveted of the three. Its scales are small (roughly 4–6mm), tight and symmetrical, and each scale carries a single pinpoint pore. The result is a remarkably uniform, mirror-like surface that collectors describe as precision itself. According to Sotheby's, Porosus is generally considered the most luxurious and valuable of all Hermès crocodile skins." },
    { type: "paragraph", text: "Niloticus — the Nile crocodile of Africa — shows larger, more elongated scales (roughly 6–10mm) with greater natural variation, especially visible in lighter shades. Its grain has more depth, movement and personality. Interestingly, the legendary Himalaya Birkin is made from Niloticus, not Porosus, making this the skin behind the most valuable handbag in the world." },
    { type: "paragraph", text: "Alligator — the American alligator of Louisiana and Florida — carries the largest, widest scales of the three, with a smoother surface that shows almost no visible pores. Because alligator hides contain less bone, they are easier to dye and work with, which is why alligator appears in the most colourful and relaxed Hermès pieces." },
    { type: "image", text: "Shiny Porosus crocodile in Etrusque: tight, symmetrical scales with a single pinpoint pore in each.", image: IMG.cover },
    { type: "h2", text: "Lisse vs Mat: Two Finishes, Two Personalities" },
    { type: "paragraph", text: "Hermès finishes crocodile in two radically different ways. Lisse (shiny) is polished to a glass-like mirror finish, intensifying the scale relief and catching the light with every movement; it is the dressier, more formal face of croco. Mat (matte) is softly muted and brushed, letting the natural grain breathe — the finish behind the Himalaya phenomenon. The same hide, two very different personalities." },
    { type: "image", text: "The same crocodile grain, two treatments: shiny vs mat Hermès finishes.", image: IMG.lisse_mat },
    { type: "h2", text: "The Himalaya Phenomenon" },
    { type: "paragraph", text: "No crocodile creation captures the market like the Himalaya. A matte white Niloticus hide with a smoky grey-to-cream gradient and 18k white gold or palladium hardware, it has repeatedly broken auction records: Christie's London sold a Himalaya Birkin 30 with diamond hardware for £162,500 in 2018 — then a European handbag record; in 2020 Christie's Hong Kong realised HK$3,000,000 (US$388,738) for a matte white Himalaya Birkin 25; and a 2020 Himalaya Birkin 25 brought US$320,000 on Sotheby's online marketplace in 2021, one of the highest non-diamond Himalaya sales ever." },
    { type: "image", text: "A matte white Himalaya Niloticus crocodile Birkin 30 with 18k white gold and diamond hardware, 2011 — Christie's.", image: IMG.himalaya },
    { type: "h2", text: "How to Read the Skin" },
    { type: "list", text: "Pores are the giveaway: crocodile scales carry visible pores — Porosus has a single pinpoint pore in every small square scale; Niloticus shows larger, pore-free elongated scales; alligator is smooth with almost no visible pores.\nStamp convention: among collectors, Hermès exotic stamps are read as a caret (^) for Porosus, two dots (..) for Niloticus and a square (□) for alligator — a widely cited but unofficial convention, always cross-check the full set of markings.\nNatural relief: genuine croco scales sit proud of the surface with an irregular, organic rhythm; embossed fakes look flat and unnaturally repetitive.\nFinish behaviour: lisse croco shifts light scale by scale; imitation prints reflect evenly.\nAlways verify hardware engravings, interior stamps and blind stamps together — texture alone never proves authenticity." },
    { type: "image", text: "A shiny Fuchsia Niloticus crocodile Birkin 25 with palladium hardware, 2008 — Christie's.", image: IMG.fuchsia },
    { type: "h2", text: "How to Care for Crocodile" },
    { type: "list", text: "Water is the enemy: Hermès warns that precious leathers are extremely sensitive to water and humidity — if contact happens, wipe immediately with a soft, lint-free cloth to prevent stains and blisters.\nProtect from light and heat: prolonged sun, window display or radiator heat will alter the colour.\nNo commercial products: Hermès states that store-bought care products can damage the leather; restoration belongs with Hermès craftsmen.\nStable environment: keep croco away from both excess humidity and dryness, and store padded in its dust bag.\nWear with awareness: perfume, oils and cosmetics permanently mark exotic skins." },
    { type: "image", text: "A limited-edition shiny Black and Miel Niloticus crocodile Birkin 30 with ruthenium hardware, 2006 — Christie's.", image: IMG.blackmiel },
    { type: "h2", text: "A Collector's Asset Class" },
    { type: "paragraph", text: "The secondary market repeatedly confirms croco's standing: at Christie's Paris online auction in late 2023, a shiny black niloticus Birkin 25 sold for €69,300 and a matte chai alligator mini-Kelly 20 sold for €63,000 — multiples of their estimates. Far earlier, Christie's Paris set a record in 2015 when a Himalaya reached €157,500. Crocodile is not only the most technical leather in the atelier; it is one of the most enduring stores of value in the handbag world." },
    { type: "image", text: "A black matte Niloticus crocodile Birkin 30 with 18k white gold and diamond hardware, 2006 — Sotheby's.", image: IMG.matteblack },
    { type: "h2", text: "The MYBIRKIN Promise" },
    { type: "paragraph", text: "At MYBIRKIN, we approach exotic skins with the same discipline as the great ateliers: each piece is hand-cut and hand-saddle stitched by a single master artisan, finished with solid, non-tarnish hardware, and backed by our Lifetime Care promise. Explore the atelier and commission your piece at https://www.mybirkin.com/." },
  ],
  published_at: new Date().toISOString(),
};

export async function POST(req: NextRequest) {
  if (req.headers.get("x-seed") !== "mybirkin11") {
    return NextResponse.json({ ok: false, error: "bad key" }, { status: 403 });
  }
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from("blog_posts").upsert(post);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: post.id });
}
