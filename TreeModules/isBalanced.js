import height from './height.js';

export default function isBalanced(root) {
  // Base: return true when reached the end of a sub tree
  if (root === null) {
    return true;
  }

  // Get height of left sub tree
  const leftSubtreeHeight = height(root.left);

  // Get height of right sub tree
  const rightSubtreeHeight = height(root.right);

  // Check heights when reached end of each subtree
  if (
    Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1 &&
    isBalanced(root.left) === true &&
    isBalanced(root.right) === true
  ) {
    return true;
  }

  // Returns false if tree is unbalanced
  return false;
}
