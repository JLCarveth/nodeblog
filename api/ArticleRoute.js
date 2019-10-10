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
 */
router.post('/post', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/update
 * @function
 */
router.post('/update', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/delete
 * @function
 */
router.post('/delete', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name POST/blog/update
 * @function
 */
router.post('/update', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/id
 * @function
 */
router.get('/:id', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/author
 * @function
 */
router.get('/author/:id', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/
 * @function
 */
router.get('/', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/tags
 * @function
 */
router.get('/tags/:tag', (req,res) => {})

/**
 * @memberof module:ArticleRoute
 * @name GET/blog/approve
 * @function
 */
router.get('/approve/:id', (req,res) => {})