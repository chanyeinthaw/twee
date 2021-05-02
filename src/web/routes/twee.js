const config = require('../../config')

app.post('/twee', (req, res, next) => {
    let apiKey = req.header('api_key')

    if (apiKey !== config.app.apiKey) return next(err(401, 'Unauthorized', 'Unauthorized'))

    next()
}, controllers.twee)