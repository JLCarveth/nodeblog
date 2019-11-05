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
 * Gets all permissions assigned to a role.
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
 * POST request on /role/grant/:role/:permission
 * @name POST/role/grant
 * @function
 * @memberof module:RoleRoute
 */
router.POST('/grant/:role/:permission', (req,res) => {
    const role = req.params.role
    const permission = req.params.permission

    RoleService.grantPermission(role, permission).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * POST request on /role/revoke/:role/:permission
 * @name POST/role/revoke
 * @function
 * @memberof module:RoleRoute
 */
router.post('/revoke/:role/:permission', () => {
    const role = req.params.role
    const permission = req.params.permission

    RoleService.revokePermission(role,permission).then((result) => {
        res.send({success:true,message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

/**
 * POST request on /role/revokeAll/:role
 * @name POST/role/revokeAll
 * @function
 * @memberof module:RoleRoute
 */
router.post('/revokeAll/:role', (req,res) => {
    const role = req.params.role

    RoleService.revokeAllPermissions(role).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

router.post('/check/:role/:permission', (req,res) => {
    const role          = req.params.role
    const permission    = req.params.permission

    RoleService.checkPermission(role,permission).then((result) => {
        res.send({success:true, message:result})
    }).catch((e) => {
        res.send({success:false, error:e})
    })
})

module.exports = router