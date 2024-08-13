export default function find(root, value) {
  let currentRoot = root;

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
