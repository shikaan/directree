#!/usr/bin/env node
(function(){
    const {argv} = require('optimist');
    const Parameters = require('./parameters.model');
    const {parseFolderStructure} = require('./tree-parser.service');
    const {drawTree} = require('./tree-drawer.service'); 

    let parameters = new Parameters();
    parameters.path = argv.path || null;

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