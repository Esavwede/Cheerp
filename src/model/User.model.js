const mongoose = require('mongoose') 
const Schema = mongoose.Schema 



const UserSchema = new Schema 
            (
                {
                    email:
                    {
                        type: String
                    },
                    number:
                    {   
                        type: String 
                    },
                    password:
                    {
                        type: String 
                    }
                },
                {
                    timestamps: true
                }
            )

            
        const User = mongoose.model('user', UserSchema )


        module.exports = User