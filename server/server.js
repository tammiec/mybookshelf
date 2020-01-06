require('dotenv').config({ path: './.env' });

// SERVER CONFIG
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

const testRouter =  require('./routes/test');

const app = express();

app.use((bodyParser.urlencoded({extended: true})));

app.use("/test", testRouter);


app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});


// OAUTH

// Passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use Goodreads Strategy
passport.use(new GoodreadsStrategy({
  consumerKey: process.env['API_KEY'],
  consumerSecret: process.env['API_SECRETKEY'],
  callbackURL: "http://localhost:8000/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      // To keep the example simple, the user's Goodreads profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Goodreads account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));