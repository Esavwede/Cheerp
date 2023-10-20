
require('dotenv').config() 
const pino = require('pino') 

const devLogger = pino(
        {
            transport:
            {
               targets: 
               [
                 { 
                    target: 'pino-pretty'
                 }
               //   {
               //      target: 'pino/file', 
               //      options: { destination: `${ __dirname }/logs/dev/logs.txt`}
               //   }
               ]
            },
            level: 'info', 
            timestamp: pino.stdTimeFunctions.isoTime 
        }
    ) 

module.exports =  devLogger