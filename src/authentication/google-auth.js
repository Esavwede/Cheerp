require('dotenv').config() 
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2')
const User = require('../model/User.model') 
const { omit } = require('lodash')
const logger = require('../system/logger/index') 
const { v4: uuidv4 } = require('uuid');


const authCredentials = 
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET , 
      callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL 
    }


async function authCallBack( accessToken, refreshToken, profile, done )
{
    try 
    {

  
          // Find User with email 
          const email = profile.emails[0].value 
          var user = await User.findOne({ email },{  password: 0, messagesIds: 0})


          if( !user )
          {
            // create new user 
            logger.info(' Google user not yet signup  ')
            logger.info(' Creating new User ')
            const userId = uuidv4() 
            const firstname = profile.given_name
            const lastname = profile.family_name
            var newUser = new User({ userId, email, firstname, lastname })
            await newUser.save()
        
            logger.info(' User saved ') 
            return done( null, newUser )
          }


          done( null, user )
    }
    catch(e)
    {
        logger.error(e,'Google Signin Error ')
    }
}

passport.use(
  new GoogleStrategy( authCredentials , authCallBack )
)


// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});


module.exports = passport 