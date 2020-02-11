/**
 * @module ParamWare
 * @author John L. Carveth
 * @version 1.1.0
 * @requires express
 * 
 * Express.js middleware that verifies all required parameters
 * are provided with the incoming request. 
 */
module.exports = class ParamWare {
    /**
     * @constructor
     * @param {String} paramType Where the parameters are expected to be found. 
     * Should be either `body` or `params` for the respective parameter types.
     * @param {(String|String[])} parameters The name of the parameter(s) expected.
     */
    constructor (paramType, parameters) {
        // Set any class variables here
        this.paramType  = paramType
        this.params     = parameters

        // If only one parameter, make it into an array
        if (!Array.isArray(parameters)) this.params = [parameters]
        var that = this
        return function (req,res,next) {
            var valid               = true
            var undefinedParameters = []
            // The params user provided with the request
            const providedParameters = req[that.paramType]

            // For each given parameter, ensure it is defined in req
            for (let p  of that.params) {
                valid = valid && (providedParameters[p] != undefined)
                if (providedParameters[p] == undefined) undefinedParameters.push(p)
            }

            if (!valid) res.status(422).send({
                success:false,
                error:'The following parameters were missing: \`' + undefinedParameters.toString() + '\`'
            }) 
            else next()
        }
    }
}