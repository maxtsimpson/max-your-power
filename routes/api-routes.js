// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const Category = require("../models/category.js");
const TimeBlock = require("../models/timeblock.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Get all Categorys
  app.get("/api/category/all", function(req, res) {

    // Finding all Categorys, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Category.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

  // Add a Category
  app.post("/api/category/new", function(req, res) {

    console.log("Category Data:");
    console.log(req.body);

    Category.create({
      name: req.body.name,
      color: req.body.color,
      created_at: req.body.created_at
    }).then(function(results) {
      // `results` here would be the newly created Category
      res.end();
    });

  });

};