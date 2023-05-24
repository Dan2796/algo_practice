function merge(array1, array2) {
  const newArray = [];
  const numIterations = array1.length + array2.length;
  for(let i = 0; i < numIterations; i += 1) {
    if (typeof array1[0] === 'undefined') {
      newArray.push(array2.shift());
    } else if (typeof array2[0] === 'undefined') {
      newArray.push(array1.shift());
    } else {
      newArray.push(array1[0] <= array2[0] ? array1.shift() : array2.shift());
    }
  };
  return newArray;
}

function mergeSort(array) {
  if (array.length == 1) {
    return array;
  }
  // Note that the left hand array is smaller if array.length is odd
  const leftArray = array.slice(0, Math.floor(array.length / 2));
  const rightArray = array.slice(Math.floor(array.length / 2), array.length);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

console.log(mergeSort([5, 2, 1, 3, 6, 4]));
console.log(mergeSort([123, 1, 3, 12, 423, 34, 1, 24, 24, 12, 1]));


