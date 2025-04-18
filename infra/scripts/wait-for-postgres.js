const { exec } = require("child_process");

function waitForPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", hendleReturn);

  function hendleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(waitForPostgres, 500);
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n🔴 Aguardando o Postgres aceitar conexões. ");
waitForPostgres();
