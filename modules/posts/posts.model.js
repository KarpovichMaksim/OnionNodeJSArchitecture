module.exports = (Sequelize, sequelize) => {
  return sequelize.define("Posts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: Sequelize.STRING,
    content: Sequelize.STRING,
    date: Sequelize.DATEONLY,
    rating: Sequelize.INTEGER,
    draft: Sequelize.BOOLEAN,
  });
};
