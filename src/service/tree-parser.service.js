/*  global process  */
"use strict";

const walkSync = require('klaw-sync');
const path = require('path');
const minimatch = require('minimatch');
const Tree = require('../model/tree.model');
const Node = require('../model/node.model');
const { isNullOrEmptyString } = require('./utils.service');
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
    logger.debug('Parsing folder with parameters', JSON.stringify(parameters));
    let folderPath = parameters.path;
    const showFiles = parameters.showFiles;
    const ignorePattern = parameters.ignorePattern;

    if (folderPath) {
        logger.debug(`Start parsing: ${folderPath}`)
        //  Sanitize folderPath
        folderPath = path.resolve(folderPath);

        const tree = new Tree();
        tree.root = (new Node(path.basename(folderPath)));
        let currentNode = null;

        const options = { nodir: false, nofile: !showFiles };

        walkSync(folderPath, options).forEach((item) => {
            const relativePath = path.relative(folderPath, item.path);
            logger.debug(`Traversing node`, relativePath);

            if (minimatch(relativePath, ignorePattern))
                return;

            const parentAbsPath = path.dirname(item.path);

            //  Parent path relative to folderPath
            const parentRelativePath = path.relative(folderPath, parentAbsPath);
            const isZeroDepthNode = isNullOrEmptyString(parentRelativePath);

            const nodeName = path.basename(item.path);
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
        process.exit(1);
    }
}

module.exports = { parseFolderStructure }