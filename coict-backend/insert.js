const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'coict2026',
  database: 'coictdb'
});

async function run() {
  const cols = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name='departments'"
  );
  console.log('Idadi ya safu za departments:', cols.rows.length);

  if (cols.rows.length === 0) {
    await pool.query(
      'ALTER TABLE departments ADD COLUMN department_id integer PRIMARY KEY, ADD COLUMN department_name varchar(100)'
    );
    console.log('Safu zimeongezwa kwenye departments');
  }

  let d = await pool.query('SELECT department_id FROM departments LIMIT 1');
  if (d.rows.length === 0) {
    await pool.query(
      "INSERT INTO departments (department_id, department_name) VALUES (1, 'Computer Science and Engineering')"
    );
    d = await pool.query('SELECT department_id FROM departments LIMIT 1');
    console.log('Idara imeongezwa');
  }

  const dep = d.rows[0].department_id;
  console.log('department_id inayotumika:', dep);

  await pool.query(
    `INSERT INTO academic_staff
     (staff_member_id, staff_member_name, department_id, gender, birth_date, employment_status, employment_type, year_of_retirement)
     VALUES
     (1, 'Dr. Asha Mushi', $1, 'Female', '1980-05-12', 'Active', 'Permanent', 2040),
     (2, 'Mr. John Kimaro', $1, 'Male', '1985-09-03', 'Active', 'Contract', 2045)
     ON CONFLICT (staff_member_id) DO NOTHING`,
    [dep]
  );

  const r = await pool.query('SELECT * FROM academic_staff');
  console.log(r.rows);
  await pool.end();
}

run().catch(e => { console.error('KOSA:', e.message); pool.end(); });