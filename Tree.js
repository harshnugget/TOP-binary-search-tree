import Node from './Node.js';

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(); // Build the tree and store the root node
  }

  buildTree(array = this.array, start = 0, end = this.array.length - 1) {
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
}

export default Tree;
