-- ============================================================================
-- MIGRATION: Add advisor column to leads table
-- Date: March 10, 2026
-- Description: Add advisor preference field to track which sales advisor
--              the client wants to be contacted by
-- ============================================================================

-- Add advisor column to leads table
ALTER TABLE leads 
ADD COLUMN advisor VARCHAR(100) NULL AFTER employment_status
COMMENT 'Preferred sales advisor selected by the client';

-- Create index for faster queries on advisor
CREATE INDEX idx_advisor ON leads(advisor);

-- Log the migration
SELECT 
    'Migration completed: advisor column added to leads table' AS Status,
    NOW() AS Timestamp;
