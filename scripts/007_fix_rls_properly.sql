-- Fix RLS policies to remove infinite recursion
-- This script completely removes all problematic policies and creates simple ones

-- Disable RLS temporarily to clean up
ALTER TABLE IF EXISTS admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_content DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS admin_all_access ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS admin_select ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS admin_insert ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS admin_update ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS admin_delete ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS select_policy ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS insert_policy ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS update_policy ON ' || r.tablename;
        EXECUTE 'DROP POLICY IF EXISTS delete_policy ON ' || r.tablename;
    END LOOP;
END $$;

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create simple policies that don't cause recursion
-- Key: Use auth.uid() directly, NOT subqueries to admin_users

-- Admin users table: authenticated users can read their own row
CREATE POLICY "admin_users_select" ON admin_users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "admin_users_insert" ON admin_users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_users_update" ON admin_users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Products: any authenticated user can do everything
CREATE POLICY "products_all" ON products
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Categories: any authenticated user can do everything
CREATE POLICY "categories_all" ON product_categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Orders: any authenticated user can do everything
CREATE POLICY "orders_all" ON orders
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Site content: any authenticated user can do everything
CREATE POLICY "site_content_all" ON site_content
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Return success message
SELECT 'RLS policies fixed - no more recursion!' as status;
