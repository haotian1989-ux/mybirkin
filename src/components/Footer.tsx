import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-paper/60">
      <div className="page-padding py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl text-paper tracking-wide mb-5">MYBIRKIN</h3>
            <p className="text-sm leading-relaxed max-w-sm text-paper/50">
              A bespoke leather atelier crafting handbags, accessories, and pet goods from Italian full-grain leather. Each piece is handcrafted to order by a master artisan.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-label uppercase text-paper/40 mb-5">Shop</h4>
            <div className="flex flex-col gap-2.5 text-sm text-paper/50">
              <Link href="/shop" className="hover:text-paper transition-colors">All Products</Link>
              <Link href="/shop?category=handbags" className="hover:text-paper transition-colors">Handbags</Link>
              <Link href="/shop?category=charms" className="hover:text-paper transition-colors">Charms</Link>
              <Link href="/shop?category=pet" className="hover:text-paper transition-colors">Pet Collection</Link>
              <Link href="/builder" className="hover:text-paper transition-colors">Custom Order</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] tracking-label uppercase text-paper/40 mb-5">Atelier</h4>
            <div className="flex flex-col gap-2.5 text-sm text-paper/50">
              <Link href="/craft" className="hover:text-paper transition-colors">Craftsmanship</Link>
              <Link href="/about" className="hover:text-paper transition-colors">Our Story</Link>
              <a href="mailto:hello@mybirkin.com" className="hover:text-paper transition-colors">hello@mybirkin.com</a>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-2 text-xs text-paper/30 tracking-label uppercase">
          <span>© {year} MYBIRKIN Atelier</span>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-paper/50 transition-colors">Admin</Link>
            <span>Handcrafted to order · Made in Italy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
