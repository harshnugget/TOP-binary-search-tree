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

  deleteItemRecurse(value) {
    if (value === undefined || value === null) {
      throw Error(`No value provided. Value: ${value}`);
    }

    // Recursively return each node, only changing one that needs to be deleted
    this.root = deleteItem(this.root, value);

    // Helper function to find in-order successor
    function findSuccessor(node) {
      let currentNode = node.right;
      while (currentNode !== null && currentNode.left !== null) {
        currentNode = currentNode.left;
      }
      return currentNode;
    }

    function deleteItem(root, value) {
      // Base case: empty tree
      if (root === null) {
        return null;
      }

      // Traverse the tree to find the node to delete
      if (value < root.data) {
        // Traverse left sub-tree
        root.left = deleteItem(root.left, value);
      } else if (value > root.data) {
        // Traverse right sub-tree
        root.right = deleteItem(root.right, value);
      } else {
        // Node with the value found

        if (root.left === null && root.right === null) {
          // Case 1: Node with no children
          return null;
        } else if (root.left === null) {
          // Case 2: Node with only right child
          return root.right;
        } else if (root.right === null) {
          // Case 3: Node with only left child
          return root.left;
        } else {
          // Case 4: Node with two children
          const successor = findSuccessor(root);

          // Replace root data with successor data
          root.data = successor.data;

          // Delete the successor node
          root.right = deleteItem(root.right, successor.data);
        }
      }

      return root;
    }
  }

  deleteItemIterative(value) {
    if (value === undefined || value === null) {
      throw Error(`No value provided. Value: ${value}`);
    }

    // Find the node and its parent
    const { nodeParent, node } = findNodeAndParent(this.root, value);

    // If node not found, return
    if (node === null) {
      console.log(`Value: ${value} could not be found in the BST.`);
      return;
    }

    // If node has 0 or 1 child
    if (node.left === null || node.right === null) {
      // If node has a left child, set childNode to be the nodes left child
      // Otherwise, set childNode to be the nodes right child (could be null)
      const childNode = node.left !== null ? node.left : node.right;

      // If the nodes parent is the node
      if (nodeParent === node) {
        // Set the trees root to the child node
        this.root = childNode;
      } else if (nodeParent.left === node) {
        // Else if the node is it's parents left child, set the parents left child to childNode
        nodeParent.left = childNode;
      } else {
        // Else if the node is it's parents right child, set the parents right child to childNode
        nodeParent.right = childNode;
      }
    }
    // Else if node has two children
    else {
      // Find the successor and the successors parent
      const { successorParent, successor } = findSuccessorAndParent(node);

      // Replace nodes data with successors data
      node.data = successor.data;

      // If the successor is the right child of the node, set nodes right child to successors right child
      if (successorParent === node) {
        node.right = successor.right;
      } else {
        // Otherwise, replace the successor with its right child (which can be null)
        successorParent.left = successor.right;
      }
    }

    // Helper function to locate in-order successor and its parent
    function findSuccessorAndParent(node) {
      let successorParent = node;
      let currentNode = node.right;
      while (currentNode !== null && currentNode.left !== null) {
        successorParent = currentNode;
        currentNode = currentNode.left;
      }

      return { successorParent, successor: currentNode };
    }

    // Helper function to locate a node and its parent
    function findNodeAndParent(root, value) {
      let nodeParent = root;
      let currentRoot = root;
      let node = null;

      while (currentRoot) {
        if (value === currentRoot.data) {
          node = currentRoot;
          break;
        }

        nodeParent = currentRoot;

        if (value < currentRoot.data) {
          currentRoot = currentRoot.left;
        } else if (value > currentRoot.data) {
          currentRoot = currentRoot.right;
        } else {
          break;
        }
      }

      return { nodeParent, node };
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
