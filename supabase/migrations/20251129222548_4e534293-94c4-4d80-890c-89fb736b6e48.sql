-- Add sector column to organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS sector TEXT;

-- Assign sectors based on organization names
UPDATE organizations SET sector = 'Automotive' WHERE name ILIKE '%Auto%' OR name ILIKE '%Motor%';
UPDATE organizations SET sector = 'Energy' WHERE name ILIKE '%Energy%' OR name ILIKE '%Solar%' OR name ILIKE '%Wind%';
UPDATE organizations SET sector = 'Pharma' WHERE name ILIKE '%Pharma%' OR name ILIKE '%Bio%' OR name ILIKE '%Lab%' OR name ILIKE '%Health%';
UPDATE organizations SET sector = 'Retail' WHERE name ILIKE '%Retail%' OR name ILIKE '%Fashion%' OR name ILIKE '%Market%';
UPDATE organizations SET sector = 'Construction' WHERE name ILIKE '%Construct%' OR name ILIKE '%Build%';
UPDATE organizations SET sector = 'Finance' WHERE name ILIKE '%Bank%' OR name ILIKE '%Capital%' OR name ILIKE '%Invest%';
UPDATE organizations SET sector = 'Logistics' WHERE name ILIKE '%Logistics%' OR name ILIKE '%Transport%' OR name ILIKE '%Port%';
UPDATE organizations SET sector = 'AgriFood' WHERE name ILIKE '%Agri%' OR name ILIKE '%Food%';
UPDATE organizations SET sector = 'Aerospace' WHERE name ILIKE '%Aero%' OR name ILIKE '%Space%';
UPDATE organizations SET sector = 'Tech' WHERE sector IS NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_organizations_sector ON organizations(sector);