"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Save, X, Newspaper, FileText, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BlogPost, BlogBlock, BlogBlockType } from "@/lib/types";
import ImageUploader from "@/components/ImageUploader";

const CATEGORIES = ["Leather Guide", "Atelier", "Style"];

const BLOCK_LABELS: Record<BlogBlockType, string> = {
  h2: "小标题 H2",
  h3: "小标题 H3",
  paragraph: "段落",
  list: "列表（每行一项）",
  quote: "引用",
  image: "图片",
};

const emptyBlock = (type: BlogBlockType): BlogBlock => ({ type, text: "" });

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

function BlogEditor({ post, onSave, onCancel }: { post: BlogPost; onSave: (p: BlogPost) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState<BlogPost>(post);

  const set = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => setForm((f) => ({ ...f, [key]: value }));

  const updateBlock = (i: number, patch: Partial<BlogBlock>) =>
    setForm((f) => ({ ...f, blocks: f.blocks.map((b, idx) => (idx === i ? { ...b, ...patch } : b)) }));

  const moveBlock = (i: number, dir: -1 | 1) =>
    setForm((f) => {
      const blocks = [...f.blocks];
      const j = i + dir;
      if (j < 0 || j >= blocks.length) return f;
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { ...f, blocks };
    });

  const removeBlock = (i: number) => setForm((f) => ({ ...f, blocks: f.blocks.filter((_, idx) => idx !== i) }));
  const addBlock = (type: BlogBlockType) => setForm((f) => ({ ...f, blocks: [...f.blocks, emptyBlock(type)] }));

  return (
    <div className="border border-line p-6 mb-8 bg-paper">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg">{post.title ? "编辑文章" : "新建文章"}</h3>
        <button onClick={onCancel} className="flex items-center gap-1 text-xs text-smoke hover:text-charcoal"><X size={13} /> 取消</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">标题 *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="文章标题（英文，客户可见）"
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
        </div>
        <div>
          <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">Slug（URL 后缀）*</label>
          <div className="flex gap-2">
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="togo-vs-swift-vs-epsom"
              className="flex-1 border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
            <button onClick={() => set("slug", slugify(form.title))} className="border border-line px-3 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal whitespace-nowrap">
              从标题生成
            </button>
          </div>
        </div>
        <div>
          <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">分类</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal bg-paper">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">状态</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value as BlogPost["status"])}
            className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal bg-paper">
            <option value="draft">草稿（前台不可见）</option>
            <option value="published">已发布（前台可见）</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">Meta 描述（SEO，客户搜索时显示）</label>
        <textarea value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} rows={2} maxLength={160}
          placeholder="Search engines show this snippet. Keep under 160 characters."
          className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
        <p className="text-[10px] text-smoke/40 mt-1">{form.meta_description.length}/160</p>
      </div>

      <div className="mb-6">
        <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-1">封面图（列表页显示）</label>
        <ImageUploader value={form.cover_image} onChange={(url) => set("cover_image", url)} />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[9px] tracking-label uppercase text-smoke/40">正文内容（自上而下排版）</label>
          <div className="flex gap-2">
            <button onClick={() => addBlock("paragraph")} className="border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal">＋ 段落</button>
            <button onClick={() => addBlock("h2")} className="border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal">＋ 小标题</button>
            <button onClick={() => addBlock("list")} className="border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal">＋ 列表</button>
            <button onClick={() => addBlock("quote")} className="border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal">＋ 引用</button>
            <button onClick={() => addBlock("image")} className="border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal">＋ 图片</button>
          </div>
        </div>
        {form.blocks.length === 0 && (
          <p className="text-xs text-smoke/40 border border-dashed border-line px-4 py-6 text-center">暂无内容，点击上方按钮添加</p>
        )}
        <div className="space-y-2">
          {form.blocks.map((b, i) => (
            <div key={i} className="flex gap-2 items-start border border-line/60 p-3">
              <select value={b.type} onChange={(e) => updateBlock(i, { type: e.target.value as BlogBlockType })}
                className="w-36 border border-line px-2 py-2 text-xs bg-paper focus:outline-none focus:border-charcoal">
                {(Object.keys(BLOCK_LABELS) as BlogBlockType[]).map((t) => (
                  <option key={t} value={t}>{BLOCK_LABELS[t]}</option>
                ))}
              </select>
              {b.type === "image" ? (
                <div className="flex-1">
                  <ImageUploader value={b.image || ""} onChange={(url) => updateBlock(i, { image: url })} />
                  <input value={b.text} onChange={(e) => updateBlock(i, { text: e.target.value })} placeholder="图片说明（可选，前台显示在图下方）"
                    className="mt-2 w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
                </div>
              ) : (
                <textarea value={b.text} onChange={(e) => updateBlock(i, { text: e.target.value })} rows={b.type === "paragraph" || b.type === "list" ? 3 : 2}
                  placeholder={b.type === "list" ? "每行一个条目" : b.type === "quote" ? "引用文字" : "正文内容"}
                  className="flex-1 border border-line px-3 py-2 text-sm focus:outline-none focus:border-charcoal" />
              )}
              <div className="flex flex-col gap-1">
                <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="p-1 text-smoke hover:text-charcoal disabled:opacity-30"><ArrowUp size={13} /></button>
                <button onClick={() => moveBlock(i, 1)} disabled={i === form.blocks.length - 1} className="p-1 text-smoke hover:text-charcoal disabled:opacity-30"><ArrowDown size={13} /></button>
                <button onClick={() => removeBlock(i)} className="p-1 text-smoke hover:text-red-600"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => onSave(form)}
        className="btn-primary text-[10px] gap-1 py-2 px-5"><Save size={12} /> 保存文章</button>
    </div>
  );
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    supabase.from("blog_posts").select("*").order("published_at", { ascending: false, nullsFirst: false }).then(({ data, error }) => {
      if (!error && data) setPosts(data as BlogPost[]);
      setLoaded(true);
    });
  }, []);

  useEffect(() => { load(); }, [load]);

  const emptyPost = (): BlogPost => ({
    id: `blog-${Date.now()}`,
    title: "", slug: "", meta_description: "", category: CATEGORIES[0],
    cover_image: "", status: "draft", blocks: [],
    published_at: new Date().toISOString(),
  });

  const handleSave = async (p: BlogPost) => {
    if (!p.title.trim() || !p.slug.trim()) { alert("标题和 Slug 必填"); return; }
    setBusy(true);
    const row: any = {
      id: p.id,
      title: p.title.trim(),
      slug: p.slug.trim(),
      meta_description: p.meta_description,
      category: p.category,
      cover_image: p.cover_image,
      status: p.status,
      blocks: p.blocks,
      published_at: p.status === "published" ? (p.published_at || new Date().toISOString()) : p.published_at,
    };
    const { error } = await supabase.from("blog_posts").upsert(row);
    setBusy(false);
    if (error) { alert("保存失败: " + error.message); return; }
    setEditing(null); setAdding(false);
    load();
  };

  const handleDelete = async (p: BlogPost) => {
    if (!confirm(`确定删除「${p.title}」？此操作不可恢复。`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", p.id);
    if (error) { alert("删除失败: " + error.message); return; }
    load();
  };

  if (!loaded) return <div className="text-xs text-smoke/40 py-10">加载中...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs text-smoke">{posts.length} 篇文章</p>
        <button onClick={() => { setAdding(true); setEditing(emptyPost()); }}
          className="btn-primary text-[10px] gap-1 py-2 px-4"><Plus size={12} /> 新建文章</button>
      </div>

      {(editing || adding) && (
        <BlogEditor post={editing!} onSave={handleSave} onCancel={() => { setEditing(null); setAdding(false); }} />
      )}

      <div className="space-y-1">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 border border-line/50 hover:border-line transition-colors">
            <div className="w-14 h-14 bg-ivory/50 flex-shrink-0 overflow-hidden">
              {p.cover_image ? <img src={p.cover_image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-smoke/30"><FileText size={18} /></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{p.title || "未命名"}</p>
                {p.status === "published"
                  ? <span className="flex items-center gap-1 text-[9px] tracking-label uppercase bg-charcoal text-paper px-2 py-0.5"><Eye size={9} /> 已发布</span>
                  : <span className="flex items-center gap-1 text-[9px] tracking-label uppercase bg-smoke/10 text-smoke px-2 py-0.5"><EyeOff size={9} /> 草稿</span>}
              </div>
              <p className="text-xs text-smoke/50 truncate mt-0.5">
                {p.category} · /blog/{p.slug} · {p.published_at ? new Date(p.published_at).toLocaleDateString("zh-CN") : "未发布"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(p); setAdding(false); }} disabled={busy}
                className="flex items-center gap-1 border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-charcoal"><Edit3 size={11} /> 编辑</button>
              <button onClick={() => handleDelete(p)} disabled={busy}
                className="flex items-center gap-1 border border-line px-3 py-1.5 text-[10px] tracking-label uppercase text-smoke hover:text-red-600"><Trash2 size={11} /> 删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
