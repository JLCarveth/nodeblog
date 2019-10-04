/**
 * @module UserService
 * @author John L. Carveth
 */
module.exports = class UserService {
    /**
     * @constructor UserService
     * @param {models/UserModel} userModel 
     */
    constructor (userModel) {
        this.userModel = userModel
    }

    /**
     * Registers a new user to the system
     * @memberof module:UserService
     * @function register
     * @param {String} username 
     * @param {String} email 
     * @param {String} password 
     */
    register (username, email, password) {

    }

    /**
     * @memberof module:UserService
     * @function login
     * @param {String} email 
     * @param {String} password 
     */
    login (email, password) {
        
    }

    /**
     * Removes the given user from the system
     * @memberof module:UserService
     * @function deleteUser
     * @param {ObjectID} id the unique ID of the user to delete
     */
    deleteUser (id) {

    }

    /**
     * Change a registered user's existing password.
     * @memberof module:UserService
     * @function changePassword
     * @param {String} oldPass 
     * @param {String} newPass 
     * @param {String} email 
     */
    changePassword (oldPass, newPass, email) {

    }
}