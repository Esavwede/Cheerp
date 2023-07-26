const Joi = require('joi') 



const SignupSchema = Joi.object(
        {
            firstname: Joi.string().trim().min(2).required(), 
            lastname: Joi.string().trim().min(2).required(),
            email:   Joi.string().email().required(), 
            password: Joi.string().min(7).alphanum().required(), 
        }
)


module.exports = SignupSchema 