const express = require("express");

module.exports = (
  postsService,
  usersService,
  rolesService,
  authenticationService,
  cacheService,
  config
) => {
  const router = express.Router();

  //controller changes
  const postsController = require("./posts/posts.controller")(
    postsService,
    cacheService
  );
  const usersController = require("./users/users.controller")(usersService);
  const rolesController = require("./roles/roles.controller")(rolesService);
  const authController = require("./authentication/authentication.controller")(
    authenticationService,
    config
  );

  //router settings
  router.use("/posts", postsController);
  router.use("/users", usersController);
  router.use("/roles", rolesController);
  router.use("/auth", authController);

  return router;
};
