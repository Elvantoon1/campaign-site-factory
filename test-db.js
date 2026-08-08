const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://campaign_factory_db_user:fqXZqeDCWNm6Yl3X2wuVI0V6qEBaudSh@dpg-d9rd6av10e5c73fpsqlg-a.oregon-postgres.render.com:5432/campaign_factory_db?sslmode=require';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000
});

async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();