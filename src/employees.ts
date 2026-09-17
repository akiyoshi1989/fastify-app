export type EmployeeRole = "Market" | "Finance" | "Development";

export type Employee = {
  id: number;
  name: string;
  age: number;
  joinDate: string;
  role: EmployeeRole;
  isFullTime: boolean;
  birthDate?: string;
};

export type EmployeesRepository = {
  list(): Promise<Employee[]>;
};

export function toApiDate(value: string): string {
  return `${value.slice(0, 10)}T00:00:00.000Z`;
}

export function mapEmployeeRow(row: {
  id: number;
  name: string;
  age: number;
  join_date: string;
  role: EmployeeRole;
  is_full_time: boolean;
  birth_date: string | null;
}): Employee {
  const employee: Employee = {
    id: row.id,
    name: row.name,
    age: row.age,
    joinDate: toApiDate(row.join_date),
    role: row.role,
    isFullTime: row.is_full_time,
  };

  if (row.birth_date !== null) {
    employee.birthDate = toApiDate(row.birth_date);
  }

  return employee;
}
