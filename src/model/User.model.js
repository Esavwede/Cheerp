const mongoose = require('mongoose') 
const Schema = mongoose.Schema 
const bcrypt = require('bcrypt')
const logger = require('../system/logger/index')



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
                    firstname:
                    {
                        type: String 
                    },
                    lastname:
                    {
                        type: String 
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
                        minlength: 6, 
                        required: true 
                    }
                },
                {
                    timestamps: true
                }
            )



            UserSchema.pre('save',async function (next){
                try 
                {
                    if( !this.isModified('password') )
                    {
                        return next() 
                    }
    
                    const salt = await bcrypt.genSalt(10) 
                    const hashedPassword = await bcrypt.hash( this.password, salt ) 
                    this.password = hashedPassword 
                    next() 
                }
                catch(e)
                {
                    return next(e) 
                }
            })

            

            UserSchema.methods.validatePassword = async function( enteredPassword )
            {
               try 
               {
                    const user = this
                    const passwordValid  = await bcrypt.compare( enteredPassword, user.password )
                    return passwordValid  
               }
               catch(e)
               {
                    throw e 
               }
            }



        const User = mongoose.model('user', UserSchema )

        module.exports = User 