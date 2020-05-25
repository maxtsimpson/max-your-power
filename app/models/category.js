// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Category" model that matches up with DB
var Category = sequelize.define("Category", {
  name: Sequelize.STRING,
  color: Sequelize.STRING, //stores the color of the category. could be HEX i.e. FFFFFF or word i.e. white
  created_at: Sequelize.DATE
});

// Syncs with DB
Category.sync();

// Makes the Category Model available for other files (will also create a table)
module.exports = Category;
