/**
 * @module Validator provides auxillary functions to validate the correct
 * structure of data.
 */
module.exports = {
    /**
     * @function isEmail
     * A middleware function that validates a given string as an email address.
     */
    isEmail = function (req,res,next) {
        const email = req.body.email;
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
}