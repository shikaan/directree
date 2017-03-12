"use strict";

(function () {
    function isEmptyString(value) {
        if (!(value instanceof Object)) {
            value = value ? String(value) : '';
            return value === '';
        }
        else
            return false
    }

    function isLastInList(index, list) {
        index = parseInt(index);
        let length = (function () {
            if (list && list instanceof Array && list.length)
                return parseInt(list.length);
            return NaN
        }())

        if (!isNaN(index) && !isNaN(length))
            return index === length - 1
        else
            throw `Invalid entries: ${index} ${list}`
    }

    module.exports = { isEmptyString, isLastInList };
}());