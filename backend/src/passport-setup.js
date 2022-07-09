const { Strategy } = require('passport-google-oauth20');
const passport = require('passport');
require('dotenv').config();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = { 
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID, 
    clientSecret: config.CLIENT_SECRET
}

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('Google profile', profile)
    done(null, profile)
}

passport.serializeUser((user, done) => {
    done(null, user)
})
 
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))