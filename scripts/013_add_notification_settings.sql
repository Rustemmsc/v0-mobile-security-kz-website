-- Add notification_settings column to admin_users table
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"order_notifications": true, "low_stock_notifications": true}'::jsonb;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_admin_users_notification_settings ON admin_users USING gin(notification_settings);

SELECT jsonb_build_object(
  'status', 'Notification settings column added successfully'
);
