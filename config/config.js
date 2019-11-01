/**
 * Populates the environment variables based on configuration settings
 * @module Configurator
 * @author John L. Carveth
 */

const fs = require('fs')
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

module.exports = {
    /**
     * Initializes the Configuration module
     * @memberof module:Configurator
     * @function init 
     */
    init : function () {
        // Create a base config file if it doesn't already exist
        this.writeConfig(baseConfig, 'ax')
        // Import it
        const config = require('./config.json')
        // Detect environment to determine which configuration to use
        this.environment = process.env.NODE_ENV || 'development'
        this.config = config[this.environment]
        // merge baseConfig and config stored on disk.
        this.config = {...baseConfig,...this.config}
        // update config stored on disk with any new config variables from baseConfig
        this.writeConfig(this.config, 'w')
        // Assign config values to provess.env variables
        this.populateEnvironment()
    },

    /**
     * Populates process.env with all config variables
     * @memberof module:Configurator
     * @function populateEnvironment
     */
    populateEnvironment : function () {
        const keys = Object.keys(this.config)
        keys.forEach((key) => {
            process.env[key] = this.config[key]
        })
    },

    /**
     * Overwrites config.json with new configuration settings
     * @memberof module:Configurator
     * @function writeConfig
     * @param {Object} configuration JSON config object to be written
     * @param {String} flag Node FS module flag
     */
    writeConfig : function (configuration, flag) {
        try {
            fs.writeFileSync('./config.json', JSON.stringify(configuration), {flag: flag})
        } catch (e) {
            if (e.code === "EEXIST") {
                console.log('Configuration file already exists.')
            } else throw new Error(e)
        }
    }
}