import Fastify, { type FastifyInstance } from "fastify";
import type { EmployeesRepository } from "./employees";

export type BuildAppOptions = {
  employeesRepository: EmployeesRepository;
};

export function buildApp(options: BuildAppOptions): FastifyInstance {
  const app = Fastify();

  app.get("/health-check", async () => {
    return { message: "success" };
  });

  app.get("/employees", async () => {
    const employees = await options.employeesRepository.list();
    return { employees };
  });

  return app;
}
