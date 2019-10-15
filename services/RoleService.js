/**
 * @module RoleService
 * @author John L. Carveth
 */

module.exports = class RoleService {

    /**
     * @constructor RoleService
     * @param {models/RoleModel} roleModel
     */
    constructor (roleModel) {
        this.roleModel = roleModel;
    }

    /**
     * Fetches an array of all permissions assigned to given role
     * @memberof module:RoleService
     * @function getRolePermissions
     * @param {String} roleName 
     * @return {Array.<String>} an array of permissions assigned to the role. Empty if the role doesn't exist
     */
    async getRolePermissions (roleName) {
        try {
            return this.roleModel.findAll({
                role: roleName
            }).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Grants a new permission to the given role. If the role doesn't exist, it is created, with its sole permission being `permission`
     * @memberof module:RoleService
     * @function grantPermission
     * @param {String} roleName the name of the role to which a permission will be granted
     * @param {String} permission the permission to be granted
     */
    async grantPermission (roleName, permission) {
        try {
            const role = await roleModel.findOne({role:roleName}).exec()
            var perms = role.permissions

            perms.concat(','+permission)

            return this.roleModel.update({role:roleName}, {permissions:perms}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Revokes access to a permission of roleName
     * @memberof module:RoleService
     * @function revokePermission
     * @param {String} roleName the name of the role whose permission is being revoked
     * @param {String} permission the permission to revoke
     */
    async revokePermission (roleName, permission) {
        try {
            const role = await roleModel.findOne({role:roleName}).exec()
            var perms = role.permissions

            // Splice the permission 
            perms = perms.split(',')
            const index = perms.indexOf(permission)
            if (index != -1) perms.splice(index, 1)
            perms = perms.join(',')

            return this.roleModel.update({role:roleName}, {permissions:perms}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Revokes all permissions that were granted to `roleName`
     * @memberof module:RoleService
     * @function revokeAllPermissions
     * @param {String} roleName 
     */
    async revokeAllPermissions (roleName) {
        try {
            return this.roleModel.update({role:roleName}, {permissions:""}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Gets all roles and the permissions they have
     * @memberof module:RoleService
     * @function getAllRoles
     */
    async getAllRoles () {
        try {
            return this.roleModel.findAll({}).exec()
        } catch (e) {
            throw new Error(e)
        }
    }
}