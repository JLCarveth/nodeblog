/**
 * @module UserService
 * @author John L. Carveth
 */
module.exports = class UserService {
    /**
     * @constructor UserService
     * @param {module:UserModel} UserModel 
     * @param {module:Authenticator} auth
     */
    constructor (UserModel, auth) {
        this.UserModel = UserModel
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
        return this.UserModel.create({
            'username': username,
            'email': email,
            'password': hash.hash,
            'salt': hash.salt
        })
    }

    /**
     * @memberof module:UserService
     * @function login
     * @param {String} email 
     * @param {String} password 
     * @return A token generated for the user, or an error if authentication failed
     */
    async login (email, password) {
        return new Promise(async (resolve,reject) => {
            const user = await this.UserModel.findOne({email:email}).exec()
            const valid = this.Authenticator.comparePassword(password, user.password, user.salt)
    
            if (valid) {
                this.Authenticator.generateToken(email, user.role).then((token) => {
                    resolve(token)
                }) 
            } else {
                reject('Authentication has failed.')
            }
        })
    }

    /**
     * Removes the given user from the system
     * @memberof module:UserService
     * @function deleteUser
     * @param {ObjectID} id the unique ID of the user to delete
     */
    async deleteUser (id) {
        try {
            return this.UserModel.deleteOne({_id:id}).exec()
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
    async changePassword (oldPass, newPass, email) {
        try {
            const user = this.UserModel.findOne({email:email}).exec()
            const valid = user.password == this.Authenticator.hashWithSalt(
                oldPass, user.salt
            )

            if (valid) {
                const hash = this.Authenticator.hashPassword(newPass)
                return UserModel.updateOne({email:email}, {password:hash.hash, salt:hash.salt}).exec()
            } else throw new Error('Could not change password.')
        } catch (e) {
            throw new Error(e)
        }
    }
}