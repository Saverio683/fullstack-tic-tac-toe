const cookieSession = require('cookie-session')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./routes/authentication.router')
const { updateUserStats } = require('./models/users.model')
const sockets = require('./sockets')
require('./passport-setup')

const app = express()
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }    
}) 
sockets.listen(io)

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 4000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, //24 hours
    keys: ['secret key']
}))

app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(helmet()) 

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})
mongoose.connection.on('error', err => {
    console.error(err)
})

const startServer = async () => {
    await mongoose.connect(MONGO_URL)
    server.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
}
startServer()

app.use('/auth', authRouter)
app.post('/game', async (req, res) => {
    const updatedUser = await updateUserStats('draw', 'Il Puma')
    res.send(updatedUser)
})