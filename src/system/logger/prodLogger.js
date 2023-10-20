require('dotenv').config() 

const pino = require('pino') 
const prodLogger = pino(
    {
        transport: 
        {
            target: 'pino-pretty'
        },
        level: 'info', 
        timestamp: pino.stdTimeFunctions.isoTime 
    }
) 

module.exports =  prodLogger 