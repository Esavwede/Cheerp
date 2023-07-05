const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const MessageItemSchema = new Schema
        (
            {
                messageId:
                {
                    type: String, 
                    required: true, 
                    unique: true, 
                    trim: true 
                },
                textContent:
                {
                    type: String
                },
                senderId:
                {
                    type: String,
                    required: true 
                },
                receiverId:
                {
                    type: String, 
                    required: true 
                }, 
                sentAt:
                {
                    type: String, 
                    required: true 
                }
            }
        )




const UsersMessagesSchema = new Schema
            (
                {
                    messageId: 
                    {
                        type: String,
                        required: true, 
                        trim: true, 
                        unique: true 
                    },
                    messages:
                    {
                        type:[MessageItemSchema]
                    },
                    lastMessagePreview:
                    {
                        type: String 
                    },
                    userOneId:
                    {
                        type: String,
                        required: true 
                    },
                    userTwoId:
                    {
                        type: String, 
                        required: true 
                    }
            
                },
                {
                    timestamps: true 
                }
            )


const UsersMessages = mongoose.model('usersmessages', UsersMessagesSchema )
module.exports = UsersMessages 