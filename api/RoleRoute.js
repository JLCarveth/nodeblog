/**
 * @module api/RoleRoute
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
 * @namespace roleRouter
 */
const router = express.Router()

const RoleModel = require('../models/RoleModel')
const RoleService = new (require('../services/RoleService'))(RoleModel)

/**
 * GET request on /role/permissions/:role
 * @name GET/role/permissions/
 * @function
 * @memberof module:api/RoleRoute~roleRouter
 */
router.get('/permissions/:role', (req,res) => {
    const role = req.params.role

    try {
        const result = RoleService.getRolePermissions(role)
        res.send({success:true, message:result})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

/**
 * GET request on /role/grant/:role/:permission
 * @name GET/role/grant
 * @function
 * @memberof module:api/RoleRoute~roleRouter
 */
router.get('/grant/:role/:permission', (req,res) => {
    const role = req.params.role
    const permission = req.params.permission

    try {
        const result = RoleService.grantPermission(role, permission)
        res.send({success:true, message:result})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

/**
 * GET request on /role/revoke/:role/:permission
 * @name GET/role/revoke
 * @function
 * @memberof module:api/RoleRoute~roleRouter
 */
router.get('/revoke/:role/:permission', () => {
    const role = req.params.role
    const permission = req.params.permission

    try {
        const result = RoleService.revokePermission(role,permission)
        res.send({success:true,message:result})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

/**
 * GET request on /role/revokeAll/:role
 * @name GET/role/revokeAll
 * @function
 * @memberof module:api/RoleRoute~roleRouter
 */
router.get('/revokeAll/:role', (req,res) => {
    const role = req.params.role

    try {
        const result = RoleService.revokeAllPermissions(role)
        res.send({success:true, message:result})
    } catch (e) {
        res.send({success:false, error:e})
    }
})

module.exports = router