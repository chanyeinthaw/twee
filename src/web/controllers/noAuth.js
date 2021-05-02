module.exports = (req, res, next) => {
    if (req.session.authUser) res.redirect('/dashboard')
    else next()
}