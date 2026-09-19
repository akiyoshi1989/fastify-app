import pg from "pg";

const { Pool, types } = pg;

// DATE を Date オブジェクトにせず YYYY-MM-DD 文字列のまま扱う
types.setTypeParser(types.builtins.DATE, (value) => value);

export function createPool(connectionString: string): pg.Pool {
  return new Pool({ connectionString });
}
