const Sequelize = require("sequelize");
const config = require("./config.json");

const db = require("./context")(Sequelize, config);
const server = require("./server")(db, config);
const port = 3000;

(async () => {
  //console.log(db.roles);
  await db.sequelize.sync();

  await db.roles.findOrCreate({ where: { name: "administrator" } });
  await db.roles.findOrCreate({ where: { name: "user" } });
  server.listen(port, () => {
    console.log(`Server is running using ${port} port`);
  });
})();
