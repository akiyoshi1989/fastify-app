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
        age: number;
        join_date: string;
        role: "Market" | "Finance" | "Development";
        is_full_time: boolean;
        birth_date: string | null;
      }>(`
        SELECT
          e.id,
          e.name,
          e.age,
          e.join_date,
          d.name AS role,
          e.is_full_time,
          e.birth_date
        FROM employees e
        INNER JOIN departments d ON d.id = e.department_id
        ORDER BY e.id
      `);

      return result.rows.map(mapEmployeeRow);
    },
  };
}
