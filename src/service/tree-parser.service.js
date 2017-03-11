/*  global process  */
"use strict";

(function(){
    const walkSync = require('klaw-sync');
    const {isEmptyString} = require('./utils.service');
    const {Tree} = require('../model/tree.model');
    const {Node} = require('../model/node.model');
    const path = require('path');
    const logger = require('./logging.service');

    function _serachParentByLabel(node, label){
        let parent = node.parent.children.find((node) => node.label === label);
        
        if(parent) return parent;

        return _serachParentByLabel(node.parent, label);
    }

    function parseFolderStructure(parameters){
        let folderPath = parameters.path;
        let showFiles = parameters.showFiles;
        
        if(folderPath){
            let tree = new Tree();
            tree.root = (new Node(path.basename(folderPath)));
            let currentNode = null;

            let options = {nodir: false, nofile: !showFiles};

            walkSync(folderPath, options).forEach((item) => {
                /**
                *   Parent Node label
                */
                let parentAbsPath = path.dirname(item.path);
                let cleanedPath = path.relative(folderPath, parentAbsPath);
                let parentLabel = isEmptyString(cleanedPath) ? null : path.basename(parentAbsPath);
                let nodeName = path.basename(item.path);
                let leaf;

                if(parentLabel){
                    let parent;
                    try {
                        parent = _serachParentByLabel(currentNode, parentLabel);
                    }
                    catch(e){
                        logger.info(`Unable to fine node ${parentLabel} in tree.`)
                        logger.debug(`Due to: ${e}`)
                        return;
                    }
                    
                    leaf = new Node(nodeName);
                    parent.addChild(leaf);
                }
                else{
                    leaf = new Node(nodeName);
                    tree.root.addChild(leaf);
                }

                currentNode = leaf;
            })

            return tree;
        }
        else{
            logger.error('Missing --path param')
            process.exit(0);
        }
    }

    module.exports = {parseFolderStructure}
}())