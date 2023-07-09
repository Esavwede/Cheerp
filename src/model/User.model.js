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
                    messagesIds:
                    {
                        type:[String]
                    },
                    email:
                    {
                        type: String, 
                        required: false,
                        unique: true, 
                        trim: true 
                    },
                    phone_number:
                    {   
                        type: String,
                        required: false,
                        trim: true, 
                        unique: true 
                    },
                    password:
                    {
                        type: String, 
                        minlength: 6 
                    }
                },
                {
                    timestamps: true
                }
            )

            
        const User = mongoose.model('user', UserSchema )


        module.exports = User 