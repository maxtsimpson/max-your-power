// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================

const express = require("express");
const session = require("express-session");
const passport = require('./config/passport');
const db = require("./models");


// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/auth-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  //this occurs after the db has been synced. the below sets express to start listening on the value of port PORT
  app.listen(PORT, function() {
    //this console log uses %s to subsitute an argument for a parameter. that's why PORT is passed in twice as parameters
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});