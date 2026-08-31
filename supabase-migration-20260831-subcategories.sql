-- MYBIRKIN 子分类功能迁移脚本
-- 在 Supabase SQL Editor 中执行（一次性）

-- 1) 产品表增加子分类字段
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory TEXT NOT NULL DEFAULT '';

-- 2) 子分类表
CREATE TABLE IF NOT EXISTS product_subcategories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('handbags', 'charms', 'pet')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3) RLS：公开可读，写入策略与现有 products 后台写入方式保持一致
ALTER TABLE product_subcategories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_subcategories" ON product_subcategories;
CREATE POLICY "public_read_subcategories" ON product_subcategories FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_insert_subcategories" ON product_subcategories;
CREATE POLICY "public_insert_subcategories" ON product_subcategories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_subcategories" ON product_subcategories;
CREATE POLICY "public_update_subcategories" ON product_subcategories FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_subcategories" ON product_subcategories;
CREATE POLICY "public_delete_subcategories" ON product_subcategories FOR DELETE USING (true);

-- 4) 初始子分类（手袋下预置 Birkin / Kelly / Constance / Lindy）
INSERT INTO product_subcategories (id, name, category, sort_order) VALUES
  ('birkin', 'Birkin', 'handbags', 0),
  ('kelly', 'Kelly', 'handbags', 1),
  ('constance', 'Constance', 'handbags', 2),
  ('lindy', 'Lindy', 'handbags', 3)
ON CONFLICT (id) DO NOTHING;
