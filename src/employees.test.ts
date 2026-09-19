import assert from "node:assert/strict";
import { test } from "node:test";
import { mapEmployeeRow, toApiDate } from "./employees";

test("toApiDate は YYYY-MM-DD を ISO 8601 UTC に変換する", () => {
  assert.equal(toApiDate("2025-07-16"), "2025-07-16T00:00:00.000Z");
});

test("mapEmployeeRow は DB 行を従業員オブジェクトへ変換する", () => {
  assert.deepEqual(
    mapEmployeeRow({
      id: 1,
      name: "Edward Perry",
      age: 25,
      join_date: "2025-07-16",
      role: "Finance",
      is_full_time: true,
      birth_date: "2000-03-12",
    }),
    {
      id: 1,
      name: "Edward Perry",
      age: 25,
      joinDate: "2025-07-16T00:00:00.000Z",
      role: "Finance",
      isFullTime: true,
      birthDate: "2000-03-12T00:00:00.000Z",
    },
  );
});

test("mapEmployeeRow は birth_date が null のとき birthDate を省略する", () => {
  assert.deepEqual(
    mapEmployeeRow({
      id: 4,
      name: "No Birth",
      age: 30,
      join_date: "2025-01-01",
      role: "Market",
      is_full_time: false,
      birth_date: null,
    }),
    {
      id: 4,
      name: "No Birth",
      age: 30,
      joinDate: "2025-01-01T00:00:00.000Z",
      role: "Market",
      isFullTime: false,
    },
  );
});
