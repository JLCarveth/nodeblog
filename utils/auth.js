/**
 * @module Authenticator
 * @requires jsonwebtoken
 * @requires crypto
 * 
 * A JWT wrapper module that handles password hashing and token generation
*/

/**
 * @const jsonwebtoken OAuth JWT module
 */
const jwt = require('jsonwebtoken')

/**
 * @const crypto Node.js crypto module
 */
const crypto = require('crypto')

module.exports = {
    /**
     * @memberof module:Authenticator
     * @function generateToken
     * @param {String} email Token holder's email address
     * @param {String} role Token holder's assigned role
     */
    generateToken : function (email, role) {
        return new Promise((resolve,reject) => {
            const payload = {
                email: email,
                role: role
            }

            jwt.sign(payload, process.env.secretKey, {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
        })
    },

    /**
     * @memberof module:Authenticator
     * @function hashPassword
     * @param {String} password the string to be hashed
     */
    hashPassword : function (password) {
        const salt = this.generateSalt()

        const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')

        return {
            hash:hash,
            salt:salt
        }
    },

    /**
     * @memberof module:Authenticator
     * @function hashWithSalt
     * @param {String} password
     * @param {String} salt
     */
    hashWithSalt : function (password, salt) {
        const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')

        return {
            hash:hash,
            salt:salt
        }
    },

    /**
     * @memberof module:Authenticator
     * @function comparePassword
     * @param {String} password - String password attempt
     * @param {Object} hash - object with hash and salt
     */
    comparePassword : function (password, hash) {
        return hashWithSalt(password, hash.salt).hash == hash
    },

    /**
     * @memberof module:Authenticator
     * @function generateSalt
     * @return {String} a 16-byte alphanumeric string
     */
    generateSalt : function () {
        return crypto.randomBytes(16).toString('hex')
    }

}
