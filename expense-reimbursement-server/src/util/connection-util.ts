import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["DB_USER"] || 'postgres',
  host: process.env["DB_URL"] || 'revature1808.c4dylqzqfkoi.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: process.env["DB_PASS"] ||"K08h2130",
  port: 5432,
  max: 2
})
