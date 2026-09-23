import { asc, eq } from "drizzle-orm";
import type { AppDatabase } from "./db";
import { departments, employees } from "./db/schema";
import {
  mapEmployeeRow,
  type EmployeeRole,
  type EmployeesRepository,
} from "./employees";

function isEmployeeRole(value: string): value is EmployeeRole {
  return value === "Market" || value === "Finance" || value === "Development";
}

function selectEmployeeRows(db: AppDatabase) {
  return db
    .select({
      id: employees.id,
      name: employees.name,
      join_date: employees.joinDate,
      role: departments.name,
      is_full_time: employees.isFullTime,
      birth_date: employees.birthDate,
    })
    .from(employees)
    .innerJoin(departments, eq(employees.departmentId, departments.id));
}

export function createPgEmployeesRepository(
  db: AppDatabase,
): EmployeesRepository {
  return {
    async list() {
      const rows = await selectEmployeeRows(db).orderBy(asc(employees.id));
      const now = new Date();

      return rows.map((row) => {
        if (!isEmployeeRole(row.role)) {
          throw new Error(`Unexpected department name: ${row.role}`);
        }

        return mapEmployeeRow({ ...row, role: row.role }, now);
      });
    },

    async getById(id) {
      const rows = await selectEmployeeRows(db)
        .where(eq(employees.id, id))
        .limit(1);
      const row = rows[0];

      if (row === undefined) {
        return null;
      }

      if (!isEmployeeRole(row.role)) {
        throw new Error(`Unexpected department name: ${row.role}`);
      }

      return mapEmployeeRow({ ...row, role: row.role }, new Date());
    },
  };
}
