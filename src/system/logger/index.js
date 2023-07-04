

require('dotenv').config() 
const devLogger = require('./DevLogger') 
const prodLogger = require('./prodLogger')
var logger = null 

if( process.env.NODE_ENV === "development" )
{
    logger = devLogger 
}
else if( process.env.NODE_ENV === "production" )
{
    logger = prodLogger 
}
else
{
    console.log(' Unknown Node Environment could not select application logger ') 
}



module.exports = logger 