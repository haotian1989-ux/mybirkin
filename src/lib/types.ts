export type ProductCategory = "handbags" | "charms" | "pet";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  description: string;
  details: string[];
  materials: string;
  dimensions: string;
  colors: string[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  createdAt?: string;
}

export interface ProductSubcategory {
  id: string;
  name: string;
  category: ProductCategory;
  sortOrder?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

// ── Blog ──
export type BlogBlockType = "h2" | "h3" | "paragraph" | "list" | "quote";

export interface BlogBlock {
  type: BlogBlockType;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  category: string;
  cover_image: string;
  status: "published" | "draft";
  blocks: BlogBlock[];
  published_at: string;
  created_at?: string;
}
