import type pg from "pg";
import {
  mapEmployeeRow,
  type EmployeeRole,
  type EmployeesRepository,
} from "./employees";

type EmployeeRow = {
  id: number;
  name: string;
  join_date: string;
  role: EmployeeRole;
  is_full_time: boolean;
  birth_date: string | null;
};

const employeeSelectSql = `
  SELECT
    e.id,
    e.name,
    e.join_date,
    d.name AS role,
    e.is_full_time,
    e.birth_date
  FROM employees e
  INNER JOIN departments d ON d.id = e.department_id
`;

export function createPgEmployeesRepository(
  pool: pg.Pool,
): EmployeesRepository {
  return {
    async list() {
      const result = await pool.query<EmployeeRow>(`
        ${employeeSelectSql}
        ORDER BY e.id
      `);

      const now = new Date();
      return result.rows.map((row) => mapEmployeeRow(row, now));
    },

    async getById(id) {
      const result = await pool.query<EmployeeRow>(
        `
          ${employeeSelectSql}
          WHERE e.id = $1
        `,
        [id],
      );

      const row = result.rows[0];
      if (row === undefined) {
        return null;
      }

      return mapEmployeeRow(row, new Date());
    },
  };
}
