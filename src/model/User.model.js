const mongoose = require('mongoose') 
const Schema = mongoose.Schema 



const UserSchema = new Schema 
            (
                {
                    userId:
                    {
                        type: String, 
                        unique: true, 
                        required: true,
                        trim: true
                    },
                    email:
                    {
                        type: String, 
                        required: false,
                        unique: true, 
                        trim: true 
                    },
                    phoneNumber:
                    {   
                        type: String,
                        required: false,
                        trim: true, 
                        unique: true 
                    },
                    password:
                    {
                        type: String, 
                        required: true,
                        minlength: 6 
                    }, 
                    phoneNumberVerificationCode:
                    {
                        type: String, 
                        required: false, 
                        trim: true,
                        unique: false 
                    }
                },
                {
                    timestamps: true
                }
            )

            
        const User = mongoose.model('user', UserSchema )


        module.exports = User 