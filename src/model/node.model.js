(function(){
    class Node{
        constructor(label, parent){
            this.label = label;
            this.parent = parent;
            this.isLast = false;
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

    module.exports = {Node}
})();