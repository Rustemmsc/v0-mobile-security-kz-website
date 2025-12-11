-- Этот скрипт создаст первого администратора
-- ВАЖНО: Замените email и пароль на свои!

-- Шаг 1: Сначала зарегистрируйтесь на сайте через обычную регистрацию
-- или создайте пользователя через Supabase Dashboard: Authentication -> Users -> Add User

-- Шаг 2: После создания пользователя, найдите его ID в таблице auth.users
-- и вставьте сюда:

-- Добавить администратора (замените 'YOUR_USER_ID' на реальный UUID пользователя)
INSERT INTO public.admins (user_id, email, role, is_active)
VALUES (
  'YOUR_USER_ID', -- ID пользователя из auth.users
  'admin@mobilesecurity.kz', -- Email администратора
  'super_admin', -- Роль: 'super_admin' или 'admin'
  true
);

-- Пример с конкретным UUID (после регистрации пользователя):
-- INSERT INTO public.admins (user_id, email, role, is_active)
-- VALUES (
--   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
--   'admin@mobilesecurity.kz',
--   'super_admin',
--   true
-- );
