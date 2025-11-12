// mapped types

// map

const arrOfNum: number[] = [1, 4, 5];
const arrOfString: string[] = ["1", "4", "6"];

const arrOfStringUsingMap: string[] = arrOfNum.map((num) => num.toString());

console.log(arrOfStringUsingMap);


