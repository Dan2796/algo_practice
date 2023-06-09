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

  let root = buildTree(sorted);
  const getRoot = () => root;

  function insert(value, node = root) {
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
  }

  function find(value, node = root) {
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
  }

  function findWithParent(value, node = root) {
    if (node === root && node.getValue() === value) {
      return { found: root, parent: null, childIsLeft: null };
    }
    if (node.getValue() > value) {
      if (!node.hasLeftChild()) {
        return null;
      }
      if (node.getLeftChild().getValue() === value) {
        return { found: node.getLeftChild(), parent: node, childIsLeft: true };
      }
      return findWithParent(value, node.getLeftChild());
    }
    // must therefore be right hand side - no need for extra if
    if (!node.hasRightChild()) {
      return null;
    }
    if (node.getRightChild().getValue() === value) {
      return { found: node.getRightChild(), parent: node, childIsLeft: false };
    }
    return findWithParent(value, node.getRightChild());
  }

  function getNextSmallest(node) {
    let smallest = node.getRightChild();
    while (smallest.hasLeftChild()) {
      smallest = smallest.getLeftChild();
    }
    return smallest;
  }

  function remove(value) {
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
  }

  function levelOrder(nodeFunction = null, node = root) {
    // if running into performance issues, might need to implement a new queue object
    // rather than using shift which I think is O(n)
    const queue = [node];
    const array = [];
    while (queue.length > 0) {
      const nextItem = queue.shift();
      if (nextItem.hasLeftChild()) {
        queue.push(nextItem.getLeftChild());
      }
      if (nextItem.hasRightChild()) {
        queue.push(nextItem.getRightChild());
      }
      if (nodeFunction !== null) {
        nodeFunction(nextItem);
      }
      array.push(nextItem.getValue());
    }
    return array;
  }

  function levelOrderRecursive(nodeFunction = null, array = [], queue = [root]) {
    if (queue.length === 0) {
      return array;
    }
    const nextItem = queue.shift();
    if (nextItem.hasLeftChild()) {
      queue.push(nextItem.getLeftChild());
    }
    if (nextItem.hasRightChild()) {
      queue.push(nextItem.getRightChild());
    }
    if (nodeFunction !== null) {
      nodeFunction(nextItem);
    }
    array.push(nextItem.getValue());
    return levelOrderRecursive(nodeFunction, array, queue);
  }

  function inorder(nodeFunction = null, array = [], node = root) {
    if (node.hasLeftChild()) {
      inorder(nodeFunction, array, node.getLeftChild());
    }
    if (nodeFunction !== null) {
      nodeFunction(node);
    }
    array.push(node.getValue());
    if (node.hasRightChild()) {
      inorder(nodeFunction, array, node.getRightChild());
    }
    return array;
  }

  function preorder(nodeFunction = null, array = [], node = root) {
    if (nodeFunction !== null) {
      nodeFunction(node);
    }
    array.push(node.getValue());
    if (node.hasLeftChild()) {
      preorder(nodeFunction, array, node.getLeftChild());
    }
    if (node.hasRightChild()) {
      preorder(nodeFunction, array, node.getRightChild());
    }
    return array;
  }

  function postorder(nodeFunction = null, array = [], node = root) {
    if (node.hasLeftChild()) {
      postorder(nodeFunction, array, node.getLeftChild());
    }
    if (node.hasRightChild()) {
      postorder(nodeFunction, array, node.getRightChild());
    }
    if (nodeFunction !== null) {
      nodeFunction(node);
    }
    array.push(node.getValue());
    return array;
  }

  function height(node) {
    if (!node.hasChildren()) {
      return 0;
    }
    if (!node.hasLeftChild()) {
      return 1 + height(node.getRightChild());
    }
    if (!node.hasRightChild()) {
      return 1 + height(node.getLeftChild());
    }
    return 1 + Math.max(height(node.getLeftChild()), height(node.getRightChild()));
  }

  function depth(node) {
    let sum = 0;
    const nodeValue = node.getValue();
    let currentNode = root;
    while (nodeValue !== currentNode.getValue()) {
      if (nodeValue < currentNode.getValue()) {
        if (!currentNode.hasLeftChild()) {
          return null;
        }
        currentNode = currentNode.getLeftChild();
      } else if (nodeValue > currentNode.getValue()) {
        if (!currentNode.hasRightChild()) {
          return null;
        }
        currentNode = currentNode.getRightChild();
      }
      sum += 1;
    }
    return sum;
  }

  function isBalanced(node = root) {
    if (!node.hasRightChild() && node.hasLeftChild()) {
      if (height(node.getLeftChild()) > 1) {
        return false;
      }
      if (!isBalanced(node.getLeftChild())) {
        return false;
      }
    }
    if (!node.hasLeftChild() && node.hasRightChild()) {
      if (height(node.getRightChild()) > 1) {
        return false;
      }
      if (!isBalanced(node.getRightChild())) {
        return false;
      }
    }
    if (node.hasLeftChild() && node.hasRightChild()) {
      if ((height(node.getLeftChild()) - height(node.getRightChild()) > 1)) {
        return false;
      }
      if (!isBalanced(node.getLeftChild())) {
        return false;
      }
      if (!isBalanced(node.getRightChild())) {
        return false;
      }
    }
    return true;
  }

  function rebalance() {
    const newArray = [];
    inorder((node) => { newArray.push(node.getValue()); });
    root = buildTree(newArray);
  }

  function prettyPrint(node = root, prefix = '', isLeft = true) {
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
  }

  return {
    getRoot,
    insert,
    remove,
    find,
    findWithParent,
    levelOrder,
    levelOrderRecursive,
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

// Testing
/* eslint-disable no-console */
const randomArray = (length = 22) => {
  const array = [];
  for (let i = 0; i <= length; i += 1) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};
const testArray = randomArray();
const testTree = Tree(testArray);
console.log('Random tree created:');
testTree.prettyPrint();
console.log('Is it balanced?');
console.log(testTree.isBalanced());
console.log('Level order:');
console.log(testTree.levelOrder());
console.log(testTree.levelOrderRecursive());
console.log('Inorder:');
console.log(testTree.inorder());
console.log('Preorder:');
console.log(testTree.preorder());
console.log('Postorder:');
console.log(testTree.postorder());
for (let i = 0; i <= 10; i += 1) {
  testTree.insert(Math.floor(100 + Math.random() * 100));
}
console.log('Now with added numbers:');
testTree.prettyPrint();
console.log('Still balanced?');
console.log(testTree.isBalanced());
testTree.rebalance();
console.log('Have rebalanced:');
testTree.prettyPrint();
console.log('Now balanced?');
console.log(testTree.isBalanced());
console.log('Level order:');
console.log(testTree.levelOrder());
console.log(testTree.levelOrderRecursive());
console.log('Inorder:');
console.log(testTree.inorder());
console.log('Preorder:');
console.log(testTree.preorder());
console.log('Postorder:');
console.log(testTree.postorder());
