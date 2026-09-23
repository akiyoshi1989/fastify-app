import Fastify, { type FastifyInstance } from "fastify";
import { parseEmployeeId, type EmployeesRepository } from "./employees";

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

  app.get<{ Params: { id: string } }>("/employees/:id", async (request, reply) => {
    const id = parseEmployeeId(request.params.id);

    if (id === undefined) {
      return reply.status(400).send({ message: "Bad request" });
    }

    const employee = await options.employeesRepository.getById(id);

    if (employee === null) {
      return reply.status(404).send({ message: "Not found" });
    }

    return { employees: employee };
  });

  return app;
}
