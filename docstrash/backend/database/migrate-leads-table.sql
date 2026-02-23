-- ============================================================================
-- MIGRATION: Add missing fields to leads table
-- ============================================================================

-- Add missing columns to leads table if they don't exist
ALTER TABLE leads ADD COLUMN salary VARCHAR(100) DEFAULT NULL AFTER message;
ALTER TABLE leads ADD COLUMN employment_status VARCHAR(100) DEFAULT NULL AFTER salary;
ALTER TABLE leads ADD COLUMN project_name VARCHAR(255) DEFAULT NULL AFTER employment_status;

-- Verify the new structure
DESC leads;
