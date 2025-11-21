-- Create backups table for storing database snapshots
CREATE TABLE IF NOT EXISTS backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data JSONB NOT NULL,
  tables_count INTEGER NOT NULL DEFAULT 0,
  notes TEXT
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_backups_created_at ON backups(created_at DESC);

-- Enable RLS
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Allow authenticated users full access to backups"
ON backups
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create automatic cleanup function (keep only last 7 days of backups)
CREATE OR REPLACE FUNCTION cleanup_old_backups()
RETURNS void AS $$
BEGIN
  DELETE FROM backups
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

SELECT json_build_object(
  'status', 'Backups table created successfully',
  'note', 'Automatic backups will be kept for 7 days'
);
