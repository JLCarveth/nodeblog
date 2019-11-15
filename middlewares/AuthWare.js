/**
 * @module AuthWare
 * @author John L. Carveth
 * @version 0.2.0
 * @requires module:Authenticator
 * 
 * ExpressJS middleware that automatically verifies JWTs attached to incoming requests.
 * If a token is successfully decoded, the role and email from the token are
 * stored in res.locals for later middlewares to access.
 * This middleware should be executed before any route that requires authentication
 * 
 * res.locals.role  => The role that has been assigned to the authenticated user
 * res.locals.email => The email address of the authenticated user
 */

/**
 * @const Authenticator
 */
const Authenticator = require('../utils/auth')

/**
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 * @param {Function} next next middleware in the chain
 */
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