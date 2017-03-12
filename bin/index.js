#!/usr/bin/env node

(function () {
    "use strict";

    const { parameters } = require('./cli-parameters.service');
    const { drawTree } = require('../src/service/tree-drawer.service');
    const { parseFolderStructure } = require('../src/service/tree-parser.service')
    const { setLogLevel } = require('../src/service/logging.service');

    /**
     * Logger init
     */
    setLogLevel(parameters);

    /**
    *   Creates a Tree from a path of a folder
    */
    let tree = parseFolderStructure(parameters);

    /**
    *   Draws the tree
    */
    let result = drawTree(tree);

    /**
    *   Prints output to the console
    */
    console.log(result);
}());