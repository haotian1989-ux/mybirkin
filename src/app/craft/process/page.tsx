import Link from "next/link";

const steps = [
  { num: "01", title: "设计与打版", desc: "每件作品从草图开始。我们的设计师将您的构想转化为精确的纸样，精确计算皮料厚度、缝线和五金位置。" },
  { num: "02", title: "皮料甄选", desc: "Marco 在自然光下检查每张皮料，标出纹理、密度和特质最佳的区域——避开所有瑕疵部位。" },
  { num: "03", title: "裁切", desc: "Marco 使用手工锻造的刀具，按照纸样裁切每片面料。没有冲压机，没有激光切割——只有一双稳健的手和几十年的经验。" },
  { num: "04", title: "边缘处理", desc: "原始边缘经过倒角、打磨和染色。Paolo 开始六层边油工艺，这是 MYBIRKIN 作品的标志性处理。" },
  { num: "05", title: "组装与缝制", desc: "Elena 用蜡线手工马鞍针法缝制每一条接缝。一只包仅缝制就要8-12小时。" },
  { num: "06", title: "五金安装", desc: "Sofia 以手术般的精度安装每件黄铜五金——锁扣、底钉、肩带扣、拉链。每颗螺丝都对齐到相同角度。" },
  { num: "07", title: "最终质检", desc: "成品在放大镜下检查。缝线张力、边缘均匀度、五金对齐——无一能逃过审查。" },
  { num: "08", title: "包装与配送", desc: "您的作品用原色棉布包裹，放入手工制作的礼盒，直送到您手中。准备好陪伴一生。" },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0 bg-charcoal/55 z-10" />
        <img src="https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=1800&q=85" alt="Process" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 page-padding">
          <p className="section-label mb-3 text-gold">制作之旅</p>
          <h1 className="font-serif text-display text-paper">制作工艺</h1>
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
          <Link href="/builder" className="btn-primary">开始定制您的作品</Link>
        </div>
      </section>
    </>
  );
}
