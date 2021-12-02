const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errors = require("./helpers/errors");

const PostsService = require("./modules/posts/posts.service");
const UsersService = require("./modules/users/users.service");
const RolesService = require("./modules/roles/roles.service");
const AuthenticationService = require("./modules/authentication/authentication.service");
const AuthorizationService = require("./modules/authorization/authorization.service");
const CacheService = require("./modules/cache/cache.service");

module.exports = (db, config) => {
  const app = express();

  // Services
  const postsService = new PostsService(db.posts, errors);
  const usersService = new UsersService(db.users, db.roles, errors);
  const rolesService = new RolesService(db.roles, errors);
  const authenticationService = new AuthenticationService(
    db.users,
    db.roles,
    errors
  );
  const authorizationService = new AuthorizationService(db.roles, errors);
  const cacheService = new CacheService();

  // Controllers
  const logger = require("./global-controllers/logger");
  const authenticator = require("./global-controllers/authenticator")(
    usersService,
    config
  );
  const authorization = require("./global-controllers/authorization")(
    authorizationService
  );
  const cache = require("./global-controllers/cache")(cacheService);
  const error = require("./global-controllers/error");

  const apiController = require("./controllers/api")(
    postsService,
    usersService,
    rolesService,
    authenticationService,
    cacheService,
    config
  );

  // Mounting
  app.use(express.static("public"));
  app.use(cookieParser(config.cookie.key));
  app.use(bodyParser.json());

  app.use("/api", logger);
  app.use("/api", authenticator);
  app.use("/api", authorization);
  app.use("/api", cache);
  app.use("/api", apiController);
  app.use("/api", error);

  return app;
};
