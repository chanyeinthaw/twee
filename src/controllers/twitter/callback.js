module.exports = (req, res, next) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            return next(global.err(401, 'Twitter.AccessDenied', err.message))
        }

        delete req.session.tokenSecret

        // The user object contains 4 key/value pairs, which
        // you should store and use as you need, e.g. with your
        // own calls to Twitter's API, or a Twitter API module
        // like `twitter` or `twit`.
        // user = {
        //   userId,
        //   userName,
        //   userToken,
        //   userTokenSecret
        // }

        // Redirect to whatever route that can handle your new Twitter login user details!
        res.send(user)
    });
}