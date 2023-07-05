
const logger = require('../../system/logger/index')
const UserProfile = require('../../model/UserProfile.model')


function create( userId, profile )
{
    return new Promise((resolve, reject)=>{
        profile.userId = userId 
            UserProfile.create( profile )
            .then((result)=>
             {
                logger.info(' New user Profile created') 
                resolve(result)  
             })
            .catch((e)=> 
            { 
                logger.error(e,'CREATE_USER_PROFILE_SERVICE_ERROR: could not create user profile')
                reject(e)
            })
    })
}

function find( userId )
{
    return new Promise((resolve, reject)=>{
        UserProfile.findOne({ userId } )
        .then(( userProfile )=>
        {
            logger.info('User profile found ')
            resolve( userProfile )
        })
        .catch((e)=>
        {
            logger.error(e,'EDIT_USER_PROFILE_SERVICE_ERROR: could not edit user profile ') 
            reject(e)
        })
})   
}

function edit( userId, fields )
{
    return new Promise((resolve, reject)=>{
        UserProfile.updateOne({ userId }, fields,{ returnDocument: true } )
        .then((result)=>
        {

            console.log(result) 
            if ( !result.acknowledged ) {
                reject( new Error(' User not found ')  )
            }


            logger.info('User profile edited ')
            resolve(result)
        })
        .catch((e)=>
        {
            logger.error(e,'EDIT_USER_PROFILE_SERVICE_ERROR: could not edit user profile ') 
            reject(e)
        })
    })   
}


module.exports = { create, find,  edit } 