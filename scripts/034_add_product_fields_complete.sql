-- Полный скрипт для добавления всех новых полей в таблицы
-- Выполните этот скрипт в Supabase SQL Editor

-- 1. Добавить поле image в таблицу product_categories (если еще не существует)
ALTER TABLE public.product_categories 
ADD COLUMN IF NOT EXISTS image text;

-- 2. Добавить поле price_type в таблицу products (если еще не существует)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price_type text DEFAULT 'retail';

-- 3. Удалить старый constraint, если он существует (для безопасности)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'products_price_type_check'
    ) THEN
        ALTER TABLE public.products 
        DROP CONSTRAINT products_price_type_check;
    END IF;
END $$;

-- 4. Добавить CHECK constraint для price_type
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'products_price_type_check'
    ) THEN
        ALTER TABLE public.products 
        ADD CONSTRAINT products_price_type_check 
        CHECK (price_type IN ('retail', 'on_order', 'sale'));
    END IF;
END $$;

-- 5. Добавить поле is_retail (если еще не существует)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_retail boolean DEFAULT true;

-- 6. Добавить поле is_on_order (если еще не существует)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_on_order boolean DEFAULT false;

-- 7. Добавить поле is_on_sale (если еще не существует)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_on_sale boolean DEFAULT false;

-- 8. Обновить существующие записи, установив значения по умолчанию для новых полей
UPDATE public.products 
SET 
    price_type = COALESCE(price_type, 'retail'),
    is_retail = COALESCE(is_retail, true),
    is_on_order = COALESCE(is_on_order, false),
    is_on_sale = COALESCE(is_on_sale, false)
WHERE price_type IS NULL 
   OR is_retail IS NULL 
   OR is_on_order IS NULL 
   OR is_on_sale IS NULL;

-- Проверка: вывести информацию о добавленных полях
SELECT 
    column_name, 
    data_type, 
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'products' 
  AND column_name IN ('price_type', 'is_retail', 'is_on_order', 'is_on_sale')
ORDER BY column_name;

