-- Проверка текущего состояния базы данных

-- 1. Проверяем пользователей в auth.users
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  encrypted_password IS NOT NULL as has_password
FROM auth.users
ORDER BY created_at DESC;

-- 2. Проверяем записи в admin_users
SELECT 
  id,
  user_id,
  email,
  role,
  created_at
FROM admin_users
ORDER BY created_at DESC;

-- 3. Проверяем RLS статус на таблицах
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('admin_users', 'products', 'product_categories', 'orders', 'site_content')
ORDER BY tablename;

-- 4. Проверяем политики на admin_users
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'admin_users';

-- Результат
SELECT jsonb_build_object(
  'status', 'Database state checked',
  'message', 'Review the results above'
) as result;
