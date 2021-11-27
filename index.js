const Sequelize = require("sequelize");
const config = require("./config.json");

const db = require("./context")(Sequelize, config);
const server = require("./server")(db, config);
const port = 3000;

(async () => {
  server.listen(port, () => {
    console.log(`Server is running using ${port} port`);
  });
})();
