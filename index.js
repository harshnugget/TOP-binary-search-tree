import Tree from './Tree.js';
import Node from './TreeModules/Node.js';

function prettyPrint(node, prefix = '', isLeft = true) {
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
}

function generateSortedArray(length, min = 0, max = 100) {
  const array = [];
  while (array.length < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }

  // Sort the array in ascending order
  array.sort((a, b) => a - b);

  return array;
}

const sortedArray = generateSortedArray(50, 0, 100);

const tree = new Tree(sortedArray);

prettyPrint(tree.root);
