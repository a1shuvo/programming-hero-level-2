// console.log(binarySearch([3, 5, 6, 7, 9, 11], 7));
// Output: 3

const binarySearch = (arr, target) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = arr[mid];

    if (guess === target) {
      return mid;
    } else if (guess < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};

console.log(binarySearch([3, 5, 6, 8, 9, 11], 7));
