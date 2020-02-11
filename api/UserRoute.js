/**
 * @module UserRoute
 * @requires express
 * UserRouter acts on "/" baseURL
 */

/**
 * @const exress
 */
const express       = require('express')

/**
 * @const userRouter
 */
const router        = express.Router()

const UserModel     = require('../models/UserModel')
const Authenticator = require('../utils/auth')
const UserService   = new (require('../services/UserService'))(UserModel, Authenticator)

const AuthWare      = require('../middlewares/AuthWare') 
const RoleWare      = require('../middlewares/RoleWare')

router.use('/changePassword', AuthWare)
router.use('/deleteUser', AuthWare)

router.use('/deleteUser', new RoleWare('deleteUser'))

/**
 * @memberof module:UserRoute
 * @name POST/login
 * @function
 * User authentication route.
 */
router.post('/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password
    UserService.login(email, password)
    .then((token) => {
        res.cookie('token', token, {
            // TODO change token maxAge to take a config variable
            maxAge: 3600 * 1000,
            httpOnly: true
        })
        res.send({success:true, message:token})
    }).catch((e)=> {
        res.send({success:false, error:e})
    })
})

/**
 * @memberof module:UserRoute
 * @name POST/register
 * @function
 * Registers a new user account, providing a valid email address is provided.
 */
router.post('/register', async (req,res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    UserService.register(username,email,password).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        console.log(`Error: ${JSON.stringify(e)}`)
        res.send({success:false, error:e})
    })
})

/**
 * @memberof module:UserRoute
 * @name POST/changePassword
 * @function
 * Allows a user to change their own password. This route requires a token.
 */
router.post('/changePassword', (req,res) => {
    const email     = req.body.email
    const oldPass   = req.body.oldPassword
    const newPass   = req.body.newPassword

    if (email != res.locals.email) res.status(401).send({success:false, error:"Invalid email."})
    UserService.changePassword(oldPass, newPass, email).then((result) => {
        res.send({success:true,message:result})
    }).catch((error) => {
        res.send({success:false,error:error})
    })
})

/**
 * @memberof module:UserRoute
 * @name POST/deleteUser
 * @function
 * Removes a user from the database. 
 */
router.post('/deleteUser', (req,res) => {

})

module.exports = router;