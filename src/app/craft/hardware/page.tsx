import Link from "next/link";

const hardware = [
  { name: "18k Gold Finish", material: "Solid Brass, 18k Gold-Plated", character: "Warm and luminous. Our signature finish. Each piece is hand-polished to a mirror shine before plating.", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85" },
  { name: "Palladium", material: "Solid Brass, Palladium-Plated", character: "Cool, silvery-white tone. Hypoallergenic and tarnish-resistant. Modern and understated.", image: "https://images.unsplash.com/photo-1608236415053-3691791ac335?w=700&q=85" },
  { name: "Gunmetal", material: "Solid Brass, Black Oxide", character: "Dark and architectural. An industrial edge for the bold. Chemically treated for a uniform, deep finish.", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&q=85" },
];

export default function HardwarePage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1800&q=85" alt="Hardware" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">细节</p>
          <h1 className="font-serif text-display text-paper">五金件</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <p className="body-text text-center max-w-2xl mx-auto mb-20">
          每个搭扣、锁扣和拉链都在佛罗伦萨郊外的家族铸造厂由实心黄铜加工而成，然后手工打磨并按我们的规格进行电镀。我们从不使用空心或冲压五金件。
        </p>

        {hardware.map((h, i) => (
          <div key={h.name} className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
            <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
              <p className="section-label mb-3">0{i + 1}</p>
              <h2 className="font-serif text-2xl md:text-3xl mb-2">{h.name}</h2>
              <p className="text-xs text-smoke/50 tracking-label uppercase mb-4">{h.material}</p>
              <p className="body-text">{h.character}</p>
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <Link href="/builder" className="btn-primary">选择您的五金件</Link>
        </div>
      </section>
    </>
  );
}
