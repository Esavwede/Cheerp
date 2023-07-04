require('dotenv').config() 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var reqLogger = require('morgan'); 
var logger = require('./system/logger/index') 
const treblle = require('@treblle/express') 
const { createDatabaseConnection } = require('./system/database/connection/createDatabaseConnection') 
var createApiRoutes = require('./routes/index')
const { createDatabase } = require('./system/database/connection/createDatabase')

var app = express()


// Trebble 
const trebbleConfig = {
                        apiKey: process.env.TREBLLE_API_KEY,
                        projectId: process.env.TREBLLE_PROJECT_ID,
                        additionalFieldsToMask: [],
                      }



app.use(reqLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// app.use( treblle(trebbleConfig) ) 
createDatabaseConnection()
createDatabase() 
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