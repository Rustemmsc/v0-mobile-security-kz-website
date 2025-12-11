-- Проверка индекса для поля position
-- Выполните этот запрос, чтобы убедиться, что индекс создан

SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'products' 
  AND indexname = 'idx_products_category_position';

-- Если индекс не найден, создайте его вручную:
-- CREATE INDEX IF NOT EXISTS idx_products_category_position 
-- ON public.products(category_id, position);

