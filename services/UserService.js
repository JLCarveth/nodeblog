/**
 * @module UserService
 * @author John L. Carveth
 */
module.exports = class UserService {
    /**
     * @constructor UserService
     * @param {module:UserModel} userModel 
     * @param {module:Authenticator} auth
     */
    constructor (userModel, auth) {
        this.userModel = userModel
        this.Authenticator = auth
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
        const hash = this.Authenticator.hashPassword(password)

        try {
            UserModel.create({
                username: username,
                email: email,
                password: hash.hash,
                salt: hash.salt
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * @memberof module:UserService
     * @function login
     * @param {String} email 
     * @param {String} password 
     * @return A token generated for the user, or an error if authentication failed
     */
    login (email, password) {
        try {
            const user = UserModel.findOne({email:email}).exec()
            const valid = this.Authenticator.comparePassword(password, user.hash)

            if (valid) {
                return this.Authenticator.generateToken(email, user.role).then((token) => {
                    return token
                }) 
            } else {
                throw new Error('Authentication has failed.')
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Removes the given user from the system
     * @memberof module:UserService
     * @function deleteUser
     * @param {ObjectID} id the unique ID of the user to delete
     */
    deleteUser (id) {
        try {
            UserModel.deleteOne({_id:id}).exec()
        } catch (e) {
            throw new Error(e)
        }
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
        try {
            const user = UserModel.findOne({email:email}).exec()
            const valid = user.password == this.Authenticator.hashWithSalt(
                oldPass, user.salt
            )

            if (valid) {
                const hash = this.Authenticator.hashPassword(newPass)
                UserModel.updateOne({email:email}, {password:hash.hash, salt:hash.salt}).exec()
            } else throw new Error('Could not change password.')
        } catch (e) {
            throw new Error(e)
        }
    }
}