"use strict";

(function() {
    function isEmptyString(value){
        if(!(value instanceof Object)){
            value = String(value);
            return !value && value === '';
        }
        else
            return false
    }

    function isLastInList(index, list){
        index = parseInt(index);
        let length = null;
        if(list && list.length){
            length = parseInt(list.length);
        }

        if(!isNaN(index) && !isNaN(length))
            return index === length - 1 
        else
            throw `Invalid entries: ${index} ${list}` 
    }

    module.exports = {isEmptyString, isLastInList};
}());