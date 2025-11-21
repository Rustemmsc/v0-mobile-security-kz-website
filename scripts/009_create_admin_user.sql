-- Create admin user in Supabase Auth and admin_users table
-- Email: rustemkz@yandex.ru
-- Password: Admin123!

-- First, temporarily disable RLS to ensure inserts work
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Delete existing admin user if exists
DELETE FROM auth.users WHERE email = 'rustemkz@yandex.ru';
DELETE FROM admin_users WHERE email = 'rustemkz@yandex.ru';

-- Create auth user with specific UUID
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token,
  email_change_token_current,
  email_change_token_new,
  recovery_token
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'rustemkz@yandex.ru',
  crypt('Admin123!', gen_salt('bf')),  -- Password hashed with bcrypt
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  ''
)
RETURNING id;

-- Get the created user ID
DO $$
DECLARE
  user_uuid uuid;
BEGIN
  SELECT id INTO user_uuid FROM auth.users WHERE email = 'rustemkz@yandex.ru';
  
  -- Insert into admin_users table
  INSERT INTO admin_users (id, email, full_name, role, created_at, updated_at)
  VALUES (
    user_uuid,
    'rustemkz@yandex.ru',
    'Рустем',
    'super_admin',
    NOW(),
    NOW()
  );
END $$;

-- Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Verify the admin user was created
SELECT 
  'Admin user created successfully!' as status,
  email,
  role
FROM admin_users 
WHERE email = 'rustemkz@yandex.ru';
