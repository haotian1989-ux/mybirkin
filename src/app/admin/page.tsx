"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit3, Save, X, Layout, ShoppingBag, Settings, MessageCircle, Palette, Image } from "lucide-react";
import { useAdminStore, useSiteConfig } from "@/lib/use-admin-store";
import { Product } from "@/lib/types";
import { products as defaultProducts } from "@/lib/data";
import AdminPanel from "@/components/AdminPanel";

type AdminTab = "products" | "builder" | "homepage" | "contact";

const tabs: { key: AdminTab; label: string; icon: any }[] = [
  { key: "products", label: "Products", icon: ShoppingBag },
  { key: "builder", label: "Builder Data", icon: Palette },
  { key: "homepage", label: "Homepage", icon: Layout },
  { key: "contact", label: "Contact", icon: MessageCircle },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  return (
    <div className="min-h-screen bg-ivory/20">
      <div className="page-padding py-10 md:py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-smoke hover:text-charcoal transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-2xl">Admin Dashboard</h1>
              <p className="text-xs text-smoke mt-0.5">Manage your store content</p>
            </div>
          </div>
          <Link href="/" className="btn-outline text-xs">View Site</Link>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-8 border-b border-line">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-xs tracking-label uppercase transition-colors ${
                  activeTab === t.key
                    ? "text-charcoal border-b-2 border-charcoal -mb-[1px]"
                    : "text-smoke/40 hover:text-smoke"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "products" && <ProductManager />}
        {activeTab === "builder" && <AdminPanel />}
        {activeTab === "homepage" && <HomepageEditor />}
        {activeTab === "contact" && <ContactEditor />}
      </div>
    </div>
  );
}

