// Dependencies
// =============================================================
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  // Creates a "User" model that matches up with DB
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    facebook: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    }
  });

  User.addHook("beforeCreate", function (user) {
    //facebook logins have an undefined password
    if(user.password !== undefined){
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
    
  });

  User.prototype.comparePassword = function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      callback(err, isMatch);
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Syncs with DB
  User.sync();
  return User
}