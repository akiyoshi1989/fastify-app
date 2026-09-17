import assert from "node:assert/strict";
import { test } from "node:test";
import { buildApp } from "./app";

test("GET / は Hello World を返す", async (t) => {
  const app = buildApp();
  t.after(async () => {
    await app.close();
  });

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { message: "Hello World" });
});
