-- Update contact information in site_settings to correct values
UPDATE site_settings 
SET value = 'Проспект Туран, 54 НП3, Астана, Казахстан'
WHERE key = 'company_address' AND language = 'ru';

UPDATE site_settings 
SET value = 'Turan Avenue, 54 NP3, Astana, Kazakhstan'
WHERE key = 'company_address' AND language = 'en';

UPDATE site_settings 
SET value = 'Тұран даңғылы, 54 НП3, Астана, Қазақстан'
WHERE key = 'company_address' AND language = 'kk';

-- Update phone numbers (primary sales line)
UPDATE site_settings 
SET value = '+7 (778) 975-55-55'
WHERE key = 'company_phone' AND language IN ('ru', 'en', 'kk');

-- Add support phone if it doesn't exist
INSERT INTO site_settings (key, value, type, category, language, description)
VALUES 
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'ru', 'Телефон техподдержки'),
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'en', 'Support phone'),
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'kk', 'Техникалық қолдау телефоны')
ON CONFLICT (key, language) DO UPDATE SET value = EXCLUDED.value;
