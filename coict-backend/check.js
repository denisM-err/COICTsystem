const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost', port: 5432,
  user: 'postgres', password: 'coict2026', database: 'coictdb'
});

(async () => {
  const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost', port: 5432,
  user: 'postgres', password: 'coict2026', database: 'coictdb'
});

(async () => {
  const r = await pool.query(`
    SELECT birth_date,
           birth_date ~ '^\\d{4}-\\d{2}-\\d{2}$' AS iso
    FROM academic_staff LIMIT 10`);
  console.log(r.rows);
  await pool.end();
})();
})();