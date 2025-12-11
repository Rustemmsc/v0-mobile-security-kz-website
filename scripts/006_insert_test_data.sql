-- Упрощенный скрипт для вставки тестовых данных
-- Использует автоматическую генерацию UUID если настроено в таблице

-- Включаем расширение для UUID (если еще не включено)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Очистка данных (осторожно! Удалит все товары и категории)
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE product_categories CASCADE;
TRUNCATE TABLE site_content CASCADE;

-- Вставка категорий товаров
INSERT INTO product_categories (
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  icon, display_order, is_active
) VALUES
  ('IP камеры', 'IP камералар', 'IP Cameras',
   'Современные сетевые камеры высокого разрешения', 'Жоғары ажыратымдылықтағы заманауи желілік камералар', 'Modern high-resolution network cameras',
   'Camera', 1, true),
  
  ('Аналоговые камеры', 'Аналогтық камералар', 'Analog Cameras',
   'Надежные аналоговые камеры для любых задач', 'Кез келген міндеттер үшін сенімді аналогтық камералар', 'Reliable analog cameras for any task',
   'Video', 2, true),
  
  ('PTZ камеры', 'PTZ камералар', 'PTZ Cameras',
   'Поворотные камеры с масштабированием', 'Масштабтаумен бұрылмалы камералар', 'Pan-Tilt-Zoom cameras',
   'Focus', 3, true),
  
  ('Видеорегистраторы', 'Бейнежазба құрылғылары', 'DVR/NVR',
   'Устройства записи и хранения видео', 'Бейне жазу және сақтау құрылғылары', 'Video recording and storage devices',
   'HardDrive', 4, true),
  
  ('Системы контроля доступа', 'Кіруді бақылау жүйелері', 'Access Control',
   'СКУД, домофоны, турникеты', 'СКУД, домофондар, турникеттер', 'Access control systems, intercoms, turnstiles',
   'Lock', 5, true),
  
  ('Аксессуары', 'Аксессуарлар', 'Accessories',
   'Кронштейны, кабели, блоки питания', 'Кронштейндер, кабельдер, қуат көздері', 'Brackets, cables, power supplies',
   'Settings', 6, true);

-- Вставка товаров (используя category_id из только что созданных категорий)
INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'HKV-DS2CD2143G0',
  'IP камера Hikvision DS-2CD2143G0-I 4MP',
  'IP камера Hikvision DS-2CD2143G0-I 4MP',
  'IP Camera Hikvision DS-2CD2143G0-I 4MP',
  'Купольная IP камера 4 Мегапикселя с ИК подсветкой до 30м',
  '30м дейінгі ИҚ жарықтандырғышы бар 4 Мегапиксель күмбезді IP камера',
  '4MP Dome IP camera with IR illumination up to 30m',
  45000, 'KZT', 15,
  true, true, true,
  'Hikvision', 'DS-2CD2143G0-I',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['4 Мегапикселя', 'ИК подсветка 30м', 'WDR 120dB', 'IP67 защита', 'PoE питание'],
  ARRAY['4 Мегапиксель', '30м ИҚ жарықтандыру', 'WDR 120dB', 'IP67 қорғаныс', 'PoE қуаттандыру'],
  ARRAY['4 Megapixels', 'IR 30m', 'WDR 120dB', 'IP67 protection', 'PoE power'],
  '{"resolution": "2688x1520", "sensor": "1/3 CMOS", "lens": "2.8mm", "ir_distance": "30m"}'::jsonb
FROM product_categories c
WHERE c.name_en = 'IP Cameras'
LIMIT 1;

INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'DHI-IPC-HFW2431S',
  'IP камера Dahua IPC-HFW2431S 4MP',
  'IP камера Dahua IPC-HFW2431S 4MP',
  'IP Camera Dahua IPC-HFW2431S 4MP',
  'Уличная цилиндрическая IP камера с разрешением 4МП',
  '4МП ажыратымдылығы бар сыртқы цилиндрлік IP камера',
  'Outdoor bullet IP camera with 4MP resolution',
  38000, 'KZT', 20,
  true, true, true,
  'Dahua', 'IPC-HFW2431S',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['4MP разрешение', 'Smart IR 40м', 'H.265+ компрессия', 'Металлический корпус'],
  ARRAY['4MP ажыратымдылық', 'Smart IR 40м', 'H.265+ компрессия', 'Металл корпус'],
  ARRAY['4MP resolution', 'Smart IR 40m', 'H.265+ compression', 'Metal housing'],
  '{"resolution": "2560x1440", "sensor": "1/3 CMOS", "lens": "3.6mm", "ir_distance": "40m"}'::jsonb
FROM product_categories c
WHERE c.name_en = 'IP Cameras'
LIMIT 1;

INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'HKV-DS2CE56D0T',
  'Аналоговая камера Hikvision DS-2CE56D0T 2MP',
  'Аналогтық камера Hikvision DS-2CE56D0T 2MP',
  'Analog Camera Hikvision DS-2CE56D0T 2MP',
  'Купольная HD-TVI камера 1080p с ИК подсветкой',
  'ИҚ жарықтандырғышы бар 1080p күмбезді HD-TVI камера',
  '1080p HD-TVI dome camera with IR illumination',
  18000, 'KZT', 30,
  true, false, true,
  'Hikvision', 'DS-2CE56D0T',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['Full HD 1080p', 'HD-TVI технология', 'ИК 20м', 'Простая установка'],
  ARRAY['Full HD 1080p', 'HD-TVI технологиясы', 'ИҚ 20м', 'Оңай орнату'],
  ARRAY['Full HD 1080p', 'HD-TVI technology', 'IR 20m', 'Easy installation'],
  '{"resolution": "1920x1080", "technology": "HD-TVI", "lens": "3.6mm"}'::jsonb
FROM product_categories c
WHERE c.name_en = 'Analog Cameras'
LIMIT 1;

INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'DHI-SD59230U-HNI',
  'PTZ камера Dahua SD59230U-HNI 2MP 30x',
  'PTZ камера Dahua SD59230U-HNI 2MP 30x',
  'PTZ Camera Dahua SD59230U-HNI 2MP 30x',
  'Скоростная поворотная IP камера с 30-кратным зумом',
  '30 есе зуммен жылдам айналмалы IP камера',
  'High-speed PTZ IP camera with 30x optical zoom',
  285000, 'KZT', 5,
  true, true, true,
  'Dahua', 'SD59230U-HNI',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['30x оптический зум', 'Автотрекинг', '360° вращение', 'ИК 150м'],
  ARRAY['30x оптикалық зум', 'Автотрекинг', '360° айналу', 'ИҚ 150м'],
  ARRAY['30x optical zoom', 'Auto-tracking', '360° rotation', 'IR 150m'],
  '{"resolution": "1920x1080", "zoom": "30x optical", "rotation": "360° pan"}'::jsonb
FROM product_categories c
WHERE c.name_en = 'PTZ Cameras'
LIMIT 1;

INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'HKV-DS7608NI-K2',
  'Видеорегистратор Hikvision DS-7608NI-K2 8-канальный',
  'Бейнежазба құрылғысы Hikvision DS-7608NI-K2 8-арналы',
  'Network Video Recorder Hikvision DS-7608NI-K2 8-ch',
  '8-канальный сетевой видеорегистратор с поддержкой до 8MP',
  '8MP дейін қолдауы бар 8 арналы желілік бейнежазба құрылғысы',
  '8-channel network video recorder supporting up to 8MP',
  95000, 'KZT', 10,
  true, true, true,
  'Hikvision', 'DS-7608NI-K2',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['8 IP каналов', 'До 8MP на канал', '2 HDD до 6TB', 'H.265+ компрессия'],
  ARRAY['8 IP арна', 'Арнаға 8MP дейін', '2 HDD 6TB дейін', 'H.265+ компрессия'],
  ARRAY['8 IP channels', 'Up to 8MP per channel', '2 HDD up to 6TB', 'H.265+ compression'],
  '{"channels": 8, "max_resolution": "8MP", "hdd_slots": 2}'::jsonb
