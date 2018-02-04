"use strict";

(function () {
    const Tree = require('../model/tree.model');
    const { isLastInList } = require('./utils.service');
    const logger = require('./logging.service')

    const SYMBOLS = ['─ ', '└─', '├─', '│'];
    const nestingPrefix = `${SYMBOLS[3]}   `;
    const spacing = '    ';

    let outputStream = '';

    /**
    *   @param {Node} node - Root of the tree;
    *   @param {String} prefix - OPTIONAL What should be used as prefix in nested levels
    */
    function _drawTreeFromRoot(node, prefix) {
        /**
        * Sanitize prefix
        */
        prefix = prefix ? String(prefix) : '';

        if (node.children.length > 0) {
            node.children.forEach((childNode, index) => {
                let isLastNode = isLastInList(index, node.children);
                /**
                *   Uses "elbow" symbol if last node, the "T" one otherwise
                */
                let symbol = isLastNode ? SYMBOLS[1] : SYMBOLS[2];

                /**
                *   Prevent last node's children to have a useless nestingPrefix 
                */
                let childPrefix = isLastNode ? prefix + spacing : prefix + nestingPrefix;

                outputStream = [outputStream, prefix, symbol, SYMBOLS[0], childNode.label, '\n'].join('');
                _drawTreeFromRoot(childNode, childPrefix);
            })
        }
        /**
        *   Recursion exit condition: node.children.length === 0
        */
    }

    /**
     * @param {Tree} tree - The tree you want to draw
     */
    function drawTree(tree) {
        logger.debug('Start drawing tree');

        if (tree instanceof Tree) {
            outputStream = `${tree.root.label}\n`
            _drawTreeFromRoot(tree.root, null);
            return outputStream;
        }
        else {
            logger.error('Unable to parse the tree')
        }
    }

    module.exports = {
        drawTree
    }
}())