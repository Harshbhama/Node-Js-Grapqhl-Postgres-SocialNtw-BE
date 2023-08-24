const { pool } = require("../postgresql/db");

async function insertData() {
  const res = await pool.query(
    "Select * from Login"
  );
  console.log('res', res);
}


module.exports = { insertData }