const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employeemanager_db',
  password: process.env.DB_PASSWORD,
  port: 5432,
  idleTimeoutMillis: 300
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

module.exports = { pool, connectToDb };