/**
 * @typedef {{
 *     port: number,
 *     defaultAdminPassword: string
 * }} AppConfig
 *
 * @typedef {{
 *     url: string
 * }} DBConfig
 *
 * @typedef {{
 *     APIKey: string,
 *     APIKeySecret: string,
 *     BearerToken: string,
 *     CallbackURL: string
 * }} TwitterConfig
 *
 * @typedef {{
 *     secret: string,
 *     resave: boolean,
 *     saveUninitialized: boolean
 * }} SessionConfig
 *
 * @typedef {{
 *     twitter: TwitterConfig,
 *     session: SessionConfig,
 *     app: AppConfig,
 *     db: DBConfig
 *  }} Config
 */

const glob = require('glob')
const {basename} = require('path')

let variantsJSFiles = glob.sync(__dirname + '/config.*.js')

const configVariants = {}
variantsJSFiles.map(f => {
    const name = basename(f)
        .replace(/(config\.)|(\.js)/g, '')

    configVariants[name] = require(f)
})

/**
 * @type {Config}
 */
module.exports = configVariants[process.env.NODE_ENV || 'local']