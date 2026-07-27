// Craft page data types and defaults

export interface CraftBlock {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl: string; // YouTube/Vimeo embed URL
}

export interface CraftPageData {
  heroImage: string;
  heroTagline: string;
  heroTitle: string;
  introText: string;
  blocks: CraftBlock[];
}

// Default data for each craft page

export const defaultOverview: CraftPageData = {
  heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85",
  heroTagline: "The Atelier",
  heroTitle: "Craftsmanship",
  introText: "Every MYBIRKIN piece begins and ends with human hands. We believe in radical transparency — showing you exactly where your materials come from, who makes your piece, and how it comes to life.",
  blocks: [
    {
      id: "leather",
      title: "Leather",
      description: "Full-grain hides from Tuscany's finest family tanneries. Vegetable-tanned, hand-selected.",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "hardware",
      title: "Hardware",
      description: "Solid brass with hand-applied 18k gold, palladium, and gunmetal finishes.",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "artisans",
      title: "Artisans",
      description: "Meet the hands behind every piece — master leatherworkers with decades of experience.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "process",
      title: "Process",
      description: "From sketch to stitch — the 28-step journey of a MYBIRKIN piece.",
      image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85",
      videoUrl: "",
    },
  ],
};

export const defaultLeather: CraftPageData = {
  heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85",
  heroTagline: "Materials",
  heroTitle: "Our Leather",
  introText: "We source exclusively from multigenerational family tanneries in Italy. Each hide is hand-selected for grain consistency, color depth, and character. No two pieces are exactly alike — and that is by design.",
  blocks: [
    {
      id: "full-grain",
      title: "Full-Grain Calfskin",
      description: "Origin: Tuscany, Italy\nFinish: Vegetable-Tanned\n\nDevelops a rich patina over time. The most premium leather we offer.",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "pebbled",
      title: "Pebbled Calfskin",
      description: "Origin: Veneto, Italy\nFinish: Chrome-Tanned\n\nTextured surface resistant to scratches. Effortlessly elegant for daily use.",
      image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "bridle",
      title: "Bridle Leather",
      description: "Origin: Tuscany, Italy\nFinish: Hot-Stuffed Vegetable\n\nDense, durable, and ages beautifully. Used for our backpacks and pet collection.",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "patent",
      title: "Patent Calfskin",
      description: "Origin: Milan, Italy\nFinish: High-Gloss Lacquer\n\nA mirror-like finish for evening pieces. Meticulously hand-polished.",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700&q=85",
      videoUrl: "",
    },
  ],
};

export const defaultHardware: CraftPageData = {
  heroImage: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1800&q=85",
  heroTagline: "Details",
  heroTitle: "Hardware",
  introText: "Every buckle, clasp, and zipper is machined from solid brass in a family-run foundry outside Florence. Then hand-finished and plated to our specifications. We never use hollow or stamped hardware.",
  blocks: [
    {
      id: "gold",
      title: "18k Gold Finish",
      description: "Solid Brass, 18k Gold-Plated\n\nWarm and luminous. Our signature finish. Each piece is hand-polished to a mirror shine before plating.",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "palladium",
      title: "Palladium",
      description: "Solid Brass, Palladium-Plated\n\nCool, silvery-white tone. Hypoallergenic and tarnish-resistant. Modern and understated.",
      image: "https://images.unsplash.com/photo-1608236415053-3691791ac335?w=700&q=85",
      videoUrl: "",
    },
    {
      id: "gunmetal",
      title: "Gunmetal",
      description: "Solid Brass, Black Oxide\n\nDark and architectural. An industrial edge for the bold. Chemically treated for a uniform, deep finish.",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&q=85",
      videoUrl: "",
    },
  ],
};

export const defaultArtisans: CraftPageData = {
  heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85",
  heroTagline: "People",
  heroTitle: "Our Artisans",
  introText: "Four artisans. Every piece passes through all four hands. This is not an assembly line — it is a relay of craft, each person adding their expertise before passing the piece to the next.",
  blocks: [
    {
      id: "marco",
      title: "Marco Bellini",
      description: "Master Leather Cutter · 28 years\n\n\"The first cut sets the tone for everything. I read the hide — its grain, its stretch, its soul — before I ever pick up the knife.\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      videoUrl: "",
    },
    {
      id: "elena",
      title: "Elena Rossi",
      description: "Master Stitcher · 22 years\n\n\"A saddle stitch cannot be faked by a machine. Each stitch is a conversation between the awl, the thread, and my hands.\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
      videoUrl: "",
    },
    {
      id: "paolo",
      title: "Paolo Conti",
      description: "Edge & Finish Specialist · 18 years\n\n\"The edge is where true quality reveals itself. I apply six layers of edge paint, sanding between each one.\"",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      videoUrl: "",
    },
    {
      id: "sofia",
      title: "Sofia Bianchi",
      description: "Hardware & Assembly · 15 years\n\n\"Setting the hardware is the final act. Everything must align perfectly.\"",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
      videoUrl: "",
    },
  ],
};

export const defaultProcess: CraftPageData = {
  heroImage: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=1800&q=85",
  heroTagline: "The Journey",
  heroTitle: "Our Process",
  introText: "",
  blocks: [
    { id: "01", title: "Design & Pattern", description: "Every piece begins as a sketch. Our designer translates your vision into a precise pattern, accounting for leather thickness, stitch lines, and hardware placement.", image: "", videoUrl: "" },
    { id: "02", title: "Hide Selection", description: "Marco inspects each hide under natural light. He marks the sections with the best grain, density, and character — cutting around any imperfections.", image: "", videoUrl: "" },
    { id: "03", title: "Cutting", description: "Using hand-forged knives, Marco cuts each panel following the pattern. No clicking presses. No laser cutters. Just a steady hand and decades of experience.", image: "", videoUrl: "" },
    { id: "04", title: "Edge Preparation", description: "Raw edges are beveled, sanded, and dyed. Paolo begins the six-layer edge painting process that gives MYBIRKIN pieces their signature finish.", image: "", videoUrl: "" },
    { id: "05", title: "Assembly & Stitching", description: "Elena saddle-stitches every seam by hand with waxed linen thread. A single bag can take 8-12 hours of stitching alone.", image: "", videoUrl: "" },
    { id: "06", title: "Hardware Setting", description: "Sofia installs each piece of brass hardware — clasps, feet, strap anchors, zippers — with surgical precision. Every screw is aligned to the same angle.", image: "", videoUrl: "" },
    { id: "07", title: "Final Quality Check", description: "The completed piece is inspected under magnification. Stitch tension, edge uniformity, hardware alignment — nothing escapes scrutiny.", image: "", videoUrl: "" },
    { id: "08", title: "Packaging & Shipment", description: "Your piece is wrapped in unbleached cotton, placed in a handcrafted box, and shipped to your door. Ready for a lifetime of use.", image: "", videoUrl: "" },
  ],
};

// localStorage keys
export const CRAFT_KEYS: Record<string, string> = {
  overview: "myb_craft_overview",
  leather: "myb_craft_leather",
  hardware: "myb_craft_hardware",
  artisans: "myb_craft_artisans",
  process: "myb_craft_process",
};

export const DEFAULT_CRAFT: Record<string, CraftPageData> = {
  overview: defaultOverview,
  leather: defaultLeather,
  hardware: defaultHardware,
  artisans: defaultArtisans,
  process: defaultProcess,
};

export const CRAFT_PAGE_LABELS: Record<string, string> = {
  overview: "总览",
  leather: "皮料",
  hardware: "五金",
  artisans: "工匠",
  process: "制作流程",
};
