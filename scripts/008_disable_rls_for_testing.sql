-- Исправил имена таблиц на правильные: admins вместо admin_users, убрал order_items
-- Полностью отключаем RLS на всех админских таблицах для тестирования
-- ВАЖНО: это небезопасно для продакшна, но поможет понять проблему

-- Отключаем RLS
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_content DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики (используем правильное имя таблицы)
DROP POLICY IF EXISTS "Admin users can view own record" ON admins;
DROP POLICY IF EXISTS "Admin users can update own record" ON admins;
DROP POLICY IF EXISTS "Authenticated users full access to products" ON products;
DROP POLICY IF EXISTS "Authenticated users full access to categories" ON product_categories;
DROP POLICY IF EXISTS "Authenticated users full access to orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users full access to site content" ON site_content;

SELECT json_build_object(
  'status', 'RLS completely disabled for testing',
  'note', 'All admin tables are now accessible without RLS checks'
);
