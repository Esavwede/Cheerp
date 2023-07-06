require('dotenv').config() ;
const passport = require('passport');
require('./authentication/google-auth');
const session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var reqLogger = require('morgan'); 
var logger = require('./system/logger/index') 
const treblle = require('@treblle/express') 
const { createDatabaseConnection } = require('./system/database/connection/createDatabaseConnection') 
var createApiRoutes = require('./routes/index')


var app = express()


// Trebble 
const trebbleConfig = {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
  additionalFieldsToMask: [],
};

app.use(reqLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401);
};

app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
    passReqToCallback: true,
  })
);

app.get("/auth/google/success", isLoggedIn, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      const details = {
        // firstName: user.name.givenName,
        // lastName: user.name.familyName,
        email: user.email,
        phone_number: user.phone_number,
      };
      console.log(details);
      res.status(200).json({ user: { ...details } });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "An error occured for success" });
  }
});
app.get("/auth/google/failure", async (req, res) => {
  res.status(400).send({ message: "An error occured for failure" });
});

app.get("/error", (req, res) => res.send("Error logging in via Google.."));

// app.get("/auth/google/signout", (req, res) => {
//   try {
//     res.status(200).send({ message: "user signed out" });
//   } catch (err) {
//     res.status(400).send({ message: "Failed to sign out user" });
//   }
// });





//app.use( treblle(trebbleConfig) ) 
createDatabaseConnection()
createApiRoutes(app) 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err) 
  res.json({ error: err });
});

logger.info('Application running ') 

module.exports = app;