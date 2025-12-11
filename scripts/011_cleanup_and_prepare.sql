-- Очистка всех таблиц и подготовка к первому запуску
-- Удаляем все RLS политики которые могут конфликтовать

DO $$ 
DECLARE
    pol record;
BEGIN
    -- Удаляем ВСЕ RLS политики с admin_users
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'admin_users' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.admin_users', pol.policyname);
    END LOOP;
END $$;

-- Временно отключаем RLS на admin_users
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- Очищаем таблицу admin_users
TRUNCATE TABLE public.admin_users CASCADE;

-- Удаляем всех пользователей из auth.users (кроме системных)
DELETE FROM auth.users WHERE email LIKE '%@yandex.ru%' OR email LIKE '%@gmail.com%';

-- Создаем ОДНУ простую политику для admin_users
CREATE POLICY "Allow all for authenticated users"
ON public.admin_users
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Включаем RLS обратно
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Проверяем результат
SELECT 
    'Cleanup completed' as status,
    (SELECT COUNT(*) FROM auth.users) as auth_users_count,
    (SELECT COUNT(*) FROM public.admin_users) as admin_users_count,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'admin_users') as policies_count;
