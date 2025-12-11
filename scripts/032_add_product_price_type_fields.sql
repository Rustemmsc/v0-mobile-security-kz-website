-- Добавить поля для типа цены и статусов товара
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price_type text DEFAULT 'retail' CHECK (price_type IN ('retail', 'on_order', 'sale')),
ADD COLUMN IF NOT EXISTS is_retail boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS is_on_order boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_on_sale boolean DEFAULT false;

