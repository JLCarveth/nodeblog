/**
 * @const RoleModel
 */
const RoleModel = require('../models/RoleModel')
const RoleService = new (require('../services/RoleService'))(RoleModel)

/**
 * Middleware that protects routes by only allowing access to
 * those with the correct role credentials.
 * @module RoleWare
 * @author John L. Carveth
 * @version 0.4.0
 */
module.exports = class RoleWare {
    /**
     * @constructor RoleWare
     * @param {String} permission permissions required for the route
     * @return {Function} the created middleware function
     */
    constructor (permission) {
        this.permission = permission
        this.cache = []
        try {
            this.populateCache()
            that = this
            return function (req,res,next) {
                if (that.checkPermission(that.permission, res.locals.role)) {
                    next()
                } else res.send({success:false, error:'Missing permissions.'})
            }
        } catch (error) {
            res.send({success:false,error:error})
        }
    }

    /**
     * @memberof module:RoleWare
     * @function populateCache
     * Stores roles and permissions fetched from the database to a cache obj
     */
    populateCache () {
        that = this;
        RoleService.getAllRoles().then((roles) => {
            that.cache = roles
        }).catch((e) => {
            throw new Error(e)
        })
    }

    /**
     * @memberof module:RoleWare
     * @function checkPermission
     * @param {*} permission 
     * @param {*} role 
     */
    checkPermission (permission, role) {
        contains = false;
        this.cache.forEach((item) => {
            if (item.role == role) {
                item.permissions.forEach((item) => {
                    if (permission == item) contains = true
                })
            }
        })

        return contains
    }
}