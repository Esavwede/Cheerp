
const mongoose = require('mongoose')
const logger = require('../../system/logger/index')
const User = require('../../model/User.model')
const userProfileService = require('../../services/UserProfile/profile.service')
const UserProfile = require('../../model/UserProfile.model')

function findUserByEmail(email)
{
   return new Promise(async (resolve, reject)=>{
        try 
        {
            const user = await User.findOne({ email },{ userId: 1, email: 1, password: 1 })
            resolve( user )
        }
        catch(e)
        {
            logger.error(e,'SERVICE_ERROR: FIND_USER_BY_EMAIL ')
            e.status = 500 
            reject(e)
        }
   })
}

function signupUser( user )
{
    return new Promise( async(resolve, reject)=>{

     //   const session = await mongoose.startSession() 
       // session.startTransaction() 

        try 
        {
            //const sessionDetails = { session }
            const newUser = new User(user) 
            await newUser.save() 
        
            const newUserProfile = new UserProfile({ userId: newUser.userId })
            await newUserProfile.save() 

            logger.info(' new user created ')

          //  session.commitTransaction() 
           // session.endSession() 
            resolve(newUser) 
        }
        catch(e)
        {
           // session.abortTransaction()
           // session.endSession() 
            logger.error(e,'SERVICE: SIGNUP_USER_ERROR: could not signup new user ') 
            reject() 
        }
    })
}


module.exports = { findUserByEmail, signupUser } 