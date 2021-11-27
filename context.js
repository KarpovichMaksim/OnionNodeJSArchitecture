module.exports = (Sequelize, config) => {
  const options = {
    host: config.db.host,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
    },
  };

  const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    options
  );

  const Users = require("./modules/users/users.model")(Sequelize, sequelize);
  const Roles = require("./modules/roles/roles.model")(Sequelize, sequelize);
  const Posts = require("./modules/posts/posts.model")(Sequelize, sequelize);

  // User <-> Role
  Users.belongsToMany(Roles, { through: "userRoles" });
  Roles.belongsToMany(Users, { through: "userRoles" });

  // Post -> User
  Posts.belongsTo(Users);
  Users.hasMany(Posts);

  return {
    users: Users,
    roles: Roles,
    posts: Posts,

    sequelize,
    Sequelize,
  };
};
