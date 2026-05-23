-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  location TEXT
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  salary_range TEXT,
  location TEXT,
  type TEXT CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  remote_option TEXT CHECK (remote_option IN ('Remote', 'Hybrid', 'On-site')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'filled', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  application_url TEXT
);

-- Job alerts table
CREATE TABLE job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  preferred_role_type TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for performance
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_job_alerts_email ON job_alerts(email);
