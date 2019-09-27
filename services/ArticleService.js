class ArticleService {
    constructor (articleModel) {
        this.articleModel = articleModel
    }

    /**
     * 
     * @param {String} title 
     * @param {String} tagline 
     * @param {ObjectID} author 
     * @param {*} content 
     * @param {*} tags 
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
}