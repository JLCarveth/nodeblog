/**
 * @module RoleRoute
 * @requires express
 * @requires services/RoleModel
 * @requires services/RoleService
 * RoleRoute router acts on "/role" baseURL
 */

/**
 * @const express
 */
const express = require('express')

/**
 * @const
 */
const router = express.Router()

const RoleModel = require('../models/RoleModel')
const RoleService = new (require('../services/RoleService'))(RoleModel)

/**
 * GET request on /role/permissions/:role
 * @name GET/role/permissions/
 * @function
 * @memberof module:RoleRoute
 */
router.get('/permissions/:role', (req,res) => {
    const role = req.params.role
    RoleService.getRolePermissions(role).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * GET request on /role/grant/:role/:permission
 * @name GET/role/grant
 * @function
 * @memberof module:RoleRoute
 */
router.get('/grant/:role/:permission', (req,res) => {
    const role = req.params.role
    const permission = req.params.permission

    RoleService.grantPermission(role, permission).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * GET request on /role/revoke/:role/:permission
 * @name GET/role/revoke
 * @function
 * @memberof module:RoleRoute
 */
router.get('/revoke/:role/:permission', () => {
    const role = req.params.role
    const permission = req.params.permission

    RoleService.revokePermission(role,permission).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * GET request on /role/revokeAll/:role
 * @name GET/role/revokeAll
 * @function
 * @memberof module:RoleRoute
 */
router.get('/revokeAll/:role', (req,res) => {
    const role = req.params.role

    RoleService.revokeAllPermissions(role).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

module.exports = router