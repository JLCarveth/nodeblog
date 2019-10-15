/**
 * Populates the environment variables based on configuration settings
 * @module config
 * @author John L. Carveth
 */

const config = require('./config.json')
const environment = process.env.NODE_ENV || 'development'

const defaultConfig = config[environment]

const keys = Object.keys(defaultConfig)
// Map each key from the default environment to process.env
keys.forEach((key) => {
    process.env[key] = defaultConfig[key]
})