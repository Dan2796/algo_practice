function merge(array1, array2) {
  if (array1.length === 0) {
    return array2;
  } else if (array2.length === 0) {
    return array1;
  } else if (array1[0] <= array2[0]) {
    return [array1[0]].concat(merge(array1.splice(1, array1.length), array2));
  } else {
    return [array2[0]].concat(merge(array1, array2.splice(1, array2.length)));
  }
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

// version subsituting in merge for the function
function mergeSortCombined(array) {
  if (array.length == 1) {
    return array;
  }
  // Note that the left hand array is smaller if array.length is odd
  const leftArray = array.slice(0, Math.floor(array.length / 2));
  const rightArray = array.slice(Math.floor(array.length / 2), array.length);
  
  if (mergeSort(leftArray).length === 0) {
    return mergeSort(rightArray);
  } else if (mergeSort(leftArray).length === 0) {
    return mergeSort(rightArray);
  } else if (mergeSort(leftArray)[0] <= mergeSort(rightArray)[0]) {
    return [mergeSort(leftArray)[0]].concat(merge(mergeSort(leftArray).splice(1, mergeSort(leftArray).length), mergeSort(rightArray)));
  } else {
    return [mergeSort(rightArray)[0]].concat(merge(mergeSort(leftArray), mergeSort(rightArray).splice(1, mergeSort(rightArray).length)));
  }
}

console.log(mergeSort([5, 2, 1, 3, 6, 4]));
console.log(mergeSortCombined([5, 2, 1, 3, 6, 4]));
console.log(mergeSort([123, 1, 3, 12, 423, 34, 1, 24, 24, 12, 1]));
console.log(mergeSortCombined([123, 1, 3, 12, 423, 34, 1, 24, 24, 12, 1]));


