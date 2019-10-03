/**
 * @module services/RoleService
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
     * @param {String} roleName 
     * @return {Array.<String>} an array of permissions assigned to the role. Empty if the role doesn't exist
     */
    getRolePermissions (roleName) {

    }

    /**
     * Grants a new permission to the given role. If the role doesn't exist, it is created, with its sole permission being `permission`
     * @param {String} roleName the name of the role to which a permission will be granted
     * @param {String} permission the permission to be granted
     */
    grantPermission (roleName, permission) {

    }

    /**
     * Revokes access to a permission of roleName
     * @param {String} roleName the name of the role whose permission is being revoked
     * @param {String} permission the permission to revoke
     */
    revokePermission (roleName, permission) {

    }

    /**
     * Revokes all permissions that were granted to `roleName`
     * @param {String} roleName 
     */
    revokeAllPermissions (roleName) {

    }
}