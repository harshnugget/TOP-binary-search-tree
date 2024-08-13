export default function height(root) {
  if (root == null) return 0;

  let leftSubtreeHeight = height(root.left);
  let rightSubtreeHeight = height(root.right);

  if (leftSubtreeHeight > rightSubtreeHeight) {
    return leftSubtreeHeight + 1;
  } else {
    return rightSubtreeHeight + 1;
  }
}
