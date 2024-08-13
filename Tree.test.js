import Tree from './Tree.js';

describe('Tree', () => {
  // Test 1: Tree Initialization
  test('Create an empty tree when given an empty array', () => {
    const tree = new Tree([]);
    expect(tree.root).toBeNull(); // The root be null for an empty tree
  });

  // Test 2: Invalid Input
  test('Throw an error if initialized with a non-array', () => {
    expect(() => {
      new Tree('not an array'); // Pass a string instead of an array
    }).toThrowError(Error);
  });

  // Test 3: Tree Structure
  test('Create a balanced tree from a sorted array', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const tree = new Tree(array);

    console.log(tree);

    // Check root node
    expect(tree.root.data).toBe(4);

    // Check left subtree
    expect(tree.root.left.data).toBe(2);
    expect(tree.root.left.left.data).toBe(1);
    expect(tree.root.left.right.data).toBe(3);

    // Check right subtree
    expect(tree.root.right.data).toBe(6);
    expect(tree.root.right.left.data).toBe(5);
    expect(tree.root.right.right.data).toBe(7);
  });

  // Test 4: Single Element Array
  test('Handle a single-element array', () => {
    const array = [42];
    const tree = new Tree(array);

    expect(tree.root.data).toBe(42);
    expect(tree.root.left).toBeNull();
    expect(tree.root.right).toBeNull();
  });

  // Test 5: Insert into Empty Tree
  test('Insert a value into an empty tree', () => {
    const tree = new Tree([]);
    tree.insert(10);
    expect(tree.root.data).toBe(10);
  });

  // Test 6: Insert into Non-Empty Tree
  test('Insert values into a non-empty tree', () => {
    const array = [2, 4, 6];
    const tree = new Tree(array);

    [1, 3, 5, 7].forEach((value) => tree.insert(value));

    expect(tree.root.left.left.data).toBe(1);
    expect(tree.root.left.right.data).toBe(3);
    expect(tree.root.right.left.data).toBe(5);
    expect(tree.root.right.right.data).toBe(7);
  });

  // Test 7: Prevent Duplicate Insertions
  test('Prevent duplicate values from being inserted', () => {
    const array = [1, 2, 3];
    const tree = new Tree(array);

    tree.insert(2); // Attempt to insert a duplicate value

    expect(tree.root.data).toBe(2);
    expect(tree.root.left.data).toBe(1);
    expect(tree.root.right.data).toBe(3);
    expect(tree.root.left.left).toBeNull(); // Ensure no extra node created
    expect(tree.root.right.right).toBeNull();
  });

  // Test 8: Delete a value using iterative method
  describe('Delete values from tree using iterative method', () => {
    let tree;

    beforeEach(() => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      tree = new Tree(array);
    });

    test('Delete a leaf node', () => {
      tree.deleteItem(7, 'iterative');
      expect(tree.root.right.left.right).toBe(null);
    });

    test('Delete a node with one child', () => {
      tree.deleteItem(6, 'iterative');
      expect(tree.root.right.left.data).toBe(7);
    });

    test('Delete the root', () => {
      tree.deleteItem(5, 'iterative');
      expect(tree.root.data).toBe(6);
    });
  });

  // Test 8: Delete a value using recursive method
  describe('Delete values from tree using recursive method', () => {
    let tree;

    beforeEach(() => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      tree = new Tree(array);
    });

    test('Delete a leaf node', () => {
      tree.deleteItem(7, 'recursive');
      expect(tree.root.right.left.right).toBe(null);
    });

    test('Delete a node with one child', () => {
      tree.deleteItem(6, 'recursive');
      expect(tree.root.right.left.data).toBe(7);
    });

    test('Delete the root', () => {
      tree.deleteItem(5, 'recursive');
      expect(tree.root.data).toBe(6);
    });
  });

  // Test 9: Find a value in the tree
  test('Find a value', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const tree = new Tree(array);

    expect(tree.find(3)).toBe(tree.root.left.right);
    expect(tree.find(11)).toBe(null);
  });

  // Test 10: Get height of tree
  test('Get tree height', () => {
    let array = [1, 2, 3];
    let tree = new Tree(array);

    expect(tree.height()).toBe(2);

    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    tree = new Tree(array);

    expect(tree.height()).toBe(4);

    array = [];
    tree = new Tree(array);

    expect(tree.height()).toBe(0);
  });

  // Test 11: Test level-order, pre-order, in-order and post-order methods with a callback
  describe('Test level-order, pre-order, in-order and post-order', () => {
    let tree;
    let testArray = [];
    const callback = (root) => {
      testArray.push(root.data);
    };

    beforeEach(() => {
      const array = [1, 2, 3, 4, 5];
      testArray = [];
      tree = new Tree(array);
    });

    test('Level-order traversal', () => {
      tree.levelOrder(tree.root, callback);
      expect(testArray).toEqual([3, 1, 4, 2, 5]);
    });

    test('Pre-order traversal', () => {
      tree.preOrder(tree.root, callback);
      expect(testArray).toEqual([3, 1, 2, 4, 5]);
    });

    test('Post-order traversal', () => {
      tree.postOrder(tree.root, callback);
      expect(testArray).toEqual([2, 1, 5, 4, 3]);
    });

    test('In-order traversal', () => {
      tree.inOrder(tree.root, callback);
      expect(testArray).toEqual([1, 2, 3, 4, 5]);
    });
  });

  // Test 12: Get depth of a root
  test('Get depth of a root', () => {
    let array = [1, 2, 3, 4, 5];
    let tree = new Tree(array);

    expect(tree.depth(tree.root.left.right)).toBe(2);

    // Create node that doesn't exist in the tree
    const testNode = {
      data: 6,
      left: null,
      right: null,
    };

    // Test no node found
    expect(tree.depth(testNode)).toBe(-1);
  });

  // Test 14: Tree rebalancing
  describe('Tree rebalancing', () => {
    // Check if tree is unbalanced
    test('Check if tree is unbalanced', () => {
      const array = [1, 2, 3];
      let tree = new Tree(array);

      expect(tree.isBalanced()).toBe(true);

      tree.insert(4);
      expect(tree.isBalanced()).toBe(true);

      tree.insert(5);
      expect(tree.isBalanced()).toBe(false);
    });

    test('Tree rebalancing', () => {
      function generateSortedArray(length, min = 0, max = 100) {
        const array = [];
        while (array.length < length) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          if (!array.includes(randomNumber)) {
            array.push(randomNumber);
          }
        }

        // Sort the array in ascending order
        array.sort((a, b) => a - b);

        return array;
      }

      // Generate a sorted array of 100 random numbers below 100
      const sortedArray = generateSortedArray(100, 0, 100);

      // Create tree with sorted array
      let tree = new Tree(sortedArray);
      expect(tree.isBalanced()).toBe(true);

      // Generate a sorted array of 100 random numbers above 100
      const newSortedArray = generateSortedArray(20, 100, 200);

      // // Unbalance the tree
      newSortedArray.forEach((e) => tree.insert(e));
      expect(tree.isBalanced()).toBe(false);

      // Rebalance the tree
      tree.rebalance();
      expect(tree.isBalanced()).toBe(true);
    });
  });
});
