const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    userType: {
        type: Number,
        required: true
    },

    twitter: {
        userId: String,
        username: String,
        token: String,
        tokenSecret: String,
        tweetType: String,
    }
})

module.exports = mongoose.model('User', userSchema)