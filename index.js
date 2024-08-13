import Tree from './Tree.js';

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

const tree = new Tree([
  1, 2, 6, 10, 11, 12, 20, 25, 30, 32, 36, 38, 40, 43, 50, 60, 71, 77, 78, 80, 90,
]);

prettyPrint(tree.root);
tree.deleteItem(36);
console.log('###################################');
prettyPrint(tree.root);
