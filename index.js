#!/usr/bin/env node
(function(){
    const {parseFolderStructure} = require('./tree-parser.service');
    const {drawTree} = require('./tree-drawer.service');
    const {parameters} = require('./cli.service');

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
})(); 