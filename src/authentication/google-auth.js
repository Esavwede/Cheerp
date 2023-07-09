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
          const googleId = profile.id 
          const displayName = profile.displayName 
          const email = profile.emails[0].value 
          var user = await User.findOne({ email },{  password: 0, messagesIds: 0})


          if( !user )
          {
            // create new user 
            logger.info(' User not found in database ')
            const userId = uuidv4() 
            var newUser = new User({ userId, email, googleId, displayName  })
            await newUser.save()
        
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