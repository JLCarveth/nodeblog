/**
 * @module ViewRoute
 * @requires express
 * 
 * View routes acts upon the base url of the blog server,
 * and serves html pagesto GET requests using EJS
 */

/**
 * @const express
*/
const express = require('express')
/**
 * @const viewRouter
 */
const router = express.Router()

/**
 * @memberof module:ViewRoute
 * @name GET/
 * @function
 * Serves index.html
 */
router.get('/', (req,res) => {
    res.render('pages/index')
})

module.exports = router