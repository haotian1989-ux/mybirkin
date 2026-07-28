"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

const ADMIN_PASSWORD = "mybirkin2024";

async function adminFetch(table: string, action: string, data?: any, id?: string): Promise<{ success: boolean; error?: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  
  try {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": ADMIN_PASSWORD,
      },
      body: JSON.stringify({ table, action, data, id }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || `HTTP ${res.status}` };
    }
    return json;
  } catch (e: any) {
    clearTimeout(timeout);
    if (e.name === "AbortError") {
      return { success: false, error: "请求超时，请检查网络" };
    }
    return { success: false, error: e.message || "网络错误" };
  }
}

export function useAdminSupabaseList<T extends { id: string }>(table: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        if (table === "products") {
          setItems(data.map((row: any) => ({ ...row, inStock: row.in_stock, newArrival: row.new_arrival })) as T[]);
        } else {
          setItems(data as T[]);
        }
      }
      setLoaded(true);
    });
  }, [table]);

  const saveAll = useCallback(async (newItems: T[]): Promise<string | null> => {
    setItems(newItems);
    const res = await adminFetch(table, "save_all", newItems);
    return res.success ? null : (res.error || "保存失败");
  }, [table]);

  const add = useCallback(async (item: T): Promise<string | null> => {
    const next = [...items, item];
    setItems(next);
    const res = await adminFetch(table, "add", item);
    return res.success ? null : (res.error || "添加失败");
  }, [items, table]);

  const remove = useCallback(async (id: string): Promise<string | null> => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    const res = await adminFetch(table, "delete", null, id);
    return res.success ? null : (res.error || "删除失败");
  }, [items, table]);

  const update = useCallback(async (id: string, updates: Partial<T>): Promise<string | null> => {
    const next = items.map((i) => i.id === id ? { ...i, ...updates } : i);
    setItems(next);
    const res = await adminFetch(table, "update", { ...items.find((i) => i.id === id), ...updates }, id);
    return res.success ? null : (res.error || "更新失败");
  }, [items, table]);

  return { items, loaded, saveAll, add, remove, update };
}

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
    const res = await adminFetch(table, "upsert", v);
    return res.success ? null : (res.error || "发布失败");
  }, [table]);

  return { value, loaded, save };
}

export function useAdminSections(table: string, defaults: any[]) {
  const [items, setItems] = useState<any[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").order("sort_order", { ascending: true }).then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data);
      setLoaded(true);
    });
  }, [table]);

  const save = useCallback(async (newItems: any[]): Promise<string | null> => {
    setItems(newItems);
    const res = await adminFetch(table, "save_homepage_sections", newItems);
    return res.success ? null : (res.error || "保存失败");
  }, [table]);

  const moveUp = useCallback((index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setItems((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
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
    const res = await adminFetch("contact", "save_contact", newLinks);
    return res.success ? null : (res.error || "保存失败");
  }, []);

  return { links, loaded, save };
}
