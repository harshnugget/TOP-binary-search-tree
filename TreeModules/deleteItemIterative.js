export default function deleteItemIterative(root, value) {
  if (value === undefined || value === null) {
    throw Error(`No value provided. Value: ${value}`);
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

  // Find the node and its parent
  const { nodeParent, node } = findNodeAndParent(root, value);

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
      root = childNode;
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

  return root;
}
