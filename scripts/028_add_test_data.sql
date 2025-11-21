-- Добавить тестовые категории и товары из hardcoded данных в базу данных
-- Это сделает сайт полностью рабочим с живыми данными

-- Очистить существующие тестовые данные (если есть)
DELETE FROM products WHERE sku LIKE 'TEST-%';
DELETE FROM product_categories WHERE name_ru IN ('IP Камеры', 'Видеорегистраторы', 'Контроль доступа', 'Сигнализации', 'Домофоны');

-- Добавляем обязательные поля name_kk, name_en, description_kk, description_en
-- Добавить категории
INSERT INTO product_categories (name_ru, name_en, name_kk, description_ru, description_en, description_kk, icon, is_active, display_order) VALUES
('IP Камеры', 'IP Cameras', 'IP камералары', 'Уличные и внутренние IP камеры с HD/4K качеством', 'Outdoor and indoor IP cameras with HD/4K quality', 'HD/4K сапалы сыртқы және ішкі IP камералары', 'Camera', true, 1),
('Видеорегистраторы', 'Video Recorders', 'Бейнетіркеуіштер', 'Сетевые видеорегистраторы для записи и хранения', 'Network video recorders for recording and storage', 'Жазу және сақтау үшін желілік бейнетіркеуіштер', 'HardDrive', true, 2),
('Контроль доступа', 'Access Control', 'Қатынас бақылауы', 'Биометрические терминалы и контроллеры СКУД', 'Biometric terminals and access control', 'Биометриялық терминалдар және СКУД контроллерлері', 'Fingerprint', true, 3),
('Сигнализации', 'Alarm Systems', 'Дабыл жүйелері', 'Беспроводные датчики и системы сигнализации', 'Wireless sensors and alarm systems', 'Сымсыз датчиктер және дабыл жүйелері', 'Bell', true, 4),
('Домофоны', 'Intercom', 'Домофондар', 'Видео и аудио домофоны для дома и офиса', 'Video and audio intercoms for home and office', 'Үй және кеңсе үшін бейне және аудио домофондар', 'DoorOpen', true, 5);

-- Добавляем все обязательные поля для товаров включая name_kk, name_en, description_kk, description_en
-- Добавить товары - IP Камеры
INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-2CD2043G2-I',
  'Hikvision DS-2CD2043G2-I',
  'Hikvision DS-2CD2043G2-I',
  'Hikvision',
  'Уличная 4MP IP камера с инфракрасной подсветкой до 30м и технологией H.265+',
  'Outdoor 4MP IP camera with IR up to 30m and H.265+ technology',
  '30м дейін ИҚ жарықтандырумен және H.265+ технологиясымен 4MP сыртқы IP камерасы',
  '{"resolution": "4MP", "ir_range": "30м", "protection": "IP67", "compression": "H.265+"}',
  28500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-HIK-2CD2043G2-I',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'IP Камеры';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Dahua IPC-HDW2431T-AS-S2',
  'Dahua IPC-HDW2431T-AS-S2',
  'Dahua IPC-HDW2431T-AS-S2',
  'Dahua',
  'Купольная 4MP IP камера со встроенным микрофоном',
  'Dome 4MP IP camera with built-in microphone',
  'Кіріктірілген микрофоны бар 4MP күмбез IP камерасы',
  '{"resolution": "4MP", "microphone": "встроенный", "ir_range": "30м"}',
  24500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-DAH-HDW2431T-AS-S2',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'IP Камеры';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-2DE2A404IW-DE3',
  'Hikvision DS-2DE2A404IW-DE3',
  'Hikvision DS-2DE2A404IW-DE3',
  'Hikvision',
  'Поворотная PTZ камера 4MP с автоматическим отслеживанием',
  'PTZ camera 4MP with auto-tracking',
  'Автоматты бақылаумен 4MP PTZ камерасы',
  '{"resolution": "4MP", "type": "PTZ", "zoom": "4x", "features": "Smart tracking"}',
  65000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-HIK-2DE2A404IW-DE3',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'IP Камеры';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Ezviz C6N',
  'Ezviz C6N',
  'Ezviz C6N',
  'Ezviz',
  'Внутренняя WiFi камера с поворотным механизмом',
  'Indoor WiFi camera with pan-tilt mechanism',
  'Бұрылмалы механизмі бар ішкі WiFi камерасы',
  '{"resolution": "2MP", "connectivity": "WiFi", "features": "Pan/Tilt, двусторонняя связь"}',
  18500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-EZV-C6N',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'IP Камеры';

