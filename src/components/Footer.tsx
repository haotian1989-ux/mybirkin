import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer itemScope itemType="https://schema.org/Organization" className="bg-charcoal text-paper/60">
      <div className="page-padding py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="footer-brand">
            <h3 className="font-serif text-xl text-paper tracking-wide mb-5">MYBIRKIN</h3>
            <p className="text-sm leading-relaxed max-w-sm text-paper/50">
              Bespoke leather atelier crafting timeless handbags from premium Italian full-grain hides. Handcrafted to order by a single master artisan — with complimentary Lifetime Care.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="text-[11px] tracking-label uppercase text-paper/40 mb-5">Bespoke Orders</h4>
            <div className="flex flex-col gap-2.5 text-sm text-paper/50">
              <Link href="/shop" className="hover:text-paper transition-colors">Handcrafted Handbags</Link>
              <Link href="/product/birkin40swift" className="hover:text-paper transition-colors">Birkin 40 Swift</Link>
              <Link href="/product/kelly32epsom" className="hover:text-paper transition-colors">Kelly 32 Epsom</Link>
              <Link href="/builder" className="hover:text-paper transition-colors">Custom Order</Link>
            </div>
          </div>

          <div className="footer-support">
            <h4 className="text-[11px] tracking-label uppercase text-paper/40 mb-5">The Atelier</h4>
            <div className="flex flex-col gap-2.5 text-sm text-paper/50">
              <Link href="/about" className="hover:text-paper transition-colors">Our Story</Link>
              <Link href="/craft" className="hover:text-paper transition-colors">Craftsmanship</Link>
              <a href="mailto:hello@mybirkin.com" className="hover:text-paper transition-colors">hello@mybirkin.com</a>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-2 text-xs text-paper/30 tracking-label uppercase">
          <span>© {year} MYBIRKIN Bespoke Leather Atelier. All rights reserved. Hand-saddle stitched using continuous linen thread.</span>
          <div className="flex gap-6">
            <span>Lifetime Care included</span>
            <Link href="/admin" className="hover:text-paper/50 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
