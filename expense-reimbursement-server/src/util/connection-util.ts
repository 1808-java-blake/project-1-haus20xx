import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["REIMBURSE_DB_USER"],
  host: process.env["REIMBURSE_DB_URL"] || 'localhost',
  database: 'postgres',
  password: process.env["REIMBURSE_DB_PASS"],
  port: 5432,
  max: 2
})
