const mongoose = require('mongoose')
const Schema = mongoose.Schema 




const UserProfileSchema = new Schema
            ( 
                {
                    username:
                    {
                        type: String,
                        trim: true    
                    },
                    displayName:
                    {
                        type: String,
                        trim: true,
                        default: 'User'  
                    },
                    bio:
                    {
                        type: String,
                        trim: true   
                    }

                }
            )


const UserProfile = mongoose.model('profile', UserProfileSchema )

module.exports = UserProfile 