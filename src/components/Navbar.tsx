"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartContext";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=handbags", label: "Handbags" },
  { href: "/shop?category=charms", label: "Charms" },
  { href: "/shop?category=pet", label: "Pet" },
  { href: "/craft", label: "Craft" },
  { href: "/builder", label: "Custom" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, dispatch } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-xl border-b border-transparent">
      <nav className="page-padding flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Link
          href="/"
          className="font-serif text-xl md:text-[22px] tracking-extra uppercase"
        >
          MYBIRKIN
        </Link>

        <div className="hidden md:flex items-center gap-10">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm tracking-label uppercase text-charcoal hover:text-gold transition-colors py-1.5 font-medium">Home</Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); router.push(l.href); }}
              className="text-[11px] tracking-label uppercase text-smoke hover:text-charcoal transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {/* Contact link — desktop only */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const btn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
              if (btn) btn.click();
            }}
            className="hidden md:flex items-center gap-1.5 text-[11px] tracking-label uppercase text-smoke hover:text-charcoal transition-colors duration-300 mr-2"
          >
            <MessageCircle size={14} strokeWidth={1.5} />
            Contact
          </a>

          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative p-2"
            aria-label="Cart"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-charcoal text-paper text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-paper">
          <div className="page-padding py-5 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm tracking-label uppercase text-charcoal hover:text-gold transition-colors py-1.5 font-medium">Home</Link>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); router.push(l.href); setMobileOpen(false); }}
                className="text-sm tracking-label uppercase text-smoke hover:text-charcoal transition-colors py-1.5"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-line mt-1">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(() => {
                    const btn = document.querySelector('[aria-label="Contact us"]') as HTMLButtonElement;
                    if (btn) btn.click();
                  }, 100);
                }}
                className="flex items-center gap-2 text-sm tracking-label uppercase text-smoke hover:text-charcoal transition-colors py-1.5 w-full text-left"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
