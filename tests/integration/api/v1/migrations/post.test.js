import database from "infra/database";
import orchestrator from "tests/orchestrator";

const BASE_URL = "http://localhost:3000/api/v1/migrations";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query(
    "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;",
  );
});

test("POST response status should return 201", async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
  });

  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  expect(response.status).toBe(201);
});

test("POST response status should return 200", async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
  });

  const data = await response.json();

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(0);
  expect(response.status).toBe(200);
});
