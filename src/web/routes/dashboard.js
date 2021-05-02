const User = require('../models/user')

app.get('/dashboard', controllers.auth,
    async (req, res) => {
    let currentUser = req.session.authUser.username

    let users = await User.find({
        username: {
            $ne: currentUser
        }
    }).lean()

    const twitter = req.session.authUser.twitter || {
        username: undefined,
        tweetType: undefined
    }

    res.render('dashboard', {
        error: req.query.error,
        users: users,
        twitter: {
            connected: !!req.session.authUser.twitter,
            username: twitter.username || 'not connected',
            tweetType: twitter.tweetType || 'not connected'
        },
        isAdmin: req.session.authUser.userType === 0
    })
})