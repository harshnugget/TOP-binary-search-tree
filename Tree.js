import buildTree from './TreeModules/buildTree.js';
import find from './TreeModules/find.js';
import height from './TreeModules/height.js';
import insert from './TreeModules/insert.js';
import deleteItemIterative from './TreeModules/deleteItemIterative.js';
import deleteItemRecursive from './TreeModules/deleteItemRecursive.js';
import depth from './TreeModules/depth.js';
import isBalanced from './TreeModules/isBalanced.js';
import { levelOrder, preOrder, inOrder, postOrder } from './TreeModules/orderTraversal.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1); // Build the tree and store the root node
  }

  buildTree(array, start, end) {
    return buildTree(array, start, end);
  }

  find(value) {
    return find(this.root, value);
  }

  height() {
    return height(this.root);
  }

  depth(targetRoot) {
    return depth(this.root, targetRoot);
  }

  insert(value) {
    this.root = insert(this.root, value);
  }

  deleteItem(value, method = 'iterative') {
    if (method === 'iterative') {
      this.root = deleteItemIterative(this.root, value);
    } else {
      this.root = deleteItemRecursive(this.root, value);
    }
  }

  levelOrder(callback) {
    levelOrder(this.root, callback);
  }

  preOrder(callback) {
    preOrder(this.root, callback);
  }

  inOrder(callback) {
    inOrder(this.root, callback);
  }

  postOrder(callback) {
    postOrder(this.root, callback);
  }

  isBalanced() {
    return isBalanced(this.root);
  }

  rebalance() {
    const orderedArray = [];

    const callback = (node) => {
      orderedArray.push(node.data);
    };

    this.inOrder(callback);
    this.root = this.buildTree(orderedArray, 0, orderedArray.length - 1);
  }
}

export default Tree;
