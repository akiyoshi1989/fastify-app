import assert from "node:assert/strict";
import { test } from "node:test";
import { ageFromBirthDate, mapEmployeeRow, toApiDate } from "./employees";

test("toApiDate は YYYY-MM-DD を ISO 8601 UTC に変換する", () => {
  assert.equal(toApiDate("2025-07-16"), "2025-07-16T00:00:00.000Z");
});

test("ageFromBirthDate は基準日時点の満年齢を返す", () => {
  const now = new Date("2025-12-01T00:00:00.000Z");
  assert.equal(ageFromBirthDate("2000-03-12", now), 25);
  assert.equal(ageFromBirthDate("1989-11-04", now), 36);
  assert.equal(ageFromBirthDate("2006-08-21", now), 19);
});

test("ageFromBirthDate は誕生日前ならまだ加算しない", () => {
  const now = new Date("2025-07-16T00:00:00.000Z");
  assert.equal(ageFromBirthDate("2000-03-12", now), 25);
  assert.equal(ageFromBirthDate("1989-11-04", now), 35);
  assert.equal(ageFromBirthDate("2006-08-21", now), 18);
});

test("mapEmployeeRow は birth_date から age を算出する", () => {
  const now = new Date("2025-12-01T00:00:00.000Z");
  assert.deepEqual(
    mapEmployeeRow(
      {
        id: 1,
        name: "Edward Perry",
        join_date: "2025-07-16",
        role: "Finance",
        is_full_time: true,
        birth_date: "2000-03-12",
      },
      now,
    ),
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

test("mapEmployeeRow は birth_date が null のとき birthDate と age を省略する", () => {
  assert.deepEqual(
    mapEmployeeRow({
      id: 4,
      name: "No Birth",
      join_date: "2025-01-01",
      role: "Market",
      is_full_time: false,
      birth_date: null,
    }),
    {
      id: 4,
      name: "No Birth",
      joinDate: "2025-01-01T00:00:00.000Z",
      role: "Market",
      isFullTime: false,
    },
  );
});
