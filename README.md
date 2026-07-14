# Raw Materials Distribution Platform

A web-based platform for distributing raw materials for construction, featuring product catalog, location finder, pricing/quotes, and ordering system.

## Project Structure

```
├── backend/          - Node.js + Express API
│   ├── config/       - Database configuration
│   ├── models/       - Data models/schemas
│   ├── controllers/  - Business logic
│   ├── routes/       - API endpoints
│   └── server.js     - Express app entry point
├── frontend/         - React web application
└── docs/             - Documentation
```

## Technology Stack

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Frontend**: React
- **Language**: JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your PostgreSQL credentials

5. **Setup Database**:
   ```bash
   npm run setup-db
   ```
   This will:
   - Create the `raw_materials_db` database
   - Initialize all tables and relationships
   - Create indexes for performance

6. **Load Sample Data (Optional)**:
   ```bash
   npm run seed
   ```
   This populates the database with sample categories, products, locations, and test data.

7. Start the server:
   ```bash
   npm run dev
   ```

   The API will be available at: `http://localhost:5000`

### Database Documentation

Detailed database schema, relationships, and setup instructions are in:
- [Database Setup Guide](backend/database/README.md)
- [Database Schema Documentation](backend/database/SCHEMA.md)

### Database Setup (Manual Alternative)

If you prefer manual setup:

1. Create a PostgreSQL database:
   ```bash
   createdb raw_materials_db
   ```

2. Run database migrations:
   ```bash
   psql -U postgres -d raw_materials_db -f backend/database/init.sql
   ```

3. Load sample data:
   ```bash
   psql -U postgres -d raw_materials_db -f backend/database/seed.sql
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Features (To Be Implemented)

- ✅ Backend structure
- 🔄 Product catalog browsing
- 🔄 Search and filters
- 🔄 Location/branch finder
- 🔄 Pricing and quotes system
- 🔄 User authentication
- 🔄 Contact and order forms
- 🔄 Admin dashboard

## Available Endpoints

### Health Check
- `GET /api/health` - Check if API is running

(More endpoints coming soon)

## Available NPM Scripts

**Backend Scripts:**
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run setup-db` - Create database and initialize schema
- `npm run seed` - Load sample data into database
- `npm test` - Run tests (coming soon)

## Environment Variables

See `.env.example` for required environment variables:

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=raw_materials_db
DB_PASSWORD=your_password_here
DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=development
```

## License

ISC
