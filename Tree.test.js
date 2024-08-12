import Tree from './Tree.js';

describe('Tree', () => {
  // Test 1: Tree Initialization
  test.only('Create an empty tree when given an empty array', () => {
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
});
