// Key of constraints

type RichPeoplesVehicles = {
  car: string;
  bike: string;
  cng: string;
};

type myVehicle1 = "car" | "bike" | "cng";
type myVehicle2 = keyof RichPeoplesVehicles;

const myVehicle: myVehicle2 = "car";

type User = {
  id: number;
  name: string;
  address: {
    city: string;
  };
};

const user: User = {
  id: 123,
  name: "Shuvo Saha",
  address: {
    city: "Mymensingh",
  },
};

// const myId = user.id;
// const myId = user["id"];
// const myName = user["name"];
// const myAddress = user["address"];

// console.log(myId, myName, myAddress);

const getPropertyFromObj = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

const product = {
  brand: "HP",
};

console.log(getPropertyFromObj(user, "address"));
console.log(getPropertyFromObj(product, "brand"));
