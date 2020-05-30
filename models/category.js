// Dependencies
// =============================================================
// require('dotenv').config();
// This may be confusing but here Sequelize (capital) references the standard library
// const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
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


// Makes the Category Model available for other files (will also create a table)
// module.exports = Category;
