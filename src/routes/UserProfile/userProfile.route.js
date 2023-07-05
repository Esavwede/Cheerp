const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router() 
const UserProfileService = require('../../controller/UserProfile/userProfile.controller') 
const UserMessages = require('../../controller/messages/message.controller') 

module.exports = function(app)
    {
        try 
        {
            
            
            router.get('/users/:uuid/profiles', UserProfileService.find )
            router.patch('/users/:uuid/profiles', UserProfileService.edit ) 
            router.get('/users/:id/messages', UserMessages.getMessagesPreviews  )
            
            app.use('/api/v1', router )
            
            logger.info(' User Profile Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER_PROFILE_ROUTES_ERROR")
        }
    }

