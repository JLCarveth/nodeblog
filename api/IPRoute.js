const express = require('express')
const router = express.Router()

const IPModel = require('../models/IPModel')
const IPService = new (require('../services/IPService'))(ipModel)

router.post('/ban', (req,res) => {
    console.log('IPRoute - /ban')
    const address = req.body.address
    const reason = req.body.reason

    try {
        const result = IPService.banAddress(address,reason)
        res.send({success:true, message:result})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

router.post('/unban', (req,res) => {
    const address = req.body.address

    try {
        IPService.unbanAddress(address)
        res.send({success:true, message:'Address ' + address + ' unbanned successfully.'})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

module.exports = router;