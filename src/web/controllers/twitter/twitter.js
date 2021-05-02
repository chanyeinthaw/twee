module.exports = (req, res, next) => {
    tw.login((err, tokenSecret, url) => {
        if (err) return res.redirect('/dashboard?error=' + err.message)

        req.session.tokenSecret = tokenSecret

        res.redirect(url)
    })
}