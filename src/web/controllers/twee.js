const User = require('../models/user')
const { TwitterClient } = require('twitter-api-client')
const config = require('../../config')

module.exports = async (req, res, next) => {
    let status = req.body

    let users = await User.find({
        $or: [
            {
                twitter: {
                    $ne: null
                }
            },
            {
                twitter: {
                    $ne: undefined
                }
            }
        ]
    })

    let promises = []
    for(let user of users) {
        promises.push(tweetForUser(status, user.twitter))
    }

    await Promise.all(promises)

    res.send()
}

async function tweetForUser(status, user) {
    try {
        const twitter = new TwitterClient({
            apiKey: config.twitter.APIKey,
            apiSecret: config.twitter.APIKeySecret,
            accessToken: user.token,
            accessTokenSecret: user.tokenSecret
        })

        await twitter.tweets.statusesUpdate({ status })

        console.log(user.username, 'status updated!')
    } catch (e) {
        console.log(user.username, 'status update failed!')
    }
}