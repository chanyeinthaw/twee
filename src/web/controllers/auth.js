module.exports = (req, res, next) => {
    if (!req.session.authUser) res.redirect('/login')
    else next()
}