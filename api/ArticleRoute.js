/**
 * @module ArticleRoute
 * @requires express
 * ArticleRouter acts on "/blog" baseURL
 */

/**
 * @const express
 */
const express = require('express')

/**
 * @const articleRouter
 */
const router = express.Router()

const ArticleModel = require('../models/ArticleModel')
const ArticleService = new (require('../services/ArticleService'))(ArticleModel)

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/post
 * @function 
 * Creates a new, unapproved article.
 */
router.post('/post', (req,res) => {
    const title = req.body.title
    const tagline = req.body.tagline
    const author = req.body.author
    const content = req.body.content
    const tags = req.body.tags

    ArticleService.createArticle(title,tagline,author,content,tags)
        .then((result) => {
            res.send({success:true,message:result})
    }).catch ((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/update
 * @function
 * Updates the content of a given article, specified by an ID parameter.
 */
router.post('/update', (req,res) => {
    const id = req.body.id
    const content = req.body.content

    ArticleService.updateArticle(id,content).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/delete
 * @function
 * Removes the given post, as specified by an ID parameter. 
 */
router.post('/delete', (req,res) => {
    const id = req.body.id

    ArticleService.deleteArticle(id).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/id
 * @function
 * Fetches a post by its given ID
 */
router.get('/:id', (req,res) => {
    const id = req.params.id

    ArticleService.getArticleByID(id).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/author
 * @function
 * Get all articles written by the author with the specified ID.
 */
router.get('/author/:id', (req,res) => {
    const id = req.params.id

    ArticleService.getArticlesByAuthor(id).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})    
    })
})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/
 * @function
 * Fetches the 5 most recent articles.
 */
router.get('/', (req,res) => {
    // TODO Change to take param from configuration
    ArticleService.getRecentArticles(5).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/tags
 * @function
 * Get all articles that contain the specified tag
 */
router.get('/tags/:tag', (req,res) => {
    const tag = req.params.tag
    ArticleService.getArticlesByTag(tag).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})
    })
})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/approve
 * @function
 * Approve the article, specified by the ID parameter. An approved article
 * is visible to the end user.
 */
router.get('/approve/:id', (req,res) => {
    const id = req.params.id
    ArticleService.approveArticle(id).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false,error:e})
    })
})

module.exports = router;