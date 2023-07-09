require('dotenv').config()
require('./authentication/google-auth');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var reqLogger = require('morgan'); 
var logger = require('./system/logger/index') 
const treblle = require('@treblle/express') 
const { createDatabaseConnection } = require('./system/database/connection/createDatabaseConnection') 
var createApiRoutes = require('./routes/index')
var helmet = require('helmet') 
const passport = require('./authentication/google-auth')
const session = require('express-session') 


var app = express()


// Trebble 
const trebbleConfig = {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
  additionalFieldsToMask: [],
};


app.use(helmet({
  contentSecurityPolicy: false, // Disable Content Security Policy
  dnsPrefetchControl: true // Enable DNS Prefetch Control
}));


app.use(reqLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( session({
  secret:  process.env.SESSION_SECRET ,
  resave: false,
  saveUninitialized: false
}) )

app.use( passport.initialize()   ) 
app.use( passport.session() )


//app.use( treblle(trebbleConfig) ) 
createDatabaseConnection()
createApiRoutes(app) 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {

  if (err.name === 'AuthenticationError') {
    res.status(401).json({ error: 'Authentication failed' });
  }


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