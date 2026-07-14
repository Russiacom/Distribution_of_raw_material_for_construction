const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const connectionConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 'password',
};

const dbName = process.env.DB_NAME || 'raw_materials_db';

async function setupDatabase() {
  console.log('🔧 Starting database setup...');

  // Step 1: Create database if it doesn't exist
  console.log('\n📊 Creating database...');
  const client = new Client(connectionConfig);

  try {
    await client.connect();
    
    // Check if database exists
    const result = await client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`✓ Creating database: ${dbName}`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log('✓ Database created successfully');
    } else {
      console.log(`✓ Database ${dbName} already exists`);
    }

    await client.end();
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
    process.exit(1);
  }

  // Step 2: Connect to the new database and run schema
  console.log('\n📝 Running schema initialization...');
  const dbClient = new Client({
    ...connectionConfig,
    database: dbName,
  });

  try {
    await dbClient.connect();

    // Read and execute init.sql
    const initSql = fs.readFileSync(
      path.join(__dirname, 'init.sql'),
      'utf-8'
    );

    // Split by semicolon and execute each statement
    const statements = initSql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      try {
        await dbClient.query(statement);
      } catch (err) {
        if (!err.message.includes('already exists')) {
          console.error('❌ Error executing statement:', err.message);
          throw err;
        }
      }
    }

    console.log('✓ Schema initialized successfully');
    await dbClient.end();
  } catch (err) {
    console.error('❌ Error running schema:', err.message);
    process.exit(1);
  }

  // Step 3: Optionally seed sample data
  console.log('\n🌱 Do you want to seed sample data? (requires manual confirmation)');
  console.log('To seed data, run: npm run seed');

  console.log('\n✅ Database setup completed successfully!');
  console.log(`📍 Database: ${dbName}`);
  console.log(`🔗 Connect string: postgresql://${connectionConfig.user}:****@${connectionConfig.host}:${connectionConfig.port}/${dbName}`);
  console.log('\n⚡ Next steps:');
  console.log('1. Update .env with your database credentials if different');
  console.log('2. Run "npm run dev" to start the server');
  console.log('3. Test with: curl http://localhost:5000/api/health');
}

setupDatabase().catch(console.error);
