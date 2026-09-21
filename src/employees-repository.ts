import type pg from "pg";
import {
  mapEmployeeRow,
  type EmployeesRepository,
} from "./employees";

export function createPgEmployeesRepository(
  pool: pg.Pool,
): EmployeesRepository {
  return {
    async list() {
      const result = await pool.query<{
        id: number;
        name: string;
        join_date: string;
        role: "Market" | "Finance" | "Development";
        is_full_time: boolean;
        birth_date: string | null;
      }>(`
        SELECT
          e.id,
          e.name,
          e.join_date,
          d.name AS role,
          e.is_full_time,
          e.birth_date
        FROM employees e
        INNER JOIN departments d ON d.id = e.department_id
        ORDER BY e.id
      `);

      const now = new Date();
      return result.rows.map((row) => mapEmployeeRow(row, now));
    },
  };
}
