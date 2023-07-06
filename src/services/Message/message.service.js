const logger = require('../../system/logger/index')
const User = require('../../model/User.model') 
const UserMessages = require('../../model/UsersMessages.model') 
const mongoose = require('mongoose') 



function send( messageId, messageBody, lastMessagePreview )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            logger.info('SEND_MESSAGE_SERVICE')

            console.log( lastMessagePreview ) 

            var userOneId = messageBody.senderId 
            var userTwoId = messageBody.receiverId 

            const session = await mongoose.startSession();
            session.startTransaction();

            console.log( messageId ) 

            const filter = { messageId }
            const update = { $push: { messages: messageBody }, 
                             $set: { messageId: messageId,  lastMessagePreview: lastMessagePreview, userOneId, userTwoId } }

            const options = { new: false, upsert: true }
             
            
           const oldRecord =  await UserMessages.findOneAndUpdate(
                filter,
                update,
                options
              )

             
                if( oldRecord )
                {
                    // resolve 
                    (async()=>{ 
                        logger.info(' message details found and updated ')
                        
                        await session.commitTransaction() 
                        session.endSession()
                        logger.info(' message sent ') 
                        resolve() 
                    })()
                    
                } 
                
            if( !oldRecord )
            {
                (async()=>{ 


                    logger.info(' new message details created for message ')
                    const filter = { $or: [ { userId: userOneId }, { userId: userTwoId } ] };
                    const update = { $addToSet: { messagesIds: messageId } }
                    const options = { upsert: true } 

                    User.updateMany( filter, update, options ).then( result =>{
                        console.log( result ) 
                            session.endSession()
                           logger.info(' message sent ')
                            resolve() 
                    })
                    

                })()
            }

        }
        catch(e)
        {
            logger.error(e,'ERROR: SEND_MESSAGES_SERVICE: could not send user message ')
            reject(e) 
        }
    })
}


function getMessagesPreviews( userId )
{
    return new Promise( async (resolve, reject)=>{
        try
        {
            const filter = { $or: [ { userOneId: userId }, { userTwoId: userId } ] }
            const returnFields = { lastMessagePreview: 1, messageId: 1 }
            const messagesPreviews =  await UserMessages.find(filter, returnFields )

            console.dir( messagesPreviews ) 

            resolve( messagesPreviews ) 
        }
        catch(e)
        {
            logger.error(e,` could not get messages previews for user:${ userId }`)
            reject(e) 
        }
    })
}


function getMessage(  userId, messageId )
{
    return new Promise( async (resolve, reject)=>{
        try
        {
            const filter = { messageId: messageId, $or: [ { userOneId: userId }, { userTwoId: userId } ] }
            const returnFields = { messages: 1, messageId: 1 }
            const message =  await UserMessages.findOne(filter, returnFields )

            resolve( message ) 
        }
        catch(e)
        {
            logger.error(e,` could not get messages previews for user:${ userId }`)
            reject(e) 
        }
    })
}


function deleteMessage( userId, usersMessageId, messageId )
{
    return new Promise( async (resolve, reject)=>{
        try
        {

            const filter = { $and: [
                { messageId: usersMessageId },
                {$or: [  { userOneId: userId }, { userTwoId: userId } ] }
              ]
            }

           
            const deleteQuery = { $pull: { messages: { messageId: messageId } } }
            const result = await UserMessages.updateOne(filter, deleteQuery )

            console.log( result ) 

            if (result.modifiedCount > 0) {
                logger.info('Message Deleted ')
               resolve() 
              } else {
                logger.info(" Could not delete message ")
                reject() 
              }
        }
        catch(e)
        {
            logger.error(e,` could not get messages previews for user:${ userId }`)
            reject(e) 
        }
    })
}

module.exports = { send, getMessagesPreviews, getMessage, deleteMessage } 