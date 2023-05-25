function LinkedList() {
  let headNode = null;
  let tailNode = null;
  let itemNumber = 0;
  const append = (value) => {
    const newItem = Node(value);
    itemNumber += 1;
    if (itemNumber === 1) {
      headNode = newItem;
      tailNode = newItem;
    } else {
      tailNode.setNextNode(newItem);
      tailNode = newItem;
    }
  }
  const prepend = (value) => {
    const newItem = Node(value);
    itemNumber += 1;
    newItem.setNextNode(headNode);
    headNode = newItem;
    if (itemNumber === 1) {
      tailNode = newItem;
    }
  }
  const size = () => {
    return itemNumber;
  }
  const head = () => {
    return headNode;
  }
  const tail = () => {
    return tailNode;
  }
  const at = (index) => {
    if (index > itemNumber || index < 0) return;
    if (itemNumber === 0) false;
    let nextItem = headNode;
    for (let i = 0; i < index; i += 1) { 
      nextItem = nextItem.getNextNode();
    }
    return nextItem;
  }
  const pop = () => {
    if (itemNumber === 0) return;
    let nextItem = headNode;
    for (let i = 0; i < itemNumber - 2; i += 1) {
      nextItem = nextItem.getNextNode();
    }
    popped = nextItem.getNextNode();
    nextItem.setNextNode(null);
    tailNode = nextItem;
    itemNumber -= 1;
    return popped;
  }
  const contains = (value) => {
    if (itemNumber === 0) false;
    let nextItem = headNode;
    for (let i = 0; i < itemNumber - 1; i += 1) { 
      if (nextItem.getValue() === value) {
        return true;
      }
      nextItem = nextItem.getNextNode();
    }
    return false;
  }
  const find = (value) => {
    if (itemNumber === 0) null;
    let nextItem = headNode;
    for (let i = 0; i < itemNumber - 1; i += 1) { 
      if (nextItem.getValue() == value) {
        return i;
      }
      nextItem = nextItem.getNextNode();
    }
    return null;
  }
  const insertAt = (value, index) => {
    if (index > itemNumber || index < 0) return;
    if (index === 0) {
      const newItem = Node(value);
      itemNumber += 1;
      newItem.setNextNode(headNode);
      headNode = newItem;
      return;
    }
    let nextItem = headNode;
    for (let i = 0; i < index - 1; i += 1) { 
      nextItem = nextItem.getNextNode();
    }
    newItem = Node(value);
    newItem.setNextNode(nextItem.getNextNode());
    nextItem.setNextNode(newItem);
    itemNumber += 1;
  }
  const removeAt = (index) => {
    if (index > itemNumber || index < 0) return;
    if (itemNumber === 0) return;
    let nextItem = headNode;
    for (let i = 0; i < index - 1; i += 1) { 
      nextItem = nextItem.getNextNode();
    }
    nextItem.setNextNode(nextItem.getNextNode().getNextNode());
    itemNumber -= 1;
  }
  const toString = () => {
    let stringList = '';
    let nextItem = headNode;
    for (let i = 0; i < itemNumber; i += 1) {
      stringList += `( ${nextItem.getValue()} )`;
      if (nextItem.getNextNode() !== null) {
        nextItem = nextItem.getNextNode();
        stringList += ' -> ';
      };
    }
    return stringList;
  }
  return { append, prepend, size, head, tail, at, pop, contains, find, 
           insertAt, removeAt, toString };
}

function Node(value = null, nextNode = null) {
  const getNextNode = () => {
    return nextNode;
  }
  const setNextNode = (newNextNode) => {
    nextNode = newNextNode;
  }
  const setValue = (newValue) => {
    value = newValue;
  }
  const getValue = () => {
    return value;
  }
  return {getNextNode, setNextNode, getValue, setValue}
}

fruits = LinkedList();
fruits.append('Cantaloupe');
fruits.prepend('Banana');
fruits.prepend('Apple');
fruits.append('Date');
fruits.append('Entawak');
fruits.append('Fig');
fruits.append('Gooseberry');

console.log(fruits.toString());

console.log(fruits.contains("Cantaloupe"));
console.log(fruits.find("Cantaloupe"));
console.log(fruits.contains("Honeydew"));
console.log(fruits.find("Honeydew"));

fruits.removeAt(3);
console.log(fruits.toString());
fruits.insertAt('Date', 3);
console.log(fruits.toString());
console.log(fruits.pop().getValue());
console.log(fruits.toString());

