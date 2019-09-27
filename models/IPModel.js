const mongoose = require('mongoose')

const IP = new mongoose.Schema({
    // The IP address, either IPV4 or IPV6
    address: { type: String, required: true },
    // When the IP was blocked
    banDate: { type: Date, default: Date.now()},
    // Reason for the ban (optional)
    reason: { type: String}
})

module.exports = mongoose.model('ips', IP)