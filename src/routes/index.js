var userProfileRoutes = require('./UserProfile/userProfile.route')


module.exports = function(app)
    {
      try
      {
          userProfileRoutes(app) 

          console.log('User Routes Created ') 
          
      }
      catch(e)
      {
        console.log(' Error occured while building application routes ')
        console.log(e) 
      }
    }
