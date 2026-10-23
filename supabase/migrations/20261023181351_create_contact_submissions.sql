/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the prospect
  - `company` (text, not null) — company/empresa name
  - `email` (text, not null) — contact email
  - `whatsapp` (text, not null) — phone number with WhatsApp mask
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `contact_submissions`.
- Grant INSERT to `anon` + `authenticated` so the public form can submit.
- Allow anon + authenticated INSERT only (no reads from the frontend).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
