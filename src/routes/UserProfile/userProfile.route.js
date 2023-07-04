const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router() 
const UserProfile = require('../../controller/UserProfile/userProfile.controller') 


module.exports = function(app)
    {
        try 
        {
            
            router.post('/', UserProfile.edit ) 
            router.get('/', UserProfile.find )

            app.use('/users/:id/profiles', router )
            
            logger.info(' User Profile Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER_PROFILE_ROUTES_ERROR")
        }
    }

