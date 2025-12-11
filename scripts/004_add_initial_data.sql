-- Полностью переписан скрипт для работы с многоязычной структурой базы данных (name_ru/kk/en, description_ru/kk/en)

-- Добавление начальных данных для магазина видеонаблюдения

-- Очистка существующих данных (опционально, закомментируйте если не нужно)
-- TRUNCATE TABLE products CASCADE;
-- TRUNCATE TABLE product_categories CASCADE;
-- TRUNCATE TABLE site_content CASCADE;

-- Добавление категорий товаров
INSERT INTO product_categories (id, name_ru, name_kk, name_en, description_ru, description_kk, description_en, icon, display_order, is_active)
VALUES
  (gen_random_uuid(), 'IP камеры', 'IP камералар', 'IP Cameras', 'Современные сетевые камеры высокого разрешения', 'Жоғары ажыратымдылықтағы заманауи желілік камералар', 'Modern high-resolution network cameras', 'Camera', 1, true),
  (gen_random_uuid(), 'Аналоговые камеры', 'Аналогтық камералар', 'Analog Cameras', 'Надежные аналоговые камеры для любых задач', 'Кез келген міндеттер үшін сенімді аналогтық камералар', 'Reliable analog cameras for any task', 'Video', 2, true),
  (gen_random_uuid(), 'PTZ камеры', 'PTZ камералар', 'PTZ Cameras', 'Поворотные камеры с масштабированием', 'Масштабтаумен бұрылмалы камералар', 'Pan-Tilt-Zoom cameras', 'Focus', 3, true),
  (gen_random_uuid(), 'Видеорегистраторы', 'Бейнежазба құрылғылары', 'DVR/NVR', 'Устройства записи и хранения видео', 'Бейне жазу және сақтау құрылғылары', 'Video recording and storage devices', 'HardDrive', 4, true),
  (gen_random_uuid(), 'Системы контроля доступа', 'Кіруді бақылау жүйелері', 'Access Control', 'СКУД, домофоны, турникеты', 'СКУД, домофондар, турникеттер', 'Access control systems, intercoms, turnstiles', 'Lock', 5, true),
  (gen_random_uuid(), 'Аксессуары', 'Аксессуарлар', 'Accessories', 'Кронштейны, кабели, блоки питания', 'Кронштейндер, кабельдер, қуат көздері', 'Brackets, cables, power supplies', 'Settings', 6, true)
ON CONFLICT DO NOTHING;

-- Получаем ID категорий для использования в продуктах
DO $$
DECLARE
  cat_ip_id uuid;
  cat_analog_id uuid;
  cat_ptz_id uuid;
  cat_nvr_id uuid;
  cat_access_id uuid;
