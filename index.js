const config = require("./config.json");
const server = require("./server")(config);

const port = 3000;

(async () => {
  server.listen(port, () => {
    console.log(`Server is running using ${port} port`);
  });
})();
