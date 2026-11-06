const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'coict2026',
  database: 'coictdb'
});

const steps = [
  'ALTER TABLE academic_staff RENAME COLUMN "staff member name" TO staff_member_name',
  'ALTER TABLE academic_staff ALTER COLUMN staff_member_name TYPE varchar(100) USING staff_member_name::text',
  'ALTER TABLE academic_staff RENAME COLUMN "birth date" TO birth_date'
];

(async () => {
  for (const sql of steps) {
    try {
      await pool.query(sql);
      console.log('OK:', sql);
    } catch (e) {
      console.log('SKIP:', e.message);
    }
  }
  const cols = await pool.query(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='academic_staff' ORDER BY ordinal_position"
  );
  console.table(cols.rows);
  await pool.end();
})();