import Node from './Node.js';

// Initialize start = 0, end = length of the array - 1
// mid = (start+end)/2
// Create a tree node with mid as root (node A)
// Recursively do following:
// Calculate mid of left subarray and make it root of left subtree of A
// Calculate mid of right subarray and make it root of right subtree of A

class Tree {
  constructor(array) {
    this.root = null;
    this.array = array;
  }

  buildTree(array) {
    if (!array || !Array.isArray(array)) {
      throw Error(`Cannot build tree. Invalid array: ${array}`);
    }

    // Start node (start of array)
    const start = 0;

    // End node (end of array)
    const end = this.array.length - 1;

    // Middle node (middle of array)
    const mid = (start + end) / 2;
  }
}

export default Tree;
