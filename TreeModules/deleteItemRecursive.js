export default function deleteItemRecursive(root, value) {
  if (value === undefined || value === null) {
    throw Error(`No value provided. Value: ${value}`);
  }

  // Helper function to find in-order successor
  function findSuccessor(root) {
    let currentNode = root.right;
    while (currentNode !== null && currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  // Base case: empty tree
  if (root === null) {
    return null;
  }

  // Traverse the tree to find the node to delete
  if (value < root.data) {
    // Traverse left sub-tree if value is smaller
    root.left = deleteItemRecursive(root.left, value);
  } else if (value > root.data) {
    // Traverse right sub-tree if value is greater
    root.right = deleteItemRecursive(root.right, value);
  }

  // Root with the value found
  else {
    if (root.left === null && root.right === null) {
      // Case 1: Root with no children
      return null;
    }

    // Case 2: Root with only right child
    else if (root.left === null) {
      return root.right;
    }

    // Case 3: Root with only left child
    else if (root.right === null) {
      return root.left;
    }

    // Case 4: Root with two children
    else {
      const successor = findSuccessor(root);

      // Replace root data with successor data
      root.data = successor.data;

      // Delete the successor node
      root.right = deleteItemRecursive(root.right, successor.data);
    }
  }

  return root;
}
