const mongoose = require('mongoose')

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