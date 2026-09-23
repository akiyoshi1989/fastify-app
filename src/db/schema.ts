import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const departments = pgTable(
  "departments",
  {
    id: integer("id").generatedByDefaultAsIdentity().primaryKey(),
    name: text("name").notNull().unique(),
    validFrom: date("valid_from", { mode: "string" }).notNull(),
    validTo: date("valid_to", { mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "departments_valid_period",
      sql`${table.validTo} IS NULL OR ${table.validTo} >= ${table.validFrom}`,
    ),
  ],
);

export const positions = pgTable(
  "positions",
  {
    id: integer("id").generatedByDefaultAsIdentity().primaryKey(),
    name: text("name").notNull().unique(),
    validFrom: date("valid_from", { mode: "string" }).notNull(),
    validTo: date("valid_to", { mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "positions_valid_period",
      sql`${table.validTo} IS NULL OR ${table.validTo} >= ${table.validFrom}`,
    ),
  ],
);

export const employees = pgTable("employees", {
  id: integer("id").generatedByDefaultAsIdentity().primaryKey(),
  name: text("name").notNull(),
  joinDate: date("join_date", { mode: "string" }).notNull(),
  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id),
  positionId: integer("position_id")
    .notNull()
    .references(() => positions.id),
  isFullTime: boolean("is_full_time").notNull(),
  birthDate: date("birth_date", { mode: "string" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
