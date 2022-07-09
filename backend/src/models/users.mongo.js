const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    },
    gamesWon: {
        type: Number,
        required: true
    },
    gamesLost: {
        type: Number,
        required: true
    },
    draws: {
        type: Number,
        required: true
    }

})

module.exports = model('User', usersSchema)