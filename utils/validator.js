/**
 * @module Validator
 */
module.exports = {
    /**
     * @memberof module:Validator
     * @function isEmail
     * Function that validates a given string as an email address.
     */
    isEmail : function (email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
}