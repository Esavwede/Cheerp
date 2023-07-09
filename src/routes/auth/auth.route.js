const express = require('express')
const router = express.Router() 
const logger = require('../../system/logger/index') 
const passport  = require('../../authentication/google-auth')
const { authSuccessful} = require('../../controller/auth/auth.controller')


module.exports = function(app)
{
    try 
    {

        router.get('/google', passport.authenticate('google',{ scope:['email','profile'] }), authSuccessful )
        
        app.use('/api/v1/auth', router )
    }
    catch(e)
    {
        logger.error(e,'Error occured while building Auth Route ')
    }
}