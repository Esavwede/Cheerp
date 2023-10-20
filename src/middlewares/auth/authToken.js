require('dotenv').config() 
const logger = require('../../system/logger/index')
const jwt = require('jsonwebtoken')


function authenticateToken(req, res, next)
{
    try 
    {   
console.log('--DEBUG--')
        const token = req.header('Authorization')

        if( !token )
        {
            return res.status(401).json({ success: false, msg:"token input error"})
        }

        jwt.verify( token, process.env.JWT_SECRET ,(e, user)=>{

            if( e ){ return res.status(403).json({ success: false, msg:"invalid token"})}

            req.user = user 
            next() 

        })
    }
    catch(e)
    {
        logger.error(e,'Error occured While authenticating Endpoint ')
        logger.error(`ROUTE_AUTH_ERROR: ${ req.originalUrl }`)
        return res.status(500).json({ success: false, msg:" Error occured while fetching route "})
    }
}


module.exports = authenticateToken 