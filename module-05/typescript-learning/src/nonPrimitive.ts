// array, object

// TS: tuple

let bazarlist: string[] = ["egg", "milk", "sugar"];
let mixedArr: (string | number)[] = ["egg", 12, "milk", 5, "sugar", 3];
let destination: [string, string, number] = ["Dhaka", "Mymensingh", 3];

// Reference type: object
const user: {
  readonly country: "Bangladesh"; // Access modifier
  organization: "Programming Hero"; // Value -> type: literal types
  firstName: string;
  middleName?: string; // optional type
  lastName: string;
} = {
  country: "Bangladesh",
  organization: "Programming Hero",
  firstName: "Shuvo",
  lastName: "Saha",
};
