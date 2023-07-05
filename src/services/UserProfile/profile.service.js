
const logger = require('../../system/logger/index')
const UserProfile = require('../../model/UserProfile.model')


function create( profile )
{
    return new Promise((resolve, reject)=>{
            UserProfile.create( profile )
            .then((result)=>
             {
                logger.info(' New user created successfully ') 
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
        UserProfile.updateOne({ userId }, fields )
        .then((result)=>
        {
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