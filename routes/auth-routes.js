require('dotenv').config();
const passport = require('passport');
const db = require("../models")
const { Op } = require("sequelize");

module.exports = function (app) {
    //=================== Authentication ==============================//
    app.get("/auth/facebook/", passport.authenticate('facebook'))

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
            res.redirect('/members');
        });


    app.post("/auth/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/auth/signup", function (req, res) {
        db.User.findOne({ where: { email: req.body.email } })
            .then(function (existingUser) {
                if (existingUser === null) {
                    db.User.create(req.body)
                        .then(function () {
                            res.redirect(307, "/auth/login");
                        })
                        .catch(function (err) {
                            //the error returned from sequalize is a big object so need to get the actual error message
                            res.status(401).json(err.errors[0].message);
                        });
                } else {
                    res.status(401).json('There is already a user with this email address')
                }
            })
            .catch(function (err) {
                //the error returned from sequalize is a big object so need to get the actual error message
                res.status(401).json(err.errors[0].message);
            });


    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/auth/user_data", function (req, res) {

        if (!req.user) {
            // The user is not logged in, send back an empty object
            return res.json({});
        }

        return res.json(req.user);

    });

}