module.exports = class Node {
    constructor(label) {
        this.label = label;
        this.parent = null;
        this.isLast = false;
        this._children = [];
    }

    /**
     * @param {Node} node 
     */
    addChild(node) {
        if (node instanceof Node) {
            node.parent = this;
            this._children.push(node)
        }
        else {
            throw 'Invalid Node'
        }
    }

    get children() {
        return this._children;
    }
}