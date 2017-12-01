#!/usr/bin/env node

(function () {
    "use strict";

    const { parameters } = require('./cli-parameters.service');
    const { drawTree } = require('../src/service/tree-drawer.service');
    const { parseFolderStructure } = require('../src/service/tree-parser.service');
    const { redirectOutput } = require('../src/service/redirect-output.service')
    const { setLogLevel } = require('../src/service/logging.service');

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
}());