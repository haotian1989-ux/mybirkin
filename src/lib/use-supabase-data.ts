"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

/* ── 公开读取 hooks ── */

export function useSupabaseQuery<T>(table: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setValue(data as T);
      }
      setLoaded(true);
    });
  }, [table]);

  return { value, loaded };
}

export function useSupabaseArray<T>(table: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(data as T[]);
      }
      setLoaded(true);
    });
  }, [table]);

  return { items, loaded };
}

export function useSupabaseSingle<T extends Record<string, any>>(table: string, id: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").eq("id", id).single().then(({ data, error }) => {
      if (!error && data) setValue(data as T);
      setLoaded(true);
    });
  }, [table, id]);

  return { value, loaded };
}

/* ── Admin 写操作 ── */

const ADMIN_PASSWORD = "mybirkin2024";

async function adminFetch(table: string, action: string, data?: any, id?: string) {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": ADMIN_PASSWORD,
    },
    body: JSON.stringify({ table, action, data, id }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "请求失败");
  }
  return res.json();
}

export function useAdminSupabaseList<T extends { id: string }>(table: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from(table).select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data as T[]);
      setLoaded(true);
    });
  }, [table]);

  const saveAll = useCallback(async (newItems: T[]) => {
    setItems(newItems);
    await adminFetch(table, "save_all", newItems);
  }, [table]);

  const add = useCallback(async (item: T) => {
    const next = [...items, item];
    setItems(next);
    await adminFetch(table, "add", item);
  }, [items, table]);

  const remove = useCallback(async (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    await adminFetch(table, "delete", null, id);
  }, [items, table]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const next = items.map((i) => i.id === id ? { ...i, ...updates } : i);
    setItems(next);
    await adminFetch(table, "update", { ...items.find((i) => i.id === id), ...updates }, id);
  }, [items, table]);

  return { items, loaded, saveAll, add, remove, update };
}

export function useAdminSupabaseSingle<T extends Record<string, any>>(table: string, id: string | boolean, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const col = typeof id === "boolean" ? "id" : "page";
    const val = typeof id === "boolean" ? "true" : id;
    if (typeof id === "boolean") {
      supabase.from(table).select("*").limit(1).maybeSingle().then(({ data, error }) => {
        if (!error && data) setValue(data as T);
        setLoaded(true);
      });
    } else {
      supabase.from(table).select("*").eq(col, val).maybeSingle().then(({ data, error }) => {
        if (!error && data) setValue(data as T);
        setLoaded(true);
      });
    }
  }, [table, id]);

  const save = useCallback(async (v: T) => {
    setValue(v);
    await adminFetch(table, "upsert", v);
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

  const save = useCallback(async (newItems: any[]) => {
    setItems(newItems);
    await adminFetch(table, "save_homepage_sections", newItems);
  }, [table]);

  return { items, loaded, save };
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

  const save = useCallback(async (newLinks: any[]) => {
    setLinks(newLinks);
    await adminFetch("contact", "save_contact", newLinks);
  }, []);

  return { links, loaded, save };
}
