require('dotenv').config() 
const logger = require('../../system/logger/index')
const jwt = require('jsonwebtoken')


function authSuccessful(req, res )
{
    try 
    {
        const user = { _id: req.user._id }
        const token = jwt.sign( user , process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION_TIME })
        return res.json({ success: true, message:"signin successful", user, token })
    }
    catch(e)
    {

        if (e.name === 'AuthenticationError') {
            res.status(401).json({ error: 'Google Authentification Error ' });
        }
        
        logger.error(e,'ERROR: REDIRECT_AFTER_SUCCESSFUL_AUTH_RESPONSE_ERROR ')
        return res.status(500).json({ success: false, message:"error occured while redirecting after successful auth"})
    }
}


module.exports = { authSuccessful }