-- Откат к placeholder изображениям для стабильности системы
-- Это вернет товары в рабочее состояние

UPDATE products 
SET images = ARRAY['/placeholder.svg?height=400&width=400']
WHERE images IS NOT NULL;

-- Показываем что изменилось
SELECT id, name_ru, images 
FROM products 
ORDER BY created_at;
