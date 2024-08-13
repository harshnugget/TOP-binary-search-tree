import Node from './Node.js';

export default function insertItem(root, value) {
  if (value === undefined || value === null) {
    throw Error(`No value provided. Value: ${value}`);
  }
  // Create a node with the specified value
  const node = new Node(value);

  // If root is null, set the node as root
  if (root === null) {
    return node;
  }

  // Initialize currentRoot as trees root node
  let currentRoot = root;

  while (currentRoot) {
    // Prevent duplicates
    if (value === currentRoot.data) {
      break;
    }

    if (value < currentRoot.data) {
      // If currentRoot's left node doesn't exist, set it as the node
      if (currentRoot.left === null) {
        currentRoot.left = node;
      } else {
        // Update currentRoot as currentRoot's left node (lower value)
        currentRoot = currentRoot.left;
      }
    } else if (value > currentRoot.data) {
      // If currentRoot's right node doesn't exist, set it as the node
      if (currentRoot.right === null) {
        currentRoot.right = node;
      } else {
        // Update currentRoot is currentRoot's right node (greater value)
        currentRoot = currentRoot.right;
      }
    }
  }

  return root;
}
