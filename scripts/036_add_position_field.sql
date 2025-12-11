-- Добавить поле position для ручной сортировки товаров в категориях
-- Этот скрипт можно выполнять даже если поле уже существует

-- Добавить поле position в таблицу products (если еще не существует)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;

-- Создать индекс для быстрой сортировки по категории и позиции
CREATE INDEX IF NOT EXISTS idx_products_category_position 
ON public.products(category_id, position);

-- Инициализировать position для существующих товаров
-- Устанавливаем position = порядковый номер товара в категории
DO $$
DECLARE
    cat_record RECORD;
    product_record RECORD;
    pos_counter INTEGER;
BEGIN
    -- Для каждой категории
    FOR cat_record IN SELECT id FROM public.product_categories LOOP
        pos_counter := 0;
        
        -- Обновляем position для товаров в этой категории
        FOR product_record IN 
            SELECT id FROM public.products 
            WHERE category_id = cat_record.id 
            ORDER BY created_at ASC, id ASC
        LOOP
            UPDATE public.products 
            SET position = pos_counter 
            WHERE id = product_record.id;
            
            pos_counter := pos_counter + 1;
        END LOOP;
    END LOOP;
    
    -- Для товаров без категории
    pos_counter := 0;
    FOR product_record IN 
        SELECT id FROM public.products 
        WHERE category_id IS NULL 
        ORDER BY created_at ASC, id ASC
    LOOP
        UPDATE public.products 
        SET position = pos_counter 
        WHERE id = product_record.id;
        
        pos_counter := pos_counter + 1;
    END LOOP;
END $$;

-- Проверка: вывести информацию о поле position
SELECT 
    column_name, 
    data_type, 
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'products' 
  AND column_name = 'position';

