import { differenceInYears, format, parseISO } from "date-fns";

export type EmployeeRole = "Market" | "Finance" | "Development";

export type Employee = {
  id: number;
  name: string;
  age?: number;
  joinDate: string;
  role: EmployeeRole;
  isFullTime: boolean;
  birthDate?: string;
};

export type EmployeesRepository = {
  list(): Promise<Employee[]>;
};

export function toApiDate(value: string): string {
  return format(
    parseISO(value.slice(0, 10)),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  );
}

/** `birthDate`（YYYY-MM-DD）から満年齢を算出する。誕生日当日は加算する。 */
export function ageFromBirthDate(
  birthDate: string,
  now: Date = new Date(),
): number {
  return differenceInYears(now, parseISO(birthDate.slice(0, 10)));
}

export function mapEmployeeRow(
  row: {
    id: number;
    name: string;
    join_date: string;
    role: EmployeeRole;
    is_full_time: boolean;
    birth_date: string | null;
  },
  now: Date = new Date(),
): Employee {
  const employee: Employee = {
    id: row.id,
    name: row.name,
    joinDate: toApiDate(row.join_date),
    role: row.role,
    isFullTime: row.is_full_time,
  };

  if (row.birth_date !== null) {
    employee.birthDate = toApiDate(row.birth_date);
    employee.age = ageFromBirthDate(row.birth_date, now);
  }

  return employee;
}
