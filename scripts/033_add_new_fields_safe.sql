-- Безопасный скрипт для добавления новых полей
-- Этот скрипт можно выполнять даже если таблицы уже существуют

-- Добавить поле image в таблицу product_categories (если еще не существует)
ALTER TABLE public.product_categories 
ADD COLUMN IF NOT EXISTS image text;

-- Добавить поля для типа цены и статусов товара (если еще не существуют)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price_type text DEFAULT 'retail';

-- Добавить CHECK constraint для price_type (если еще не существует)
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

-- Добавить остальные поля для товаров
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_retail boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS is_on_order boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_on_sale boolean DEFAULT false;

