import assert from "node:assert/strict";
import { test } from "node:test";
import { buildApp } from "./app";
import type { Employee, EmployeesRepository } from "./employees";

const seedEmployees: Employee[] = [
  {
    id: 1,
    name: "Edward Perry",
    age: 25,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Finance",
    isFullTime: true,
    birthDate: "2000-03-12T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Josephine Drake",
    age: 36,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Market",
    isFullTime: false,
    birthDate: "1989-11-04T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Cody Phillips",
    age: 19,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Development",
    isFullTime: true,
    birthDate: "2006-08-21T00:00:00.000Z",
  },
];

function createMemoryEmployeesRepository(
  employees: Employee[],
): EmployeesRepository {
  return {
    async list() {
      return employees;
    },
    async getById(id) {
      return employees.find((employee) => employee.id === id) ?? null;
    },
  };
}

test("GET /health-check は success を返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository([]),
  });
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/health-check",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { message: "success" });
});

test("GET /employees は従業員一覧を employees で包んで返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository(seedEmployees),
  });
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/employees",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { employees: seedEmployees });
});

test("GET /employees は空のとき空配列を返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository([]),
  });
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/employees",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { employees: [] });
});

test("GET /employees/:id は従業員 1 件を employees で包んで返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository(seedEmployees),
  });
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/employees/1",
  });

  assert.equal(response.statusCode, 200);
  const body = response.json();
  assert.equal(Array.isArray(body), false);
  assert.equal("employee" in body, false);
  assert.deepEqual(body, { employees: seedEmployees[0] });
  assert.equal(body.employees.birthDate, "2000-03-12T00:00:00.000Z");
});

test("GET /employees/:id は存在しない id で 404 を返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository(seedEmployees),
  });
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/employees/999",
  });

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.json(), { message: "Not found" });
});

test("GET /employees/:id は不正な id で 400 を返す", async (t) => {
  const app = buildApp({
    employeesRepository: createMemoryEmployeesRepository(seedEmployees),
  });
  t.after(async () => {
    await app.close();
  });

  for (const id of ["abc", "0", "-1", "1.5"]) {
    const response = await app.inject({
      method: "GET",
      url: `/employees/${id}`,
    });

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.json(), { message: "Bad request" });
  }
});
