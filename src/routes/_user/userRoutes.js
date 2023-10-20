const logger = require('../../system/logger/index') 

const express = require('express')
const router = express.Router()  
const UserMessages = require('../../controller/messages/message.controller') 
const {verifyToken} = require('../../authentication/user.auth.js') 
const authenticateToken = require('../../middlewares/auth/authToken')


module.exports = function(app)
    {
        try 
        {
                        
            router.get('/users/:id/messages', authenticateToken, UserMessages.getMessagesPreviews  )
            router.get('/users/:id/messages/:messageId', authenticateToken, UserMessages.getMessage )
            router.patch('/users/:senderId/messages', authenticateToken, UserMessages.send ) 
            router.delete('/users/:id/messages/:usersMessageId/message/:messageId', authenticateToken, UserMessages.deleteMessage )

            app.use('/api/v1', router )
            
            logger.info(' User  Routes Created ')  
        }
        catch(e)
        {
            logger.error(e,"CREATE_USER__ROUTES_ERROR")
        }
    }

