module.exports = function (sequelize, DataTypes) {
  // Creates a "Timeblock" model that matches up with DB
  const Timeblock = sequelize.define("Timeblock", {
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME, //stores the color of the Timeblock. could be HEX i.e. FFFFFF or word i.e. white
  });

  Timeblock.associate = function(models) {
    //a timeblock belongs to a category and a user
    Timeblock.belongsTo(models.Category);
    Timeblock.belongsTo(models.User);
  };

  // Syncs with DB
  // Timeblock.sync();
  return Timeblock
}