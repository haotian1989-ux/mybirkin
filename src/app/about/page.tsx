import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85" alt="Atelier" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">Since 2024</p>
          <h1 className="font-serif text-display text-paper">Our Story</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <p className="section-label mb-4">Philosophy</p>
            <h2 className="font-serif text-heading mb-6">One artisan.<br />One piece.<br />One promise.</h2>
            <p className="body-text">
              At MYBIRKIN, we believe true luxury is personal. Every piece is handcrafted to order by a single artisan, from the first cut of leather to the final stitch of thread. No assembly lines. No mass production. Just one person pouring their craft into your piece.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85" alt="Crafting" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div className="aspect-[4/5] overflow-hidden md:order-1 order-2">
            <img src="https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85" alt="Workshop" className="w-full h-full object-cover" />
          </div>
          <div className="md:order-2 order-1">
            <p className="section-label mb-4">Materials</p>
            <h2 className="font-serif text-heading mb-6">Sourced from the finest.</h2>
            <p className="body-text">
              We source our leathers exclusively from family-owned tanneries in Tuscany, Italy. Full-grain and top-grain hides, vegetable-tanned using traditional methods passed down through generations.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/craft" className="btn-primary">Discover Our Craft</Link>
        </div>
      </section>
    </>
  );
}
