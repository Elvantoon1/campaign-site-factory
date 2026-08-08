const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'postgresql://campaign_factory_db_user:fqXZqeDCWNm6Yl3X2wuVI0V6qEBaudSh@dpg-d9rd6av10e5c73fpsqlg-a.oregon-postgres.render.com:5432/campaign_factory_db?sslmode=require';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000
});

async function runMigration() {
  const client = await pool.connect();
  try {
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, 'factory/migrations/001_factory_schema.sql'),
      'utf8'
    );
    
    await client.query(migrationSQL);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();