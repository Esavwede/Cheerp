const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router() 
const Message = require('../../controller/messages/message.controller')



module.exports = function(app)
    {
        try 
        {
            
            router.patch('/messages/:id', Message.send ) 
            app.use('/api/v1', router )
            
            logger.info(' User Message Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"USER_MESSAGE_ROUTES_ERROR")
        }
    }