-- Добавить товары - Видеорегистраторы
INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-7604NI-K1/4P',
  'Hikvision DS-7604NI-K1/4P',
  'Hikvision DS-7604NI-K1/4P',
  'Hikvision',
  '4-канальный сетевой видеорегистратор с PoE',
  '4-channel network video recorder with PoE',
  'PoE-мен 4 арналы желілік бейнетіркеуіш',
  '{"channels": "4", "resolution": "4K", "hdd": "1", "poe_ports": "4"}',
  42000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-HIK-7604NI-K1-4P',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Видеорегистраторы';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Dahua NVR2108HS-8P-S3',
  'Dahua NVR2108HS-8P-S3',
  'Dahua NVR2108HS-8P-S3',
  'Dahua',
  '8-канальный NVR с поддержкой 4K и 8 портами PoE',
  '8-channel NVR with 4K support and 8 PoE ports',
  '4K қолдауымен және 8 PoE портымен 8 арналы NVR',
  '{"channels": "8", "resolution": "4K", "hdd": "1", "poe_ports": "8"}',
  58000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-DAH-2108HS-8P-S3',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Видеорегистраторы';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-7616NI-K2/16P',
  'Hikvision DS-7616NI-K2/16P',
  'Hikvision DS-7616NI-K2/16P',
  'Hikvision',
  '16-канальный видеорегистратор для больших систем',
  '16-channel video recorder for large systems',
  'Үлкен жүйелерге арналған 16 арналы бейнетіркеуіш',
  '{"channels": "16", "resolution": "4K", "hdd": "2", "poe_ports": "16"}',
  95000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-HIK-7616NI-K2-16P',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Видеорегистраторы';

-- Добавить товары - Контроль доступа
INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'ZKTeco ProFace X',
  'ZKTeco ProFace X',
  'ZKTeco ProFace X',
  'ZKTeco',
  'Терминал с технологией распознавания лиц',
  'Terminal with face recognition technology',
  'Бет тану технологиясы бар терминал',
  '{"type": "Распознавание лиц", "capacity": "3000 лиц", "connectivity": "WiFi"}',
  85000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-ZKT-PROFACE-X',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Контроль доступа';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-K1T341AMF',
  'Hikvision DS-K1T341AMF',
  'Hikvision DS-K1T341AMF',
  'Hikvision',
  'Биометрический терминал с отпечатками пальцев',
  'Biometric terminal with fingerprint scanner',
  'Саусақ ізі сканері бар биометриялық терминал',
  '{"type": "Биометрия + карты", "capacity": "3000 пользователей"}',
  45000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-HIK-K1T341AMF',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Контроль доступа';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'ZKTeco C3-400',
  'ZKTeco C3-400',
  'ZKTeco C3-400',
  'ZKTeco',
  'Контроллер СКУД для управления 4 дверьми',
  'Access control panel for 4 doors',
  '4 есікті басқаруға арналған СКУД контроллері',
  '{"type": "Контроллер СКУД", "doors": "4", "connectivity": "TCP/IP"}',
  32000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-ZKT-C3-400',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Контроль доступа';

