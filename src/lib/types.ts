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
