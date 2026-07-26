import Link from "next/link";

const steps = [
  { num: "01", title: "Design & Pattern", desc: "Every piece begins as a sketch. Our designer translates your vision into a precise pattern, accounting for leather thickness, stitch lines, and hardware placement." },
  { num: "02", title: "Hide Selection", desc: "Marco inspects each hide under natural light. He marks the sections with the best grain, density, and character — cutting around any imperfections." },
  { num: "03", title: "Cutting", desc: "Using hand-forged knives, Marco cuts each panel following the pattern. No clicking presses. No laser cutters. Just a steady hand and decades of experience." },
  { num: "04", title: "Edge Preparation", desc: "Raw edges are beveled, sanded, and dyed. Paolo begins the six-layer edge painting process that gives MYBIRKIN pieces their signature finish." },
  { num: "05", title: "Assembly & Stitching", desc: "Elena saddle-stitches every seam by hand with waxed linen thread. A single bag can take 8-12 hours of stitching alone." },
  { num: "06", title: "Hardware Setting", desc: "Sofia installs each piece of brass hardware — clasps, feet, strap anchors, zippers — with surgical precision. Every screw is aligned to the same angle." },
  { num: "07", title: "Final Quality Check", desc: "The completed piece is inspected under magnification. Stitch tension, edge uniformity, hardware alignment — nothing escapes scrutiny." },
  { num: "08", title: "Packaging & Shipment", desc: "Your piece is wrapped in unbleached cotton, placed in a handcrafted box, and shipped to your door. Ready for a lifetime of use." },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=1800&q=85" alt="Process" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">The Journey</p>
          <h1 className="font-serif text-display text-paper">Our Process</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-3xl mx-auto">
        <div className="space-y-16">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 md:gap-10">
              <div className="flex-shrink-0 w-12 md:w-16">
                <span className="font-serif text-2xl md:text-3xl text-gold">{s.num}</span>
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-2">{s.title}</h3>
                <p className="body-text">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/builder" className="btn-primary">Start Your Custom Order</Link>
        </div>
      </section>
    </>
  );
}
