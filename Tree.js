import Node from './Node.js';
import insertItem from './insertItem.js';
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

    let leftSubtreeHeight = this.height(root.left);
    let rightSubtreeHeight = this.height(root.right);

    if (leftSubtreeHeight > rightSubtreeHeight) {
      return leftSubtreeHeight + 1;
    } else {
      return rightSubtreeHeight + 1;
    }
  }

  insert(value) {
    this.root = insertItem(this.root, value);
  }

  deleteItem(value, method = 'iterative') {
    if (method === 'iterative') {
      this.root = deleteItemIterative(this.root, value);
    } else {
      this.root = deleteItemRecursive(this.root, value);
    }
  }

  levelOrder(root = this.root, callback) {
    if (!callback) {
      throw Error('Required a callback function as an argument');
    }

    // Add root to queue to initialize
    const queue = [root];

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

  preOrder(root = this.root, callback) {
    // Base:
    if (root === null) {
      return;
    }

    // Start: Root
    callback(root);

    // Mid: Traverse left sub-tree
    this.preOrder(root.left, callback);

    // End: Traverse right sub-tree
    this.preOrder(root.right, callback);

    return root;
  }

  inOrder(root = this.root, callback) {
    // Base:
    if (root === null) {
      return;
    }

    // Start: Traverse left sub-tree
    this.inOrder(root.left, callback);

    // Mid: Root
    callback(root);

    // End: Traverse right sub-tree
    this.inOrder(root.right, callback);
  }

  postOrder(root = this.root, callback) {
    // Base:
    if (root === null) {
      return;
    }

    // Start: Traverse left sub-tree
    this.postOrder(root.left, callback);

    // Mid: Traverse right sub-tree
    this.postOrder(root.right, callback);

    // End: Root
    callback(root);
  }

  depth(root) {
    if (!root) {
      throw Error('Requires a valid root as an argument');
    }

    let currentRoot = this.root;
    let depth = 0;

    while (currentRoot) {
      if (currentRoot === root) {
        // Target root found
        return depth;
      }

      if (root.data < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot = currentRoot.right;
      }

      depth++;
    }

    // Target root not found
    return -1;
  }

  isBalanced(root = this.root) {
    // Base: return true when reached the end of a sub tree
    if (root === null) {
      return true;
    }

    // Get height of left sub tree
    const leftSubtreeHeight = this.height(root.left);

    // Get height of right sub tree
    const rightSubtreeHeight = this.height(root.right);

    // Check heights when reached end of each subtree
    if (
      Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1 &&
      this.isBalanced(root.left) === true &&
      this.isBalanced(root.right) === true
    ) {
      return true;
    }

    // Returns false if tree is unbalanced
    return false;
  }

  rebalance() {
    const orderedArray = [];

    const callback = (node) => {
      orderedArray.push(node.data);
    };

    this.inOrder(this.root, callback);
    this.root = this.buildTree(orderedArray, 0, orderedArray.length - 1);
  }
}

export default Tree;
