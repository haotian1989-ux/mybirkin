"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { supabase } from "@/lib/supabase";
import {
  CraftPageData, CraftBlock,
  DEFAULT_CRAFT, CRAFT_PAGE_LABELS,
} from "@/lib/craft-data";

type PageKey = "overview" | "leather" | "hardware" | "artisans" | "process";
const pages: PageKey[] = ["overview", "leather", "hardware", "artisans", "process"];

const ADMIN_PASSWORD = "mybirkin2026";

async function saveToSupabase(page: PageKey, data: CraftPageData) {
  await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD },
    body: JSON.stringify({
      table: "craft",
      action: "upsert",
      data: {
        page,
        heroImage: data.heroImage,
        heroTagline: data.heroTagline,
        heroTitle: data.heroTitle,
        introText: data.introText,
        blocks: data.blocks,
      },
    }),
  });
}

export default function CraftEditor() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [data, setData] = useState<CraftPageData>(DEFAULT_CRAFT.overview);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from("craft_pages").select("*").eq("page", activePage).maybeSingle().then(({ data: row, error }) => {
      if (!error && row) {
        setData({
          heroImage: row.hero_image || "",
          heroTagline: row.hero_tagline || "",
          heroTitle: row.hero_title || "",
          introText: row.intro_text || "",
          blocks: row.blocks || [],
        });
      } else {
        setData(DEFAULT_CRAFT[activePage]);
      }
      setLoaded(true);
    });
  }, [activePage]);

  const handleSave = async () => {
    try {
      await saveToSupabase(activePage, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      alert("发布失败: " + (e.message || "请重试"));
    }
  };

  const updateField = (field: keyof CraftPageData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateBlock = (id: string, field: keyof CraftBlock, value: string) => {
    setData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  };

  const addBlock = () => {
    setData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, { id: `b-${Date.now()}`, title: "", description: "", image: "", videoUrl: "" }],
    }));
  };

  const removeBlock = (id: string) => {
    setData((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
  };

  const moveBlock = (id: string, dir: -1 | 1) => {
    setData((prev) => {
      const blocks = [...prev.blocks];
      const idx = blocks.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= blocks.length) return prev;
      [blocks[idx], blocks[target]] = [blocks[target], blocks[idx]];
      return { ...prev, blocks };
    });
  };

  if (!loaded) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  return (
    <div>
      <div className="flex gap-1 mb-6 border-b border-line">
        {pages.map((p) => (
          <button key={p} onClick={() => setActivePage(p)}
            className={`px-4 py-2 text-xs tracking-label uppercase transition-colors ${
              activePage === p ? "text-charcoal border-b-2 border-charcoal -mb-[1px]" : "text-smoke/40 hover:text-smoke"
            }`}>
            {CRAFT_PAGE_LABELS[p] || p}
          </button>
        ))}
      </div>
      <div className="max-w-2xl space-y-5">
        <div>
          <label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">Hero 大图</label>
          <ImageUploader value={data.heroImage} onChange={(url) => updateField("heroImage", url)} />
          {data.heroImage && (
            <div className="mt-2 aspect-[21/9] overflow-hidden bg-ivory/50">
              <img src={data.heroImage} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">标语</label><input value={data.heroTagline} onChange={(e) => updateField("heroTagline", e.target.value)} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" /></div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">标题</label><textarea value={data.heroTitle} onChange={(e) => updateField("heroTitle", e.target.value)} rows={2} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none font-serif text-lg" /></div>
        <div><label className="text-[10px] tracking-label uppercase text-smoke/50 block mb-1">介绍文字</label><textarea value={data.introText} onChange={(e) => updateField("introText", e.target.value)} rows={3} className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal resize-none" /></div>

        <div className="border-t border-line pt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-serif text-base">内容区块</h3>
            <button onClick={addBlock} className="btn-outline text-[10px] gap-1 py-1 px-3"><Plus size={12} /> 添加区块</button>
          </div>
          <div className="space-y-4">
            {data.blocks.map((block) => (
              <div key={block.id} className="p-4 border border-line/50 space-y-3">
                <div className="flex gap-2">
                  <button onClick={() => moveBlock(block.id, -1)} className="p-1 text-smoke/30 hover:text-charcoal" title="上移"><ArrowUp size={14} /></button>
                  <button onClick={() => moveBlock(block.id, 1)} className="p-1 text-smoke/30 hover:text-charcoal" title="下移"><ArrowDown size={14} /></button>
                  <div className="flex-1" />
                  <button onClick={() => removeBlock(block.id)} className="p-1 text-smoke/30 hover:text-red-500" title="删除"><Trash2 size={14} /></button>
                </div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">标题</label><input value={block.title} onChange={(e) => updateBlock(block.id, "title", e.target.value)} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal" /></div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">描述</label><textarea value={block.description} onChange={(e) => updateBlock(block.id, "description", e.target.value)} rows={2} className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal resize-none" /></div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">图片</label><ImageUploader value={block.image} onChange={(url) => updateBlock(block.id, "image", url)} /></div>
                <div><label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">视频 URL</label><input value={block.videoUrl} onChange={(e) => updateBlock(block.id, "videoUrl", e.target.value)} placeholder="YouTube/Vimeo embed URL" className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal font-mono" /></div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className={`btn-primary ${saved ? "bg-green-800 border-0" : ""}`}>
          <Save size={14} className="mr-1" />{saved ? "已发布" : "发布"}
        </button>
      </div>
    </div>
  );
}
