/**
 * @module AuthWare
 * @author John L. Carveth
 * @version 0.2.0
 * @requires module:Authenticator
 * 
 * ExpressJS middleware that automatically verifies JWTs attached to incoming requests
 */

/**
 * @const Authenticator
 */
const Authenticator = require('../utils/auth')

module.exports = function (req,res,next) {
    const token = req.headers['x-access-token'] || req.cookies.token

    if (token) {
        try {
            const result = Authenticator.verifyToken(token)
            res.locals.email    = result.email
            res.locals.role     = result.role
            next()
        } catch (e) {
            res.send({success:false, error:e})
        }
    }
}