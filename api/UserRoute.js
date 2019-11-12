/**
 * @module UserRoute
 * @requires express
 * UserRouter acts on "/" baseURL
 */

/**
 * @const exress
 */
const express = require('express')

/**
 * @const userRouter
 */
const router = express.Router()

const UserModel = require('../models/UserModel')
const Authenticator = require('../utils/auth')
const UserService = new (require('../services/UserService'))(UserModel, Authenticator)

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

module.exports = router;