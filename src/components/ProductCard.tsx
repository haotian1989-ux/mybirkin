"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  return (
    <div className="group">
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[3/4] overflow-hidden bg-ivory/50 mb-5"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.newArrival && (
          <span className="absolute top-4 left-4 bg-paper/90 backdrop-blur px-3 py-1.5 text-[10px] tracking-label uppercase text-charcoal">
            New Arrival
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-400 flex items-end justify-end p-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "ADD_ITEM", product });
            }}
            className="bg-paper/95 backdrop-blur px-4 py-2.5 text-[10px] tracking-label uppercase 
                       opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-400 
                       translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0
                       hover:bg-charcoal hover:text-paper active:bg-charcoal active:text-paper"
          >
            Add to Bag
          </button>
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="block">
        <h3 className="font-serif text-sm md:text-base mb-1.5 hover:text-gold transition-colors">
          {product.name}
        </h3>
      </Link>
      <p className="text-sm text-smoke">${product.price.toLocaleString()}</p>
    </div>
  );
}