BEGIN
  -- Получаем ID категорий
  SELECT id INTO cat_ip_id FROM product_categories WHERE name_en = 'IP Cameras' LIMIT 1;
  SELECT id INTO cat_analog_id FROM product_categories WHERE name_en = 'Analog Cameras' LIMIT 1;
  SELECT id INTO cat_ptz_id FROM product_categories WHERE name_en = 'PTZ Cameras' LIMIT 1;
  SELECT id INTO cat_nvr_id FROM product_categories WHERE name_en = 'DVR/NVR' LIMIT 1;
  SELECT id INTO cat_access_id FROM product_categories WHERE name_en = 'Access Control' LIMIT 1;

  -- Добавление примеров товаров
  INSERT INTO products (
    id, category_id, sku, name_ru, name_kk, name_en,
    description_ru, description_kk, description_en,
    price, currency, stock_quantity, is_in_stock, is_featured, is_active,
    brand, model, images, features_ru, features_kk, features_en, specifications
  )
  VALUES
    -- IP камеры
    (
      gen_random_uuid(), cat_ip_id, 'HKV-DS2CD2143G0',
      'IP камера Hikvision DS-2CD2143G0-I 4MP', 
      'IP камера Hikvision DS-2CD2143G0-I 4MP',
      'IP Camera Hikvision DS-2CD2143G0-I 4MP',
      'Купольная IP камера 4 Мегапикселя с ИК подсветкой до 30м. Отличное качество изображения днем и ночью.',
      '30м дейінгі ИҚ жарықтандырғышы бар 4 Мегапиксель күмбезді IP камера. Күндіз және түнде тамаша кескін сапасы.',
      '4MP Dome IP camera with IR illumination up to 30m. Excellent image quality day and night.',
      45000, 'KZT', 15, true, true, true,
      'Hikvision', 'DS-2CD2143G0-I',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['4 Мегапикселя', 'ИК подсветка 30м', 'WDR 120dB', 'IP67 защита', 'PoE питание'],
      ARRAY['4 Мегапиксель', '30м ИҚ жарықтандыру', 'WDR 120dB', 'IP67 қорғаныс', 'PoE қуаттандыру'],
      ARRAY['4 Megapixels', 'IR 30m', 'WDR 120dB', 'IP67 protection', 'PoE power'],
      '{"resolution": "2688x1520", "sensor": "1/3\" CMOS", "lens": "2.8mm", "ir_distance": "30m", "protocol": "ONVIF"}'::jsonb
    ),
    (
      gen_random_uuid(), cat_ip_id, 'DHI-IPC-HFW2431S',
      'IP камера Dahua IPC-HFW2431S 4MP',
      'IP камера Dahua IPC-HFW2431S 4MP',
      'IP Camera Dahua IPC-HFW2431S 4MP',
      'Уличная цилиндрическая IP камера с разрешением 4МП и Smart IR подсветкой.',
      '4МП ажыратымдылығы мен Smart IR жарықтандыруы бар сыртқы цилиндрлік IP камера.',
      'Outdoor bullet IP camera with 4MP resolution and Smart IR illumination.',
      38000, 'KZT', 20, true, true, true,
      'Dahua', 'IPC-HFW2431S',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['4MP разрешение', 'Smart IR 40м', 'H.265+ компрессия', 'Металлический корпус', 'Слот для SD карты'],
      ARRAY['4MP ажыратымдылық', 'Smart IR 40м', 'H.265+ компрессия', 'Металл корпус', 'SD карта слоты'],
      ARRAY['4MP resolution', 'Smart IR 40m', 'H.265+ compression', 'Metal housing', 'SD card slot'],
      '{"resolution": "2560x1440", "sensor": "1/3\" CMOS", "lens": "3.6mm", "ir_distance": "40m", "storage": "microSD up to 256GB"}'::jsonb
    ),
    
    -- Аналоговые камеры
    (
      gen_random_uuid(), cat_analog_id, 'HKV-DS2CE56D0T',
      'Аналоговая камера Hikvision DS-2CE56D0T 2MP HD-TVI',
      'Аналогтық камера Hikvision DS-2CE56D0T 2MP HD-TVI',
      'Analog Camera Hikvision DS-2CE56D0T 2MP HD-TVI',
      'Купольная HD-TVI камера 1080p с ИК подсветкой. Экономичное решение для систем видеонаблюдения.',
      'ИҚ жарықтандырғышы бар 1080p күмбезді HD-TVI камера. Бейнебақылау жүйелері үшін үнемді шешім.',
      '1080p HD-TVI dome camera with IR illumination. Cost-effective CCTV solution.',
      18000, 'KZT', 30, true, false, true,
      'Hikvision', 'DS-2CE56D0T',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['Full HD 1080p', 'HD-TVI технология', 'ИК 20м', 'Пластиковый корпус', 'Простая установка'],
      ARRAY['Full HD 1080p', 'HD-TVI технологиясы', 'ИҚ 20м', 'Пластик корпус', 'Оңай орнату'],
      ARRAY['Full HD 1080p', 'HD-TVI technology', 'IR 20m', 'Plastic housing', 'Easy installation'],
      '{"resolution": "1920x1080", "technology": "HD-TVI", "lens": "3.6mm", "ir_distance": "20m"}'::jsonb
    ),

    -- PTZ камеры
    (
      gen_random_uuid(), cat_ptz_id, 'DHI-SD59230U-HNI',
      'PTZ камера Dahua SD59230U-HNI 2MP 30x zoom',
      'PTZ камера Dahua SD59230U-HNI 2MP 30x zoom',
      'PTZ Camera Dahua SD59230U-HNI 2MP 30x zoom',
      'Скоростная поворотная IP камера с 30-кратным оптическим зумом. Идеальна для наблюдения за большими территориями.',
      '30 есе оптикалық зуммен жылдам айналмалы IP камера. Үлкен аумақтарды бақылау үшін өте жақсы.',
      'High-speed PTZ IP camera with 30x optical zoom. Perfect for large area surveillance.',
      285000, 'KZT', 5, true, true, true,
      'Dahua', 'SD59230U-HNI',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['30x оптический зум', 'Автотрекинг', '360° вращение', 'Starlight технология', 'ИК подсветка 150м'],
      ARRAY['30x оптикалық зум', 'Автотрекинг', '360° айналу', 'Starlight технологиясы', 'ИҚ жарықтандыру 150м'],
      ARRAY['30x optical zoom', 'Auto-tracking', '360° rotation', 'Starlight technology', 'IR 150m'],
      '{"resolution": "1920x1080", "zoom": "30x optical", "rotation": "360° pan, 90° tilt", "ir_distance": "150m", "speed": "300°/s"}'::jsonb
    ),

    -- Видеорегистраторы
    (
      gen_random_uuid(), cat_nvr_id, 'HKV-DS7608NI-K2',
      'Видеорегистратор Hikvision DS-7608NI-K2 8-канальный NVR',
      'Бейнежазба құрылғысы Hikvision DS-7608NI-K2 8-канал NVR',
      'Network Video Recorder Hikvision DS-7608NI-K2 8-ch NVR',
      '8-канальный сетевой видеорегистратор с поддержкой до 8MP. Поддержка H.265+ компрессии для экономии места.',
      '8MP дейін қолдауы бар 8 арналы желілік бейнежазба құрылғысы. Орын үнемдеу үшін H.265+ компрессиясын қолдау.',
      '8-channel network video recorder supporting up to 8MP. H.265+ compression support for storage optimization.',
      95000, 'KZT', 10, true, true, true,
      'Hikvision', 'DS-7608NI-K2',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['8 IP каналов', 'До 8MP на канал', '2 HDD до 6TB', 'H.265+ компрессия', 'HDMI и VGA выход'],
      ARRAY['8 IP арна', 'Арнаға 8MP дейін', '2 HDD 6TB дейін', 'H.265+ компрессия', 'HDMI және VGA шығыс'],
      ARRAY['8 IP channels', 'Up to 8MP per channel', '2 HDD up to 6TB', 'H.265+ compression', 'HDMI and VGA output'],
      '{"channels": 8, "max_resolution": "8MP", "hdd_slots": 2, "max_hdd": "6TB each", "compression": "H.265+/H.265/H.264+/H.264", "network": "1 RJ45 10M/100M/1000M"}'::jsonb
    ),

    -- Системы контроля доступа
    (
      gen_random_uuid(), cat_access_id, 'HKV-DS-K1T341AMF',
      'Терминал контроля доступа Hikvision с распознаванием лиц',
      'Бет тану функциясы бар Hikvision кіруді бақылау терминалы',
      'Hikvision Face Recognition Access Control Terminal',
      'Биометрический терминал с распознаванием лиц и встроенным считывателем карт. Поддержка до 3000 лиц.',
      '3000 бетке дейін қолдауы бар бет тану және кіріктірілген карта оқырмасы бар биометриялық терминал.',
      'Biometric terminal with face recognition and integrated card reader. Support for up to 3000 faces.',
      125000, 'KZT', 8, true, true, true,
      'Hikvision', 'DS-K1T341AMF',
      ARRAY['/placeholder.svg?height=400&width=400'],
      ARRAY['Распознавание лиц', 'Mifare карты', 'До 3000 лиц', 'TCP/IP подключение', 'Антивандальный корпус'],
      ARRAY['Бетті тану', 'Mifare карталары', '3000 бетке дейін', 'TCP/IP қосылым', 'Вандалға қарсы корпус'],
      ARRAY['Face recognition', 'Mifare cards', 'Up to 3000 faces', 'TCP/IP connection', 'Vandal-proof housing'],
      '{"capacity": "3000 faces, 5000 cards", "recognition_time": "<1s", "accuracy": "99%", "card_types": "Mifare", "display": "4.3 inch touchscreen", "communication": "TCP/IP, Wiegand"}'::jsonb
    )
  ON CONFLICT DO NOTHING;
