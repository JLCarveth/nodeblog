/**
 * @module Validator
 */
module.exports = {
    /**
     * @memberof module:Validator
     * @function isEmail
     * A middleware function that validates a given string as an email address.
     */
    isEmail : function (req,res,next) {
        const email = req.body.email;
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
}