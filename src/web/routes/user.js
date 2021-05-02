const User = require('../models/user')
const bcrypt = require('../../lib/bcrypt')

app.post('/user', controllers.auth, controllers.admin,
    async (req, res) => {
        const {username, password, userType} = req.body

        let user = await User.findOne({ username })

        if (user) return res.redirect('/dashboard?error=Username already exists.')

        user = new User({
            username, password: bcrypt.hash(password),
            userType: +userType
        })

        await user.save()

        res.redirect('/dashboard')
    })

app.get('/user/password', controllers.auth, controllers.admin,
    async (req, res) => {
        await User.updateOne({
            username: req.query.username,
        }, {
            $set: {
                password: bcrypt.hash(req.query.new)
            }
        })

        res.redirect('/dashboard')
    })

app.get('/user/delete', controllers.auth, controllers.admin,
    async (req, res) => {
        await User.deleteOne({
            username: req.query.username
        })

        res.redirect('/dashboard')
    })