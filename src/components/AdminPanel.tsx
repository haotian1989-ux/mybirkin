"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { useAdminSupabaseList } from "@/lib/use-supabase-data";

type Tab = "leathers" | "colors" | "hardware" | "silhouettes" | "artisans";

interface LeatherItem { id: string; name: string; hermesEquivalent: string; grain: string; characteristics: string; bestFor: string; image: string; price?: string; }
interface ColorItem { id: string; name: string; hex: string; }
interface HardwareItem { id: string; name: string; material: string; hex: string; description: string; price: number; }
interface SilhouetteItem { id: string; name: string; desc: string; dimensions: string; image: string; basePrice: number; }
interface ArtisanItem { id: string; name: string; role: string; years: number; quote: string; image: string; }

const tabs: { key: Tab; label: string }[] = [
  { key: "leathers", label: "皮料" },
  { key: "colors", label: "颜色" },
  { key: "hardware", label: "五金" },
  { key: "silhouettes", label: "款型" },
  { key: "artisans", label: "工匠" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("leathers");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const leathers = useAdminSupabaseList<LeatherItem>("builder_leathers", [
    { id: "togo", name: "Togo", hermesEquivalent: "Togo", grain: "pebbled", characteristics: "Soft, lightweight calfskin with fine grain.", bestFor: "Everyday bags", image: "" },
    { id: "epsom", name: "Epsom", hermesEquivalent: "Epsom", grain: "textured", characteristics: "Embossed calfskin. Holds shape.", bestFor: "Structured bags", image: "" },
    { id: "clemence", name: "Clemence", hermesEquivalent: "Clémence", grain: "pebbled", characteristics: "Bullcalf. Supple slouch.", bestFor: "Relaxed silhouettes", image: "" },
    { id: "swift", name: "Swift", hermesEquivalent: "Swift", grain: "smooth", characteristics: "Extremely soft. Takes color vibrantly.", bestFor: "Evening bags", image: "" },
    { id: "box", name: "Box Calf", hermesEquivalent: "Box", grain: "smooth", characteristics: "Glossy mirror finish.", bestFor: "Formal pieces", image: "" },
    { id: "barenia", name: "Barenia", hermesEquivalent: "Barenia", grain: "matte", characteristics: "Natural matte. Develops patina.", bestFor: "Heritage pieces", image: "" },
  ]);

  const colors = useAdminSupabaseList<ColorItem>("builder_colors", [
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

  const hardware = useAdminSupabaseList<HardwareItem>("builder_hardware", [
    { id: "gold", name: "18k Gold", material: "Brass, 18k Gold-Plated", hex: "#C8A96E", description: "Warm, luminous finish.", price: 0 },
    { id: "palladium", name: "Palladium", material: "Brass, Palladium-Plated", hex: "#C0C0C0", description: "Cool, modern silver.", price: 0 },
    { id: "rose-gold", name: "Rose Gold", material: "Brass, Rose Gold-Plated", hex: "#B76E79", description: "Soft, romantic warmth.", price: 30 },
    { id: "gunmetal", name: "Gunmetal", material: "Brass, Black Oxide", hex: "#3A3A3A", description: "Dark and architectural.", price: 30 },
    { id: "permabrass", name: "Permabrass", material: "Brass, Permabrass-Coated", hex: "#D4A853", description: "Durable champagne tone.", price: 20 },
  ]);

  const silhouettes = useAdminSupabaseList<SilhouetteItem>("builder_silhouettes", [
    { id: "tote-30", name: "The Tote 30", desc: "Structured tote. Detachable strap.", dimensions: "30cm × 24cm × 14cm", image: "", basePrice: 980 },
    { id: "tote-36", name: "The Tote 36", desc: "Larger tote for everyday.", dimensions: "36cm × 28cm × 16cm", image: "", basePrice: 1180 },
    { id: "shoulder", name: "The Shoulder Bag", desc: "Crescent silhouette.", dimensions: "28cm × 20cm × 10cm", image: "", basePrice: 860 },
    { id: "clutch", name: "The Clutch", desc: "Evening clutch.", dimensions: "22cm × 14cm × 5cm", image: "", basePrice: 720 },
    { id: "backpack", name: "The Backpack", desc: "Refined backpack. Roll-top.", dimensions: "40cm × 30cm × 15cm", image: "", basePrice: 1280 },
    { id: "crossbody", name: "The Crossbody", desc: "Compact, hands-free.", dimensions: "22cm × 16cm × 7cm", image: "", basePrice: 680 },
  ]);

  const artisans = useAdminSupabaseList<ArtisanItem>("builder_artisans", [
    { id: "marco", name: "Marco Bellini", role: "Master Leather Cutter", years: 28, quote: "\"I read the hide before I ever pick up the knife.\"", image: "" },
    { id: "elena", name: "Elena Rossi", role: "Master Stitcher", years: 22, quote: "\"Each saddle stitch is a conversation.\"", image: "" },
    { id: "paolo", name: "Paolo Conti", role: "Edge & Finish Master", years: 18, quote: "\"The edge is where true quality reveals itself.\"", image: "" },
    { id: "sofia", name: "Sofia Bianchi", role: "Hardware & Assembly", years: 15, quote: "\"Everything must align.\"", image: "" },
    { id: "giovanni", name: "Giovanni Ferro", role: "Pattern & Design", years: 25, quote: "\"Every curve, every proportion — intentional.\"", image: "" },
  ]);


  const stores: Record<Tab, any> = { leathers, colors, hardware, silhouettes, artisans };

  const current = stores[activeTab];
  if (!current.loaded) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  const handleDelete = async (id: string) => { const err = await current.remove(id); if (err) { alert("删除失败: " + err); return; } if (editingId === id) setEditingId(null); };
  const handleAdd = async (item: any) => { const err = await current.add(item); if (err) { alert("添加失败: " + err); return; } setShowAdd(false); };
  const handleUpdate = async (id: string, updates: any) => { const err = await current.update(id, updates); if (err) { alert("更新失败: " + err); return; } setEditingId(null); };

  return (
    <div>
      <div className="flex gap-1 mb-6 border-b border-line">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setActiveTab(t.key as Tab); setEditingId(null); setShowAdd(false); }}
            className={`px-4 py-2 text-xs tracking-label uppercase transition-colors ${
              activeTab === t.key ? "text-charcoal border-b-2 border-charcoal -mb-[1px]" : "text-smoke/40 hover:text-smoke"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-smoke">{current.items.length} 项</p>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }}
          className="btn-primary text-[10px] gap-1 py-1.5 px-3"><Plus size={12} /> 添加</button>
      </div>
      {showAdd && (
        <EditForm
          tab={activeTab}
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}
      <div className="space-y-1">
        {current.items.map((item: any) => (
          editingId === item.id ? (
            <EditForm
              key={item.id}
              tab={activeTab}
              initial={item}
              onSave={(updated) => handleUpdate(item.id, updated)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={item.id} className="flex items-center gap-4 p-3 border border-line/50 hover:border-line transition-colors">
              {(activeTab === "leathers" || activeTab === "silhouettes" || activeTab === "artisans") && item.image && (
                <div className="w-10 h-10 bg-ivory/50 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              {activeTab === "colors" && (
                <div className="w-6 h-6 rounded-full border border-line flex-shrink-0" style={{ backgroundColor: item.hex }} />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                {activeTab === "hardware" && <p className="text-[10px] text-smoke">+${item.price} · {item.material}</p>}
                {activeTab === "silhouettes" && <p className="text-[10px] text-smoke">${item.basePrice?.toLocaleString()} · {item.dimensions}</p>}
                {activeTab === "artisans" && <p className="text-[10px] text-smoke">{item.role} · {item.years}年</p>}
              </div>
              <button onClick={() => setEditingId(item.id)} className="p-1.5 text-smoke/30 hover:text-charcoal"><Edit3 size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-smoke/30 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function EditForm({ tab, initial, onSave, onCancel }: { tab: Tab; initial?: any; onSave: (item: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState<any>(initial || { id: `${tab}-${Date.now()}`, name: "" });

  const update = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));

  const handleSave = () => onSave(form);

  return (
    <div className="p-5 border-2 border-charcoal mb-3">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">名称</label><input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        {tab === "leathers" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">Hermès 对应</label><input value={form.hermesEquivalent || ""} onChange={(e) => update("hermesEquivalent", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">加价 (数字或文字)</label><input value={form.price || ""} onChange={(e) => update("price", e.target.value)} placeholder="如: 200 或 咨询客服" className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">纹理</label><select value={form.grain || ""} onChange={(e) => update("grain", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal bg-paper"><option value="">选择...</option><option value="smooth">Smooth</option><option value="pebbled">Pebbled</option><option value="textured">Textured</option><option value="matte">Matte</option></select></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">特性</label><input value={form.characteristics || ""} onChange={(e) => update("characteristics", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">最适合</label><input value={form.bestFor || ""} onChange={(e) => update("bestFor", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">图片</label><ImageUploader value={form.image || ""} onChange={(url) => update("image", url)} /></div>
        </>)}
        {tab === "colors" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">色值</label><div className="flex gap-2"><input type="color" value={form.hex || "#000"} onChange={(e) => update("hex", e.target.value)} className="w-8 h-8 border-0 cursor-pointer" /><input value={form.hex || ""} onChange={(e) => update("hex", e.target.value)} className="flex-1 border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal" /></div></div>
        </>)}
        {tab === "hardware" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">名称</label><input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">加价 (+$)</label><input type="text" value={form.price || ""} onChange={(e) => update("price", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">材质</label><input value={form.material || ""} onChange={(e) => update("material", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">色值</label><input value={form.hex || ""} onChange={(e) => update("hex", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">描述</label><input value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
        </>)}
        {tab === "silhouettes" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">基础价格</label><input type="number" value={form.basePrice || 0} onChange={(e) => update("basePrice", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">尺寸</label><input value={form.dimensions || ""} onChange={(e) => update("dimensions", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">描述</label><input value={form.desc || ""} onChange={(e) => update("desc", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">款型图片</label><ImageUploader value={form.image || ""} onChange={(url) => update("image", url)} /></div>
        </>)}
        {tab === "artisans" && (<>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">职位</label><input value={form.role || ""} onChange={(e) => update("role", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">工龄</label><input type="number" value={form.years || 0} onChange={(e) => update("years", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">名言</label><input value={form.quote || ""} onChange={(e) => update("quote", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
          <div className="col-span-2"><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">工匠头像</label><ImageUploader value={form.image || ""} onChange={(url) => update("image", url)} /></div>
        </>)}
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="btn-primary text-[10px] py-1.5 px-4">发布</button>
        <button onClick={onCancel} className="btn-outline text-[10px] py-1.5 px-4"><X size={12} className="mr-1" /> 取消</button>
      </div>
    </div>
  );
}
