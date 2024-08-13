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
      tree.deleteItemRecurse(7);
      expect(tree.root.right.left.right).toBe(null);
    });

    test('Delete a node with one child', () => {
      tree.deleteItemRecurse(6);
      expect(tree.root.right.left.data).toBe(7);
    });

    test('Delete the root', () => {
      tree.deleteItemRecurse(5);
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
      tree.deleteItemIterative(7);
      expect(tree.root.right.left.right).toBe(null);
    });

    test('Delete a node with one child', () => {
      tree.deleteItemIterative(6);
      expect(tree.root.right.left.data).toBe(7);
    });

    test('Delete the root', () => {
      tree.deleteItemIterative(5);
      expect(tree.root.data).toBe(6);
    });
  });
});
