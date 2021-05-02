const User = require('../../models/user')

module.exports = (req, res, next) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, async (err, user) => {
        if (err) {
            return res.redirect('/dashboard?error=' + err.message)
        }

        delete req.session.tokenSecret

        let username = req.session.authUser.username

        let existing = await User.findOne({
            'twitter.userId': user.userId
        })

        if (existing) {
            return res.redirect('/dashboard?error=Twitter is already connected to another user.')
        }

        await User.updateOne({
            username
        }, {
            $set: {
                twitter: {
                    userId: user.userId,
                    username: user.userName,
                    token: user.userToken,
                    tokenSecret: user.userTokenSecret,
                    tweetType: 0
                }
            }
        })

        req.session.authUser = await User.findOne({ username }).lean()

        // Redirect to whatever route that can handle your new Twitter login user details!
        res.redirect('/dashboard')
    });
}