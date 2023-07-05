
const logger = require('../../system/logger/index') 
const UserProfile = require('../../services/UserProfile/profile.service')


async function find(req, res, next)
{
    try 
    {
        const userId = req.params.uuid 
        const userProfile  =  await UserProfile.find( userId  )
        return res.status(200).json({ "message": 'User profile fetched ', userProfile })
    }
    catch(e)
    {
        logger.error(e,'CONTROLLER: FIND_USER_PROFILE_ERROR: could not find user profile ')
        return res.status(500).json({ msg:" could not find user profile "})
    }   
}


async function edit(req, res, next)
{
    try 
    {

        const userId = req.params.uuid 
        const fields = req.body
        await UserProfile.edit( userId, fields )
        return res.status(201).json({ "message": ' user profile edited ' })
    }
    catch(e)
    {
        logger.error(e,'CONTROLLER: EDIT_USER_PROFILE_ERROR: could not edit user profile ')
        return res.status(500).json({ msg:" could not edit profile "})
    }   
}


module.exports = { find, edit }
