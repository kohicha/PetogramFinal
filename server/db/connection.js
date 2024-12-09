import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: "petogram",
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
})

export default {
  query: (text, params) => pool.query(text, params),
};
