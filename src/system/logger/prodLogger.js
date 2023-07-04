

const pino = require('pino') 
const prodLogger = pino(
    {
        transport: 
        {
            target: 'pino-pretty'
        },
        level: process.env.APPLICATION_LOG_LEVEL, 
        timestamp: pino.stdTimeFunctions.isoTime 
    }
) 

module.exports =  prodLogger 