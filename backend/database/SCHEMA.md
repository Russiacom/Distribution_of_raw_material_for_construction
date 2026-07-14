# Database Schema Documentation

## Schema Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE SCHEMA                            │
└─────────────────────────────────────────────────────────────────┘

                           [users]
                        (id, email, 
                      company_name, 
                       user_type)
                             │
                    ┌────────┼────────┐
                    │        │        │
                    ▼        ▼        ▼
              [orders]  [quotes]  [contacts]
              (customer) (customer) (location_id)
                    │        │
                    ▼        ▼
            [order_items] [quote_items]
                    │        │
                    └────────┴─────────┬──────────────────┐
                                       │                  │
                                  [products] ◄─────────────┘
                                  (sku, name,
                                  category_id)
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
               [categories]        [inventory]        [pricing]
               (name, desc)    (product_id,      (product_id,
                              location_id)      location_id)
                                    │
                                    ▼
                              [locations]
                          (name, address,
                           city, country)
```

## Table Details

### USERS
```sql
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE NOT NULL
password_hash   VARCHAR(255) NOT NULL
first_name      VARCHAR(100)
last_name       VARCHAR(100)
phone           VARCHAR(20)
company_name    VARCHAR(255)
user_type       VARCHAR(50) -- 'customer', 'admin', 'supplier'
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### CATEGORIES
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(100) UNIQUE NOT NULL
description     TEXT
icon_url        VARCHAR(255)
created_at      TIMESTAMP
```

**Sample Categories:**
- Cement & Concrete
- Aggregates
- Steel & Metal
- Bricks & Blocks
- Wood & Lumber
- Roofing Materials
- Insulation
- Electrical Supplies
- Plumbing Supplies
- Paint & Coatings

### PRODUCTS
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
sku             VARCHAR(100) UNIQUE NOT NULL
category_id     INTEGER REFERENCES categories(id)
description     TEXT
unit_of_measure VARCHAR(50) -- 'kg', 'ton', 'bag', 'm³', 'piece', etc.
base_price      DECIMAL(10, 2)
stock_quantity  DECIMAL(15, 2)
reorder_level   DECIMAL(15, 2)
supplier_id     INTEGER REFERENCES users(id)
is_active       BOOLEAN DEFAULT TRUE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Indexes:**
- idx_products_category (for category filtering)
- idx_products_sku (for unique SKU lookup)

### LOCATIONS
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
address         VARCHAR(500) NOT NULL
city            VARCHAR(100) NOT NULL
state_province  VARCHAR(100)
postal_code     VARCHAR(20)
country         VARCHAR(100)
latitude        DECIMAL(10, 8)
longitude       DECIMAL(11, 8)
phone           VARCHAR(20)
email           VARCHAR(255)
manager_id      INTEGER REFERENCES users(id)
location_type   VARCHAR(50) -- 'warehouse', 'branch', 'distribution_center'
is_active       BOOLEAN DEFAULT TRUE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Indexes:**
- idx_locations_city (for location filtering)

### INVENTORY
```sql
id              SERIAL PRIMARY KEY
product_id      INTEGER REFERENCES products(id)
location_id     INTEGER REFERENCES locations(id)
available_quantity   DECIMAL(15, 2)
reserved_quantity    DECIMAL(15, 2)
damaged_quantity     DECIMAL(15, 2)
last_restocked       TIMESTAMP
created_at           TIMESTAMP
updated_at           TIMESTAMP
UNIQUE(product_id, location_id)
```

**Indexes:**
- idx_inventory_product (for product lookup)
- idx_inventory_location (for location lookup)

### PRICING
```sql
id              SERIAL PRIMARY KEY
product_id      INTEGER REFERENCES products(id)
location_id     INTEGER REFERENCES locations(id) [Optional]
unit_price      DECIMAL(10, 2) NOT NULL
min_quantity    DECIMAL(15, 2)
max_quantity    DECIMAL(15, 2)
discount_percentage DECIMAL(5, 2) DEFAULT 0
currency        VARCHAR(10) DEFAULT 'USD'
effective_from  DATE
effective_to    DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Purpose:**
- Support bulk pricing tiers
- Location-specific pricing
- Temporary discounts with date ranges
- Multiple currency support

