/**
 * Populates the environment variables based on configuration settings
 * @module config
 * @author John L. Carveth
 */

const fs = require('fs').promises
const config = require('./config.json')

const baseConfig = {
    "development" : {
        "port"          : 3005,
        "mongodbURI"    : "",
        "secretKey"     : "",
        "roles"         : [],
        "postFetchCount": 5
    }
}

const defaultConfig = config[environment]

const keys = Object.keys(defaultConfig)
// Map each key from the default environment to process.env
keys.forEach((key) => {
    process.env[key] = defaultConfig[key]
})

/**
 * @module Configurator sets all config variables
 */
module.exports = class Configurator {
    constructor () {
        // Create a base config file if it doesn't already exist
        this.generateDefaultConfig()
        const config = require('./config.json')
        this.environment = process.env.NODE_ENV || 'development'
        this.config = config[environment]
        this.populateEnvironment()
    }

    /**
     * Populates process.env with all config variables
     * @memberof module:Configurator
     * @function populateEnvironment
     */
    populateEnvironment () {
        const keys = Object.keys(this.config)
        keys.forEach((key) => {
            process.env[key] = this.config[key]
        })
    }

    generateDefaultConfig () {
        fs.writeFile('./config.json', JSON.stringify(baseConfig), {flag: 'ax'}).then((result) => {
            console.log(result)
        }).catch ((e) => {
            throw new Error(e)
        })
    }
}