import database from "infra/database";

async function clearDatabase() {
  await database.query("DROP SCHEMA IF EXISTS public CASCADE;");
  await database.query("CREATE SCHEMA public;");
}

const BASE_URL = "http://localhost:3000/api/v1/migrations";

beforeAll(clearDatabase);

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
