-- MYBIRKIN Supabase Database Schema
-- 在 Supabase SQL Editor 中执行此脚本

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('handbags', 'charms', 'pet')),
  price INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '[]',
  materials TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  colors JSONB NOT NULL DEFAULT '[]',
  images JSONB NOT NULL DEFAULT '[]',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  new_arrival BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Builder: 皮料
CREATE TABLE IF NOT EXISTS builder_leathers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hermes_equivalent TEXT NOT NULL DEFAULT '',
  grain TEXT NOT NULL DEFAULT '',
  characteristics TEXT NOT NULL DEFAULT '',
  best_for TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Builder: 颜色
CREATE TABLE IF NOT EXISTS builder_colors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hex TEXT NOT NULL DEFAULT '#000000',
  swatch_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Builder: 五金
CREATE TABLE IF NOT EXISTS builder_hardware (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  material TEXT NOT NULL DEFAULT '',
  hex TEXT NOT NULL DEFAULT '#000000',
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Builder: 款型
CREATE TABLE IF NOT EXISTS builder_silhouettes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  base_price INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Builder: 工匠
CREATE TABLE IF NOT EXISTS builder_artisans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  years INTEGER NOT NULL DEFAULT 0,
  quote TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 工艺页面
CREATE TABLE IF NOT EXISTS craft_pages (
  page TEXT PRIMARY KEY CHECK (page IN ('overview', 'leather', 'hardware', 'artisans', 'process')),
  hero_image TEXT NOT NULL DEFAULT '',
  hero_tagline TEXT NOT NULL DEFAULT '',
  hero_title TEXT NOT NULL DEFAULT '',
  intro_text TEXT NOT NULL DEFAULT '',
  blocks JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 首页 Hero
CREATE TABLE IF NOT EXISTS homepage_hero (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id = true),
  image TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  headline TEXT NOT NULL DEFAULT '',
  subtext TEXT NOT NULL DEFAULT '',
  primary_btn_label TEXT NOT NULL DEFAULT '',
  secondary_btn_label TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO homepage_hero (id) VALUES (true) ON CONFLICT DO NOTHING;

-- 首页区块
CREATE TABLE IF NOT EXISTS homepage_sections (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 联系方式
CREATE TABLE IF NOT EXISTS contact_links (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('whatsapp', 'telegram')),
  label TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 评论
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 公开读取权限
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_leathers ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_hardware ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_silhouettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE craft_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 所有人可读
CREATE POLICY "public_read" ON products FOR SELECT USING (true);
CREATE POLICY "public_read" ON builder_leathers FOR SELECT USING (true);
CREATE POLICY "public_read" ON builder_colors FOR SELECT USING (true);
CREATE POLICY "public_read" ON builder_hardware FOR SELECT USING (true);
CREATE POLICY "public_read" ON builder_silhouettes FOR SELECT USING (true);
CREATE POLICY "public_read" ON builder_artisans FOR SELECT USING (true);
CREATE POLICY "public_read" ON craft_pages FOR SELECT USING (true);
CREATE POLICY "public_read" ON homepage_hero FOR SELECT USING (true);
CREATE POLICY "public_read" ON homepage_sections FOR SELECT USING (true);
CREATE POLICY "public_read" ON contact_links FOR SELECT USING (true);
CREATE POLICY "public_read" ON reviews FOR SELECT USING (true);

-- Our Story / About 页面
CREATE TABLE IF NOT EXISTS about_page (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id = true),
  hero_image TEXT NOT NULL DEFAULT '',
  hero_tagline TEXT NOT NULL DEFAULT '',
  hero_title TEXT NOT NULL DEFAULT '',
  section1_label TEXT NOT NULL DEFAULT '',
  section1_heading TEXT NOT NULL DEFAULT '',
  section1_text TEXT NOT NULL DEFAULT '',
  section1_image TEXT NOT NULL DEFAULT '',
  section2_label TEXT NOT NULL DEFAULT '',
  section2_heading TEXT NOT NULL DEFAULT '',
  section2_text TEXT NOT NULL DEFAULT '',
  section2_image TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  cta_link TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON about_page FOR SELECT USING (true);
CREATE POLICY "public_insert" ON about_page FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update" ON about_page FOR UPDATE USING (true) WITH CHECK (true);
