// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
      res.render("index");
  });
  
  app.get("/interface", isAuthenticated, function(req, res) {
    res.render("interface");
  });


  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/interface");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });  

};
