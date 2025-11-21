-- Drop existing problematic policies
DROP POLICY IF EXISTS "Allow service role full access" ON admin_users;
DROP POLICY IF EXISTS "Allow authenticated users to read admins" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to manage admins" ON admin_users;

-- Disable RLS temporarily to allow first admin creation
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow INSERT if no admins exist (for first admin setup)
CREATE POLICY "Allow first admin creation"
ON admin_users
FOR INSERT
WITH CHECK (
  NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1)
);

-- Policy 2: Allow service role to do anything (bypasses RLS)
CREATE POLICY "Service role full access"
ON admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 3: Allow authenticated admins to read all admin_users
CREATE POLICY "Admins can read all admins"
ON admin_users
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin')
  )
);

-- Policy 4: Allow super_admins to manage other admins
CREATE POLICY "Super admins can manage admins"
ON admin_users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  )
);
