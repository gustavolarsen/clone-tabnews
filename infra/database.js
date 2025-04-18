import { Client } from "pg";

const query = async (queryObject) => {
  let client = null;

  try {
    client = await getNewClient();
    return await client.query(queryObject);
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
