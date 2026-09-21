import { Pool, type QueryResultRow } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.PGDATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "PGDATABASE_URL is not set. Add it to your .env file to enable database access.",
    );
  }

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  return new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
}

function getPool() {
  if (!global.pgPool) {
    global.pgPool = createPool();
  }

  return global.pgPool;
}

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params);
}
