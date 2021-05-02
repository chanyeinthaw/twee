const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('../../config')
const glob = require('glob')
const path = require('path')

const app = express()
const http = new (require('http').Server)(app)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../web/views'))

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session(config.session))
app.use(cookieParser(config.session.secret))

app.use('/public', express.static(__dirname + '/../../../public'))

const err = (status, code, message = undefined) => {
    let err = { status, type: 'UE' }

    if (code) err.inner = { code, message }

    return err
}
global.err = err
global.controllers = {}
global.app = app

const controllers = glob.sync(__dirname + '/../../web/controllers/**/*.js')

controllers.map(controller => {
    const name = path.basename(controller).replace('.js', '')

    global.controllers[name] = require(controller)
})

const routes = glob.sync(__dirname + '/../../web/routes/**/*.js')

routes.map(route => require(route))

app.use('*', (req, res, next) => {
    next(err(404, 'NotFound', 'API Not Found'))
})

app.use((error, req, res, next) => {
    if (error.type === 'UE') {
        res.status(error.status).send(error.inner)
    } else {
        if (res.headersSent) {
            return
        }

        console.error(error)

        res.status(500).send({
            code: 'InternalServerError',
            message: error.message
        })
    }
})

http.listen(config.app.port,
    () => console.log('Server started at', config.app.port))

