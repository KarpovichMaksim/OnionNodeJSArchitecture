const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

module.exports = (db, config) => {
  const app = express();

  // Mounting
  app.use(cookieParser(config.cookie.key));
  app.use(bodyParser.json());

  return app;
};
