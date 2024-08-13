import Node from './Node.js';
import insert from './insert.js';
import deleteItemIterative from './deleteItemIterative.js';
import deleteItemRecursive from './deleteItemRecursive.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1); // Build the tree and store the root node
  }

  buildTree(array, start, end) {
    // Validate array
    if (!Array.isArray(array)) {
      throw Error(`Cannot build tree. Invalid array: ${array}`);
    }

    // Base case: If array's start index is greater than its end index, return null
    if (start > end) {
      return null;
    }

    // Find the middle element of the current subarray
    const mid = Math.floor((start + end) / 2);

    // Create a node with the middle value
    const root = new Node(array[mid]);

    // Recursively build the left subtree using the left half of the current subarray
    root.left = this.buildTree(array, start, mid - 1);

    // Recursively build the right subtree using the right half of the current subarray
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insertItem(value) {
    this.root = insert(this.root, value);
  }

  deleteItem(value, method = 'iterative') {
    if (method === 'iterative') {
      this.root = deleteItemIterative(this.root, value);
    } else {
      this.root = deleteItemRecursive(this.root, value);
    }
  }

  find(value) {
    let currentRoot = this.root;

    while (currentRoot) {
      if (value === currentRoot.data) {
        return currentRoot; // Value found
      } else {
        if (value < currentRoot.data) {
          currentRoot = currentRoot.left; // Move to left child
        } else {
          currentRoot = currentRoot.right; // Move to right child
        }
      }
    }

    return null; // Value not found
  }
}

export default Tree;