FROM product_categories c
WHERE c.name_en = 'DVR/NVR'
LIMIT 1;

INSERT INTO products (
  category_id, sku,
  name_ru, name_kk, name_en,
  description_ru, description_kk, description_en,
  price, currency, stock_quantity,
  is_in_stock, is_featured, is_active,
  brand, model, images,
  features_ru, features_kk, features_en,
  specifications
)
SELECT
  c.id,
  'HKV-DS-K1T341AMF',
  'Терминал контроля доступа Hikvision с распознаванием лиц',
  'Бет тану функциясы бар Hikvision кіруді бақылау терминалы',
  'Hikvision Face Recognition Access Control Terminal',
  'Биометрический терминал с распознаванием лиц',
  'Бет тану функциясы бар биометриялық терминал',
  'Biometric terminal with face recognition',
  125000, 'KZT', 8,
  true, true, true,
  'Hikvision', 'DS-K1T341AMF',
  ARRAY['/placeholder.svg?height=400&width=400'],
  ARRAY['Распознавание лиц', 'Mifare карты', 'До 3000 лиц', 'TCP/IP'],
  ARRAY['Бетті тану', 'Mifare карталары', '3000 бетке дейін', 'TCP/IP'],
  ARRAY['Face recognition', 'Mifare cards', 'Up to 3000 faces', 'TCP/IP'],
  '{"capacity": "3000 faces, 5000 cards", "recognition_time": "<1s"}'::jsonb
FROM product_categories c
WHERE c.name_en = 'Access Control'
LIMIT 1;

-- Вставка контента сайта
INSERT INTO site_content (
  section, key, content_type,
  value_ru, value_kk, value_en,
  description
) VALUES
  ('hero', 'main_title', 'text',
   'Защитите свой бизнес уже сегодня!',
   'Бизнесіңізді бүгін қорғаңыз!',
   'Protect Your Business Today!',
   'Заголовок главной секции'),
   
  ('hero', 'main_subtitle', 'text',
   'Работаем по всему Казахстану с 2010 года • 500+ проектов',
   '2010 жылдан бері Қазақстан бойынша жұмыс істейміз • 500+ жоба',
   'Operating across Kazakhstan since 2010 • 500+ projects',
   'Подзаголовок главной секции'),
   
  ('hero', 'cta_primary', 'text',
   'Получить консультацию',
   'Кеңес алу',
   'Get Consultation',
   'Текст кнопки призыва к действию'),
   
  ('about', 'company_title', 'text',
   'О компании MobileSecurity.kz',
   'MobileSecurity.kz туралы',
   'About MobileSecurity.kz',
   'Заголовок секции о компании'),
   
  ('about', 'company_desc', 'text',
   'Ведущий поставщик систем безопасности в Казахстане',
   'Қазақстандағы қауіпсіздік жүйелерінің жетекші жеткізушісі',
   'Leading security systems provider in Kazakhstan',
   'Описание компании'),
   
  ('contact', 'company_phone', 'text',
   '+7 (777) 123-45-67',
   '+7 (777) 123-45-67',
   '+7 (777) 123-45-67',
   'Телефон'),
   
  ('contact', 'company_email', 'text',
   'info@mobilesecurity.kz',
   'info@mobilesecurity.kz',
   'info@mobilesecurity.kz',
   'Email'),
   
  ('contact', 'company_address', 'text',
   'г. Алматы, ул. Абая 123',
   'Алматы қ., Абай көш. 123',
   'Almaty, Abay str. 123',
   'Адрес');

-- Показать результаты
SELECT 'Categories inserted:' as info, COUNT(*) as count FROM product_categories
UNION ALL
SELECT 'Products inserted:' as info, COUNT(*) as count FROM products
UNION ALL
SELECT 'Site content inserted:' as info, COUNT(*) as count FROM site_content;
