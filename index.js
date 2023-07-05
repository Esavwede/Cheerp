var userRoutes = require('./src/routes/user.route') 

module.exports = function(app)
  {
    try
    {
        userRoutes(app) 
        
        console.log('User Routes Created ') 
    }
    catch(e)
    {
      console.log(' Error occured while building application routes ')
      console.log(e) 
    }
  }
