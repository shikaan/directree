(function () {
    "use strict";
        
    const {parseFolderStructure} = require('./src/service/tree-parser.service');
    const {drawTree} = require('./src/service/tree-drawer.service');

    module.exports = function (parameters) {
        /**
        *   Creates a Tree from a path of a folder
        */
        const tree = parseFolderStructure(parameters);

        /**
        *   Draws the tree
        */
        const result = drawTree(tree);

        /**
        *   Prints output to the console
        */
        console.log(result);
    };
}());