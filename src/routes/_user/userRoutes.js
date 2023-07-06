const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router()  
const UserMessages = require('../../controller/messages/message.controller') 
const {verifyToken} = require('../../authentication/user.auth.js') 


module.exports = function(app)
    {
        try 
        {
                        
            router.get('/users/:id/messages', verifyToken, UserMessages.getMessagesPreviews  )
            router.get('/users/:id/messages/:messageId', verifyToken, UserMessages.getMessage )
            router.patch('/users/:id/messages', verifyToken, UserMessages.send ) 
            router.delete('/users/:id/messages/:usersMessageId/message/:messageId', verifyToken, UserMessages.deleteMessage )

            app.use('/api/v1', router )
            
            logger.info(' User  Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER__ROUTES_ERROR")
        }
    }

