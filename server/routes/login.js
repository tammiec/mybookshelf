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
  callbackURL: "http://localhost:8000/login/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      // Set user as user from Goodreads profile
      // Best practice would be to have a local user database but for simplicity we will just use this
      const user = { id: profile.id, name: profile.displayName }
      return done(null, user);
    });
  }
));

module.exports = () => {
  
  router.get('/', function(req, res){
    console.log('login root page - nothing is happening here!');
  });
  
  // Redirects to Goodreads for authentication
  router.get('/auth/goodreads',
    passport.authenticate('goodreads'),
    function(req, res){
      // The request will be redirected to Goodreads for authentication, so this
      // function will not be called.
    });
  
  // If authenticated, user will be logged in, if not, redirected to login page
  router.get('/auth/goodreads/callback', 
    passport.authenticate('goodreads', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('logged in as', res.req.user);
      res.redirect('/');
    });
  
  router.get('/logout', function(req, res){
    req.logout();
    console.log('logged out');
    res.redirect('/');
  });

  return router;
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { 
//     return next(); 
//   } else {
//     res.redirect('/login');
//   }
// }