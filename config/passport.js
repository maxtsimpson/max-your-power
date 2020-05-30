require('dotenv').config();

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');

const db = require('../models');


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: process.env.FB_APPID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, callbackFunction) {
    console.log("in the FacebookStrategy create or update")
    console.log({profile})
    db.User.findOrCreate({where: { facebook: profile.id }})
      .then((user) => {return callbackFunction(null, user)})
      .catch((err) => console.log(err))
  }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FB_APPID,
//     clientSecret: process.env.FB_SECRET,
//     callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
//     profileFields: ['name', 'email'],
//     passReqToCallback: true
// }, (req, accessToken, refreshToken, profile, done) => {
//     if (req.user) {
//         User.findOne({ facebook: profile.id }, (err, existingUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//                 done(err);
//             } else {
//                 User.findById(req.user.id, (err, user) => {
//                     if (err) { return done(err); }
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: 'facebook', accessToken });
//                     user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.save((err) => {
//                         req.flash('info', { msg: 'Facebook account has been linked.' });
//                         done(err, user);
//                     });
//                 });
//             }
//         });
//     } else {
//         User.findOne({ facebook: profile.id }, (err, existingUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 return done(null, existingUser);
//             }
//             User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
//                 if (err) { return done(err); }
//                 if (existingEmailUser) {
//                     req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
//                     done(err);
//                 } else {
//                     const user = new User();
//                     user.email = profile._json.email;
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: 'facebook', accessToken });
//                     user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.save((err) => {
//                         done(err, user);
//                     });
//                 }
//             });
//         });
//     }
// }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Exporting our configured passport
module.exports = passport;