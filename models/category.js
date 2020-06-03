module.exports = function(sequelize, DataTypes) {
  // Creates a "Category" model that matches up with DB
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: DataTypes.STRING, //stores the color of the category. could be HEX i.e. FFFFFF or word i.e. white
  });

  Category.associate = function(models) {
    // a category can have a lot of timeblocks
    Category.hasMany(models.Timeblock, {
      onDelete: "cascade"
    });
    // a category belongs to a user -- there can be duplicates with the same names but they are associated to different users
    Category.belongsTo(models.User);
  }
  // Syncs with DB
  // Category.sync();

  return Category
}
