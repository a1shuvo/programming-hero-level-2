// Type Guard
// in typeof

// typeof guard
type AlphaNeumeric = number | string;
const add = (num1: AlphaNeumeric, num2: AlphaNeumeric) => {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};

console.log(add(2, 2));
console.log(add(2, "2"));

// in guard
type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: "Admin";
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`${user.name} & role is ${user.role}`);
  } else {
    console.log(user.name);
  }
};

getUserInfo({ name: "Shuvo Saha" });
getUserInfo({ name: "Shuvo Saha", role: "Admin" }); 
