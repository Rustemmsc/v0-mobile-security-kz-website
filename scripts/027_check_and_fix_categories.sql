-- Проверка всех категорий в базе данных
SELECT 
    name_ru as "Название",
    is_active as "Активна",
    display_order as "Порядок",
    created_at as "Создана"
FROM public.product_categories
ORDER BY display_order;

-- Статистика
SELECT 
    COUNT(*) as "Всего",
    SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as "Активных",
    SUM(CASE WHEN NOT is_active THEN 1 ELSE 0 END) as "Скрытых"
FROM public.product_categories;

-- Активировать все категории если они были скрыты
UPDATE public.product_categories
SET is_active = true
WHERE is_active = false;

SELECT 'Все категории активированы' as "Результат";
