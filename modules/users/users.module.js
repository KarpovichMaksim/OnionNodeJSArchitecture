module.exports = (Sequelize, sequelize) => {
  return sequelize.define("Users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: Sequelize.STRING,
    password: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  });
};
