-- Добавить поле image в таблицу product_categories
ALTER TABLE public.product_categories 
ADD COLUMN IF NOT EXISTS image text;

