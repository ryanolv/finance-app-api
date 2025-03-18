import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : undefined,
  database: process.env.POSTGRES_DB as string,
  host: process.env.POSTGRES_HOST as string,
});

export const PostgresHelper = {
  query: async (query: string, params?: string[]) => {
    const client = await pool.connect();
    const results = await client.query(query, params);

    client.release();

    return results.rows;
  },
};
