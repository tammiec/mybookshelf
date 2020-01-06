require('dotenv').config({ path: './.env' });

// SERVER CONFIG
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 8000;

const loginRouter = require('./routes/login');

const app = express();

app.use((bodyParser.urlencoded({extended: true})));
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// root directory
app.get("/", (req, res) => {
  res.send('App is now running!');
});

app.use('/login', loginRouter());

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});