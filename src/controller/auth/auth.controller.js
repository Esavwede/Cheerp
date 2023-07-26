require('dotenv').config() 
const logger = require('../../system/logger/index')
const jwt = require('jsonwebtoken')
const User = require('../../model/User.model') 
const SignupSchema = require('../../validation/schemas/signup.schema') 
const { findUserByEmail, signupUser } = require('../../services/auth/auth.service')
const { _400response, _409response } = require('../../utils/functions/response') 
const { v4: uuidv4 } = require('uuid');


function authSuccessful(req, res )
{
    try 
    {
        const user = { _id: req.user._id }
        const token = jwt.sign( user , process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION_TIME })
        return res.json({ success: true, message:"signin successful", user, token })
    }
    catch(e)
    {

        if (e.name === 'AuthenticationError') {
            res.status(401).json({ error: 'Google Authentification Error ' });
        }
        
        logger.error(e,'ERROR: REDIRECT_AFTER_SUCCESSFUL_AUTH_RESPONSE_ERROR ')
        return res.status(500).json({ success: false, message:"error occured while redirecting after successful auth"})
    }
}


async function signup(req, res)
{
    try 
    {
       
        const user = req.body 

        await SignupSchema.validateAsync( user ) 


        const userExists = await findUserByEmail( user.email )
        if( userExists ){ return _409response(res,"email taken ")}

        user.userId = uuidv4() 
        const newUser = await signupUser( user )

        return res.status(201).json({ success: true, message:"user signedup successfully ", user: newUser })
    }
    catch(e)
    {
        if(e.isJoi ){ return _400response(res,"check input ")}

        logger.error(e,'Error occured during signup ')
        return res.status(500).json({ success: false, message:"signup error"})
    }
}

async function signin(req, res)
{
    try 
    {
       
        const { email, password } = req.body 

        // find user with email 
        const user = await findUserByEmail( email )

        if( !user ){ return res.status(400).json({ success: false, msg:"email not registered"})}
        
        const passwordIsValid = await user.validatePassword( password )

        if( !passwordIsValid ){ return res.status(400).json({ success: false, msg:"incorrect password "})}
        
        const userData = { email: user.email, id: user.userId }
        const token = jwt.sign( userData, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION_TIME })
        
      return res.status(200).json({ success: true, msg:"signin successful", data:{ user:{ ...userData, token }}})
    }
    catch(e)
    {
        logger.error(e,'Error occured while signin in user ')
        return res.status(500).json({ success: false, msg:"Could not signin user"})
    }
}



module.exports = { authSuccessful, signin, signup }