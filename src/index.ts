import { buildApp } from "./app";
import { createPool } from "./db";
import { createPgEmployeesRepository } from "./employees-repository";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = createPool(databaseUrl);
const app = buildApp({
  employeesRepository: createPgEmployeesRepository(pool),
});

app.addHook("onClose", async () => {
  await pool.end();
});

try {
  await app.listen({ port: 3000, host: "0.0.0.0" });
  console.log("Server is running on http://localhost:3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
