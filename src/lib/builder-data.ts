// ── Hermès-Equivalent Leather Types ──
export interface LeatherType {
  id: string;
  name: string;
  hermesEquivalent: string;
  grain: "smooth" | "pebbled" | "textured" | "matte";
  characteristics: string;
  bestFor: string;
  image: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  swatchImage?: string;
}

export interface HardwareOption {
  id: string;
  name: string;
  material: string;
  hex: string;
  description: string;
  price: number;
}

export interface SilhouetteOption {
  id: string;
  name: string;
  desc: string;
  dimensions: string;
  image: string;
  basePrice: number;
}

export interface ArtisanOption {
  id: string;
  name: string;
  role: string;
  years: number;
  quote: string;
  image: string;
}

// ── Leather Types (Hermès equivalents) ──
export const defaultLeatherTypes: LeatherType[] = [
  {
    id: "togo",
    name: "Togo",
    hermesEquivalent: "Togo",
    grain: "pebbled",
    characteristics: "Soft, lightweight calfskin with a fine, even grain. Resilient and scratch-resistant. The most popular choice for everyday bags.",
    bestFor: "Totes, shoulder bags, everyday pieces",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=85",
  },
  {
    id: "epsom",
    name: "Epsom",
    hermesEquivalent: "Epsom",
    grain: "textured",
    characteristics: "Embossed calfskin with a rigid structure. Holds its shape beautifully. Lightweight and rain-resistant.",
    bestFor: "Structured bags, clutches, pieces that need to hold form",
    image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=400&q=85",
  },
  {
    id: "clemence",
    name: "Clemence",
    hermesEquivalent: "Clémence",
    grain: "pebbled",
    characteristics: "Bullcalf with a larger, flatter grain than Togo. Supple with a beautiful slouch. Develops a rich patina over time.",
    bestFor: "Slouchy totes, backpacks, relaxed silhouettes",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=85",
  },
  {
    id: "swift",
    name: "Swift",
    hermesEquivalent: "Swift",
    grain: "smooth",
    characteristics: "Extremely soft calfskin with a fine grain and subtle sheen. Takes color vibrantly. Luxuriously supple.",
    bestFor: "Clutches, evening bags, pieces that showcase color",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=85",
  },
  {
    id: "box",
    name: "Box Calf",
    hermesEquivalent: "Box",
    grain: "smooth",
    characteristics: "Smooth, glossy calfskin with a mirror-like finish. The most formal and traditional leather. Scratches develop into a beautiful patina.",
    bestFor: "Formal handbags, briefcases, heirloom pieces",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=85",
  },
  {
    id: "barenia",
    name: "Barenia",
    hermesEquivalent: "Barenia",
    grain: "matte",
    characteristics: "Smooth natural calfskin with a matte finish. Absorbs oils and develops a deep, personal patina unique to each owner. The most organic leather.",
    bestFor: "Heritage pieces, bags meant to be passed down",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=85",
  },
];

export const defaultColors: ColorOption[] = [
  { id: "noir", name: "Noir", hex: "#1A1A1A" },
  { id: "gold-tan", name: "Gold", hex: "#C8913A" },
  { id: "etoupe", name: "Étoupe", hex: "#9C9583" },
  { id: "etain", name: "Étain", hex: "#6B6B6B" },
  { id: "rouge-h", name: "Rouge H", hex: "#722F37" },
  { id: "bleu-nuit", name: "Bleu Nuit", hex: "#1C2833" },
  { id: "craie", name: "Craie", hex: "#F5F0E8" },
  { id: "vert-cypres", name: "Vert Cypres", hex: "#2E4A3A" },
  { id: "prune", name: "Prune", hex: "#4A2545" },
  { id: "orange-h", name: "Orange H", hex: "#D4722A" },
];

export const defaultHardware: HardwareOption[] = [
  { id: "gold", name: "18k Gold", material: "Brass, 18k Gold-Plated", hex: "#C8A96E", description: "Warm, luminous. Our signature finish.", price: 0 },
  { id: "palladium", name: "Palladium", material: "Brass, Palladium-Plated", hex: "#C0C0C0", description: "Cool, modern silver tone.", price: 0 },
  { id: "rose-gold", name: "Rose Gold", material: "Brass, Rose Gold-Plated", hex: "#B76E79", description: "Soft, romantic warmth.", price: 30 },
  { id: "gunmetal", name: "Gunmetal", material: "Brass, Black Oxide", hex: "#3A3A3A", description: "Dark and architectural.", price: 30 },
  { id: "permabrass", name: "Permabrass", material: "Brass, Permabrass-Coated", hex: "#D4A853", description: "Durable champagne tone.", price: 20 },
];

export const defaultSilhouettes: SilhouetteOption[] = [
  { id: "tote-30", name: "The Tote 30", desc: "Structured tote with magnetic closure. Detachable shoulder strap.", dimensions: "30cm × 24cm × 14cm · Handle drop 10cm", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=85", basePrice: 980 },
  { id: "tote-36", name: "The Tote 36", desc: "Larger tote for everyday. Same structure, more room.", dimensions: "36cm × 28cm × 16cm · Handle drop 12cm", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=85", basePrice: 1180 },
  { id: "shoulder", name: "The Shoulder Bag", desc: "Crescent silhouette. Day to night. Double handles + crossbody strap.", dimensions: "28cm × 20cm × 10cm · Strap 105-120cm", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=85", basePrice: 860 },
  { id: "clutch", name: "The Clutch", desc: "Evening clutch. Wave-edge top. Silk interior. Optional chain.", dimensions: "22cm × 14cm × 5cm", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=85", basePrice: 720 },
  { id: "backpack", name: "The Backpack", desc: "Refined backpack. Roll-top. Padded laptop sleeve.", dimensions: "40cm × 30cm × 15cm · Fits 16\" laptop", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=85", basePrice: 1280 },
  { id: "crossbody", name: "The Crossbody", desc: "Compact, hands-free. Adjustable strap. Multiple compartments.", dimensions: "22cm × 16cm × 7cm · Strap 95-125cm", image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=85", basePrice: 680 },
];

export const defaultArtisans: ArtisanOption[] = [
  { id: "marco", name: "Marco Bellini", role: "Master Leather Cutter", years: 28, quote: "\"I read the hide before I ever pick up the knife.\"", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { id: "elena", name: "Elena Rossi", role: "Master Stitcher", years: 22, quote: "\"Each saddle stitch is a conversation between my hands and the leather.\"", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { id: "paolo", name: "Paolo Conti", role: "Edge & Finish Master", years: 18, quote: "\"The edge is where true quality reveals itself. Six layers, no shortcuts.\"", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { id: "sofia", name: "Sofia Bianchi", role: "Hardware & Assembly", years: 15, quote: "\"Everything must align. One millimeter off and the whole piece is gone.\"", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { id: "giovanni", name: "Giovanni Ferro", role: "Pattern & Design", years: 25, quote: "\"The pattern is the soul of the bag. Every curve, every proportion — intentional.\"", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" },
];
