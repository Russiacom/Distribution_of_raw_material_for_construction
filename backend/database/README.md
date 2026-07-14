# Database Setup Guide

This guide explains how to set up the PostgreSQL database for the Raw Materials Distribution Platform.

## Prerequisites

- PostgreSQL installed (v12 or higher)
- psql command-line tool available
- Access to create databases and run SQL scripts

## Database Setup Steps

### Step 1: Create the Database

Open a terminal and connect to PostgreSQL as the postgres user:

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE raw_materials_db;
```

Exit psql:

```sql
\q
```

### Step 2: Run the Schema Initialization

Initialize the database schema by running the `init.sql` file:

```bash
psql -U postgres -d raw_materials_db -f backend/database/init.sql
```

This will create all tables with proper relationships and indexes.

### Step 3: Load Sample Data (Optional)

To populate the database with sample data for testing:

```bash
psql -U postgres -d raw_materials_db -f backend/database/seed.sql
```

This creates:
- 10 product categories
- 5 warehouse/distribution locations
- 15 sample products (raw materials)
- Inventory records across locations
- Pricing tiers for bulk purchases
- Sample users (admin, customers, suppliers)
- Sample quotes and orders
- Contact inquiries

## Database Schema Overview

### Core Tables

1. **users** - User accounts (customers, admin, suppliers)
2. **categories** - Product categories (Cement, Aggregates, Steel, etc.)
3. **products** - Raw materials inventory
4. **locations** - Warehouses and branches
5. **inventory** - Product quantity per location
6. **pricing** - Variable pricing and bulk discounts
7. **quotes** - Customer quotation requests
8. **quote_items** - Line items in quotes
9. **orders** - Customer orders
10. **order_items** - Line items in orders
11. **contacts** - Contact form submissions

### Key Relationships

- `products` → `categories` (many-to-one)
- `inventory` → `products` + `locations` (many-to-many junction)
- `quotes` → `customers` (many-to-one)
- `orders` → `customers` (many-to-one)
- `pricing` → `products` (one-to-many)

## Accessing the Database

### From Node.js

The backend is configured to connect via `backend/config/database.js` using the Pool from `pg` package.

Environment variables (set in `.env`):
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=raw_materials_db
DB_PASSWORD=your_password_here
DB_PORT=5432
```

### From Command Line

Connect to the database:

```bash
psql -U postgres -d raw_materials_db
```

Useful psql commands:
```sql
\dt                  -- List all tables
\d table_name        -- Describe table structure
\df                  -- List functions
SELECT * FROM users; -- Query example
```

## Backup and Restore

### Backup the Database

```bash
pg_dump -U postgres -d raw_materials_db > backup.sql
```

### Restore from Backup

```bash
psql -U postgres -d raw_materials_db < backup.sql
```

## Troubleshooting

**Issue: "role does not exist"**
- Ensure you're using a valid PostgreSQL user. Default is `postgres`.

**Issue: "database does not exist"**
- Create the database first using `CREATE DATABASE raw_materials_db;`

**Issue: "could not connect to server"**
- Ensure PostgreSQL is running
- Check connection parameters in `.env`

**Issue: "permission denied"**
- Check that the user has proper permissions to create tables

## Next Steps

Once the database is set up:
1. Configure the `.env` file with your database credentials
2. Start the backend server: `npm run dev`
3. Test the API: `GET /api/health`
4. Create API endpoints for database operations
5. Build the frontend

## Sample Queries

Get all products:
```sql
SELECT p.id, p.name, p.sku, c.name as category, p.base_price 
FROM products p 
JOIN categories c ON p.category_id = c.id;
```

Get inventory for a location:
```sql
SELECT p.name, i.available_quantity, i.reserved_quantity
FROM inventory i
JOIN products p ON i.product_id = p.id
WHERE i.location_id = 1;
```

Get recent orders:
```sql
SELECT o.order_number, u.company_name, o.total_amount, o.order_status, o.created_at
FROM orders o
JOIN users u ON o.customer_id = u.id
ORDER BY o.created_at DESC
LIMIT 10;
```
