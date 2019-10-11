/**
 * @module ArticleService
 * @author John L. Carveth
 */

module.exports = class ArticleService {
    /**
     * @constructor ArticleService
     * @param {module:ArticleModel} articleModel 
     */
    constructor (articleModel) {
        this.articleModel = articleModel
    }

    /**
     * Creates a new Article
     * @memberof module:ArticleService
     * @function createArticle
     * @param {String} title 
     * @param {String} tagline 
     * @param {ObjectID} author 
     * @param {String} content article body content, in Markdown format 
     * @param {String} tags for categorization, saparated by commas 
     */
    async createArticle (title, tagline, author, content, tags) {
        try {
            const article = {
                title:title,
                tagline:tagline,
                author:author,
                content:content,
                tags:tags
            }

            return this.articleModel.create(article)
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Approves an article, making it visible to the end user
     * @memberof module:ArticleService
     * @function approveArticle
     * @param {ObjectID} id
     * @return true if the article with given ID is approved.
     */
    async approveArticle (id) {
        try {
            return this.articleModel.updateOne({_id:id}, {approved:true}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Deletes an article with the given ID value
     * @memberof module:ArticleService
     * @function deleteArticle
     * @param {ObjectID} id 
     */
    async deleteArticle (id) {
        try {
            return this.articleModel.deleteOne({_id:id}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Updates the content of the article with the given ID.
     * Also updates the article's date
     * @memberof module:ArticleService
     * @function updateArticle
     * @param {ObjectID} id 
     * @param {String} content the edited content, in Markdown format 
     */
    async updateArticle (id, content) {
        try {
            return this.articleModel.updateOne({_id:id}, {content:content, date:Date.now})
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Gets the article with the given ID, if it exists
     * @memberof module:ArticleService
     * @function getArticleByID
     * @param {ObjectID} id
     * @return the article with given id
     */
    async getArticleByID (id) {
        try {
            const article = await this.articleModel.findById({_id:id}).exec()
            return article
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Gets *n* recent articles
     * @memberof module:ArticleService
     * @function getRecentArticles
     * @param {Number} n 
     */
    async getRecentArticles (n) {
        try {
            return this.articleModel.find({approved:true}).sort({date:-1}).limit(n).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Gets all articles published by a given author
     * @memberof module:ArticleService
     * @function getArticlesByAuthor
     * @param {ObjectID} id 
     */
    async getArticlesByAuthor (id) {
        try {
            return this.articleModel.find({author:id}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Finds all articles with matching tag(s). Multiple tags should work, provided
     * they're separated by commas.
     * @memberof module:ArticleService
     * @function getArticlesByTag
     * @param {String} tags
     */
    async getArticlesByTag (tags) {
        try {
            const exp = new RegExp(tags, 'g')
            return this.articleModel.find({tags: {$regex: exp.toString()}})
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Posts a comment onto an article
     * @memberof module:ArticleService
     * @function postComment
     * @param {*} articleID where the comment will be posted
     * @param {*} commentAuthor id of author of the comment 
     * @param {*} content the comment's content
     */
    async postComment (articleID, commentAuthor, content) {
        try {
            const comment = {author: commentAuthor, content:content}
            return ArticleModel.findOneAndUpdate({_id:articleID}, {
                $push: {comments: comment}
            }).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Removes all comments on an article posted by commentAuthor
     * @memberof module:ArticleService
     * @function removeComment
     * @param {*} articleID id of article where offending comment was posted
     * @param {*} commentAuthor id of author of offending comment
     */
    async removeComment (articleID, commentAuthor) {
        try {
            return ArticleModel.findOneAndUpdate({_id:articleID}, {
                $pull: {comments: {author:commentAuthor}}})
        } catch (e) {
            throw new Error(e)
        }
    }
}