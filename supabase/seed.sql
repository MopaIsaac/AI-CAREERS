-- Seed data for companies
INSERT INTO companies (id, name, website, description, location) VALUES
  ('c1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'AI Innovations', 'https://ai-innovations.com', 'Leading the way in AI research.', 'London, UK'),
  ('c2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'Future Tech', 'https://futuretech.io', 'Building the future with LLMs.', 'Remote');

-- Seed data for jobs
INSERT INTO jobs (company_id, title, description, salary_range, location, type, remote_option, status, is_featured) VALUES
  ('c1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'Prompt Engineer', 'Expert in crafting prompts for LLMs.', '£60k - £90k', 'London, UK', 'Full-time', 'Hybrid', 'published', true),
  ('c2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'AI Product Manager', 'Managing AI-driven product lifecycles.', '£80k - £120k', 'Remote', 'Full-time', 'Remote', 'published', false),
  ('c1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'LLM Developer', 'Developing robust LLM applications.', '£70k - £100k', 'London, UK', 'Contract', 'On-site', 'published', false);
