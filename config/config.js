/**
 * Populates the environment variables based on configuration settings.
 * 
 * A local configuration file is created upon system initialization, based upon
 * the baseConfig object. As this object transforms with later versions of software, 
 * the user's configuration file will remain intact, and merge with any new changes
 * made to baseConfig.
 * 
 * @module Configurator
 * @author John L. Carveth
 */

const fs            = require('fs')
const generateSalt  = require('../utils/auth').generateSalt
const deepermerge   = require('deeper-merge')

/**
 * The base configuration of the system. If no config/config.js file exists,
 * a new configuration file is created with baseConfig. If a config.js file does exist,
 * the config file is merged with baseConfig. For any fields that exist in 
 * both configurations, the value held in /config/config.js is kept.
 */
const baseConfig = {
    "development" : {
        "port"          : 3005,
        "mongodbURI"    : "",
        "secretKey"     : generateSalt(),
        "root"          : {
            // A Default Administrator user
            'username'  : 'admin',
            'password'  : 'admin',
            'role'      : 'admin',
            'email'     : 'admin@localhost.com'
        },
        "roles"         : [
            {
                "role" : "user", 
                "permissions" : [
                    "commentPost", "votePost"
                ]
            },
            {
                "role" : "admin",
                "permissions" : [
                    "commentPost", "removeComment", "votePost", "createPost",
                    "approvePost", "editPostSelf", "editPost", "banip", "unbanip",
                    "deleteUser", "verifyUser", "modifyRole"
                ]
            },
            {
                "role" : "author",
                "permissions" : [
                    "commentPost", "votePost", "createPost"
                ]
            }
        ],
        "postFetchCount": 5
    },
    "production" : {
        "port"          : 80,
        "mongodbURI"    : "",
        "secretKey"     : "",
        "roles"         : [
            {
                "role" : "user", 
                "permissions" : [
                    "commentPost", "votePost"
                ]
            },
            {
                "role" : "admin",
                "permissions" : [
                    "commentPost", "removeComment", "votePost", "createPost",
                    "approvePost", "editPostSelf", "editPost", "banip", "unbanip",
                    "deleteUser", "verifyUser", "modifyRole"
                ]
            },
            {
                "role" : "author",
                "permissions" : [
                    "commentPost", "votePost", "createPost"
                ]
            }
        ],
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
        // merge baseConfig and config stored on disk.
        this.config = deepermerge.merge(baseConfig, this.config)
        // update config stored on disk with any new config variables from baseConfig
        this.writeConfig(this.config, 'w')
        // Detect environment to determine which configuration to use
        this.environment = process.env.NODE_ENV || 'development'
        this.config = config[this.environment]
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
            fs.writeFileSync('./config/config.json', JSON.stringify(configuration, null, 2), {flag: flag})
        } catch (e) {
            if (e.code === "EEXIST") {
                console.log('Configuration file already exists.')
            } else throw new Error(e)
        }
    },

    /**
     * Merges the hardcoded base configuration setup with another configuration
     * object. 
     * @param {Object} baseConfig 
     * @param {Object} userConfig 
     */
    mergeConfig : function (baseConfig, userConfig) {
        // For each property in baseConfig, add property to userConfig
        // if not contained
        for (const key in baseConfig) {

        }
    },

    /**
     * Retrieves the value stored at the given key.
     * @param {String} key the key of the data to retrieve
     * @return {*} the value stored at key
     */
    get : function (key) {
        return this.config[key]
    }
}