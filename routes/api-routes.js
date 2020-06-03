// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
require('dotenv').config();
const passport = require('passport');
const db = require("../models")
const { Op } = require("sequelize");
const moment = require("moment")

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
        console.log({ error })
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
        console.log({ error })
        res.json(error)
      })

  });

  // Add a Category
  app.post("/api/category/new", function (req, res) {

    if (typeof req.body.name !== "string" || typeof req.body.color !== "string") {
      res.status(406).json("you must include name and color as strings")
    }

    db.Category.create({
      name: req.body.name,
      color: req.body.color,
    })
    .then(function (results) {
      // `results` here would be the newly created Category
      res.end();
    })
    .catch((error) => {
      res.json(error)
    })

  });

  app.post("/api/timeblocks", function (req, res) {
    console.log("in the api timeblock post")
    
    //so the date and time formats below should be used.
    //if we need to start or stop a timeblock use the formats below
    
    let newTimeblock = {
      date: moment().format("YYYY-MM-DD"),
      startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().add(30, "minutes").format('YYYY-MM-DD HH:mm:ss'),
      UserId: 1,
      CategoryId: 1,
    }

    db.Timeblock.create(newTimeblock)
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        res.json(error)
      })

  })

};