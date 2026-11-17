const env = require('./config/env');
const app = require('./app');
const db = require('./config/db');

db.query('SELECT 1')
  .then(() => app.listen(env.port, () => console.log(`SAR API running on http://localhost:${env.port}/api`)))
  .catch((e) => { console.error('Cannot connect to PostgreSQL:', e.message); process.exit(1); });
