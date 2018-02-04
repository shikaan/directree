"use strict";

function isNullOrEmptyString(value) {
    if (!(value instanceof Object)) {
        value = value ? String(value) : '';
        return value === '';
    }
    else
        return false
}

function isLastInList(index, list) {
    index = Number.parseInt(index);
    const length = list && list instanceof Array && list.length ? list.length : NaN;

    if (!Number.isNaN(index) && !Number.isNaN(length))
        return index === length - 1
    else
        throw `Invalid entries: ${index} ${list}`
}

module.exports = { isNullOrEmptyString, isLastInList };