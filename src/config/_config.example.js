/**
 * @type {AppConfig}
 */
exports.app = {
    port: parseInt(process.env.PORT || 3000)
}

/**
 * @type {TwitterConfig}
 */
exports.twitter = {
    APIKey: 'TWITTER API KEY',
    APIKeySecret: 'TWITTER API KEY SECRET',
    BearerToken: 'BEARER TOKEN',
    CallbackURL: 'CALLBACK URL'
}

/**
 * @type {SessionConfig}
 */
exports.session = {
    secret: 'local',
    resave: false,
    saveUninitialized: false
}