function Node(value = null, leftChild = null, rightChild = null) {
  const getLeftChild = () => {
    return leftChild;
  }
  const setLeftChild = (newLeftChild) => {
    leftChild = newLeftChild;
  }
  const getRightChild = () => {
    return rightChild;
  }
  const setRightChild = (newRightChild) => {
    rightChild = newRightChild;
  }
  const getValue = () => {
    return value;
  }
  const setValue = (newValue) => {
    value = newValue;
  }
  return {getLeftChild, 
          setLeftChild, 
          getRightChild, 
          setRightChild,
          getValue, 
          setValue}
}

function Tree(input_array) {
  // note if performance becomes an issue can improve the sorting algo,
  // e.g. merge sort
  const sorted = [...new Set(input_array)].sort((a, b) => (a - b));
  function buildTree(array) {
    if (array.length === 1) return Node(array);
    if (array.length === 2) {
      const root = Node(array[0]);
      root.setRightChild(Node(array[1]));
      return root;
    }
    midIndex = Math.floor((array.length - 1)/ 2);
    const root = Node(array[midIndex]);
    const leftArray = array.slice(0, midIndex);
    const rightArray = array.slice(midIndex + 1, array.length);
    root.setLeftChild(buildTree(leftArray));
    root.setRightChild(buildTree(rightArray));
    return root;
  }
  const root = buildTree(sorted);
  const getRoot = () => {
    return root;
  }
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.getRightChild() !== null) {
      prettyPrint(node.getRightChild(), 
                  `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
    if (node.getLeftChild() !== null) {
      prettyPrint(node.getLeftChild(), 
                  `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  return { getRoot, prettyPrint, sorted, buildTree };
}

const testArray = [0, 3, 2, 1, 4, 9, 3, 7, 6, 5, 8, 10, 11]
testTree = Tree(testArray);
console.log(testTree.prettyPrint(testTree.getRoot()));

