const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Read the seed.sql file
    const seedSql = fs.readFileSync(
      path.join(__dirname, 'seed.sql'),
      'utf-8'
    );

    // Split by semicolon and execute each statement
    const statements = seedSql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    let successCount = 0;
    let skipCount = 0;

    for (const statement of statements) {
      try {
        await pool.query(statement);
        successCount++;
      } catch (err) {
        if (err.message.includes('duplicate key') || err.message.includes('already exists')) {
          skipCount++;
        } else {
          console.error('❌ Error executing statement:', err.message);
          throw err;
        }
      }
    }

    console.log('✅ Database seeding completed!');
    console.log(`📊 Statements executed: ${successCount}`);
    if (skipCount > 0) {
      console.log(`⏭️  Statements skipped (duplicates): ${skipCount}`);
    }

    console.log('\n📝 Sample data loaded:');
    console.log('  • 10 product categories');
    console.log('  • 5 warehouse/distribution locations');
    console.log('  • 15 raw material products');
    console.log('  • Inventory records across locations');
    console.log('  • Pricing tiers for bulk purchases');
    console.log('  • 4 sample users');
    console.log('  • 3 sample quotes');
    console.log('  • 3 contact inquiries');

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    await pool.end();
    process.exit(1);
  }
}

seedDatabase();
