import Link from "next/link";

const sections = [
  {
    title: "Leather",
    desc: "Full-grain hides from Tuscany's finest family tanneries. Vegetable-tanned, hand-selected.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85",
    href: "/craft/leather",
  },
  {
    title: "Hardware",
    desc: "Solid brass with hand-applied 18k gold, palladium, and gunmetal finishes.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85",
    href: "/craft/hardware",
  },
  {
    title: "Artisans",
    desc: "Meet the hands behind every piece — master leatherworkers with decades of experience.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=85",
    href: "/craft/artisans",
  },
  {
    title: "Process",
    desc: "From sketch to stitch — the 28-step journey of a MYBIRKIN piece.",
    image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85",
    href: "/craft/process",
  },
];

export default function CraftPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85" alt="Workshop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">The Atelier</p>
          <h1 className="font-serif text-display text-paper">Craftsmanship</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-center body-text max-w-2xl mx-auto mb-20">
            Every MYBIRKIN piece begins and ends with human hands. We believe in radical transparency —
            showing you exactly where your materials come from, who makes your piece, and how it comes to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {sections.map((s) => (
              <Link key={s.title} href={s.href} className="group relative aspect-[4/5] overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                  <h2 className="font-serif text-2xl md:text-3xl text-paper mb-2">{s.title}</h2>
                  <p className="text-sm text-paper/60 max-w-xs">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke CTA */}
      <section className="page-padding py-24 bg-ivory/30 text-center">
        <p className="section-label mb-3">Bespoke</p>
        <h2 className="section-title mb-4">Design Your Own</h2>
        <p className="body-text max-w-md mx-auto mb-8">
          Choose your materials, hardware, and artisan. Create a one-of-a-kind piece.
        </p>
        <Link href="/builder" className="btn-primary">Start Customizing</Link>
      </section>
    </>
  );
}
