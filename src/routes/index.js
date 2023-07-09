var userProfileRoutes = require('./UserProfile/userProfile.route')
var userRoutes = require('./_user/userRoutes') 
var authRoutes = require('./auth/auth.route') 

module.exports = function(app)
    {
      try
      {
          userProfileRoutes(app) 
          userRoutes(app) 
          authRoutes(app) 

          console.log('User Routes Created ') 
          
      }
      catch(e)
      {
        console.log(' Error occured while building application routes ')
        console.log(e) 
      }
    }
