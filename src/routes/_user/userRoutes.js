const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router()  
const UserMessages = require('../../controller/messages/message.controller') 


module.exports = function(app)
    {
        try 
        {
                        
            router.get('/users/:id/messages', UserMessages.getMessagesPreviews  )
            router.get('/users/:id/messages/:messageId', UserMessages.getMessage )
            router.delete('/users/:id/messages/:usersMessageId/message/:messageId', UserMessages.deleteMessage )

            app.use('/api/v1', router )
            
            logger.info(' User  Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER__ROUTES_ERROR")
        }
    }

