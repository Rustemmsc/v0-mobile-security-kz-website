-- Check current product images
SELECT 
  id,
  name_ru,
  images,
  CASE 
    WHEN images IS NULL THEN 'NULL'
    WHEN array_length(images, 1) IS NULL THEN 'Empty array'
    WHEN array_length(images, 1) = 0 THEN 'Zero length'
    ELSE 'Has ' || array_length(images, 1)::text || ' image(s)'
  END as image_status
FROM products
ORDER BY created_at DESC;
