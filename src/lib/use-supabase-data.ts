"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

const ADMIN_PASSWORD = "mybirkin2026";

function snakeToCamel(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  const out: any = {};
  for (const [key, val] of Object.entries(obj)) {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = val;
  }
  return out;
}

function toSnakeCase(obj: any): any {
  const row: any = {};
  for (const [key, val] of Object.entries(obj)) {
    const snake = key.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
    row[snake] = val;
  }
  return row;
}

// ── List hook (products, builder data) ──
export function useAdminSupabaseList<T extends { id: string }>(table: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        if (table === "products") {
          setItems(data.map((row: any) => ({ ...row, inStock: row.in_stock, newArrival: row.new_arrival })) as T[]);
        } else {
          setItems(data.map(snakeToCamel) as T[]);
        }
      }
      setLoaded(true);
    });
  }, [table]);

  const saveAll = useCallback(async (newItems: T[]): Promise<string | null> => {
    setItems(newItems);
    try {
      await supabase.from(table).delete().not("id", "is", null);
      if (newItems.length > 0) {
        const rows = newItems.map((item) => {
          if (table === "products") {
            return { ...item, in_stock: (item as any).inStock, new_arrival: (item as any).newArrival };
          }
          return toSnakeCase(item);
        });
        const { error } = await supabase.from(table).insert(rows);
        if (error) return error.message;
      }
      return null;
    } catch (e: any) { return e.message || "保存失败"; }
  }, [table]);

  const add = useCallback(async (item: T): Promise<string | null> => {
    const next = [...items, item];
    setItems(next);
    try {
      const row = table === "products" ? { ...item, in_stock: (item as any).inStock, new_arrival: (item as any).newArrival } : toSnakeCase(item);
      const { error } = await supabase.from(table).insert(row);
      if (error) return error.message;
      return null;
    } catch (e: any) { return e.message || "添加失败"; }
  }, [items, table]);

  const remove = useCallback(async (id: string): Promise<string | null> => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) return error.message;
      return null;
    } catch (e: any) { return e.message || "删除失败"; }
  }, [table]);

  const update = useCallback(async (id: string, updates: Partial<T>): Promise<string | null> => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, ...updates } : i));
    try {
      const existing = items.find((i) => i.id === id);
      const merged = { ...existing, ...updates };
      const row = table === "products" ? { ...merged, in_stock: (merged as any).inStock, new_arrival: (merged as any).newArrival } : toSnakeCase(merged);
      const { error } = await supabase.from(table).update(row).eq("id", id);
      if (error) return error.message;
      return null;
    } catch (e: any) { return e.message || "更新失败"; }
  }, [items, table]);

  return { items, loaded, saveAll, add, remove, update };
}

// ── Single hook (hero, craft pages) ──
export function useAdminSupabaseSingle<T extends Record<string, any>>(table: string, id: string | boolean, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof id === "boolean") {
      supabase.from(table).select("*").limit(1).maybeSingle().then(({ data, error }) => {
        if (!error && data) setValue(data as T);
        setLoaded(true);
      });
    } else {
      supabase.from(table).select("*").eq("page", id).maybeSingle().then(({ data, error }) => {
        if (!error && data) setValue(data as T);
        setLoaded(true);
      });
    }
  }, [table, id]);

  const save = useCallback(async (v: T): Promise<string | null> => {
    setValue(v);
    try {
      const row = toSnakeCase(v);
      if (table === "homepage_hero") row.id = true;
      const { error } = await supabase.from(table).upsert(row);
      if (error) return error.message;
      return null;
    } catch (e: any) { return e.message || "发布失败"; }
  }, [table]);

  return { value, loaded, save };
}

// ── Sections hook (homepage_sections) ──
export function useAdminSections(table: string, defaults: any[]) {
  const [items, setItems] = useState<any[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").order("sort_order", { ascending: true }).then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data);
      setLoaded(true);
    });
  }, [table]);

  const save = useCallback(async (newItems: any[]): Promise<{ error: string | null; count: number }> => {
    setItems(newItems);
    try {
      const { error: delErr } = await supabase.from(table).delete().not("id", "is", null);
      if (delErr) return { error: "删除旧数据失败: " + delErr.message, count: 0 };
      if (newItems.length > 0) {
        const rows = newItems.map((item: any, i: number) => ({
          title: item.title || "", description: item.description || "",
          image: item.image || "", link: item.link || "", sort_order: i,
        }));
        const { error: insErr } = await supabase.from(table).insert(rows);
        if (insErr) return { error: "写入失败: " + insErr.message, count: 0 };
      }
      const { data: verify } = await supabase.from(table).select("*");
      return { error: null, count: verify?.length || 0 };
    } catch (e: any) { return { error: e.message || "未知错误", count: 0 }; }
  }, [table]);

  const moveUp = useCallback((index: number) => {
    if (index <= 0) return;
    setItems((prev) => { const n = [...prev]; [n[index-1], n[index]] = [n[index], n[index-1]]; return n; });
  }, []);
  const moveDown = useCallback((index: number) => {
    setItems((prev) => {
      if (index >= prev.length - 1) return prev;
      const n = [...prev]; [n[index], n[index+1]] = [n[index+1], n[index]]; return n;
    });
  }, []);
  const addSection = useCallback(() => {
    setItems((prev) => [...prev, { title: "", description: "", image: "", link: "", sort_order: prev.length }]);
  }, []);
  const removeSection = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const updateSection = useCallback((index: number, field: string, value: string) => {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }, []);

  return { items, loaded, save, moveUp, moveDown, addSection, removeSection, updateSection };
}

// ── Contact hook ──
export function useAdminContact(defaultLinks: any[]) {
  const [links, setLinks] = useState<any[]>(defaultLinks);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from("contact_links").select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) setLinks(data);
      setLoaded(true);
    });
  }, []);

  const save = useCallback(async (newLinks: any[]): Promise<string | null> => {
    setLinks(newLinks);
    try {
      await supabase.from("contact_links").delete().not("id", "is", null);
      if (newLinks.length > 0) {
        const { error } = await supabase.from("contact_links").insert(newLinks);
        if (error) return error.message;
      }
      return null;
    } catch (e: any) { return e.message || "保存失败"; }
  }, []);

  return { links, loaded, save };
}