END $$;

-- Добавление контента сайта
INSERT INTO site_content (id, section, key, content_type, value_ru, value_kk, value_en, description)
VALUES
  -- Hero секция
  (gen_random_uuid(), 'hero', 'title', 'text', 
    'Защитите свой бизнес уже сегодня!',
    'Бизнесіңізді бүгін қорғаңыз!',
    'Protect Your Business Today!',
    'Заголовок главной секции'),
  (gen_random_uuid(), 'hero', 'subtitle', 'text',
    'Работаем по всему Казахстану с 2010 года • 500+ проектов. Профессиональные системы видеонаблюдения и контроля доступа.',
    '2010 жылдан бері Қазақстан бойынша жұмыс істейміз • 500+ жоба. Кәсіби бейнебақылау және кіруді бақылау жүйелері.',
    'Operating across Kazakhstan since 2010 • 500+ projects. Professional video surveillance and access control systems.',
    'Подзаголовок главной секции'),
  (gen_random_uuid(), 'hero', 'cta_button', 'text',
    'Получить консультацию',
    'Кеңес алу',
    'Get Consultation',
    'Текст кнопки призыва к действию'),

  -- О компании
  (gen_random_uuid(), 'about', 'title', 'text',
    'Работаем по всему Казахстану с 2010 года • 500+ проектов',
    '2010 жылдан бері Қазақстан бойынша жұмыс істейміз • 500+ жоба',
    'Operating across Kazakhstan since 2010 • 500+ projects',
    'Заголовок секции о компании'),
  (gen_random_uuid(), 'about', 'description', 'text',
    'MobileSecurity.kz - ведущий поставщик систем безопасности в Казахстане. Мы предлагаем полный спектр решений для видеонаблюдения, контроля доступа и охранной сигнализации.',
    'MobileSecurity.kz - Қазақстандағы қауіпсіздік жүйелерінің жетекші жеткізушісі. Біз бейнебақылау, кіруді бақылау және дабыл сигнализациясы үшін шешімдердің толық спектрін ұсынамыз.',
    'MobileSecurity.kz is a leading security systems provider in Kazakhstan. We offer a full range of solutions for video surveillance, access control and alarm systems.',
    'Описание компании'),

  -- Контактная информация
  (gen_random_uuid(), 'contact', 'phone', 'text',
    '+7 (777) 123-45-67',
    '+7 (777) 123-45-67',
    '+7 (777) 123-45-67',
    'Телефон компании'),
  (gen_random_uuid(), 'contact', 'email', 'text',
    'info@mobilesecurity.kz',
    'info@mobilesecurity.kz',
    'info@mobilesecurity.kz',
    'Email компании'),
  (gen_random_uuid(), 'contact', 'address', 'text',
    'г. Алматы, ул. Абая 123',
    'Алматы қ., Абай көш. 123',
    'Almaty, Abay str. 123',
    'Адрес офиса')
ON CONFLICT DO NOTHING;

-- Сообщение об успешном выполнении
DO $$
BEGIN
  RAISE NOTICE 'Initial data added successfully!';
  RAISE NOTICE 'Categories: 6, Products: 6, Site content: 10 entries';
END $$;
