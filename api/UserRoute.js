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
const UserService = new (require('../services/UserService'))(userModel)

router.post('/login', (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const token = UserService.login(email, password)

        res.cookie('token', token, {
            // TODO change token maxAge to take a config variable
            maxAge: 3600 * 1000,
            httpOnly: true
        })
        res.send({success:true, message:token})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

router.post('/register', (req,res) => {
    try {
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        UserService.register(username,email,password)
        res.send({success:true,message:'Registered successfully.'})
    } catch (e) {
        res.send({success:false, error:e})
    }
})
