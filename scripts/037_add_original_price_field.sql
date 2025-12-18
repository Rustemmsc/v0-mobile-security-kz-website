-- Добавить поле original_price для товаров со скидкой
-- Это поле будет хранить оригинальную цену до скидки

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS original_price decimal(10, 2);

-- Комментарий к полю
COMMENT ON COLUMN public.products.original_price IS 'Оригинальная цена товара до скидки. Используется для отображения зачеркнутой старой цены на товарах со скидкой.';

