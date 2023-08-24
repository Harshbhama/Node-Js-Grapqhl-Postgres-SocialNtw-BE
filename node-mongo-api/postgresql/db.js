const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "harsh",
  port: "5433"
});

module.exports = { pool };