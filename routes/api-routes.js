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

  let userId

  app.get("/api/loadDemoUser", function (req,res) {
    db.User.findOne({
      where: { email: 'test@test.com' }
    })
      .then((user) => {
        res.json(user)
        userId = user.id
      })
      .catch((error) => {
        res.json(error)
      })
  })

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
        res.json(error)
      })

  });


  // Get all Categorys and sum the duration of their timeblocks as a % of the day.
  app.get("/api/category/timeSummaryPercentageOfDay", function (req, res) {

    //get all categories for this user. this should be called after the user is logged in
    //passport will have added a user property to the request with the user details

    if (req.user !== undefined) {
      userId = req.user.id
    }

    db.Timeblock.findAll({
      where: {
        userId: userId, //hardcoded for now for testing. need to get it to work with the front end
        date: {
          [Op.eq]: moment().startOf("day").add(8,"hours") //i know this is ugly and there should be an easier way to get the local date.. but this works for now
        }
      },
      include: [
        {
          model: db.Category
        },
      ]
    })
      .then((timeblocks) => {
        const categories = []
        let summary = {}
        let untracked = 100
        timeblocks.map((timeblock) => {
          const percentageOfDay = (timeblock.duration / 24 * 100) //need the duration to be a percentage of 24 hours
          if (categories.includes(timeblock.Category.name)) {
            summary[timeblock.Category.name] += percentageOfDay
          }
          else {
            categories.push(timeblock.Category.name)
            summary[timeblock.Category.name] = percentageOfDay
          }
          untracked -= percentageOfDay
        })
        summary["untracked"] = untracked
        res.json(summary)
      })
      .catch((error) => {
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

    //so the date and time formats below should be used.
    //if we need to start or stop a timeblock use the formats below

    let time = {
      date: moment().format("YYYY-MM-DD"),
      startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().add(30, "minutes").format('YYYY-MM-DD HH:mm:ss'),
      UserId: req.user.Id,
      CategoryId: req.timeblock.categoryId,
      Status: req.timeblock.status,
      expectedDuration: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    let newTimeblock = {
      date: moment().format("YYYY-MM-DD"), //just use todays date
      // startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      // endTime: moment().add(30, "minutes").format('YYYY-MM-DD HH:mm:ss'),
      startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      UserId: req.user.Id,
      CategoryId: req.timeblock.categoryId,
      Status: req.timeblock.status,
      expectedDuration: req.timeblock.expectedDuration,
    }

    db.Timeblock.create(newTimeblock)
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        res.json(error)
      })

  })

  app.get("/api/sleepSummaryThisWeek", function (req, res) {
    //return an array of numbers
    if (req.user !== undefined) {
      userId = req.user.id
    }

    //get all the timeblocks for the sleep category in the last 7 days and just fetch the duration property
    //result should be an array of floats
    
    db.Timeblock.findAll({
      attributes: ['duration'],
      where: {
        [Op.and]: [
          { userId: userId },
          { '$Category.name$': "sleep" },
          {
            duration: {
              [Op.gte]: moment().subtract(7, 'days').toDate()
            }
          }
        ] //hardcoded for now for testing. need to get it to work with the front end
      },
      include: [{ model: db.Category, as: 'Category' }]
    })
      .then((sleepTimeblocks) => {
        //sleep Timeblocks is an array of objects. use map to get the actual field values and just return that
        const sleepSummary = sleepTimeblocks.map(timeblock => timeblock.duration)
        res.json(sleepSummary)
      })
      .catch((error) => {
        res.json(error)
      })

  })

};