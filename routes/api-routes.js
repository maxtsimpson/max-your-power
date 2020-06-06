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
const dateFormat = "YYYY-MM-DD"
// Routes
// =============================================================
module.exports = function (app) {

  let userId

  app.get("/api/loadDemoUser", function (req, res) {
    db.User.findOne({
      where: { email: 'maxsimpson95@gmail.com' }
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

    const todayDate = moment().startOf("day").format(dateFormat) //timezone is causing me a lot of problems
    const yesterdayDate = moment().startOf("day").subtract(1, "days").format(dateFormat)

    db.Timeblock.findAll({
      where: {
        userId: userId,
        [Op.or]:
          [
            {
              date: {
                [Op.eq]: todayDate
              }
            },
            {
              [Op.and]:
                [
                  {
                    date: {[Op.eq]: yesterdayDate}
                  },
                  {
                    '$Category.name$': "sleep"
                  }
                ]
            },
          ],
        //date is today or date is yesterday and category is sleep
      },
      include: [{ model: db.Category, as: 'Category' }]
    })
      .then((timeblocks) => {
        //initialise some variables
        const categories = []
        let summary = {}
        let untracked = 100
        //get the timeblock out of the result that has the category sleep. this will be the sleep from last night to this morning
        let lastNightSleep = timeblocks.splice(timeblocks.findIndex(timeblock => timeblock.Category.Name === 'sleep'),1)
        //caclulate the hours of the day so far based off when last nights sleep ended and this moment now
        const hoursSoFar = moment().add(8,"hours").diff(moment(lastNightSleep[0].endTime, 'h:mm A'),'hours',true) // have to add 8 hours to the current moment before diff to get perth time
        timeblocks.map((timeblock) => {
          //calc percentageOfDay as how long in hours have i been doing this activity divided by how many hours in the day so far
          const percentageOfDay = parseInt(timeblock.duration / hoursSoFar * 100)
          //if the categories list already has this category add the duration of this timeblock to the total
          if (categories.includes(timeblock.Category.name)) {
            summary[timeblock.Category.name] += percentageOfDay
          }
          else //if the categories list doesnt have this category add the category to the list and set the total to the duration of this timeblock
          {
            categories.push(timeblock.Category.name)
            summary[timeblock.Category.name] = percentageOfDay
          }
          //reduce 
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