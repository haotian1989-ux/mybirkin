"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";

type Tab = "leathers" | "colors" | "hardware" | "silhouettes" | "artisans" | "contact";

interface LeatherItem { id: string; name: string; hermesEquivalent: string; grain: string; characteristics: string; bestFor: string; image: string; }
interface ColorItem { id: string; name: string; hex: string; }
interface HardwareItem { id: string; name: string; material: string; hex: string; description: string; price: number; }
interface SilhouetteItem { id: string; name: string; desc: string; dimensions: string; image: string; basePrice: number; }
interface ArtisanItem { id: string; name: string; role: string; years: number; quote: string; image: string; }
interface ContactLink { type: "whatsapp" | "telegram"; label: string; url: string; }

type StoreItem = LeatherItem | ColorItem | HardwareItem | SilhouetteItem | ArtisanItem;

function useStore<T extends StoreItem | ContactLink>(key: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        } else {
          setItems(defaults);
          localStorage.setItem(key, JSON.stringify(defaults));
        }
      } else {
        setItems(defaults);
        localStorage.setItem(key, JSON.stringify(defaults));
      }
    } catch {
      setItems(defaults);
    }
    setLoaded(true);
  }, [key, defaults]);

  const save = useCallback((newItems: T[]) => {
    setItems(newItems);
    localStorage.setItem(key, JSON.stringify(newItems));
    window.dispatchEvent(new Event("storage"));
  }, [key]);

  const add = useCallback((item: T) => save([...items, item]), [items, save]);
  const remove = useCallback((id: string) => save(items.filter((i: any) => i.id !== id)), [items, save]);
  const update = useCallback((id: string, updates: Partial<T>) => save(items.map((i: any) => i.id === id ? { ...i, ...updates } : i)), [items, save]);

  return { items, loaded, add, remove, update, save };
}

