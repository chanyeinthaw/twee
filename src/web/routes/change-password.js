const User = require('../models/user')
const bcrypt = require('../../lib/bcrypt')

app.get('/change-password', controllers.auth,
    async (req, res) => {
    let userId = req.session.authUser._id

    let user = await User.findOne({ _id: userId })

    if (user) {
        user.password = bcrypt.hash(req.query.new)

        await user.save()
    }

    res.redirect('/dashboard')
})