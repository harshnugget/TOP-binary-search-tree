export default function depth(root, targetRoot) {
  if (!root) {
    throw Error('Requires a valid root as an argument');
  }

  let currentRoot = root;
  let depth = 0;

  while (currentRoot) {
    if (currentRoot === targetRoot) {
      // Target root found
      return depth;
    }

    if (targetRoot.data < currentRoot.data) {
      currentRoot = currentRoot.left;
    } else {
      currentRoot = currentRoot.right;
    }

    depth++;
  }

  // Target root not found
  return -1;
}
