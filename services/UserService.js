/**
 * @module services/UserService
 * @author John L. Carveth
 */
class UserService {
    /**
     * @constructor UserService
     * @param {models/UserModel} userModel 
     */
    constructor (userModel) {
        this.userModel = userModel
    }

    /**
     * Registers a new user to the system
     * @param {String} username 
     * @param {String} email 
     * @param {String} password 
     */
    register(username, email, password) {

    }

    /**
     * Removes the given user from the system
     * @param {ObjectID} id the unique ID of the user to delete
     */
    deleteUser(id) {

    }

    /**
     * Change a registered user's existing password.
     * @param {String} oldPass 
     * @param {String} newPass 
     * @param {String} email 
     */
    changePassword(oldPass, newPass, email) {

    }
}