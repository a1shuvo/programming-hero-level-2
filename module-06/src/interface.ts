// For array and function we can use type alias and for object we can use both type and interface
// In object oriented programming for object extends we need to use interface
type User = {
  name: string;
  age: number;
};
type Role = {
  role: "admin" | "user";
};
type UserWithRole = User & Role;

// interface can not be used in primitive data types
// interface: object type: array, object, function
interface IUser {
  name: string;
  age: number;
}
// interface extends
interface IUserWithRole extends IUser {
  role: "admin" | "user";
}

const user1: IUserWithRole = {
  name: "Shuvo",
  age: 32,
  role: "admin",
};
const user2: IUser = {
  name: "Soro",
  age: 27,
};

// function

type Add = (num1: number, num2: number) => number;
interface IAdd {
  (num1: number, num2: number): number;
}
const add: IAdd = (num1, num2) => {
  return num1 + num2;
};

type Friends = string[];
// indexing
interface IFriends {
  [index: number]: string;
}
const friends: IFriends = ["A", "B", "C"];
