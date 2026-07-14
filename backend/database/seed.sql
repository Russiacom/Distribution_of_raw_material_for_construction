-- Sample Data for Raw Materials Distribution Platform

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Cement & Concrete', 'Cement, concrete mixtures, and related products'),
('Aggregates', 'Sand, gravel, crushed stone, and aggregate materials'),
('Steel & Metal', 'Steel reinforcement, metal bars, and structural steel'),
('Bricks & Blocks', 'Bricks, concrete blocks, and masonry units'),
('Wood & Lumber', 'Timber, plywood, and wood products'),
('Roofing Materials', 'Tiles, shingles, membranes, and roofing supplies'),
('Insulation', 'Foam, fiberglass, mineral wool, and insulation materials'),
('Electrical Supplies', 'Wiring, conduits, panels, and electrical materials'),
('Plumbing Supplies', 'Pipes, fittings, valves, and plumbing materials'),
('Paint & Coatings', 'Paints, primers, sealants, and coating products')
ON CONFLICT DO NOTHING;

-- Insert Sample Locations
INSERT INTO locations (name, address, city, state_province, postal_code, country, latitude, longitude, phone, email, location_type) VALUES
('Main Warehouse - New York', '123 Industrial Blvd', 'New York', 'NY', '10001', 'USA', 40.7128, -74.0060, '(212) 555-0101', 'ny@raw-materials.com', 'warehouse'),
('Los Angeles Distribution Center', '456 Commerce St', 'Los Angeles', 'CA', '90001', 'USA', 34.0522, -118.2437, '(213) 555-0202', 'la@raw-materials.com', 'distribution_center'),
('Chicago Branch', '789 Market Ave', 'Chicago', 'IL', '60601', 'USA', 41.8781, -87.6298, '(312) 555-0303', 'chicago@raw-materials.com', 'branch'),
('Houston Warehouse', '321 Supply St', 'Houston', 'TX', '77001', 'USA', 29.7604, -95.3698, '(713) 555-0404', 'houston@raw-materials.com', 'warehouse'),
('Miami Branch', '654 Trade Rd', 'Miami', 'FL', '33101', 'USA', 25.7617, -80.1918, '(305) 555-0505', 'miami@raw-materials.com', 'branch')
ON CONFLICT DO NOTHING;

-- Insert Sample Products
INSERT INTO products (name, sku, category_id, description, unit_of_measure, base_price) VALUES
('Portland Cement - 50kg Bag', 'CEMENT-001', 1, 'High-quality Portland cement for general construction', 'bag', 12.50),
('Ready Mix Concrete - Premium Grade', 'CONCRETE-001', 1, 'Pre-mixed concrete ready for use', 'm³', 125.00),
('Coarse Sand - Construction Grade', 'SAND-001', 2, 'Washed coarse sand for concrete and mortar', 'ton', 35.00),
('Gravel 20mm', 'GRAVEL-001', 2, '20mm washed gravel for aggregate', 'ton', 45.00),
('Steel Reinforcement Bar 12mm', 'STEEL-001', 3, 'High-tensile steel rebar for reinforcement', 'ton', 650.00),
('Structural Steel Beam (I-Beam) 200x100', 'BEAM-001', 3, 'I-shaped structural steel beam', 'ton', 850.00),
('Red Clay Bricks - Standard', 'BRICK-001', 4, 'Standard size clay bricks for masonry', '1000 pcs', 280.00),
('Concrete Blocks 200x200x400mm', 'BLOCK-001', 4, 'Hollow concrete blocks for walls', '100 pcs', 120.00),
('Plywood 18mm - 4x8ft', 'PLYWOOD-001', 5, 'Exterior grade plywood sheets', 'sheet', 45.00),
('Softwood Lumber 2x4x8ft', 'LUMBER-001', 5, 'Standard softwood dimensional lumber', 'piece', 8.50),
('Clay Roof Tiles - Spanish Style', 'TILE-001', 6, 'Traditional clay roof tiles', '100 pcs', 350.00),
('Fiberglass Insulation Batts R-19', 'INSUL-001', 7, '6-inch fiberglass insulation rolls', '100 sq ft', 65.00),
('Electrical Wire 10mm² - 100m Coil', 'WIRE-001', 8, 'Multi-strand copper electrical wire', 'coil', 85.00),
('PVC Pipe 50mm - 6m Length', 'PIPE-001', 9, 'Schedule 40 PVC drainage pipe', 'piece', 22.00),
('Acrylic Paint - Interior White 20L', 'PAINT-001', 10, 'High-quality interior acrylic paint', 'bucket', 95.00)
ON CONFLICT DO NOTHING;

