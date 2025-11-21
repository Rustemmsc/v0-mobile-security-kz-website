-- Обновление товаров с реальными изображениями

-- IP камера Hikvision DS-2CD2143G0-I 4MP
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/hikvision-ds-2cd2143g0-i.jpg',
  '/placeholder.svg?height=400&width=400&text=Hikvision+IP+4MP'
]
WHERE name_ru = 'IP камера Hikvision DS-2CD2143G0-I 4MP';

-- IP камера Dahua IPC-HFW2431S 4MP
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/dahua-ipc-hfw2431s.jpg',
  '/placeholder.svg?height=400&width=400&text=Dahua+IP+4MP'
]
WHERE name_ru = 'IP камера Dahua IPC-HFW2431S 4MP';

-- Аналоговая камера Hikvision DS-2CE56D0T 2MP
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/hikvision-analog.jpg',
  '/placeholder.svg?height=400&width=400&text=Hikvision+Analog+2MP'
]
WHERE name_ru = 'Аналоговая камера Hikvision DS-2CE56D0T 2MP';

-- PTZ камера Dahua SD59230U-HNI 2MP 30x
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/dahua-ptz.jpg',
  '/placeholder.svg?height=400&width=400&text=Dahua+PTZ+30x'
]
WHERE name_ru = 'PTZ камера Dahua SD59230U-HNI 2MP 30x';

-- Видеорегистратор Hikvision DS-7608NI-K2 8-канальный
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/hikvision-nvr.jpg',
  '/placeholder.svg?height=400&width=400&text=Hikvision+NVR+8ch'
]
WHERE name_ru = 'Видеорегистратор Hikvision DS-7608NI-K2 8-канальный';

-- Терминал контроля доступа Hikvision с распознаванием лиц
UPDATE products 
SET images = ARRAY[
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products/hikvision-access-control.jpg',
  '/placeholder.svg?height=400&width=400&text=Hikvision+Access+Control'
]
WHERE name_ru = 'Терминал контроля доступа Hikvision с распознаванием лиц';

-- Вернуть обновленные товары
SELECT 
  id,
  name_ru,
  images,
  CASE 
    WHEN images IS NULL THEN 'No images'
    WHEN array_length(images, 1) IS NULL THEN 'Empty array'
    ELSE 'Has ' || array_length(images, 1)::text || ' image(s)'
  END as image_status
FROM products
ORDER BY created_at;
