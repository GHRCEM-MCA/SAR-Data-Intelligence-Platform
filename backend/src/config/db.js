const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.dbUrl,
  ssl: env.dbSsl ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => console.error('Unexpected PG pool error', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