-- Добавить товары - Сигнализации
INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Ajax StarterKit',
  'Ajax StarterKit',
  'Ajax StarterKit',
  'Ajax Systems',
  'Беспроводная система охранной сигнализации',
  'Wireless security alarm system',
  'Сымсыз қауіпсіздік дабыл жүйесі',
  '{"components": "Hub 2, MotionProtect, DoorProtect"}',
  68000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-AJAX-STARTER-KIT',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Сигнализации';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-PD2-T12P-WE',
  'Hikvision DS-PD2-T12P-WE',
  'Hikvision DS-PD2-T12P-WE',
  'Hikvision',
  'Беспроводной PIR датчик движения с функцией защиты от животных',
  'Wireless PIR motion sensor with pet immunity',
  'Жануарлардан қорғау функциясы бар сымсыз PIR қозғалыс датчигі',
  '{"type": "PIR датчик", "wireless": true, "features": "pet immunity"}',
  12500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-HIK-PD2-T12P-WE',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Сигнализации';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Ajax FireProtect Plus',
  'Ajax FireProtect Plus',
  'Ajax FireProtect Plus',
  'Ajax Systems',
  'Беспроводной датчик дыма и угарного газа',
  'Wireless smoke and CO detector',
  'Сымсыз түтін және СО датчигі',
  '{"type": "Датчик дыма и CO", "wireless": true}',
  18500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-AJAX-FIREPROTECT-PLUS',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Сигнализации';

-- Добавить товары - Домофоны
INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Hikvision DS-KH6320-WTE1',
  'Hikvision DS-KH6320-WTE1',
  'Hikvision DS-KH6320-WTE1',
  'Hikvision',
  'Видеодомофон с 7" экраном и WiFi',
  'Video intercom with 7" screen and WiFi',
  '7" экраны және WiFi бар бейне домофон',
  '{"screen": "7 дюймов", "connectivity": "WiFi", "os": "Android"}',
  45000,
  ARRAY['/placeholder.svg?height=400&width=400'],
  false,
  true,
  'TEST-HIK-KH6320-WTE1',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Домофоны';

INSERT INTO products (category_id, name_ru, name_en, name_kk, brand, description_ru, description_en, description_kk, specifications, price, images, is_featured, is_in_stock, sku, is_active, currency) 
SELECT 
  id,
  'Commax CDV-70K',
  'Commax CDV-70K',
  'Commax CDV-70K',
  'Commax',
  'Цветной видеодомофон с функцией hands-free',
  'Color video intercom with hands-free function',
  'Hands-free функциясы бар түрлі-түсті бейне домофон',
  '{"screen": "7 дюймов", "color": true, "features": "hands-free"}',
  28500,
  ARRAY['/placeholder.svg?height=400&width=400'],
  true,
  true,
  'TEST-CMX-CDV-70K',
  true,
  'KZT'
FROM product_categories WHERE name_ru = 'Домофоны';

-- Показать результаты
SELECT 'Категории добавлены:' as status;
SELECT id, name_ru, is_active, display_order FROM product_categories WHERE name_ru IN ('IP Камеры', 'Видеорегистраторы', 'Контроль доступа', 'Сигнализации', 'Домофоны') ORDER BY display_order;

SELECT '' as separator;
SELECT 'Товары добавлены:' as status;
SELECT 
  p.id, 
  c.name_ru as category, 
  p.name_ru as product, 
  p.brand, 
  p.price, 
  p.is_featured,
  p.is_in_stock
FROM products p
JOIN product_categories c ON p.category_id = c.id
WHERE p.sku LIKE 'TEST-%'
ORDER BY c.display_order, p.id;

SELECT '' as separator;
SELECT 'Статистика:' as status;
SELECT 
  c.name_ru as category,
  COUNT(p.id) as product_count
FROM product_categories c
LEFT JOIN products p ON p.category_id = c.id AND p.is_active = true
WHERE c.is_active = true
GROUP BY c.id, c.name_ru
ORDER BY c.display_order;
