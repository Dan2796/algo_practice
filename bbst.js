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
    if (array.length === 1) return Node(array);
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

  /*
  const remove = (value) => {
    const toDelete = find(value);
    if (toDelete.hasChildren()) {
      toDelete.findParent(root)
    }
    if node has no children, then replace with null

    if node has one child, then find parent and set the parent to look to this node's child

    if node has two children, then find the smallest node on the left of the right hand tree, set that to this node's parent, give it this node's children, and remove(that node)
    
    return;
  }
  */


  const levelOrder = (nodeFunction = null) => nodeFunction;
  const inorder = (nodeFunction = null) => nodeFunction;
  const preorder = (nodeFunction = null) => nodeFunction;
  const postorder = (nodeFunction = null) => nodeFunction;
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
    find,
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

const testArray = [0, 3, 2, 1, 4, 3, 7, 6, 5, 11]
const testTree = Tree(testArray);
testTree.prettyPrint();
testTree.insert(21);
testTree.insert(8);
testTree.insert(8);
testTree.insert(10);
testTree.insert(9);
testTree.prettyPrint();
// eslint-disable-next-line no-console
console.log(testTree.find(9).getValue());
// eslint-disable-next-line no-console
console.log(testTree.find(999));
