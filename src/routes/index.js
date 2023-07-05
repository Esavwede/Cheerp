var userProfileRoutes = require('./UserProfile/userProfile.route')
var userMessageRoutes = require('./message/message.route')
var userRoutes = require('./_user/userRoutes') 


module.exports = function(app)
    {
      try
      {
          userProfileRoutes(app) 
          userMessageRoutes(app) 
          userRoutes(app) 


          console.log('User Routes Created ') 
          
      }
      catch(e)
      {
        console.log(' Error occured while building application routes ')
        console.log(e) 
      }
    }
