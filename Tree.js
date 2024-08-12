import Node from './Node.js';

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

  insert(value) {
    if (value === undefined || value === null) {
      throw Error(`No value provided. Value: ${value}`);
    }
    // Create a node with the specified value
    const node = new Node(value);

    // If root is null, set the node as root
    if (this.root === null) {
      return (this.root = node);
    }

    // Initialize currentRoot as trees root node
    let currentRoot = this.root;

    while (currentRoot) {
      // Prevent duplicates
      if (value === currentRoot.data) {
        return;
      }

      if (value < currentRoot.data) {
        // If currentRoot's left node doesn't exist, set it as the node
        if (currentRoot.left === null) {
          currentRoot.left = node;
          return;
        }
        // Update currentRoot as currentRoot's left node (lower value)
        currentRoot = currentRoot.left;
      } else if (value > currentRoot.data) {
        // If currentRoot's right node doesn't exist, set it as the node
        if (currentRoot.right === null) {
          currentRoot.right = node;
          return;
        }
        // Update currentRoot is currentRoot's right node (greater value)
        currentRoot = currentRoot.right;
      }
    }
  }
}

export default Tree;
