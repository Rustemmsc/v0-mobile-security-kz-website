-- Create site_settings table for storing configuration values
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  category TEXT DEFAULT 'general',
  language TEXT DEFAULT 'ru',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(key, language)
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site settings
CREATE POLICY "Anyone can view site settings"
  ON site_settings
  FOR SELECT
  USING (true);

-- Allow authenticated users to manage settings
CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert contact information for all languages
INSERT INTO site_settings (key, value, type, category, language, description) VALUES
  -- Russian
  ('company_address', 'Проспект Туран, 54 НП3, Астана, Казахстан', 'text', 'contact', 'ru', 'Адрес компании'),
  ('company_phone', '+7 (778) 975-55-55', 'text', 'contact', 'ru', 'Основной телефон'),
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'ru', 'Телефон техподдержки'),
  ('company_email', 'info@mobilesecurity.kz', 'text', 'contact', 'ru', 'Email компании'),
  
  -- English
  ('company_address', 'Turan Avenue, 54 NP3, Astana, Kazakhstan', 'text', 'contact', 'en', 'Company address'),
  ('company_phone', '+7 (778) 975-55-55', 'text', 'contact', 'en', 'Main phone'),
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'en', 'Support phone'),
  ('company_email', 'info@mobilesecurity.kz', 'text', 'contact', 'en', 'Company email'),
  
  -- Kazakh
  ('company_address', 'Тұран даңғылы, 54 НП3, Астана, Қазақстан', 'text', 'contact', 'kk', 'Компания мекенжайы'),
  ('company_phone', '+7 (778) 975-55-55', 'text', 'contact', 'kk', 'Негізгі телефон'),
  ('company_phone_support', '+7 (778) 340-00-00', 'text', 'contact', 'kk', 'Техникалық қолдау телефоны'),
  ('company_email', 'info@mobilesecurity.kz', 'text', 'contact', 'kk', 'Компания email')
ON CONFLICT (key, language) DO UPDATE 
  SET value = EXCLUDED.value,
      updated_at = NOW();
