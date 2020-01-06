const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

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

module.exports = () => {
  
  router.get('/', function(req, res){
    console.log('req', req.user);
  });
  
  // GET /auth/goodreads
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Goodreads authentication will involve redirecting
  //   the user to goodreads.com.  After authorization, Goodreads will redirect the user
  //   back to this application at /auth/goodreads/callback
  router.get('/auth/goodreads',
    passport.authenticate('goodreads'),
    function(req, res){
      // The request will be redirected to Goodreads for authentication, so this
      // function will not be called.
    });
  
  // GET /auth/goodreads/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/goodreads/callback', 
    passport.authenticate('goodreads', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });
  
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  return router;
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  } else {
    res.redirect('/login');
  }
}