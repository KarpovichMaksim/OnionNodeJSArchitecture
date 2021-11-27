module.exports = (Sequelize, sequelize) => {
  return sequelize.define("Roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  });
};
