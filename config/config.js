require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.JAWSDB_USERNAME,
    "password": process.env.JAWSDB_PASSWORD,
    "database": process.env.JAWSDB_DATABASE,
    "host": process.env.JAWSDB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.JAWSDB_USERNAME,
    "password": process.env.JAWSDB_PASSWORD,
    "database": process.env.JAWSDB_DATABASE,
    "host": process.env.JAWSDB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.JAWSDB_USERNAME,
    "password": process.env.JAWSDB_PASSWORD,
    "database": process.env.JAWSDB_DATABASE,
    "host": process.env.JAWSDB_HOST,
    "dialect": "mysql",
  }
}