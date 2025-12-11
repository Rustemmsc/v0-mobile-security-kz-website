-- Добавить поле position для сортировки товаров внутри категории
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;

-- Создать индекс для быстрой сортировки
CREATE INDEX IF NOT EXISTS idx_products_category_position ON public.products(category_id, position);

-- Установить начальные значения position на основе текущего порядка (по id)
UPDATE public.products p
SET position = sub.row_num
FROM (
  SELECT 
    id,
    category_id,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY id) as row_num
  FROM public.products
) sub
WHERE p.id = sub.id;