const tabs: { key: Tab; label: string }[] = [
  { key: "leathers", label: "Leather" },
  { key: "colors", label: "Colors" },
  { key: "hardware", label: "Hardware" },
  { key: "silhouettes", label: "Silhouettes" },
  { key: "artisans", label: "Artisans" },
  { key: "contact", label: "Contact" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("leathers");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const leathers = useStore<LeatherItem>("myb_admin_leathers", [
    { id: "togo", name: "Togo", hermesEquivalent: "Togo", grain: "pebbled", characteristics: "Soft, lightweight calfskin with fine grain.", bestFor: "Everyday bags", image: "" },
    { id: "epsom", name: "Epsom", hermesEquivalent: "Epsom", grain: "textured", characteristics: "Embossed calfskin. Holds shape.", bestFor: "Structured bags", image: "" },
    { id: "clemence", name: "Clemence", hermesEquivalent: "Clémence", grain: "pebbled", characteristics: "Bullcalf. Supple slouch.", bestFor: "Relaxed silhouettes", image: "" },
    { id: "swift", name: "Swift", hermesEquivalent: "Swift", grain: "smooth", characteristics: "Extremely soft. Takes color vibrantly.", bestFor: "Evening bags", image: "" },
    { id: "box", name: "Box Calf", hermesEquivalent: "Box", grain: "smooth", characteristics: "Glossy mirror finish.", bestFor: "Formal pieces", image: "" },
    { id: "barenia", name: "Barenia", hermesEquivalent: "Barenia", grain: "matte", characteristics: "Natural matte. Develops patina.", bestFor: "Heritage pieces", image: "" },
  ]);

  const colors = useStore<ColorItem>("myb_admin_colors", [
    { id: "noir", name: "Noir", hex: "#1A1A1A" },
    { id: "gold-tan", name: "Gold", hex: "#C8913A" },
    { id: "etoupe", name: "Étoupe", hex: "#9C9583" },
    { id: "etain", name: "Étain", hex: "#6B6B6B" },
    { id: "rouge-h", name: "Rouge H", hex: "#722F37" },
    { id: "bleu-nuit", name: "Bleu Nuit", hex: "#1C2833" },
    { id: "craie", name: "Craie", hex: "#F5F0E8" },
    { id: "vert-cypres", name: "Vert Cypres", hex: "#2E4A3A" },
    { id: "prune", name: "Prune", hex: "#4A2545" },
    { id: "orange-h", name: "Orange H", hex: "#D4722A" },
  ]);

  const hardwares = useStore<HardwareItem>("myb_admin_hardware", [
    { id: "gold", name: "18k Gold", material: "Brass, 18k Gold-Plated", hex: "#C8A96E", description: "Warm, luminous finish.", price: 0 },
    { id: "palladium", name: "Palladium", material: "Brass, Palladium-Plated", hex: "#C0C0C0", description: "Cool, modern silver.", price: 0 },
    { id: "rose-gold", name: "Rose Gold", material: "Brass, Rose Gold-Plated", hex: "#B76E79", description: "Soft romantic warmth.", price: 30 },
    { id: "gunmetal", name: "Gunmetal", material: "Brass, Black Oxide", hex: "#3A3A3A", description: "Dark and architectural.", price: 30 },
    { id: "permabrass", name: "Permabrass", material: "Brass, Permabrass-Coated", hex: "#D4A853", description: "Durable champagne tone.", price: 20 },
  ]);

  const silhouettes = useStore<SilhouetteItem>("myb_admin_silhouettes", [
    { id: "tote-30", name: "The Tote 30", desc: "Structured tote. Detachable strap.", dimensions: "30×24×14cm", image: "", basePrice: 980 },
    { id: "tote-36", name: "The Tote 36", desc: "Larger tote. More room.", dimensions: "36×28×16cm", image: "", basePrice: 1180 },
    { id: "shoulder", name: "The Shoulder Bag", desc: "Crescent silhouette.", dimensions: "28×20×10cm", image: "", basePrice: 860 },
    { id: "clutch", name: "The Clutch", desc: "Evening. Wave-edge top.", dimensions: "22×14×5cm", image: "", basePrice: 720 },
    { id: "backpack", name: "The Backpack", desc: "Roll-top. Padded sleeve.", dimensions: "40×30×15cm", image: "", basePrice: 1280 },
  ]);

  const artisans = useStore<ArtisanItem>("myb_admin_artisans", [
    { id: "marco", name: "Marco Bellini", role: "Master Leather Cutter", years: 28, quote: "\(quote\)I read the hide before I cut.\(quote\)", image: "" },
    { id: "elena", name: "Elena Rossi", role: "Master Stitcher", years: 22, quote: "\(quote\)Each stitch is a conversation.\(quote\)", image: "" },
    { id: "paolo", name: "Paolo Conti", role: "Edge & Finish Master", years: 18, quote: "\(quote\)The edge reveals quality.\(quote\)", image: "" },
    { id: "sofia", name: "Sofia Bianchi", role: "Hardware & Assembly", years: 15, quote: "\(quote\)Everything must align.\(quote\)", image: "" },
  ]);

  const contacts = useStore<ContactLink>("myb_contact_links", [
    { type: "whatsapp", label: "WhatsApp", url: "https://wa.me/0000000000" },
    { type: "telegram", label: "Telegram", url: "https://t.me/mybirkin" },
  ]);

  const stores: Record<Tab, any> = { leathers, colors, hardware: hardwares, silhouettes, artisans, contact: contacts };

  if (activeTab === "contact") {
    return (
      <div className="mb-12 border border-line bg-paper">
        <div className="flex border-b border-line overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => { setActiveTab(t.key); setEditingId(null); setShowAdd(false); }}
              className={`px-5 py-3 text-[10px] tracking-label uppercase whitespace-nowrap transition-colors ${
                activeTab === t.key ? "text-charcoal border-b-2 border-charcoal -mb-[1px]" : "text-smoke/40 hover:text-smoke"}`}>
              {t.label}
            </button>
          ))}
          <div className="flex-1" />
        </div>

        <div className="p-6 max-w-lg">
          <p className="text-xs text-smoke/60 mb-6">Configure your WhatsApp and Telegram contact links. These appear in the floating contact button across the entire site.</p>
          
          <ContactLinkForm
            links={contacts.items}
            onSave={(links: ContactLink[]) => contacts.save(links)}
          />
        </div>
      </div>
    );
  }

  const current = stores[activeTab];
  if (!current?.loaded) return <div className="py-8 text-xs text-smoke/40">Loading...</div>;

  return (
    <div className="mb-12 border border-line bg-paper">
      <div className="flex border-b border-line overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setEditingId(null); setShowAdd(false); }}
            className={`px-5 py-3 text-[10px] tracking-label uppercase whitespace-nowrap transition-colors ${
              activeTab === t.key ? "text-charcoal border-b-2 border-charcoal -mb-[1px]" : "text-smoke/40 hover:text-smoke"
            }`}>
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="px-4 py-3 flex items-center gap-1 text-[10px] tracking-label uppercase text-smoke/50 hover:text-charcoal transition-colors">
          <Plus size={12} /> Add
        </button>
      </div>

      <div className="p-5 max-h-[60vh] overflow-y-auto">
        {showAdd && (
          <ItemForm tab={activeTab} onSave={(item: any) => { (current.add as any)({ ...item, id: item.id || Date.now().toString() }); setShowAdd(false); }} onCancel={() => setShowAdd(false)} />
        )}

        <div className="space-y-2">
          {(current.items as any[]).map((item: any) => (
            <div key={item.id}>
              {editingId === item.id ? (
                <ItemForm tab={activeTab} item={item} onSave={(updates) => { (current.update as any)(item.id, updates); setEditingId(null); }} onCancel={() => setEditingId(null)} />
              ) : (
                <div className="flex items-center gap-3 p-3 border border-line/50 hover:border-line transition-colors">
                  {activeTab === "colors" && <div className="w-6 h-6 rounded-full border border-line/30 flex-shrink-0" style={{ backgroundColor: item.hex }} />}
                  {activeTab === "hardware" && <div className="w-6 h-6 rounded-full border border-line/30 flex-shrink-0" style={{ backgroundColor: item.hex }} />}
                  {activeTab === "leathers" && <span className="text-[10px] text-gold w-12 flex-shrink-0">H. {item.hermesEquivalent}</span>}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    {activeTab === "leathers" && <p className="text-[10px] text-smoke/40 truncate">{item.grain} · {item.bestFor}</p>}
                    {activeTab === "hardware" && <p className="text-[10px] text-smoke/40 truncate">{item.material} {item.price > 0 ? `· +$${item.price}` : ""}</p>}
                    {activeTab === "silhouettes" && <p className="text-[10px] text-smoke/40 truncate">${item.basePrice} · {item.dimensions}</p>}
                    {activeTab === "artisans" && <p className="text-[10px] text-smoke/40 truncate">{item.role} · {item.years} yrs</p>}
                    {activeTab === "colors" && <p className="text-[10px] text-smoke/40 truncate font-mono">{item.hex}</p>}
                  </div>
                  <button onClick={() => setEditingId(item.id)} className="p-1.5 text-smoke/30 hover:text-charcoal transition-colors"><Edit3 size={12} /></button>
                  <button onClick={() => (current.remove as any)(item.id)} className="p-1.5 text-smoke/30 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                </div>
              )}
            </div>
          ))}
          {current.items.length === 0 && <p className="text-xs text-smoke/30 py-6 text-center">No items. Click Add to create one.</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Contact link editor ── */
function ContactLinkForm({ links, onSave }: { links: ContactLink[]; onSave: (links: ContactLink[]) => void }) {
  const [whatsappUrl, setWhatsappUrl] = useState(links.find((l) => l.type === "whatsapp")?.url || "");
  const [telegramUrl, setTelegramUrl] = useState(links.find((l) => l.type === "telegram")?.url || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newLinks: ContactLink[] = [];
    if (whatsappUrl.trim()) newLinks.push({ type: "whatsapp", label: "WhatsApp", url: whatsappUrl.trim() });
    if (telegramUrl.trim()) newLinks.push({ type: "telegram", label: "Telegram", url: telegramUrl.trim() });
    onSave(newLinks);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1.5">WhatsApp Link</label>
        <input
          value={whatsappUrl}
          onChange={(e) => setWhatsappUrl(e.target.value)}
          placeholder="https://wa.me/1234567890"
          className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-charcoal"
        />
        <p className="text-[10px] text-smoke/40 mt-1">Format: https://wa.me/[phone number]</p>
      </div>

      <div>
        <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1.5">Telegram Link</label>
        <input
          value={telegramUrl}
          onChange={(e) => setTelegramUrl(e.target.value)}
          placeholder="https://t.me/yourusername"
          className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-charcoal"
        />
        <p className="text-[10px] text-smoke/40 mt-1">Format: https://t.me/[username]</p>
      </div>

      <button onClick={handleSave} className={`btn-primary ${saved ? "bg-green-800 border-0" : ""}`}>
        {saved ? "✓ Saved" : "Save Contact Links"}
      </button>
    </div>
  );
}

/* ── Generic Item Form ── */
function ItemForm({ tab, item, onSave, onCancel }: { tab: Tab; item?: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState<any>(item ? { ...item } : { id: "" });
  const update = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));

  const handleSave = () => {
    if (tab === "leathers") onSave({ id: form.id || `leather-${Date.now()}`, name: form.name, hermesEquivalent: form.hermesEquivalent, grain: form.grain, characteristics: form.characteristics, bestFor: form.bestFor, image: form.image || "" });
    else if (tab === "colors") onSave({ id: form.id || `color-${Date.now()}`, name: form.name, hex: form.hex || "#000000" });
    else if (tab === "hardware") onSave({ id: form.id || `hw-${Date.now()}`, name: form.name, material: form.material || "", hex: form.hex || "#000", description: form.description || "", price: Number(form.price) || 0 });
    else if (tab === "silhouettes") onSave({ id: form.id || `sil-${Date.now()}`, name: form.name, desc: form.desc || "", dimensions: form.dimensions || "", image: form.image || "", basePrice: Number(form.basePrice) || 0 });
    else if (tab === "artisans") onSave({ id: form.id || `art-${Date.now()}`, name: form.name, role: form.role || "", years: Number(form.years) || 0, quote: form.quote || "", image: form.image || "" });
  };

  return (
    <div className="p-4 mb-3 border border-charcoal/20 bg-ivory/30">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {tab !== "colors" && (
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">ID</label><input value={form.id} onChange={(e) => update("id", e.target.value)} placeholder="auto-generated if empty" className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        )}
        {tab !== "colors" && tab !== "hardware" && (
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Name</label><input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        )}
        {tab === "leathers" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Hermès Eq.</label><input value={form.hermesEquivalent || ""} onChange={(e) => update("hermesEquivalent", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Grain</label><select value={form.grain || ""} onChange={(e) => update("grain", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal bg-paper"><option value="">Select</option><option value="smooth">Smooth</option><option value="pebbled">Pebbled</option><option value="textured">Textured</option><option value="matte">Matte</option></select></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Characteristics</label><input value={form.characteristics || ""} onChange={(e) => update("characteristics", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Best For</label><input value={form.bestFor || ""} onChange={(e) => update("bestFor", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        </>)}
        {tab === "colors" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Name</label><input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Hex</label><div className="flex gap-2"><input type="color" value={form.hex || "#000"} onChange={(e) => update("hex", e.target.value)} className="w-8 h-8 border-0 cursor-pointer" /><input value={form.hex || ""} onChange={(e) => update("hex", e.target.value)} className="flex-1 border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal" /></div></div>
        </>)}
        {tab === "hardware" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Name</label><input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Price (+$)</label><input type="number" value={form.price || 0} onChange={(e) => update("price", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Material</label><input value={form.material || ""} onChange={(e) => update("material", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Hex</label><input value={form.hex || ""} onChange={(e) => update("hex", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Description</label><input value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        </>)}
        {tab === "silhouettes" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Base Price</label><input type="number" value={form.basePrice || 0} onChange={(e) => update("basePrice", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Dimensions</label><input value={form.dimensions || ""} onChange={(e) => update("dimensions", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Description</label><input value={form.desc || ""} onChange={(e) => update("desc", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        </>)}
        {tab === "artisans" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Role</label><input value={form.role || ""} onChange={(e) => update("role", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Years</label><input type="number" value={form.years || 0} onChange={(e) => update("years", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Quote</label><input value={form.quote || ""} onChange={(e) => update("quote", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        </>)}
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="btn-primary text-[10px] py-1.5 px-4"><Save size={12} className="mr-1" /> Save</button>
        <button onClick={onCancel} className="btn-outline text-[10px] py-1.5 px-4"><X size={12} className="mr-1" /> Cancel</button>
      </div>
    </div>
  );
}
