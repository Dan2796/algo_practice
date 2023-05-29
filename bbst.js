function Node(suppliedValue = null, suppliedLeftChild = null, suppliedRightChild = null) {
  let leftChild = suppliedLeftChild;
  let rightChild = suppliedRightChild;
  let value = suppliedValue;
  const getLeftChild = () => leftChild;
  const setLeftChild = (newLeftChild) => {
    leftChild = newLeftChild;
  };
  const getRightChild = () => rightChild;
  const setRightChild = (newRightChild) => {
    rightChild = newRightChild;
  };
  const getValue = () => value;
  const setValue = (newValue) => {
    value = newValue;
  };
  const hasChildren = () => leftChild !== null || rightChild !== null;
  const hasLeftChild = () => leftChild !== null;
  const hasRightChild = () => rightChild !== null;
  return {
    getLeftChild,
    setLeftChild,
    getRightChild,
    setRightChild,
    getValue,
    setValue,
    hasChildren,
    hasLeftChild,
    hasRightChild,
  };
}

function Tree(inputArray) {
  /* note if performance becomes an issue can improve the sorting algo,
     e.g. merge sort. Could also get rid of the set method of removing
     duplicates and instead handle duplicates when building the tree */
  const sorted = [...new Set(inputArray)].sort((a, b) => (a - b));

  function buildTree(array) {
    if (array.length === 1) return Node(array[0]);
    if (array.length === 2) {
      const root = Node(array[0]);
      root.setRightChild(Node(array[1]));
      return root;
    }
    const midIndex = Math.floor((array.length - 1) / 2);
    const root = Node(array[midIndex]);
    const leftArray = array.slice(0, midIndex);
    const rightArray = array.slice(midIndex + 1, array.length);
    root.setLeftChild(buildTree(leftArray));
    root.setRightChild(buildTree(rightArray));
    return root;
  }
  const root = buildTree(sorted);
  const getRoot = () => root;
  const insert = (value, node = root) => {
    // cache the node value since it will be used a few times
    const nodeValue = node.getValue();
    if (nodeValue === value) return;
    if (nodeValue > value) {
      if (!node.hasLeftChild()) {
        node.setLeftChild(Node(value));
      } else {
        insert(value, node.getLeftChild());
      }
    }
    if (nodeValue < value) {
      if (!node.hasRightChild()) {
        node.setRightChild(Node(value));
      } else {
        insert(value, node.getRightChild());
      }
    }
  };

  const find = (value, node = root) => {
    const nodeValue = node.getValue();
    if (nodeValue === value) {
      return node;
    }
    if (nodeValue > value) {
      if (node.hasLeftChild()) {
        return find(value, node.getLeftChild());
      }
    }
    if (nodeValue < value) {
      if (node.hasRightChild()) {
        return find(value, node.getRightChild());
      }
    }
    return null;
  };
  const findWithParent = (value, node = root) => {
    if (node === root && node.getValue() === value) {
      return { found: root, parent: null, childIsLeft: null };
    }
    if (node.getValue() > value) {
      if (!node.hasLeftChild()) {
        return null;
      }
      if (node.getLeftChild().getValue() === value) {
        return { found: node.getLeftChild(), parent: node, childIsLeft: true};
      }
      return findWithParent(value, node.getLeftChild());
    }
    // must therefore be right hand side - no need for extra if
    if (!node.hasRightChild()) {
      return null;
    }
    if (node.getRightChild().getValue() === value) {
      return { found: node.getRightChild(), parent: node, childIsLeft: false};
    }
    return findWithParent(value, node.getRightChild());
  };
  const getNextSmallest = (node) => {
    let smallest = node.getRightChild();
    while (smallest.hasLeftChild()) {
      smallest = smallest.getLeftChild();
    }
    return smallest;
  };
  const remove = (value) => {
    const target = findWithParent(value);
    if (target === null) {
      return;
    }
    const toDelete = target.found;
    const parentOfToDelete = target.parent;
    const { childIsLeft } = target;
    // if node has no children, can just remove
    if (!toDelete.hasChildren()) {
      if (childIsLeft) {
        parentOfToDelete.setLeftChild(null);
      } else {
        parentOfToDelete.setRightChild(null);
      }
    }
    // if node has one child, can just add directly to parent
    if (toDelete.hasLeftChild() && !toDelete.hasRightChild()) {
      if (childIsLeft) {
        parentOfToDelete.setLeftChild(toDelete.getLeftChild());
      }
      if (!childIsLeft) {
        parentOfToDelete.setRightChild(toDelete.getLeftChild());
      }
    }
    if (toDelete.hasRightChild() && !toDelete.hasLeftChild()) {
      if (childIsLeft) {
        parentOfToDelete.setLeftChild(toDelete.getRightChild());
      }
      if (!childIsLeft) {
        parentOfToDelete.setRightChild(toDelete.getRightChild());
      }
    }
    // if node has two children, then find smallest on the rhs and set to move in as replacement
    if (toDelete.hasLeftChild() && toDelete.hasRightChild()) {
      const nextSmallest = getNextSmallest(toDelete);
      remove(nextSmallest.getValue());
      if (childIsLeft) {
        parentOfToDelete.setLeftChild(nextSmallest);
      } else {
        parentOfToDelete.setRightChild(nextSmallest);
      }
      nextSmallest.setLeftChild(toDelete.getLeftChild());
      nextSmallest.setRightChild(toDelete.getRightChild());
    }
  };
  const levelOrder = (nodeFunction, node = root) => nodeFunction;
  const inorder = (nodeFunction, node = root) => {
    if (node.hasLeftChild()) {
      inorder(nodeFunction, node.getLeftChild());
    }
    nodeFunction(node);
    if (node.hasRightChild()) {
      inorder(nodeFunction, node.getRightChild());
    }
  };
  const preorder = (nodeFunction, node = root) => {
    nodeFunction(node);
    if (node.hasLeftChild()) {
      preorder(nodeFunction, node.getLeftChild());
    }
    if (node.hasRightChild()) {
      preorder(nodeFunction, node.getRightChild());
    }
  };
  const postorder = (nodeFunction, node = root) => {
    if (node.hasLeftChild()) {
      postorder(nodeFunction, node.getLeftChild());
    }
    if (node.hasRightChild()) {
      postorder(nodeFunction, node.getRightChild());
    }
    nodeFunction(node);
  };
  const height = (node) => node;
  const depth = (node) => node;
  const isBalanced = () => true;
  const rebalance = () => true;
  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.hasRightChild()) {
      prettyPrint(node.getRightChild(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    // eslint-disable-next-line no-console
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
    if (node.hasLeftChild()) {
      prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
  return {
    getRoot,
    insert,
    remove,
    find,
    findWithParent,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
}

// Testing:
/* eslint-disable no-console */
const logValue = (node) => {
  console.log(node.getValue());
};
const testArray = [0, 3, 2, 5, 1, 4, 3, 7, 6, 11];
const testTree = Tree(testArray);
testTree.prettyPrint();
console.log('Inorder Traversal:');
testTree.inorder(logValue);
console.log('Preorder Traversal:');
testTree.preorder(logValue);
console.log('Postorder Traversal:');
testTree.postorder(logValue);
testTree.insert(21);
testTree.insert(22);
testTree.insert(20);
testTree.insert(19);
testTree.insert(8);
testTree.insert(8);
testTree.insert(10);
testTree.remove(5);
testTree.insert(9);
testTree.remove(2);
testTree.remove(3);
testTree.remove(7);
testTree.remove(11);
testTree.remove(999);
console.log('\nAfter ammendments:\n');
testTree.prettyPrint();
console.log(testTree.find(9).getValue());
console.log(testTree.find(999));
console.log('Inorder Traversal:');
testTree.inorder(logValue);
console.log('Preorder Traversal:');
testTree.preorder(logValue);
console.log('Postorder Traversal:');
testTree.postorder(logValue);
