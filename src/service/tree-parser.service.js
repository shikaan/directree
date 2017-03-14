/*  global process  */
"use strict";

(function () {
    const walkSync = require('klaw-sync');
    const path = require('path');
    const minimatch = require('minimatch');
    const { Tree } = require('../model/tree.model');
    const { Node } = require('../model/node.model');
    const { isEmptyString } = require('./utils.service');
    const logger = require('./logging.service');

    function _serachParentByLabel(node, label) {
        let parent = node.parent.children.find((node) => node.label === label);

        if (parent) return parent;

        return _serachParentByLabel(node.parent, label);
    }

    /**
     * @param {Parameters|Object} parameters 
     */
    function parseFolderStructure(parameters) {
        let folderPath = parameters.path;
        let showFiles = parameters.showFiles;
        let ignorePattern = parameters.ignorePattern;

        if (folderPath) {
            //  Sanitize folderPath
            folderPath = path.resolve(folderPath);

            let tree = new Tree();
            tree.root = (new Node(path.basename(folderPath)));
            let currentNode = null;

            let options = { nodir: false, nofile: !showFiles };

            walkSync(folderPath, options).forEach((item) => {
                let relativePath = path.relative(folderPath, item.path);

                if (minimatch(relativePath, ignorePattern))
                    return;

                let parentAbsPath = path.dirname(item.path);

                //  Parent path relative to folderPath
                let parentRelativePath = path.relative(folderPath, parentAbsPath);
                let isZeroDepthNode = isEmptyString(parentRelativePath);

                let nodeName = path.basename(item.path);
                let leaf;

                if (!isZeroDepthNode) {
                    let parent;
                    let parentLabel = path.basename(parentAbsPath);
                    try {
                        parent = _serachParentByLabel(currentNode, parentLabel);
                    }
                    catch (e) {
                        logger.warning(`Unable to fine node ${parentLabel} in tree.`)
                        logger.debug(`Due to: ${e}`)
                        return;
                    }

                    leaf = new Node(nodeName);
                    parent.addChild(leaf);
                }
                else {
                    leaf = new Node(nodeName);
                    tree.root.addChild(leaf);
                }

                currentNode = leaf;
            })

            return tree;
        }
        else {
            logger.error('Missing --path param')
            process.exit(0);
        }
    }

    module.exports = { parseFolderStructure }
}())