### QUOTES
```sql
id              SERIAL PRIMARY KEY
quote_number    VARCHAR(50) UNIQUE NOT NULL
customer_id     INTEGER REFERENCES users(id)
location_id     INTEGER REFERENCES locations(id)
subtotal        DECIMAL(12, 2)
tax_amount      DECIMAL(12, 2)
shipping_cost   DECIMAL(12, 2)
total_amount    DECIMAL(12, 2)
quote_status    VARCHAR(50) -- 'draft', 'sent', 'viewed', 'rejected', 'accepted'
delivery_method VARCHAR(50) -- 'pickup', 'delivery'
delivery_location VARCHAR(500)
notes           TEXT
expires_at      DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Indexes:**
- idx_quotes_customer (to get customer's quotes)
- idx_quotes_status (to filter by quote status)

### QUOTE_ITEMS
```sql
id              SERIAL PRIMARY KEY
quote_id        INTEGER REFERENCES quotes(id)
product_id      INTEGER REFERENCES products(id)
quantity        DECIMAL(15, 2) NOT NULL
unit_price      DECIMAL(10, 2) NOT NULL
line_total      DECIMAL(12, 2)
created_at      TIMESTAMP
```

**Note:** Line items represent products in a quote

### ORDERS
```sql
id              SERIAL PRIMARY KEY
order_number    VARCHAR(50) UNIQUE NOT NULL
customer_id     INTEGER REFERENCES users(id)
quote_id        INTEGER REFERENCES quotes(id) [Optional]
location_id     INTEGER REFERENCES locations(id)
subtotal        DECIMAL(12, 2)
tax_amount      DECIMAL(12, 2)
shipping_cost   DECIMAL(12, 2)
total_amount    DECIMAL(12, 2)
order_status    VARCHAR(50) -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
delivery_method VARCHAR(50) -- 'pickup', 'delivery'
delivery_address VARCHAR(500)
delivery_date   DATE
tracking_number VARCHAR(100)
notes           TEXT
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Indexes:**
- idx_orders_customer (to get customer's orders)
- idx_orders_status (to filter by order status)

### ORDER_ITEMS
```sql
id              SERIAL PRIMARY KEY
order_id        INTEGER REFERENCES orders(id)
product_id      INTEGER REFERENCES products(id)
quantity        DECIMAL(15, 2) NOT NULL
unit_price      DECIMAL(10, 2) NOT NULL
line_total      DECIMAL(12, 2)
created_at      TIMESTAMP
```

### CONTACTS
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
email           VARCHAR(255) NOT NULL
phone           VARCHAR(20)
company_name    VARCHAR(255)
subject         VARCHAR(500)
message         TEXT NOT NULL
location_id     INTEGER REFERENCES locations(id)
contact_status  VARCHAR(50) -- 'new', 'read', 'responded', 'closed'
response_notes  TEXT
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Indexes:**
- idx_contacts_location (for location-based queries)
- idx_contacts_status (to filter contact status)

## Key Design Decisions

1. **Separate Inventory Table**: Allows tracking stock at multiple locations
2. **Pricing Table**: Supports:
   - Location-specific pricing
   - Bulk discounts based on quantity
   - Temporary promotional pricing with date ranges
   - Future currency support

3. **Quote System**: Allows customers to request quotes before ordering
   - Quotes can have an expiration date
   - Orders can reference quotes
   - Tracks quote status (draft, sent, viewed, accepted)

4. **Soft Deletes**: Uses `is_active` flags instead of hard deletes for data integrity

5. **Timestamps**: All tables have `created_at` and `updated_at` for audit trails

6. **Decimal Types**: Used for quantities and prices to avoid floating-point errors

7. **Flexible Delivery**: Supports both pickup and delivery options with location tracking

## Relationships Summary

| Parent Table | Child Table | Relationship | Purpose |
|---|---|---|---|
| users | products | One-to-Many | Suppliers can have multiple products |
| users | quotes | One-to-Many | Customers can have multiple quotes |
| users | orders | One-to-Many | Customers can have multiple orders |
| users | contacts | One-to-Many | Track contacts from customers |
| categories | products | One-to-Many | Products belong to categories |
| products | inventory | One-to-Many | Product stock across locations |
| products | pricing | One-to-Many | Multiple price points per product |
| products | quote_items | One-to-Many | Products in quotes |
| products | order_items | One-to-Many | Products in orders |
| locations | inventory | One-to-Many | Each location has inventory |
| locations | quotes | One-to-Many | Quotes tied to fulfillment location |
| locations | orders | One-to-Many | Orders tied to fulfillment location |
| quotes | quote_items | One-to-Many | Line items in quotes |
| quotes | orders | One-to-Many | Orders can reference quotes |
| orders | order_items | One-to-Many | Line items in orders |

## Query Examples

See [README.md](README.md) for common query examples.
