(function(){
    const walkSync = require('klaw-sync');
    const {isEmptyString} = require('./utils.service');
    const {Tree, Node} = require('./tree.model');
    const path = require('path');
    const logger = require('./logging.service');

    const separator = process.platform == 'win32' ? '\\' : '/';

    function isNotEmptyString(value){
        return !isEmptyString(value);
    }

    function _serachParentByLabel(node, label){
        let parent = node.parent.children.find((node) => node.label === label);
        
        if(parent) return parent;

        return _serachParentByLabel(node.parent, label);
    }

    function parseFolderStructure(parameters){
        let folderPath = parameters.path;
        let showFiles = parameters.files;
        
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
                    
                    leaf = new Node(nodeName, parent);
                    parent.addChild(leaf);
                }
                else{
                    leaf = new Node(nodeName, tree.root);
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
})()