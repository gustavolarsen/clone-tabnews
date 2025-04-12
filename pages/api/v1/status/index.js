import database from "infra/database";

const status = async (request, response) => {
  const updatedAt = new Date().toISOString();

  const version = await database.query("SHOW server_version;");
  const max_connections = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;
  const opened_connections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(max_connections.rows[0].max_connections),
        opened_connections: opened_connections.rows[0].count,
        version: version.rows[0].server_version,
      },
    },
  });
};

export default status;
