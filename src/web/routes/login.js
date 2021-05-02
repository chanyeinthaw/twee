const User = require('../models/user')
const bcrypt = require('../../lib/bcrypt')

app.get('/login', controllers.noAuth, (req, res) => {
    res.render('login', {
        error: undefined,
        username: '',
        password: ''
    })
})

app.get('/logout', controllers.auth, (req, res) => {
    req.session.authUser = null

    res.redirect('/login')
})

app.post('/login', controllers.noAuth, async (req, res) => {
    let {username, password} = req.body

    let user = await User.findOne({ username }).lean()

    if (!user) return res.render('login', {
        error: 'Invalid username!',
        username, password: ''
    })

    if (!bcrypt.compare(password, user.password)) return res.render('login', {
        error: 'Invalid credentials!',
        username, password: ''
    })

    req.session.authUser = user

    res.redirect('/dashboard')
})