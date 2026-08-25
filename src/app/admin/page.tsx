"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit3, Save, X, Layout, ShoppingBag, MessageCircle, Palette, BookOpen, ArrowUp, ArrowDown } from "lucide-react";
import { useAdminSupabaseList, useAdminSupabaseSingle, useAdminSections, useAdminContact } from "@/lib/use-supabase-data";
import { Product } from "@/lib/types";
import ImageUploader from "@/components/ImageUploader";
import { products as defaultProducts } from "@/lib/data";
import AdminPanel from "@/components/AdminPanel";
import CraftEditor from "@/components/CraftEditor";
import AdminGate from "@/components/AdminGate";

type AdminTab = "products" | "builder" | "homepage" | "contact" | "craft" | "about";

const tabs: { key: AdminTab; label: string; icon: any }[] = [
  { key: "products", label: "产品管理", icon: ShoppingBag },
  { key: "builder", label: "定制数据", icon: Palette },
  { key: "homepage", label: "首页编辑", icon: Layout },
  { key: "contact", label: "联系方式", icon: MessageCircle },
  { key: "craft", label: "工艺页面", icon: Palette },
  { key: "about", label: "关于我们", icon: BookOpen },
];

function AdminContent() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  return (
    <div className="min-h-screen bg-ivory/20">
      <div className="page-padding py-10 md:py-14">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-smoke hover:text-charcoal transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-2xl">管理后台</h1>
              <p className="text-xs text-smoke mt-0.5">管理您的店铺内容</p>
            </div>
          </div>
          <Link href="/" className="btn-outline text-xs">查看网站</Link>
        </div>
        <div className="flex gap-1 mb-8 border-b border-line">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-xs tracking-label uppercase transition-colors ${
                  activeTab === t.key ? "text-charcoal border-b-2 border-charcoal -mb-[1px]" : "text-smoke/40 hover:text-smoke"
                }`}>
                <Icon size={13} strokeWidth={1.5} />{t.label}
              </button>
            );
          })}
        </div>
        {activeTab === "products" && <ProductManager />}
        {activeTab === "builder" && <AdminPanel />}
        {activeTab === "homepage" && <HomepageEditor />}
        {activeTab === "contact" && <ContactEditor />}
        {activeTab === "craft" && <CraftEditor />}
        {activeTab === "about" && <AboutEditor />}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminGate><AdminContent /></AdminGate>;
}

// ── Product Manager ──
function ProductManager() {
  const products = useAdminSupabaseList<Product>("products", defaultProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const emptyProduct: Product = {
    id: `prod-${Date.now()}`, name: "", slug: "", category: "handbags", price: 0,
    description: "", details: [], materials: "", dimensions: "",
    colors: [], images: [], inStock: true, featured: false, newArrival: false,
  };

  if (!products.loaded) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs text-smoke">{products.items.length} 件产品</p>
        <button onClick={() => { setAdding(true); setEditing(emptyProduct); }}
          className="btn-primary text-[10px] gap-1 py-2 px-4"><Plus size={12} /> 添加产品</button>
      </div>
      {(editing || adding) && (
        <ProductEditor product={editing!} onSave={async (p) => { if (adding) { const err = await products.add(p); if (err) { alert("添加失败: " + err); return; } setAdding(false); } else { const err = await products.update(p.id, p); if (err) { alert("更新失败: " + err); return; } setEditing(null); } }} onCancel={() => { setEditing(null); setAdding(false); }} />
      )}
      <div className="space-y-1">
        {products.items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 border border-line/50 hover:border-line transition-colors">
            <div className="w-14 h-16 bg-ivory/50 flex-shrink-0 overflow-hidden">
              {p.images[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{p.name || "未命名"}</p>
                <span className="text-[10px] text-smoke/40 uppercase">{p.category}</span>
                {p.featured && <span className="text-[9px] bg-gold/10 text-gold px-1.5 py-0.5">精选</span>}
                {p.newArrival && <span className="text-[9px] bg-charcoal text-paper px-1.5 py-0.5">新品</span>}
              </div>
              <p className="text-xs text-smoke">${p.price.toLocaleString()}{!p.inStock ? " · 已售罄" : ""}</p>
            </div>
            <button onClick={() => setEditing({ ...p })} className="p-1.5 text-smoke/30 hover:text-charcoal"><Edit3 size={14} /></button>
            <button onClick={async () => { const err = await products.remove(p.id); if (err) alert("删除失败: " + err); }} className="p-1.5 text-smoke/30 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').replace(/-+/g, '-') || 'product';
}

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>({ ...product });
  const slugManualRef = useRef(false);
  const upd = (k: keyof Product, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-start justify-center pt-20 overflow-y-auto">
      <div className="bg-paper p-8 w-full max-w-2xl mx-4 shadow-2xl mb-20">
        <h2 className="font-serif text-xl mb-6">{product.id.startsWith("prod-") ? "新建产品" : "编辑产品"}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">名称</label><input value={form.name} onChange={(e) => { upd("name", e.target.value); if (!slugManualRef.current) upd("slug", toSlug(e.target.value)); }} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Slug <span className="text-smoke/30 font-normal lowercase">（输入名称自动生成）</span></label><input value={form.slug} onChange={(e) => { upd("slug", e.target.value); slugManualRef.current = true; }} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">分类</label><select value={form.category} onChange={(e) => upd("category", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal bg-paper"><option value="handbags">手袋</option><option value="charms">挂件</option><option value="pet">宠物</option></select></div>
          <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">价格 ($)</label><input type="number" value={form.price} onChange={(e) => upd("price", Number(e.target.value))} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div className="flex items-center gap-4"><label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.featured} onChange={(e) => upd("featured", e.target.checked)} className="accent-charcoal" /> 精选</label><label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.newArrival} onChange={(e) => upd("newArrival", e.target.checked)} className="accent-charcoal" /> 新品</label><label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.inStock} onChange={(e) => upd("inStock", e.target.checked)} className="accent-charcoal" /> 有库存</label></div>
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">描述</label><textarea value={form.description} onChange={(e) => upd("description", e.target.value)} rows={3} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" /></div>
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">材质</label><input value={form.materials} onChange={(e) => upd("materials", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">尺寸</label><input value={form.dimensions} onChange={(e) => upd("dimensions", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">颜色（逗号分隔）</label><input value={form.colors.join(", ")} onChange={(e) => upd("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-2">产品图片</label>
            <div className="flex flex-wrap gap-3 mb-2">
              {form.images.map((img, i) => (
                <ImageUploader
                  key={i}
                  value={img}
                  onChange={(url) => { const imgs = [...form.images]; imgs[i] = url; upd("images", imgs); }}
                />
              ))}
              <button onClick={() => upd("images", [...form.images, ""])} className="w-20 h-20 border-2 border-dashed border-line/50 flex items-center justify-center text-smoke/30 hover:text-smoke hover:border-line transition-colors"><Plus size={18} /></button>
            </div>
          </div>
          <div className="col-span-2"><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">细节（每行一个）</label><textarea value={form.details.join("\n")} onChange={(e) => upd("details", e.target.value.split("\n").filter(Boolean))} rows={4} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" /></div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onSave(form)} className="btn-primary text-xs py-2 px-6"><Save size={14} className="mr-1" /> 发布</button>
          <button onClick={onCancel} className="btn-outline text-xs py-2 px-6"><X size={14} className="mr-1" /> 取消</button>
        </div>
      </div>
    </div>
  );
}

// ── Homepage Editor ──
function HomepageEditor() {
  const hero = useAdminSupabaseSingle("homepage_hero", true, {
    image: "",
    tagline: "意大利手工 · 始于2024",
    headline: "皮革艺术\n匠心之作",
    subtext: "每一件 MYBIRKIN 作品均由匠人独立手工完成。无流水线，无妥协，只有纯粹无暇的工艺。",
    primaryBtnLabel: "探索系列",
    secondaryBtnLabel: "匠心工艺",
  });
  const sections = useAdminSections("homepage_sections", [
    { title: "Handbags", description: "Explore our handbag collection", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Handbags", link: "/shop?category=handbags", sort_order: 0 },
    { title: "Charms & Accents", description: "Discover our charms", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Charms", link: "/shop?category=charms", sort_order: 1 },
    { title: "Pet Collection", description: "Shop pet accessories", image: "https://placehold.co/800x1000/1a1a1a/d4af37?text=Pets", link: "/shop?category=pet", sort_order: 2 },
  ]);
  const { moveUp, moveDown, addSection, removeSection, updateSection } = sections;
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { 
    if (hero.loaded && hero.value) {
      const v = { ...hero.value };
      const vv = v as any;
      // Map snake_case → camelCase
      if (vv.primary_btn_label !== undefined) { vv.primaryBtnLabel = vv.primaryBtnLabel || vv.primary_btn_label; }
      if (vv.secondary_btn_label !== undefined) { vv.secondaryBtnLabel = vv.secondaryBtnLabel || vv.secondary_btn_label; }
      // Fill empty fields with defaults
      const defaults: any = {
        image: "",
        tagline: "意大利手工 · 始于2024",
        headline: "皮革艺术\n匠心之作",
        subtext: "每一件 MYBIRKIN 作品均由匠人独立手工完成。无流水线，无妥协，只有纯粹无暇的工艺。",
        primaryBtnLabel: "探索系列",
        secondaryBtnLabel: "匠心工艺",
      };
      for (const key of Object.keys(defaults)) {
        if (!vv[key] && defaults[key]) vv[key] = defaults[key];
      }
      setForm((prev: any) => prev || vv);
    }
  }, [hero.loaded, hero.value]);

  if (!hero.loaded || !sections.loaded || !form) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  const upd = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));

  const saveAll = async () => {
    setSaving(true);
    const heroErr = await hero.save(form);
    if (heroErr) { setMsg("主图发布失败: " + heroErr); setSaving(false); return; }
    const secResult = await sections.save(sections.items);
    if (secResult.error) { setMsg("区块发布失败: " + secResult.error); setSaving(false); return; }
    setMsg("已发布！(" + secResult.count + " 个区块)");
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="max-w-2xl">
<h2 className="font-serif text-lg mb-1">主图区域</h2>
      <p className="text-xs text-smoke/60 mb-6">首页主横幅</p>
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">背景图片</label>
          <ImageUploader value={form.image || ""} onChange={(url) => upd("image", url)} compress={false} />
          {form.image && (
            <div className="mt-2 aspect-[21/9] overflow-hidden bg-ivory/50">
              <img src={form.image} alt="预览" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">标语</label><input value={form.tagline || ""} onChange={(e) => upd("tagline", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">标题</label><textarea value={form.headline || ""} onChange={(e) => upd("headline", e.target.value)} rows={2} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none font-serif text-lg" /></div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">副标题</label><textarea value={form.subtext || ""} onChange={(e) => upd("subtext", e.target.value)} rows={3} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" /></div>
        <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">主按钮</label><input value={form.primaryBtnLabel || ""} onChange={(e) => upd("primaryBtnLabel", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div><div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">副按钮</label><input value={form.secondaryBtnLabel || ""} onChange={(e) => upd("secondaryBtnLabel", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div></div>
      </div>

      {/* Promise 区块编辑 */}
      <h2 className="font-serif text-lg mb-1 mt-10">品牌承诺区块</h2>
      <p className="text-xs text-smoke/60 mb-4">首页「The MYBIRKIN Promise」三个承诺的内容</p>
      <div className="space-y-4 mb-6">
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">区块标题</label><input value={form.promiseTitle || ""} onChange={(e) => upd("promiseTitle", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="border border-line/50 p-4 space-y-2">
            <span className="text-[10px] text-smoke/40">承诺 #{n}</span>
            <input value={form["promise" + n + "Title"] || ""} onChange={(e) => upd("promise" + n + "Title", e.target.value)} placeholder="标题" className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
            <textarea value={form["promise" + n + "Text"] || ""} onChange={(e) => upd("promise" + n + "Text", e.target.value)} rows={3} placeholder="内容" className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" />
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-serif text-lg">Our Collections 区块</h2>
            <p className="text-xs text-smoke/60">首页「Our Collections」栏目的内容。上下箭头调整顺序</p>
          </div>
          <button onClick={addSection} className="btn-outline text-[10px] gap-1 py-1.5 px-3"><Plus size={12} /> 添加区块</button>
        </div>
        {sections.items.length === 0 ? (
          <p className="text-xs text-smoke/40 py-6 text-center border border-dashed border-line">暂无区块，点击「添加区块」创建新的 Collection 卡片</p>
        ) : (
          <div className="space-y-3">
            {sections.items.map((sec: any, i: number) => (
              <div key={i} className="p-4 border border-line/50 space-y-3">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-smoke/40 w-6">#{i + 1}</span>
                  <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 text-smoke/30 hover:text-charcoal disabled:opacity-20" title="上移"><ArrowUp size={14} /></button>
                  <button onClick={() => moveDown(i)} disabled={i === sections.items.length - 1} className="p-1 text-smoke/30 hover:text-charcoal disabled:opacity-20" title="下移"><ArrowDown size={14} /></button>
                  <div className="flex-1" />
                  <button onClick={() => removeSection(i)} className="p-1 text-smoke/30 hover:text-red-500" title="删除"><Trash2 size={14} /></button>
                </div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">标题</label><input value={sec.title || ""} onChange={(e) => updateSection(i, "title", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">描述</label><textarea value={sec.description || ""} onChange={(e) => updateSection(i, "description", e.target.value)} rows={2} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal resize-none" /></div>
                <div className="space-y-2">
                  <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">图片</label><ImageUploader value={sec.image || ""} onChange={(url) => updateSection(i, "image", url)} /></div>
                  <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">链接</label><input value={sec.link || ""} onChange={(e) => updateSection(i, "link", e.target.value)} placeholder="/shop?category=handbags" className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal" /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={saveAll} disabled={saving} className={`btn-primary mt-6 ${msg ? (msg.includes("失败") ? "bg-red-800 border-0" : "bg-green-800 border-0") : ""}`}>{saving ? "发布中..." : (msg || "发布首页")}</button>
    </div>
  );
}
// ── Contact Editor ──
function ContactEditor() {
  const contacts = useAdminContact([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contacts.loaded) {
      setWhatsapp(contacts.links.find((l: any) => l.type === "whatsapp")?.url || "");
      setTelegram(contacts.links.find((l: any) => l.type === "telegram")?.url || "");
    }
  }, [contacts.loaded, contacts.links]);

  const save = async () => { setSaved(false);
    const links: any[] = [];
    if (whatsapp.trim()) links.push({ type: "whatsapp", label: "WhatsApp", url: whatsapp.trim() });
    if (telegram.trim()) links.push({ type: "telegram", label: "Telegram", url: telegram.trim() });
    const err = await contacts.save(links);
    if (err) { alert("\u53d1\u5e03\u5931\u8d25: " + err); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!contacts.loaded) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;
  return (
    <div className="max-w-lg">
      <h2 className="font-serif text-lg mb-1">联系链接</h2><p className="text-xs text-smoke/60 mb-6">悬浮客服按钮链接</p>
      {error && <p className="text-xs text-red-500 mb-4 bg-red-50 p-3">{error}</p>}
      <div className="space-y-4 mb-6">
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">WhatsApp 链接</label><input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="https://wa.me/1234567890" className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal font-mono text-xs" /></div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Telegram 链接</label><input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="https://t.me/yourusername" className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal font-mono text-xs" /></div>
      </div>
      <button onClick={save} className={`btn-primary ${saved ? "bg-green-800 border-0" : ""}`}>{saved ? "✓ 已发布" : "发布链接"}</button>
    </div>
  );
}

// ── About (Our Story) Editor ──
const ABOUT_DEFAULTS: Record<string, string> = {
  heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85",
  heroTagline: "Since 2024",
  heroTitle: "Our Story",
  section1Label: "Philosophy",
  section1Heading: "One artisan.\nOne piece.\nOne promise.",
  section1Text: "At MYBIRKIN, we believe true luxury is personal. Every piece is handcrafted to order by a single artisan, from the first cut of leather to the final stitch of thread. No assembly lines. No mass production. Just one person pouring their craft into your piece.",
  section1Image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85",
  section2Label: "Materials",
  section2Heading: "Sourced from the finest.",
  section2Text: "We source our leathers exclusively from family-owned tanneries in Tuscany, Italy. Full-grain and top-grain hides, vegetable-tanned using traditional methods passed down through generations.",
  section2Image: "https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85",
  ctaText: "Discover Our Craft",
  ctaLink: "/craft",
};

function AboutEditor() {
  const about = useAdminSupabaseSingle("about_page", true, ABOUT_DEFAULTS);
  const [form, setForm] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (about.loaded && about.value) {
      const row: any = about.value;
      const v: any = {
        heroImage: row.hero_image ?? row.heroImage ?? ABOUT_DEFAULTS.heroImage,
        heroTagline: row.hero_tagline ?? row.heroTagline ?? ABOUT_DEFAULTS.heroTagline,
        heroTitle: row.hero_title ?? row.heroTitle ?? ABOUT_DEFAULTS.heroTitle,
        section1Label: row.section1_label ?? row.section1Label ?? ABOUT_DEFAULTS.section1Label,
        section1Heading: row.section1_heading ?? row.section1Heading ?? ABOUT_DEFAULTS.section1Heading,
        section1Text: row.section1_text ?? row.section1Text ?? ABOUT_DEFAULTS.section1Text,
        section1Image: row.section1_image ?? row.section1Image ?? ABOUT_DEFAULTS.section1Image,
        section2Label: row.section2_label ?? row.section2Label ?? ABOUT_DEFAULTS.section2Label,
        section2Heading: row.section2_heading ?? row.section2Heading ?? ABOUT_DEFAULTS.section2Heading,
        section2Text: row.section2_text ?? row.section2Text ?? ABOUT_DEFAULTS.section2Text,
        section2Image: row.section2_image ?? row.section2Image ?? ABOUT_DEFAULTS.section2Image,
        ctaText: row.cta_text ?? row.ctaText ?? ABOUT_DEFAULTS.ctaText,
        ctaLink: row.cta_link ?? row.ctaLink ?? ABOUT_DEFAULTS.ctaLink,
      };
      setForm((prev: any) => prev || v);
    }
  }, [about.loaded, about.value]);

  if (!about.loaded || !form) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  const upd = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));

  const saveAll = async () => {
    setSaving(true);
    const err = await about.save(form);
    if (err) { setMsg("发布失败: " + err); } else { setMsg("已发布！"); }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const field = (label: string, key: string, rows = 1) => (
    <div>
      <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">{label}</label>
      {rows > 1 ? (
        <textarea value={form[key] || ""} onChange={(e) => upd(key, e.target.value)} rows={rows} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" />
      ) : (
        <input value={form[key] || ""} onChange={(e) => upd(key, e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
      )}
    </div>
  );

  const imageField = (label: string, key: string, compress = true) => (
    <div>
      <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">{label}</label>
      <ImageUploader value={form[key] || ""} onChange={(url) => upd(key, url)} compress={compress} />
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-lg mb-1">Our Story 页面</h2>
      <p className="text-xs text-smoke/60 mb-6">网站「Our Story」页面的全部内容，图片支持本地上传</p>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium pt-2">顶部区域</h3>
        {imageField("背景图片（建议宽图，不压缩）", "heroImage", false)}
        {field("顶部小标签", "heroTagline")}
        {field("顶部标题", "heroTitle")}
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium pt-2">区块一（文字在左，图片在右）</h3>
        {field("小标签", "section1Label")}
        {field("标题（换行用回车）", "section1Heading", 3)}
        {field("正文（换行用回车）", "section1Text", 5)}
        {imageField("图片", "section1Image")}
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium pt-2">区块二（图片在左，文字在右）</h3>
        {field("小标签", "section2Label")}
        {field("标题（换行用回车）", "section2Heading", 3)}
        {field("正文（换行用回车）", "section2Text", 5)}
        {imageField("图片", "section2Image")}
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium pt-2">底部按钮</h3>
        {field("按钮文字", "ctaText")}
        {field("按钮链接（站内路径）", "ctaLink")}
      </div>

      <button onClick={saveAll} disabled={saving} className={`btn-primary ${msg ? (msg.includes("失败") ? "bg-red-800 border-0" : "bg-green-800 border-0") : ""}`}>{saving ? "发布中..." : (msg || "发布")}</button>
    </div>
  );
}
