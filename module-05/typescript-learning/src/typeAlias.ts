// Type aliases

type IsAdmin = boolean;
const isAdmin: IsAdmin = true;

type Name = string;
const name: Name = "Shuvo Saha";

type AddFunc = (a: number, b: number) => number;
const add: AddFunc = (num1, num2) => num1 + num2;

type User = {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  address: {
    division: string;
    city: string;
  };
};

const user1: User = {
  id: 123,
  name: {
    firstName: "Shuvo",
    lastName: "Saha",
  },
  gender: "male",
  address: {
    division: "Mymensingh",
    city: "Phulpur",
  },
};

const user2: User = {
  id: 121,
  name: {
    firstName: "Soro",
    lastName: "Saha",
  },
  gender: "female",
  address: {
    division: "Mymensingh",
    city: "Muktagacha",
  },
};
