-- Создать RPC функцию для обновления товара
-- Эта функция обходит кэш схемы Supabase

CREATE OR REPLACE FUNCTION update_product_with_new_fields(
  p_id uuid,
  p_name_ru text,
  p_name_kk text,
  p_name_en text,
  p_description_ru text,
  p_description_kk text,
  p_description_en text,
  p_price decimal,
  p_currency text,
  p_sku text,
  p_stock_quantity int,
  p_category_id uuid,
  p_images text[],
  p_brand text,
  p_model text,
  p_is_in_stock boolean,
  p_is_active boolean,
  p_price_type text DEFAULT NULL,
  p_is_retail boolean DEFAULT NULL,
  p_is_on_order boolean DEFAULT NULL,
  p_is_on_sale boolean DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Обновляем товар, включая новые поля
  UPDATE products
  SET
    name_ru = p_name_ru,
    name_kk = p_name_kk,
    name_en = p_name_en,
    description_ru = p_description_ru,
    description_kk = p_description_kk,
    description_en = p_description_en,
    price = p_price,
    currency = p_currency,
    sku = p_sku,
    stock_quantity = p_stock_quantity,
    category_id = p_category_id,
    images = p_images,
    brand = p_brand,
    model = p_model,
    is_in_stock = p_is_in_stock,
    is_active = p_is_active,
    price_type = COALESCE(p_price_type, price_type),
    is_retail = COALESCE(p_is_retail, is_retail),
    is_on_order = COALESCE(p_is_on_order, is_on_order),
    is_on_sale = COALESCE(p_is_on_sale, is_on_sale),
    updated_at = now()
  WHERE id = p_id;
  
  -- Возвращаем обновленный товар
  SELECT to_jsonb(p.*) INTO result
  FROM products p
  WHERE p.id = p_id;
  
  RETURN result;
END;
$$;

-- Даем права на выполнение функции
GRANT EXECUTE ON FUNCTION update_product_with_new_fields TO authenticated;
GRANT EXECUTE ON FUNCTION update_product_with_new_fields TO anon;

