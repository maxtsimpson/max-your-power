const moment = require ("moment")

module.exports = function (sequelize, DataTypes) {
  // Creates a "Timeblock" model that matches up with DB
  const Timeblock = sequelize.define("Timeblock", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: DataTypes.FLOAT, //stores the color of the Timeblock. could be HEX i.e. FFFFFF or word i.e. white
  });

  Timeblock.addHook("beforeCreate", function (timeblock) {
    console.log("in timeblock before hook")
    //if the startime and endtime are defined then get their diff as duration in hours
    if(timeblock.startTime !== undefined && timeblock.endTime !== undefined){
      timeblock.duration = moment(timeblock.endTime).diff(moment(timeblock.startTime),'hours',true)
    }
    
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