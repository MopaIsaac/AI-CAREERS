-- Add payment columns to jobs table
ALTER TABLE jobs ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed'));
ALTER TABLE jobs ADD COLUMN stripe_session_id TEXT;
