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
    const post = {
        title : "America Now The World's Shithole, Analysts Say",
        subtitle : "An Incompetent Administration That Rivals The Worst Governments Ever Seen.",
        author : "John L. Carveth",
        date : "2020-06-29",
        content : "I mean we all know America is a shithole, does it even really need to be said? Anyways, this is the body of the text, so it needs to ramble on and on and on. Sort of how 2020 seems to just go on and on, will it ever end? Will we ever see the sweet release of death?"
    }
    res.render('pages/index', {'post': post})
})

module.exports = router