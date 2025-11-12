// Generics: Dynamically Generalize

type GenericArray<T> = Array<T>;

// const friends: string[] = ["X", "Y", "Z"];
const friends: GenericArray<string> = ["X", "Y", "Z"];

// const roll: number[] = [4, 7 ,11];
const roll: GenericArray<number> = [4, 7, 11];

// const isEligibleList: boolean[] = [true, false, true];
const isEligibleList: GenericArray<boolean> = [true, false, true];

// generics in array of objects
type User = {
  name: string;
  age: number;
};
const userList: GenericArray<User> = [
  {
    name: "Mr. X",
    age: 39,
  },
  {
    name: "Mr. Y",
    age: 32,
  },
];

// tuple generics
type Coordinates<X, Y> = [X, Y];
const coordinates1: Coordinates<number, number> = [10, 20];
const coordinates2: Coordinates<string, string> = ["10", "20"];
