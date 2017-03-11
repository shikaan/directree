"use strict";

(function(){
    const {expect} = require('chai');
    const service = require('./tree-drawer.service');
    const {Tree} = require('../model/tree.model');
    const {Node} = require('../model/node.model');

    describe('Service: TreeDrawer', () => {
        it('should be defined', () => {
            expect(!!service).to.equal(true);
        });

        describe('Method: drawTree', () => {
            it('should be defined', () => {
                expect(!!service.drawTree).to.equal(true);
            })

            it('zero depth tree', () => {
                let zeroDepthTree = new Tree();
                zeroDepthTree.root = new Node('root');
                let zeroDepthResult = 'root\n';

                expect(service.drawTree(zeroDepthTree)).to.equal(zeroDepthResult);
            })

            describe('depth one tree', () => {
                it('one child', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    tree.root.addChild(new Node('child1'));

                    let result = 'root\n└── child1\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })

                it('more children', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    tree.root.addChild(new Node('child1'));
                    tree.root.addChild(new Node('child2'));
                    tree.root.addChild(new Node('child3'));

                    let result = 'root\n├── child1\n├── child2\n└── child3\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })
            })

            describe('deeper trees', () => {
                it('one grandson descending from child1', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    let child1 = new Node('child1');
                    child1.addChild(new Node('child1.1'))
                    tree.root.addChild(child1);
                    tree.root.addChild(new Node('child2'));
                    tree.root.addChild(new Node('child3'));

                    let result = 'root\n├── child1\n│   └── child1.1\n├── child2\n└── child3\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })

                it('one grandson descending from child2', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    let child2 = new Node('child2');
                    child2.addChild(new Node('child2.1'))
                    tree.root.addChild(new Node('child1'));
                    tree.root.addChild(child2);
                    tree.root.addChild(new Node('child3'));

                    let result = 'root\n├── child1\n├── child2\n│   └── child2.1\n└── child3\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })

                it('one grandson descending from child3', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    let child3 = new Node('child3');
                    child3.addChild(new Node('child3.1'))
                    tree.root.addChild(new Node('child1'));
                    tree.root.addChild(new Node('child2'));
                    tree.root.addChild(child3);

                    let result = 'root\n├── child1\n├── child2\n└── child3\n    └── child3.1\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })

                it('more grandsons descending from different sons', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    let child3 = new Node('child3');
                    child3.addChild(new Node('child3.1'))
                    let child2 = new Node('child2');
                    child2.addChild(new Node('child2.1'))
                    tree.root.addChild(new Node('child1'));
                    tree.root.addChild(child2);
                    tree.root.addChild(child3);

                    let result = 'root\n├── child1\n├── child2\n│   └── child2.1\n└── child3\n    └── child3.1\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })

                it('more grandgrandsons descending from different sons', () => {
                    let tree = new Tree();
                    tree.root = new Node('root');
                    let child3 = new Node('child3');
                    let child31 = new Node('child3.1');
                    let child32 = new Node('child3.2');
                    child3.addChild(child31);
                    child3.addChild(child32);
                    let child2 = new Node('child2');
                    let child21 = new Node('child2.1');
                    child21.addChild(new Node('child2.1.1'));
                    child2.addChild(child21);
                    tree.root.addChild(new Node('child1'));
                    tree.root.addChild(child2);
                    tree.root.addChild(child3);

                    let result = 'root\n├── child1\n├── child2\n│   └── child2.1\n│       └── child2.1.1\n└── child3\n    ├── child3.1\n    └── child3.2\n'

                    expect(service.drawTree(tree)).to.equal(result);
                })
            })
        });
    });
}());