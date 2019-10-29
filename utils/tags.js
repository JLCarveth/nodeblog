/**
 * @module Tags
 */

/**
 * @memberof module:tags
 * @function parseTagString
 * @param {*} tagString the string of tags separated by commas
 * @return an array of tags
 */
const parseTagString = function (tagString) {
    return tagString.split(',')
}

/**
 * @memberof module:tags
 * @function compileTagString
 * @param {*} tagArray an array of tags
 * @return a string of tags, separated by commas
 */
const compileTagString = function (tagArray) {
    return tagArray.join(',')
}

/**
 * @memberof module:tags
 * @function removeTag
 * @param {*} tag the tag to be removed
 * @param {*} tagArray the tag array
 * @return a string of tags, separated by commas
 */
const removeTag = function (tag, tagArray) {
    const index = tagArray.indexOf(tag)
    if (index != -1) {
        tagArray.splice(index,1)
    }
    return compileTagString(tagArray)
}

module.exports = {
    parseTagString,
    compileTagString,
    removeTag
}
