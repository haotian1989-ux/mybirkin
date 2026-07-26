"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check, Truck } from "lucide-react";
import { useCart } from "@/components/CartContext";
import Reviews from "@/components/Reviews";
import { Product } from "@/lib/types";
import { products as defaultProducts } from "@/lib/data";

function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(defaultProducts);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("myb_admin_products");
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length > 0) setItems(p); }
    } catch {}
    const h = () => {
      try {
        const r = localStorage.getItem("myb_admin_products");
        if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length > 0) setItems(p); }
      } catch {}
    };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);
  return items;
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const products = useProducts();
  const product = products.find((p) => p.slug === slug);
  const { dispatch } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  const nextImg = () => setImgIndex((i) => (i + 1) % product.images.length);
  const prevImg = () => setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);

  const handleAdd = () => {
    dispatch({ type: "ADD_ITEM", product, color: selectedColor || product.colors[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-padding py-10 md:py-20">
      <nav className="text-[11px] text-smoke/60 tracking-label mb-10">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span className="mx-2.5">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-charcoal transition-colors capitalize">{product.category}</Link>
        <span className="mx-2.5">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        <div>
          <div className="aspect-[3/4] overflow-hidden bg-ivory/50 relative group">
            {product.images[imgIndex] && <img src={product.images[imgIndex]} alt={product.name} className="w-full h-full object-cover" />}
            {product.images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-paper/90 backdrop-blur p-2.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={16} /></button>
                <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-paper/90 backdrop-blur p-2.5 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={16} /></button>
              </>
            )}
            {product.newArrival && <span className="absolute top-4 left-4 bg-paper px-3 py-1.5 text-[10px] tracking-label uppercase">New</span>}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)} className={`w-16 h-20 flex-shrink-0 ${i === imgIndex ? "ring-1 ring-charcoal ring-offset-2" : "opacity-50 hover:opacity-80"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="section-label capitalize">{product.category}</p>
          <h1 className="font-serif text-2xl md:text-3xl mt-3 mb-4">{product.name}</h1>
          <p className="text-xl font-light mb-6">${product.price.toLocaleString()}</p>
          <p className="body-text mb-8">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mb-8">
              <p className="text-[11px] tracking-label uppercase text-smoke/60 mb-3">
                Color · <span className="text-charcoal">{selectedColor || product.colors[0]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`px-5 py-2.5 text-xs tracking-label border transition-colors duration-300 ${
                      (selectedColor || product.colors[0]) === c ? "border-charcoal bg-charcoal text-paper" : "border-line hover:border-charcoal/50"
                    }`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAdd} disabled={!product.inStock}
            className={`btn-primary w-full md:w-auto mb-6 ${added ? "bg-green-800 hover:bg-green-800 border-0" : ""}`}>
            {added ? (<><Check size={15} className="mr-2" /> Added to Bag</>) : product.inStock ? "Add to Bag" : "Out of Stock"}
          </button>

          <div className="flex items-center gap-2 text-xs text-smoke/60 mb-10">
            <Truck size={14} strokeWidth={1.5} />
            <span>Free worldwide shipping on orders over $500</span>
          </div>

          <div className="border-t border-line pt-8 space-y-5">
            {product.materials && <div><h3 className="text-[11px] tracking-label uppercase text-smoke/40 mb-2">Materials</h3><p className="text-sm text-smoke">{product.materials}</p></div>}
            {product.dimensions && <div><h3 className="text-[11px] tracking-label uppercase text-smoke/40 mb-2">Dimensions</h3><p className="text-sm text-smoke">{product.dimensions}</p></div>}
            {product.details.length > 0 && (
              <div>
                <h3 className="text-[11px] tracking-label uppercase text-smoke/40 mb-2">Details</h3>
                <ul className="text-sm text-smoke space-y-1.5">
                  {product.details.map((d, i) => <li key={i} className="flex gap-2"><span className="text-gold mt-0.5">·</span>{d}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Reviews productId={product.id} productName={product.name} />
    </div>
  );
}
