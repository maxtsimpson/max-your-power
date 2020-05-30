// Dependencies
// =============================================================

//had some inspiration from this repo https://github.com/sahat/hackathon-starter

require('dotenv').config();
// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = new Sequelize(process.env.JAWSDB_URL,{dialect: "mysql"});
const bcrypt = require('bcrypt');

// Creates a "User" model that matches up with DB
const User = sequelize.define("User", {
  email: { type: String, unique: true },
  password: String,
  facebook: {
    type: Sequelize.STRING,
    unique: true,
  },
  profile: {
    name: String,
  }
});

/**
 * Password hash middleware.
 */
User.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
User.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;