import Link from "next/link";

const leathers = [
  { name: "Full-Grain Calfskin", origin: "Tuscany, Italy", finish: "Vegetable-Tanned", character: "Develops a rich patina over time. The most premium leather we offer.", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85" },
  { name: "Pebbled Calfskin", origin: "Veneto, Italy", finish: "Chrome-Tanned", character: "Textured surface resistant to scratches. Effortlessly elegant for daily use.", image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85" },
  { name: "Bridle Leather", origin: "Tuscany, Italy", finish: "Hot-Stuffed Vegetable", character: "Dense, durable, and ages beautifully. Used for our backpacks and pet collection.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=85" },
  { name: "Patent Calfskin", origin: "Milan, Italy", finish: "High-Gloss Lacquer", character: "A mirror-like finish for evening pieces. Meticulously hand-polished.", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700&q=85" },
];

export default function LeatherPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85" alt="Leather" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">材质</p>
          <h1 className="font-serif text-display text-paper">我们的皮料</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <p className="body-text text-center max-w-2xl mx-auto mb-20">
          我们全部从意大利世代家族制革厂采购。每张皮料根据纹理一致性、颜色深度和特性进行手工挑选。没有两件完全相同——这是我们的刻意追求。
        </p>

        <div className="space-y-20">
          {leathers.map((l, i) => (
            <div key={l.name} className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <p className="section-label mb-3">0{i + 1}</p>
                <h2 className="font-serif text-2xl md:text-3xl mb-4">{l.name}</h2>
                <div className="space-y-2 mb-5">
                  <p className="text-xs text-smoke"><span className="tracking-label uppercase text-smoke/50 text-[11px]">产地</span> <span className="ml-3">{l.origin}</span></p>
                  <p className="text-xs text-smoke"><span className="tracking-label uppercase text-smoke/50 text-[11px]">工艺</span> <span className="ml-3">{l.finish}</span></p>
                </div>
                <p className="body-text">{l.character}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/builder" className="btn-primary">选择您的皮料</Link>
        </div>
      </section>
    </>
  );
}
