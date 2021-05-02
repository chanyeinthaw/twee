module.exports = (req, res, next) => {
    if (req.session.authUser.userType !== 0) res.redirect('/')
    else next()
}