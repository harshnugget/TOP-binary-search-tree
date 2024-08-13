import Tree from './Tree.js';
import Node from './Node.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = new Tree([1, 6, 7, 10, 14]);

tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root);
