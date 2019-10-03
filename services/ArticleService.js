/**
 * @module services/ArticleService
 * @author John L. Carveth
 */

module.exports = class ArticleService {
    /**
     * @constructor ArticleService
     * @param {models/ArticleModel} articleModel 
     */
    constructor (articleModel) {
        this.articleModel = articleModel
    }

    /**
     * Creates a new Article
     * @param {String} title 
     * @param {String} tagline 
     * @param {ObjectID} author 
     * @param {String} content article body content, in Markdown format 
     * @param {String} tags for categorization, saparated by commas 
     */
    createArticle (title, tagline, author, content, tags) {

    }

    /**
     * Approves an article, making it visible to the end user
     * @param {ObjectID} id
     * @return true if the article with given ID is approved.
     */
    approveArticle(id) {

    }

    /**
     * Deletes an article with the given ID value
     * @param {ObjectID} id 
     */
    deleteArticle(id) {

    }

    /**
     * Updates the content of the article with the given ID
     * @param {ObjectID} id 
     * @param {String} content the edited content, in Markdown format 
     */
    updateArticle(id, content) {

    }
}