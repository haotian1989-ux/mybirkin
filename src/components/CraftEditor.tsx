"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";
import {
  CraftPageData, CraftBlock,
  CRAFT_KEYS, DEFAULT_CRAFT, CRAFT_PAGE_LABELS,
} from "@/lib/craft-data";

type PageKey = keyof typeof CRAFT_KEYS;
const pages = Object.keys(CRAFT_KEYS) as PageKey[];

function loadPage(key: PageKey): CraftPageData {
  try {
    const raw = localStorage.getItem(CRAFT_KEYS[key]);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_CRAFT[key];
}

function savePage(key: PageKey, data: CraftPageData) {
  localStorage.setItem(CRAFT_KEYS[key], JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

export default function CraftEditor() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [data, setData] = useState<CraftPageData>(DEFAULT_CRAFT.overview);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadPage(activePage));
    setSaved(false);
  }, [activePage]);

  const handleSave = () => {
    savePage(activePage, data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
    const newBlock: CraftBlock = {
      id: `block-${Date.now()}`,
      title: "New Item",
      description: "",
      image: "",
      videoUrl: "",
    };
    setData((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const removeBlock = (id: string) => {
    setData((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setData((prev) => {
      const idx = prev.blocks.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.blocks.length) return prev;
      const blocks = [...prev.blocks];
      [blocks[idx], blocks[newIdx]] = [blocks[newIdx], blocks[idx]];
      return { ...prev, blocks };
    });
  };

  return (
    <div>
      <div className="flex gap-1 mb-8 border-b border-line overflow-x-auto">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setActivePage(p)}
            className={`px-5 py-3 text-[10px] tracking-label uppercase whitespace-nowrap transition-colors ${
              activePage === p
                ? "text-charcoal border-b-2 border-charcoal -mb-[1px]"
                : "text-smoke/40 hover:text-smoke"
            }`}
          >
            {CRAFT_PAGE_LABELS[p]}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={handleSave} className={`px-4 py-3 text-[10px] tracking-label uppercase ${saved ? "text-green-600" : "text-smoke/50 hover:text-charcoal"}`}>
          <Save size={12} className="inline mr-1" />{saved ? "已保存" : "保存"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="mb-10 p-5 border border-line bg-ivory/20">
        <h3 className="text-[11px] tracking-label uppercase text-smoke/60 mb-4">Hero 区域</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">背景图片链接</label>
            <input
              value={data.heroImage}
              onChange={(e) => updateField("heroImage", e.target.value)}
              className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">标语</label>
            <input
              value={data.heroTagline}
              onChange={(e) => updateField("heroTagline", e.target.value)}
              className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">标题</label>
            <input
              value={data.heroTitle}
              onChange={(e) => updateField("heroTitle", e.target.value)}
              className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">介绍文字</label>
          <textarea
            value={data.introText}
            onChange={(e) => updateField("introText", e.target.value)}
            rows={3}
            className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal resize-none"
          />
        </div>
      </div>

      {/* Content Blocks */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] tracking-label uppercase text-smoke/60">内容区块 ({data.blocks.length})</h3>
        <button onClick={addBlock} className="flex items-center gap-1 text-[10px] tracking-label uppercase text-smoke/50 hover:text-charcoal">
          <Plus size={12} /> 添加区块
        </button>
      </div>

      <div className="space-y-4">
        {data.blocks.map((block, idx) => (
          <div key={block.id} className="p-4 border border-line/50 hover:border-line transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-smoke/40 font-mono">#{idx + 1}</span>
              <button onClick={() => moveBlock(block.id, "up")} disabled={idx === 0} className="p-0.5 text-smoke/30 hover:text-charcoal disabled:opacity-20">
                <ArrowUp size={12} />
              </button>
              <button onClick={() => moveBlock(block.id, "down")} disabled={idx === data.blocks.length - 1} className="p-0.5 text-smoke/30 hover:text-charcoal disabled:opacity-20">
                <ArrowDown size={12} />
              </button>
              <div className="flex-1" />
              <button onClick={() => removeBlock(block.id)} className="p-0.5 text-smoke/30 hover:text-red-500">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">标题</label>
                <input
                  value={block.title}
                  onChange={(e) => updateBlock(block.id, "title", e.target.value)}
                  className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">图片链接</label>
                <input
                  value={block.image}
                  onChange={(e) => updateBlock(block.id, "image", e.target.value)}
                  className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">描述</label>
                <textarea
                  value={block.description}
                  onChange={(e) => updateBlock(block.id, "description", e.target.value)}
                  rows={3}
                  className="w-full border border-line px-3 py-1.5 text-xs focus:outline-none focus:border-charcoal resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">视频链接 (YouTube/Vimeo)</label>
                <input
                  value={block.videoUrl}
                  onChange={(e) => updateBlock(block.id, "videoUrl", e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full border border-line px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
