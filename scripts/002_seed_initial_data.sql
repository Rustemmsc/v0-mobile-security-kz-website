-- Insert your first admin user (replace with your actual email after signing up)
-- First, you need to sign up via the admin auth page, then run this script with your user ID

-- Example: After signing up, get your user ID and run:
-- insert into public.admin_users (id, email, full_name, role)
-- values ('your-user-id-from-auth-users', 'your-email@example.com', 'Admin Name', 'super_admin');

-- For now, we'll create a placeholder that you can update later
-- IMPORTANT: Update this with real data after first admin signup

-- Seed product categories based on current shop data
insert into public.product_categories (name_ru, name_kk, name_en, description_ru, description_kk, description_en, icon, display_order, is_active)
values
  ('Видеонаблюдение', 'Бейнебақылау', 'Video Surveillance', 'IP-камеры, видеорегистраторы и системы наблюдения', 'IP-камералар, бейне жазу құрылғылары және бақылау жүйелері', 'IP cameras, video recorders and surveillance systems', 'video', 1, true),
  ('Контроль доступа', 'Кіруді бақылау', 'Access Control', 'СКУД, турникеты и системы идентификации', 'СКУД, турникеттер және сәйкестендіру жүйелері', 'Access control systems, turnstiles and identification', 'fingerprint', 2, true),
  ('Охранная сигнализация', 'Қорғаныс сигнализациясы', 'Security Alarms', 'Датчики движения, охранные панели', 'Қозғалыс сенсорлары, қорғау панельдері', 'Motion sensors, alarm panels', 'shield-alert', 3, true),
  ('Умный дом', 'Ақылды үй', 'Smart Home', 'Системы автоматизации и управления', 'Автоматтандыру және басқару жүйелері', 'Home automation and control systems', 'home', 4, true),
  ('Сетевое оборудование', 'Желілік жабдық', 'Network Equipment', 'Роутеры, коммутаторы, кабели', 'Маршрутизаторлар, коммутаторлар, кабельдер', 'Routers, switches, cables', 'network', 5, true);

-- Note: Products will be added through the admin interface
-- The existing shop component data will be migrated to database
