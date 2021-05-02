const mongoose = require('mongoose');
const config = require('../../config')
const User = require('../../web/models/user')
const bcrypt = require('../bcrypt')

mongoose.connect(config.db.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(async _ => {
    let user = await User.findOne({
        username: 'admin'
    })

    if (!user) {
        user = new User({
            username: 'admin',
            password: bcrypt.hash(config.app.defaultAdminPassword),
            userType: 0
        })

        await user.save()

        console.log('Admin user created!')
    }

    console.log('Database connected', config.db.url)
});