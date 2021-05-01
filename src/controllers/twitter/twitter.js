module.exports = (req, res, next) => {
    tw.login((err, tokenSecret, url) => {
        if (err) return next(global.err(400, 'Twitter.LoginError', 'Error login with twitter.'))

        req.session.tokenSecret = tokenSecret

        res.redirect(url)
    })
}