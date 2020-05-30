require('dotenv').config();

module.exports = {
  "development": {
    "url": process.env.JAWSDB_URL,
    "dialect": "mysql",
  },
  "test": {
    "url": process.env.JAWSDB_URL,
    "dialect": "mysql",
  },
  "production": {
    "url": process.env.JAWSDB_URL,
    "dialect": "mysql",
  }
}
