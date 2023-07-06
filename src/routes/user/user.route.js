const express = require('express')
const logger = require('../../system/logger/index') 
const router = express.Router() 
const {body} = require('express-validator')
const { verifyToken } = require('../../authentication/user.auth')
const {signup, login, getAccount, deleteAccount} = require('../../controller/user.controller')



module.exports = function(app)
{
    try 
        {

            router.post(
                '/signup', 
                body('email').isEmail(), 
                body('password')
                .isLength({min: 8})
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/), 
                signup
                );
                
            router.post('/signin', login);
            router.get('/read', verifyToken, getAccount)
            router.delete('/delete', verifyToken, deleteAccount)


            app.use('/api/v1/', router )
            logger.info(' User routes created ')

        }
        catch(e)
        {
            logger.error(e,'Error occured while creating user routes ')
        }
}
