const { Router } = require('express')
const passport = require('passport')

const { createNewUser, getUser, updateUserStats } = require('../models/users.model')

const authRouter = Router()

const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = true
    if(!isLoggedIn)
        return res.status(401).json({
            error: 'you must log in!'
        })
    next()
}

authRouter.get('/google', (req, res) => {
    passport.authenticate('google', {
        scope: ['email']
    })
})

authRouter.get('/google/callBack', 
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/success', 
        session: false
    }), 
    (req, res) => { 
        console.log('Google has called us back!')
    }
)

authRouter.get('/logout', (req, res) => { 
    req.session = null
    req.logOut()    
})

authRouter.get('/failure', (req, res) => 
    res.send('Failed to log in!')
)

authRouter.get('/success', checkLoggedIn, (req, res) => 
    res.send('Success to log in!')
)

authRouter.post('/registration', async (req, res) => {
    const { username, email, password } = req.body
    const userCreation = await createNewUser(username, email, password)
    userCreation.error ? //check for errors
        res.status(409).send(userCreation)
    :
        res.send(userCreation)
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userSearch = await getUser(email, password)
    userSearch.error ?
        res.status(401).send(userSearch)
    :
        res.send('Welcome back!')
})

module.exports = authRouter