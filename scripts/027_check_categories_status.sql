-- Проверка всех категорий в базе данных
-- Показывает сколько категорий существует и их статус

-- Показать все категории
SELECT 
    id,
    name_ru as "Название",
    is_active as "Активна",
    display_order as "Порядок",
    created_at as "Дата создания"
FROM public.product_categories
ORDER BY display_order;

-- Статистика по категориям
SELECT 
    COUNT(*) as "Всего категорий",
    SUM(CASE WHEN is_active = true THEN 1 ELSE 0 END) as "Активных",
    SUM(CASE WHEN is_active = false THEN 1 ELSE 0 END) as "Неактивных"
FROM public.product_categories;

-- Активировать ВСЕ категории (если они были деактивированы)
UPDATE public.product_categories
SET is_active = true
WHERE is_active = false;

-- Проверка RLS политик
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual as "Условие"
FROM pg_policies
WHERE tablename = 'product_categories';