-- Insert Sample Inventory
INSERT INTO inventory (product_id, location_id, available_quantity, reserved_quantity) VALUES
(1, 1, 5000, 500),      -- Cement in NY warehouse
(2, 1, 150, 20),        -- Concrete in NY warehouse
(3, 2, 2000, 200),      -- Sand in LA distribution center
(4, 2, 1500, 150),      -- Gravel in LA distribution center
(5, 1, 200, 50),        -- Steel bars in NY warehouse
(6, 3, 100, 10),        -- Beams in Chicago branch
(7, 2, 50000, 5000),    -- Bricks in LA
(8, 3, 30000, 3000),    -- Blocks in Chicago
(9, 4, 2000, 200),      -- Plywood in Houston
(10, 4, 5000, 500),     -- Lumber in Houston
(1, 2, 3000, 300),      -- Cement in LA
(3, 1, 1000, 100)       -- Sand in NY
ON CONFLICT DO NOTHING;

-- Insert Sample Pricing
INSERT INTO pricing (product_id, location_id, unit_price, min_quantity, max_quantity, discount_percentage) VALUES
(1, 1, 12.50, 0, 100, 0),
(1, 1, 12.00, 100, 500, 4),
(1, 1, 11.50, 500, 5000, 8),
(2, 1, 125.00, 0, 10, 0),
(2, 1, 120.00, 10, 50, 4),
(3, 2, 35.00, 0, 50, 0),
(3, 2, 33.00, 50, 200, 6),
(5, 1, 650.00, 0, 1, 0),
(5, 1, 620.00, 1, 5, 5),
(7, 2, 280.00, 0, 100, 0),
(7, 2, 260.00, 100, 500, 7)
ON CONFLICT DO NOTHING;

-- Insert Sample Users
INSERT INTO users (email, password_hash, first_name, last_name, phone, company_name, user_type) VALUES
('admin@raw-materials.com', '$2b$10$hash123', 'Admin', 'User', '(555) 000-0001', 'Raw Materials Dist', 'admin'),
('customer1@construction.com', '$2b$10$hash456', 'John', 'Smith', '(555) 111-0001', 'ABC Construction', 'customer'),
('customer2@construction.com', '$2b$10$hash789', 'Sarah', 'Johnson', '(555) 222-0001', 'XYZ Builders', 'customer'),
('supplier1@materials.com', '$2b$10$hash012', 'Mike', 'Chen', '(555) 333-0001', 'Premium Cement Co', 'supplier')
ON CONFLICT (email) DO NOTHING;

-- Insert Sample Quotes
INSERT INTO quotes (quote_number, customer_id, location_id, subtotal, tax_amount, shipping_cost, total_amount, quote_status, delivery_method, delivery_location) VALUES
('Q-2024-001', 2, 1, 5000.00, 500.00, 250.00, 5750.00, 'sent', 'delivery', '789 Main St, New York, NY 10001'),
('Q-2024-002', 3, 2, 15000.00, 1500.00, 0.00, 16500.00, 'viewed', 'pickup', NULL),
('Q-2024-003', 2, 1, 8500.00, 850.00, 500.00, 9850.00, 'draft', 'delivery', '100 Construction Ave, New York, NY 10002')
ON CONFLICT DO NOTHING;

-- Insert Sample Quote Items
INSERT INTO quote_items (quote_id, product_id, quantity, unit_price, line_total) VALUES
(1, 1, 200, 12.00, 2400.00),
(1, 3, 50, 35.00, 1750.00),
(1, 9, 100, 45.00, 4500.00),
(2, 5, 5, 650.00, 3250.00),
(2, 7, 500, 280.00, 140000.00),
(3, 2, 25, 120.00, 3000.00),
(3, 10, 500, 8.50, 4250.00)
ON CONFLICT DO NOTHING;

-- Insert Sample Contacts
INSERT INTO contacts (name, email, phone, company_name, subject, message, location_id, contact_status) VALUES
('Robert Brown', 'robert@example.com', '(555) 444-0001', 'Brown Construction Ltd', 'Bulk Order Inquiry', 'We need a large quantity of cement for our upcoming project', 1, 'new'),
('Patricia Davis', 'patricia@example.com', '(555) 555-0001', 'Davis Builders', 'Delivery Question', 'When can we receive our order?', 2, 'read'),
('James Wilson', 'james@example.com', '(555) 666-0001', 'Wilson Contractors', 'Product Specification', 'Need technical details on the steel reinforcement bars', 3, 'responded')
ON CONFLICT DO NOTHING;
