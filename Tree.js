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

  find(value) {
    let currentRoot = this.root;

    while (currentRoot) {
      if (value === currentRoot.data) {
        return currentRoot; // Value found
      } else {
        currentRoot = value < currentRoot.data ? currentRoot.left : currentRoot.right;
      }
    }

    // Value not found
    return null;
  }

  height(root = this.root) {
    if (root == null) return 0;
    else {
      let leftSubtreeHeight = this.height(root.left);
      let rightSubtreeHeight = this.height(root.right);

      if (leftSubtreeHeight > rightSubtreeHeight) {
        return leftSubtreeHeight + 1;
      } else {
        return rightSubtreeHeight + 1;
      }
    }
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

  levelOrder(callback) {
    if (!callback) {
      throw Error('Required a callback function as an argument');
    }

    // Add root to queue to initialize
    const queue = [this.root];

    // For every item in the queue
    while (queue.length > 0) {
      const currentNode = queue[0];
      const leftChild = currentNode.left;
      const rightChild = currentNode.right;

      callback(currentNode);
      queue.shift();

      if (leftChild !== null) {
        queue.push(leftChild);
      }

      if (rightChild !== null) {
        queue.push(rightChild);
      }
    }
  }

  preOrder(callback) {
    // Start: Root
    // Mid: Traverse left sub-tree
    // End: Traverse right sub-tree
  }

  inOrder(callback) {
    // Start: Traverse left sub-tree
    // Mid: Root
    // End: Traverse right sub-tree
  }

  postOrder(callback) {
    // Start: Traverse left sub-tree
    // Mid: Traverse right sub-tree
    // End: Root
  }
}

export default Tree;
