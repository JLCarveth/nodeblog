/**
 * @module models/RoleModel
 * @author John L. Carveth
 */

const mongoose = require('mongoose')

/**
 * @constructor Role
 */
const Role = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        unique: true
    },
    permissions: {
        type: [String]
    }
})

module.exports = mongoose.model('roles', Role)