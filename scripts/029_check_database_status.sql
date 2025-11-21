-- Проверка текущего состояния базы данных

-- 1. Проверяем все категории
SELECT 
  'Категории в базе:' as info,
  id,
  name_ru,
  name_en,
  name_kk,
  is_active,
  display_order
FROM product_categories
ORDER BY display_order;

-- 2. Считаем категории
SELECT 
  'Всего категорий:' as metric,
  COUNT(*) as count
FROM product_categories;

-- 3. Проверяем все товары
SELECT 
  'Товары в базе:' as info,
  p.id,
  p.name_ru,
  p.price,
  p.is_active,
  p.is_in_stock,
  pc.name_ru as category
FROM products p
LEFT JOIN product_categories pc ON p.category_id = pc.id
ORDER BY pc.name_ru, p.name_ru;

-- 4. Считаем товары
SELECT 
  'Всего товаров:' as metric,
  COUNT(*) as count
FROM products;

-- 5. Товары по категориям
SELECT 
  'Распределение по категориям:' as info,
  pc.name_ru as category,
  COUNT(p.id) as product_count
FROM product_categories pc
LEFT JOIN products p ON p.category_id = pc.id
GROUP BY pc.id, pc.name_ru
ORDER BY pc.display_order;
