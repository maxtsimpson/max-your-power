// Dependencies
// =============================================================

//had some inspiration from this repo https://github.com/sahat/hackathon-starter

// require('dotenv').config();
// This may be confusing but here Sequelize (capital) references the standard library
// const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// const sequelize = new Sequelize(process.env.JAWSDB_URL, { dialect: "mysql" });
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
    name: {
      type: DataTypes.STRING,
    }
  });

  User.addHook("beforeCreate", function (user) {
    console.log("in before create")
    console.log({user})
    console.log(user.password)
    if(user.password !== undefined){
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
    
  });

  User.prototype.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Syncs with DB
  User.sync();
  return User
}
// Makes the User Model available for other files (will also create a table)
// module.exports = User;