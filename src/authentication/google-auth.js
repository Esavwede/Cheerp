const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/rateLimiter')
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401);
};

router.use(passport.initialize());
router.use(passport.session());
router.get(
  "/google",
  limiter,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
    passReqToCallback: true,
  })
);

router.get("/google/success", isLoggedIn, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      const details = {
        // firstName: user.name.givenName,
        // lastName: user.name.familyName,
        email: user.email,
        phone_number: user.phone_number,
      };
      console.log(details);
      res.status(200).json({ user: { ...details } });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "An error occured for success" });
  }
});
router.get("/google/failure", async (req, res) => {
  res.status(400).send({ message: "An error occured for failure" });
});

router.get("/error", (req, res) => res.send("Error logging in via Google.."));



module.exports = router;