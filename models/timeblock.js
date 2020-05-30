// Dependencies
// =============================================================
// require('dotenv').config();
// // This may be confusing but here Sequelize (capital) references the standard library
// const Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// const sequelize = new Sequelize(process.env.JAWSDB_URL, { dialect: "mysql" });

module.exports = function (sequelize, DataTypes) {
  // Creates a "Timeblock" model that matches up with DB
  const Timeblock = sequelize.define("Timeblock", {
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME, //stores the color of the Timeblock. could be HEX i.e. FFFFFF or word i.e. white
  });

  // Syncs with DB
  Timeblock.sync();
  return Timeblock
}
// Makes the Timeblock Model available for other files (will also create a table)
// module.exports = Timeblock;
