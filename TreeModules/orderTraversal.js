function levelOrder(root, callback) {
  if (!callback) {
    throw Error('Required a callback function as an argument');
  }

  // Add root to queue to initialize
  const queue = [root];

  // For every item in the queue
  while (queue.length > 0) {
    const currentNode = queue[0];
    const leftChild = currentNode.left;
    const rightChild = currentNode.right;

    callback(currentNode);
    queue.shift();

    if (leftChild !== null) {
      queue.push(leftChild);
    }

    if (rightChild !== null) {
      queue.push(rightChild);
    }
  }
}

function preOrder(root, callback) {
  if (!callback) {
    throw Error('Required a callback function as an argument');
  }

  // Base:
  if (root === null) {
    return;
  }

  // Start: Root
  callback(root);

  // Mid: Traverse left sub-tree
  preOrder(root.left, callback);

  // End: Traverse right sub-tree
  preOrder(root.right, callback);
}

function inOrder(root, callback) {
  if (!callback) {
    throw Error('Required a callback function as an argument');
  }

  // Base:
  if (root === null) {
    return;
  }

  // Start: Traverse left sub-tree
  inOrder(root.left, callback);

  // Mid: Root
  callback(root);

  // End: Traverse right sub-tree
  inOrder(root.right, callback);
}

function postOrder(root, callback) {
  if (!callback) {
    throw Error('Required a callback function as an argument');
  }

  // Base:
  if (root === null) {
    return;
  }

  // Start: Traverse left sub-tree
  postOrder(root.left, callback);

  // Mid: Traverse right sub-tree
  postOrder(root.right, callback);

  // End: Root
  callback(root);
}

export { levelOrder, preOrder, inOrder, postOrder };
