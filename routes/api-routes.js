// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
require('dotenv').config();
const passport = require('passport');
const db = require("../models")
const { Op } = require("sequelize");

// Routes
// =============================================================
module.exports = function (app) {

  // Get all Categorys
  app.get("/api/category/", function (req, res) {

    //get all categories for this user. this should be called after the user is logged in
    //passport will have added a user property to the request with the user details

    db.Category.findAll({
      where: { UserId: req.user.id }
    })
    .then((categories) => {
      // results are available to us inside the .then
      res.json(categories);
    })
    .catch((error) => {
      console.log({error})
      res.json(error)
    })

  });


  // Get all Categorys and sum the duration of their timeblocks as a % of the day.
  app.get("/api/category/timeSummaryPercentageOfDay", function (req, res) {

    //get all categories for this user. this should be called after the user is logged in
    //passport will have added a user property to the request with the user details

    db.Category.findAll({
      where: { UserId: req.user.id },
    })
    .then((categories) => {
      categories.map((category) => {
        category.getTimeblocks()
        .then({
            
        })
      })
      // results are available to us inside the .then
      res.json(categories);
    })
    .catch((error) => {
      console.log({error})
      res.json(error)
    })

  });

  // Add a Category
  app.post("/api/category/new", function (req, res) {

    console.log("Category Data:");
    console.log(req.body);

    Category.create({
      name: req.body.name,
      color: req.body.color,
      created_at: req.body.created_at
    }).then(function (results) {
      // `results` here would be the newly created Category
      res.end();
    });

  });


  
};