(function () {
    "use strict";

    const { parseFolderStructure } = require('./src/service/tree-parser.service');
    const { drawTree } = require('./src/service/tree-drawer.service');
    const { setLogLevel } = require('./src/service/logging.service');
    const { redirectOutput } = require('./src/service/redirect-output.service');

    module.exports = function (parameters) {
        /**
         * Logger init
         */
        setLogLevel(parameters);

        /**
        *   Creates a Tree from a path of a folder
        */
        const tree = parseFolderStructure(parameters);

        /**
        *   Draws the tree
        */
        const result = drawTree(tree);

        /**
        *   Prints output
        */
        redirectOutput(result, parameters);
    };
}());