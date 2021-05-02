const User = require('../models/user')

app.get('/twitter', controllers.auth, controllers.twitter)
app.get('/twitter/callback', controllers.auth, controllers.callback)

app.get('/twitter/disconnect', controllers.auth,
    async (req, res) => {
        let username = req.session.authUser.username

        await User.updateOne({
            username
        }, {
            $set: {
                twitter: undefined
            }
        })
        req.session.authUser = await User.findOne({username}).lean()

        res.redirect('/dashboard')
    })

app.get('/twitter/change-type', controllers.auth,
    async (req, res) => {
        let username = req.session.authUser.username

        await User.updateOne({
            username
        }, {
            $set: {
                'twitter.tweetType': req.query.type
            }
        })

        req.session.authUser = await User.findOne({username}).lean()

        res.redirect('/dashboard')
    })