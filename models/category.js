// Dependencies
// =============================================================
require('dotenv').config();
// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = new Sequelize(process.env.JAWSDB_URL,{dialect: "mysql"});

// Creates a "Category" model that matches up with DB
const Category = sequelize.define("Category", {
  name: Sequelize.STRING,
  color: Sequelize.STRING, //stores the color of the category. could be HEX i.e. FFFFFF or word i.e. white
});

// Syncs with DB
Category.sync();

// Makes the Category Model available for other files (will also create a table)
module.exports = Category;
