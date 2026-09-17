import Fastify, { type FastifyInstance } from "fastify";

export function buildApp(): FastifyInstance {
  const app = Fastify();

  app.get("/", async () => {
    return { message: "Hello World" };
  });

  return app;
}
