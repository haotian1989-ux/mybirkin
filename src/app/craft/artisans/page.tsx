import Link from "next/link";

const artisans = [
  { name: "Marco Bellini", role: "Master Leather Cutter", years: 28, quote: "\"The first cut sets the tone for everything. I read the hide — its grain, its stretch, its soul — before I ever pick up the knife.\"", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
  { name: "Elena Rossi", role: "Master Stitcher", years: 22, quote: "\"A saddle stitch cannot be faked by a machine. Each stitch is a conversation between the awl, the thread, and my hands. That's what makes it last a lifetime.\"", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face" },
  { name: "Paolo Conti", role: "Edge & Finish Specialist", years: 18, quote: "\"The edge is where true quality reveals itself. I apply six layers of edge paint, sanding between each one. It takes a full day per bag.\"", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face" },
  { name: "Sofia Bianchi", role: "Hardware & Assembly", years: 15, quote: "\"Setting the hardware is the final act. Everything must align perfectly — the clasp, the strap anchors, the feet. One misalignment and the whole piece is off.\"", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face" },
];

export default function ArtisansPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85" alt="Artisans" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">People</p>
          <h1 className="font-serif text-display text-paper">Our Artisans</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <p className="body-text text-center max-w-2xl mx-auto mb-20">
          Four artisans. Every piece passes through all four hands. This is not an assembly line — it is a relay of craft, each person adding their expertise before passing the piece to the next.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {artisans.map((a) => (
            <div key={a.name} className="group">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-ivory/50">
                <img src={a.image} alt={a.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-600" />
              </div>
              <h3 className="font-serif text-xl mb-0.5">{a.name}</h3>
              <p className="text-xs text-smoke tracking-label uppercase mb-3">{a.role} · {a.years} years</p>
              <p className="text-sm text-smoke/70 italic leading-relaxed">{a.quote}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/builder" className="btn-primary">Choose Your Artisan</Link>
        </div>
      </section>
    </>
  );
}
