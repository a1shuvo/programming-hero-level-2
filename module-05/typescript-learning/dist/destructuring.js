"use strict";
// object destructuring
// array destructuring
Object.defineProperty(exports, "__esModule", { value: true });
// Do not define type when using destructuring. Because it's apply as type alias.
const user = {
    id: 123,
    name: {
        firstName: "Shuvo",
        lastName: "Saha",
    },
    gender: "male",
    age: 32,
};
const { gender: myGender } = user; // Destructuring type alias
const { firstName } = user.name;
const { name: { lastName }, } = user;
console.log(myGender, firstName, lastName);
const friends = ["Rahim", "Karim", "Arun"];
const [A, B, C] = friends;
const [, , myBestFriend] = friends;
console.log(A, myBestFriend);
//# sourceMappingURL=destructuring.js.map