/* ═══════ Product Manager ═══════ */
function ProductManager() {
  const products = useAdminStore<Product>("myb_admin_products", defaultProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const emptyProduct: Product = {
    id: `prod-${Date.now()}`, name: "", slug: "", category: "handbags", price: 0,
    description: "", details: [], materials: "", dimensions: "",
    colors: [], images: [], inStock: true, featured: false, newArrival: false,
  };

  if (!products.loaded) return <div className="text-xs text-smoke/40 py-10">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs text-smoke">{products.items.length} products</p>
        <button onClick={() => { setAdding(true); setEditing(emptyProduct); }}
          className="btn-primary text-[10px] gap-1 py-2 px-4">
          <Plus size={12} /> Add Product
        </button>
      </div>

      {/* Editor modal */}
      {(editing || adding) && (
        <ProductEditor
          product={editing!}
          onSave={(p) => {
            if (adding) { products.add(p); setAdding(false); }
            else products.update(p.id, p);
            setEditing(null);
          }}
          onCancel={() => { setEditing(null); setAdding(false); }}
        />
      )}

      {/* Product list */}
      <div className="space-y-1">
        {products.items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 border border-line/50 hover:border-line transition-colors">
            <div className="w-14 h-16 bg-ivory/50 flex-shrink-0 overflow-hidden">
              {p.images[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{p.name || "Untitled"}</p>
                <span className="text-[10px] text-smoke/40 uppercase">{p.category}</span>
                {p.featured && <span className="text-[9px] bg-gold/10 text-gold px-1.5 py-0.5">Featured</span>}
                {p.newArrival && <span className="text-[9px] bg-charcoal text-paper px-1.5 py-0.5">New</span>}
              </div>
              <p className="text-xs text-smoke">${p.price.toLocaleString()}{!p.inStock ? " · Out of stock" : ""}</p>
            </div>
            <button onClick={() => setEditing({ ...p })} className="p-1.5 text-smoke/30 hover:text-charcoal"><Edit3 size={14} /></button>
            <button onClick={() => products.remove(p.id)} className="p-1.5 text-smoke/30 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>({ ...product });
  const upd = (k: keyof Product, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-start justify-center pt-20 overflow-y-auto">
      <div className="bg-paper p-8 w-full max-w-2xl mx-4 shadow-2xl mb-20">
        <h2 className="font-serif text-xl mb-6">{product.id.startsWith("prod-") ? "New Product" : "Edit Product"}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Name</label>
            <input value={form.name} onChange={(e) => upd("name", e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => upd("slug", e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Category</label>
            <select value={form.category} onChange={(e) => upd("category", e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal bg-paper">
              <option value="handbags">Handbags</option>
              <option value="charms">Charms</option>
              <option value="pet">Pet</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Price ($)</label>
            <input type="number" value={form.price} onChange={(e) => upd("price", Number(e.target.value))}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.featured} onChange={(e) => upd("featured", e.target.checked)} className="accent-charcoal" /> Featured</label>
            <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.newArrival} onChange={(e) => upd("newArrival", e.target.checked)} className="accent-charcoal" /> New Arrival</label>
            <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={form.inStock} onChange={(e) => upd("inStock", e.target.checked)} className="accent-charcoal" /> In Stock</label>
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => upd("description", e.target.value)} rows={3}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Materials</label>
            <input value={form.materials} onChange={(e) => upd("materials", e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Dimensions</label>
            <input value={form.dimensions} onChange={(e) => upd("dimensions", e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Colors (comma separated)</label>
            <input value={form.colors.join(", ")} onChange={(e) => upd("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Image URLs (one per line)</label>
            <textarea value={form.images.join("\n")} onChange={(e) => upd("images", e.target.value.split("\n").filter(Boolean))} rows={3}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none font-mono text-xs" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Details (one per line)</label>
            <textarea value={form.details.join("\n")} onChange={(e) => upd("details", e.target.value.split("\n").filter(Boolean))} rows={4}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onSave(form)} className="btn-primary py-2 px-6 text-xs"><Save size={13} className="mr-1.5" /> Save Product</button>
          <button onClick={onCancel} className="btn-outline py-2 px-6 text-xs">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════ Homepage Editor ═══════ */
function HomepageEditor() {
  const hero = useSiteConfig("myb_homepage_hero", {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85",
    tagline: "Atelier · Est. 2024",
    headline: "Where Leather\nBecomes Art",
    subtext: "Bespoke leather goods handcrafted to order by master artisans. Italian full-grain leather, timeless design, made exclusively for you.",
    primaryBtnLabel: "Explore Collection",
    secondaryBtnLabel: "Our Craft",
  });

  const sections = useSiteConfig("myb_homepage_sections", {
    promiseTitle: "The MYBIRKIN Promise",
    promise1Title: "Italian Leather",
    promise1Text: "Full-grain hides sourced exclusively from family-owned tanneries in Tuscany.",
    promise2Title: "Handcrafted to Order",
    promise2Text: "No inventory, no mass production. Each piece is cut, stitched, and finished by a single artisan.",
    promise3Title: "Lifetime Care",
    promise3Text: "Every MYBIRKIN piece includes complimentary conditioning and repair for life.",
  });

  const [msg, setMsg] = useState("");

  if (!hero.loaded || !sections.loaded) return <div className="text-xs text-smoke/40 py-10">Loading...</div>;

  const saveAll = () => { hero.save(hero.value); sections.save(sections.value); setMsg("Saved!"); setTimeout(() => setMsg(""), 2000); };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-lg mb-1">Hero Section</h2>
      <p className="text-xs text-smoke/60 mb-6">Main banner on the homepage</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Background Image URL</label>
          <input value={hero.value.image} onChange={(e) => hero.save({ ...hero.value, image: e.target.value })}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal font-mono text-xs" />
          {hero.value.image && (
            <div className="mt-2 aspect-[21/9] overflow-hidden bg-ivory/50">
              <img src={hero.value.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Tagline</label>
          <input value={hero.value.tagline} onChange={(e) => hero.save({ ...hero.value, tagline: e.target.value })}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
        </div>
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Headline (use \n for line break)</label>
          <textarea value={hero.value.headline} onChange={(e) => hero.save({ ...hero.value, headline: e.target.value })} rows={2}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none font-serif text-lg" />
        </div>
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Subtext</label>
          <textarea value={hero.value.subtext} onChange={(e) => hero.save({ ...hero.value, subtext: e.target.value })} rows={3}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Primary Button</label>
            <input value={hero.value.primaryBtnLabel} onChange={(e) => hero.save({ ...hero.value, primaryBtnLabel: e.target.value })}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Secondary Button</label>
            <input value={hero.value.secondaryBtnLabel} onChange={(e) => hero.save({ ...hero.value, secondaryBtnLabel: e.target.value })}
              className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
          </div>
        </div>
      </div>

      <h2 className="font-serif text-lg mb-1 mt-10">Brand Promise Section</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Section Title</label>
          <input value={sections.value.promiseTitle}
            onChange={(e) => sections.save({ ...sections.value, promiseTitle: e.target.value })}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Pillar {n} Title</label>
              <input value={(sections.value as any)[`promise${n}Title`]}
                onChange={(e) => sections.save({ ...sections.value, [`promise${n}Title`]: e.target.value })}
                className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
              <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1 mt-3">Pillar {n} Text</label>
              <textarea value={(sections.value as any)[`promise${n}Text`]}
                onChange={(e) => sections.save({ ...sections.value, [`promise${n}Text`]: e.target.value })} rows={3}
                className="w-full border border-line px-3 py-2 text-xs focus:outline-none focus:border-charcoal resize-none" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={saveAll} className={`btn-primary ${msg ? "bg-green-800 border-0" : ""}`}>
        {msg || "Save Homepage"}
      </button>
    </div>
  );
}

/* ═══════ Contact Editor ═══════ */
function ContactEditor() {
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("myb_contact_links");
      if (raw) {
        const links = JSON.parse(raw);
        setWhatsapp(links.find((l: any) => l.type === "whatsapp")?.url || "");
        setTelegram(links.find((l: any) => l.type === "telegram")?.url || "");
      }
    } catch {}
    setLoaded(true);
  }, []);

  const save = () => {
    const links: any[] = [];
    if (whatsapp.trim()) links.push({ type: "whatsapp", label: "WhatsApp", url: whatsapp.trim() });
    if (telegram.trim()) links.push({ type: "telegram", label: "Telegram", url: telegram.trim() });
    localStorage.setItem("myb_contact_links", JSON.stringify(links));
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!loaded) return <div className="text-xs text-smoke/40 py-10">Loading...</div>;

  return (
    <div className="max-w-lg">
      <h2 className="font-serif text-lg mb-1">Contact Links</h2>
      <p className="text-xs text-smoke/60 mb-6">Floating contact button links</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">WhatsApp Link</label>
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="https://wa.me/1234567890"
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal font-mono text-xs" />
        </div>
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Telegram Link</label>
          <input value={telegram} onChange={(e) => setTelegram(e.target.value)}
            placeholder="https://t.me/yourusername"
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal font-mono text-xs" />
        </div>
      </div>
      <button onClick={save} className={`btn-primary ${saved ? "bg-green-800 border-0" : ""}`}>
        {saved ? "✓ Saved" : "Save Links"}
      </button>
    </div>
  );
}
