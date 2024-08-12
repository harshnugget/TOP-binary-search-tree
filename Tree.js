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
    /*
    node = new Node(value)

    if this.root is null
        this.root = node

    else
        create currentRoot variable
        set currentRoot as this.root

        while currentRoot is not null...

            if value is equal to currentRoot.data (prevent duplicates)
                return

            if value is less than currentRoot.data
                if currentRoot.left is null
                    currentRoot.left = node
                    return
                else 
                    currentRoot = currentRoot.left

            else if value is greater than currentRoot.data
                if currentRoot.right is null
                    currentRoot.right = node
                    return
                else
                    currentRoot = currentRoot.right
    */
  }
}

export default Tree;
