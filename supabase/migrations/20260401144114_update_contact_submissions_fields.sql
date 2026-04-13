/*
  # Update contact_submissions table with new fields

  1. Changes
    - Add `services` column (text array) - Selected services (Website, KI-Chatbot, Voice Agent, Automatisierung)
    - Add `company` column (text) - Company name and industry
    - Add `preferred_time` column (text) - Preferred time for a call (Diese Woche, Nächste Woche, Flexibel)
    - Make `message` column nullable since it's no longer used

  2. Notes
    - Existing data is preserved
    - New columns allow null for backwards compatibility
*/

ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS preferred_time text;

ALTER TABLE contact_submissions 
ALTER COLUMN message DROP NOT NULL;
