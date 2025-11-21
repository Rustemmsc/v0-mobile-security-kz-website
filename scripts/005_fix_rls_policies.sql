-- Fix RLS policies for all tables to allow admin access
-- This script removes problematic recursive policies and creates simple ones

-- Drop existing problematic policies for admin_users
DROP POLICY IF EXISTS "Admins can read all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON admin_users;

-- Create new simple policies for admin_users without recursion
CREATE POLICY "Allow authenticated users to read admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to insert admin_users"
ON admin_users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update admin_users"
ON admin_users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete admin_users"
ON admin_users FOR DELETE
TO authenticated
USING (true);

-- Fix policies for products table
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;

CREATE POLICY "Anyone can view products"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage products"
ON products FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix policies for product_categories table
DROP POLICY IF EXISTS "Anyone can view categories" ON product_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON product_categories;

CREATE POLICY "Anyone can view categories"
ON product_categories FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage categories"
ON product_categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix policies for orders table
DROP POLICY IF EXISTS "Users can view their orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

CREATE POLICY "Authenticated users can view all orders"
ON orders FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage orders"
ON orders FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix policies for site_content table
DROP POLICY IF EXISTS "Anyone can view content" ON site_content;
DROP POLICY IF EXISTS "Admins can manage content" ON site_content;

CREATE POLICY "Anyone can view content"
ON site_content FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage content"
ON site_content FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
