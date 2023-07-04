const mongoose = require('mongoose')
const Schema = mongoose.Schema 




const ProfileSchema = new Schema
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


const Profile = mongoose.model('profile', ProfileSchema )

module.exports = Profile 