(function(){
    class Tree {
        constructor() {
            this._root = null;
        }

        set root(node){
            if(node instanceof Node){
                this._root = node;
            }
            else{
                throw 'Invalid Node'
            }
        }

        get root(){
            return this._root;
        }
    }

    class Node{
        constructor(label, parent){
            this.label = label;
            this.parent = parent;
            this._children = [];
        }
        
        addChild(node){
            if(node instanceof Node){
                this._children.push(node)
            }
            else{
                throw 'Invalid Node'
            }
        }

        get children(){
            return this._children;
        }
    }

    module.exports = {Tree, Node};
})()