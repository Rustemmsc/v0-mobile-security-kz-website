-- Очистка базы данных от тестовых товаров и категорий
-- Выполните этот скрипт для удаления всех импортированных товаров

-- Удаляем все товары
DELETE FROM products;

-- Удаляем все категории кроме базовых (если они были)
DELETE FROM product_categories WHERE id NOT IN (
  SELECT id FROM product_categories WHERE created_at < NOW() - INTERVAL '1 day' LIMIT 5
);

-- Или удаляем все категории полностью
-- DELETE FROM product_categories;

-- Сброс последовательностей ID
ALTER SEQUENCE IF EXISTS products_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS product_categories_id_seq RESTART WITH 1;

-- Проверка результата
SELECT 
  'База данных очищена' as status,
  (SELECT COUNT(*) FROM products) as products_count,
  (SELECT COUNT(*) FROM product_categories) as categories_count;
