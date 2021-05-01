const LoginWithTwitter = require('login-with-twitter')
const config = require('../config')

global.tw = new LoginWithTwitter({
    consumerKey: config.twitter.APIKey,
    consumerSecret: config.twitter.APIKeySecret,
    callbackUrl: config.twitter.CallbackURL
})