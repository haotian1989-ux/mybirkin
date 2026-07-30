import { Product } from "./types";

export const products: Product[] = [
  {
    id: "hb-001",
    name: "The Mirage Tote",
    slug: "mirage-tote",
    category: "handbags",
    price: 1280,
    description:
      "A sculptural tote inspired by desert dunes. Hand-stitched from Italian full-grain calfskin with a suede-lined interior. The organic silhouette is achieved through a proprietary leather-molding technique, ensuring each piece is unique.",
    details: [
      "Italian full-grain calfskin",
      "Suede-lined interior with zip pocket",
      "Magnetic closure",
      "Detachable shoulder strap (110–125 cm)",
      "Brass hardware with 18k gold finish",
    ],
    materials: "Italian full-grain calfskin, brass hardware, suede lining",
    dimensions: "32 × 24 × 14 cm / Handle drop 10 cm",
    colors: ["Noir", "Cognac", "Ivory"],
    images: [
      "",
      "",
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "hb-002",
    name: "The Serpentine Clutch",
    slug: "serpentine-clutch",
    category: "handbags",
    price: 860,
    description:
      "An evening clutch with a fluid, wave-like top edge. Crafted from patent calfskin with a polished python-embossed panel. Opens to reveal a blush silk interior.",
    details: [
      "Patent calfskin with embossed panel",
      "Silk interior lining",
      "Push-lock closure",
      "Optional chain strap",
    ],
    materials: "Patent calfskin, silk lining, gold-tone hardware",
    dimensions: "22 × 14 × 5 cm",
    colors: ["Onyx", "Ruby", "Sapphire"],
    images: [
      "",
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "hb-003",
    name: "The Aria Shoulder Bag",
    slug: "aria-shoulder-bag",
    category: "handbags",
    price: 980,
    description:
      "A crescent-shaped shoulder bag that effortlessly transitions from day to night. The soft, slouchy body is counterbalanced by structured top handles. Features our signature hand-burnished edges.",
    details: [
      "Soft pebbled calfskin",
      "Cotton twill interior",
      "Double top handles + crossbody strap",
      "Hand-burnished edges",
    ],
    materials: "Pebbled calfskin, cotton twill, palladium hardware",
    dimensions: "28 × 20 × 10 cm / Strap 105–120 cm",
    colors: ["Taupe", "Burgundy", "Forest"],
    images: [
      "",
      "",
    ],
    inStock: true,
    featured: false,
    newArrival: true,
  },
  {
    id: "hb-004",
    name: "The Nomad Backpack",
    slug: "nomad-backpack",
    category: "handbags",
    price: 1480,
    description:
      "A spacious yet refined backpack for the modern explorer. Roll-top closure with bridle leather straps. Padded laptop compartment fits up to 16-inch devices.",
    details: [
      "Full-grain bridle leather",
      "Roll-top with magnetic + buckle closure",
      "Padded 16-inch laptop sleeve",
      "External zip pocket",
      "Adjustable padded straps",
    ],
    materials: "Bridle leather, brass hardware, cotton-canvas lining",
    dimensions: "40 × 30 × 15 cm (closed) / 50 cm (extended)",
    colors: ["Tobacco", "Black"],
    images: [
      "",
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "ch-001",
    name: "Equestrian Tassel Charm",
    slug: "equestrian-tassel-charm",
    category: "charms",
    price: 180,
    description:
      "A playful tassel charm crafted from the same leathers as our handbags. Detachable brass clip attaches to any bag handle or D-ring. Each tassel is hand-cut and finished with a polished edge.",
    details: [
      "Hand-cut leather tassels",
      "Brass clip with gold finish",
      "Compatible with all MYBIRKIN bags",
    ],
    materials: "Calfskin leather, brass hardware",
    dimensions: "18 cm total length",
    colors: ["Noir", "Cognac", "Ivory", "Ruby"],
    images: [
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "ch-002",
    name: "Mini Silk Knot Charm",
    slug: "mini-silk-knot-charm",
    category: "charms",
    price: 120,
    description:
      "A delicate knotted silk cord charm with a miniature leather tag debossed with our monogram. Adds a subtle pop of color to any bag.",
    details: [
      "Silk cord with leather tag",
      "Debossed monogram",
      "Brass lobster clasp",
    ],
    materials: "Silk cord, calfskin tag, brass hardware",
    dimensions: "15 cm total length",
    colors: ["Blush", "Sage", "Midnight"],
    images: [
      "",
    ],
    inStock: true,
    featured: false,
    newArrival: true,
  },
  {
    id: "pt-001",
    name: "Luxe Leather Dog Collar",
    slug: "luxe-dog-collar",
    category: "pet",
    price: 220,
    description:
      "A refined dog collar made from our signature full-grain leather. Padded interior for comfort, with solid brass hardware. Available in three sizes. Each collar can be personalized with hot-stamped initials.",
    details: [
      "Full-grain Italian leather",
      "Padded suede interior",
      "Solid brass D-ring and buckle",
      "Hot-stamp personalization available",
      "Three sizes: S (30–38 cm), M (38–48 cm), L (48–58 cm)",
    ],
    materials: "Italian full-grain leather, brass hardware, suede padding",
    dimensions: "Width 2.5 cm / S: 30–38, M: 38–48, L: 48–58 cm",
    colors: ["Noir", "Cognac", "Burgundy"],
    images: [
      "",
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "pt-002",
    name: "Braided Leather Leash",
    slug: "braided-leather-leash",
    category: "pet",
    price: 260,
    description:
      "A hand-braided leather leash that pairs perfectly with our Luxe Dog Collar. The four-strand round braid provides a comfortable grip while maintaining a refined look.",
    details: [
      "Four-strand hand-braided leather",
      "Solid brass trigger snap",
      "Comfortable round grip profile",
      "Matches all collar colors",
    ],
    materials: "Italian full-grain leather, brass hardware",
    dimensions: "120 cm length / 1.5 cm diameter",
    colors: ["Noir", "Cognac", "Burgundy"],
    images: [
      "",
    ],
    inStock: true,
    featured: false,
    newArrival: false,
  },
  {
    id: "pt-003",
    name: "Leather Pet Harness",
    slug: "leather-pet-harness",
    category: "pet",
    price: 340,
    description:
      "An elegant step-in harness crafted from soft full-grain leather. Padded chest plate ensures comfort during long walks. Adjustable straps for a perfect fit.",
    details: [
      "Soft full-grain leather",
      "Padded chest plate",
      "Adjustable neck and chest straps",
      "Brass D-rings front and back",
      "Step-in design",
    ],
    materials: "Full-grain leather, brass hardware, neoprene padding",
    dimensions: "S: chest 40–50 / M: chest 50–65 / L: chest 65–80 cm",
    colors: ["Noir", "Cognac"],
    images: [
      "",
    ],
    inStock: true,
    featured: true,
    newArrival: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: Product["category"]): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}
