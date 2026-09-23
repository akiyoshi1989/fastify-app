import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./db/schema";

const { Pool, types } = pg;

// DATE を Date オブジェクトにせず YYYY-MM-DD 文字列のまま扱う
types.setTypeParser(types.builtins.DATE, (value) => value);

export type AppDatabase = NodePgDatabase<typeof schema>;

export function createPool(connectionString: string): pg.Pool {
  return new Pool({ connectionString });
}

export function createDb(connectionString: string): {
  db: AppDatabase;
  pool: pg.Pool;
} {
  const pool = createPool(connectionString);
  const db = drizzle(pool, { schema });
  return { db, pool };
}
