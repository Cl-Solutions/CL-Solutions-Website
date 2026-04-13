/*
  # Fix RLS Policy for contact_submissions

  1. Security Changes
    - Drop the existing unrestricted INSERT policy
    - Create a new INSERT policy with proper validation
    - The policy now requires:
      - Valid email format (basic check)
      - Non-empty name
      - Non-empty company

  2. Notes
    - Contact form submissions are public (anonymous users can submit)
    - But we add data validation to prevent empty/spam submissions
*/

DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

CREATE POLICY "Validated anonymous contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL 
    AND email <> '' 
    AND email LIKE '%@%.%'
    AND name IS NOT NULL 
    AND name <> ''
    AND company IS NOT NULL
    AND company <> ''
  );
