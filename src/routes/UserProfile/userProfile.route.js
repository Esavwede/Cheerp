const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router() 
const UserProfile = require('../../controller/UserProfile/userProfile.controller') 


module.exports = function(app)
    {
        try 
        {
            
            router.put('/users/:id/profiles', UserProfile.edit ) 
            router.get('/users/:id/profiles', UserProfile.find )
            app.use('/api/v1', router )
            
            logger.info(' User Profile Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER_PROFILE_ROUTES_ERROR")
        }
    }

