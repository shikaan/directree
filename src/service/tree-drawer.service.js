(function() {
    const {Tree} = require('../model/tree.model');
    const {Node} = require('../model/node.model');
    const {isLastInList} = require('./utils.service');
    
    const SYMBOLS = ['─ ', '└─', '├─', '│'];
    const nestingPrefix = `${SYMBOLS[3]}   `;
    const spacing = '    ';
    
    let outputStream = ''; 

    /**
    *   @param node {Node} - Root of the tree;
    *   @param result {String} - Where you store partial tree drawing
    *   @param prefix {String} - OPTIONAL What should be used as prefix in nested levels
    */
    function _drawTreeFromRoot(node, prefix){
        /**
        * Sanitize prefix
        */
        prefix = !!prefix ? String(prefix) : '';
        
        if(node instanceof Node){
            if(node.children.length > 0){
                node.children.forEach((childNode, index) => {
                    let isLastNode = isLastInList(index, node.children);
                    /**
                    *   Uses "elbow" symbol if last node
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
        else{
            console.log('Invalid root of the tree');
            return;
        }
    }

    function drawTree(tree){
        if(tree instanceof Tree){
            outputStream = `${tree.root.label}\n`
            _drawTreeFromRoot(tree.root, null);
            return outputStream;
        }
        else{
            console.log('Unable to parse the tree')
        }
    }

    module.exports = {
        drawTree
    }
})()