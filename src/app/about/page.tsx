import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85" alt="Atelier" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">始于2024</p>
          <h1 className="font-serif text-display text-paper">品牌故事</h1>
        </div>
      </section>

      <section className="page-padding py-20 md:py-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <p className="section-label mb-4">品牌理念</p>
            <h2 className="font-serif text-heading mb-6">一位工匠。<br />一件作品。<br />一份承诺。</h2>
            <p className="body-text">
              在 MYBIRKIN，我们相信真正的奢华是个性化的。每件作品从第一刀到最后一针都由同一位工匠按单手工制作。没有流水线，没有量产，只有一位工匠为您的作品倾注全部心血。
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
            <p className="section-label mb-4">材质</p>
            <h2 className="font-serif text-heading mb-6">源于至臻之选。</h2>
            <p className="body-text">
              我们的皮革全部来自意大利托斯卡纳的家族制革厂。全粒面和头层皮，采用代代相传的传统植鞣工艺。
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/craft" className="btn-primary">探索我们的工艺</Link>
        </div>
      </section>
    </>
  );
}
