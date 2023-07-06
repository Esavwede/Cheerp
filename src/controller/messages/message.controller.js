const logger = require('../../system/logger/index') 
const UsersMessagesService = require('../../services/Message/message.service') 
const { v4: uuidv4 } = require('uuid');


async function send(req, res, next)
{
    try 
    {
        
        // Get message Id from URL 
        var messageId = req.body.messageId

        if( messageId === 'null' || messageId === null )
        {
            messageId = uuidv4();
            console.log(' New Message Id created ')
        }


        // Add message id to message body 
        var senderId = req.params.id 
        var receiverId = req.body.receiverId 

        const messageBody = req.body
        messageBody.senderId = senderId 

        const lastMessagePreview = req.body.textContent 
        

        console.log( messageId + '  ' + messageBody + ' ' + ' lastMessagePreview ' ) 
        await UsersMessagesService.send( messageId, messageBody, lastMessagePreview )
        return res.status(201).json({ success: true, message:" New Message Sent "})

    }
    catch(e)
    {
        logger.error(e,`Error occured while sending message from  user:${ senderId } to user:${ receiverId}`) 
        return res.status(500).json({ success: false, "message":" could not send new Message "})
    }
}


async function getMessagesPreviews(req, res, next)
{
    try 
    {
        const userId = req.params.id
        const userMessagesPreview = await UsersMessagesService.getMessagesPreviews( userId ) 
        if( userMessagesPreview.length < 1 )
        {
            return res.status(200).json({ success: false, message:"could not find messages for this user"})
        }

        return res.status(200).json({ userMessagesPreview })
    }
    catch(e)
    {
        logger.error(e,`Error occured while sending message from  user:${ senderId } to user:${ receiverId}`) 
        return res.status(500).json({ "message":" could not send new Message "})
    }
}


async function getMessage(req, res, next)
{
    try 
    {
        const userId = req.params.id 
        const messageId = req.params.messageId
        const messages = await UsersMessagesService.getMessage( userId, messageId ) 
        return res.status(200).json({ messages })
    }
    catch(e)
    {
        logger.error(e,`Error occured while getting   user:${ userId } message `) 
        return res.status(500).json({ "message":" could not get user message "})
    }
}


async function deleteMessage(req, res, next)
{
    try 
    {
        var userId = req.params.id 
        var messageId = req.params.messageId
        var usersMessageId = req.params.usersMessageId 

        await UsersMessagesService.deleteMessage( userId, usersMessageId,  messageId ) 
        return res.status(200).json({ message:" Message Deleted Successfully " })
    }
    catch(e)
    {
        logger.error(e,`Error occured while getting   user:${ userId } message `) 
        return res.status(500).json({ "message":" could not delete user message "})
    }
}


module.exports = { send, getMessagesPreviews, getMessage, deleteMessage }