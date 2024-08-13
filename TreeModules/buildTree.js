import Node from './Node.js';

export default function buildTree(array, start, end) {
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
  root.left = buildTree(array, start, mid - 1);

  // Recursively build the right subtree using the right half of the current subarray
  root.right = buildTree(array, mid + 1, end);

  return root;
}
