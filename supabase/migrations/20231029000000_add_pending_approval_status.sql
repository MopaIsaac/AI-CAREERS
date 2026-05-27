-- Add pending_approval to jobs status
-- Note: In a real Supabase environment, you would run this in the SQL editor or via CLI.
-- We are using a named constraint if possible, but since it was anonymous, we'll try to handle it.

DO $$ 
BEGIN
    -- Try to drop the anonymous constraint by looking it up, or just drop and recreate if we know the name
    -- For this exercise, we will assume we can recreate the check constraint.
    ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_status_check;
    ALTER TABLE jobs ADD CONSTRAINT jobs_status_check CHECK (status IN ('draft', 'pending_approval', 'published', 'filled', 'archived'));
END $$;
