"use strict";

(function(){
    const {Node} = require('./node.model');
     
    class Tree {
        constructor() {
            this._root = null;
        }

        set root(node){
            if(node instanceof Node){
                this._root = node;
            }
            else{
                throw 'Invalid Node'
            }
        }

        get root(){
            return this._root;
        }
    }

    module.exports = {Tree};
}())