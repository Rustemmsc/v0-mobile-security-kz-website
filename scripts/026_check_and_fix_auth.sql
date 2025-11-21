-- Проверка и исправление проблем с аутентификацией пользователя Олжас

-- 1. Проверяем пользователя в auth.users
SELECT 
    id, 
    email, 
    email_confirmed_at,
    created_at,
    CASE 
        WHEN email_confirmed_at IS NULL THEN 'НЕ ПОДТВЕРЖДЕН ❌'
        ELSE 'Подтвержден ✓'
    END as status
FROM auth.users 
WHERE email = 'info@mobilesecurity.kz';

-- 2. Проверяем запись в admin_users
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM admin_users 
WHERE email = 'info@mobilesecurity.kz';

-- 3. ИСПРАВЛЕНИЕ: Подтверждаем email если он не подтвержден
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'info@mobilesecurity.kz' 
  AND email_confirmed_at IS NULL;

-- 4. Проверяем результат после исправления
SELECT 
    email,
    email_confirmed_at,
    'Email подтвержден, можно входить ✓' as message
FROM auth.users 
WHERE email = 'info@mobilesecurity.kz';
