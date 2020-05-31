module.exports = function(sequelize, DataTypes) {
  // Creates a "Category" model that matches up with DB
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    color: DataTypes.STRING, //stores the color of the category. could be HEX i.e. FFFFFF or word i.e. white
  });
  // Syncs with DB
  Category.sync();

  return Category
}
