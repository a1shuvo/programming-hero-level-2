"use strict";
// Spread and Rest
Object.defineProperty(exports, "__esModule", { value: true });
const friends = ["Rahim", "Karim"];
const schoolFriends = ["Shimul", "Bulbul", "Kamal"];
const collegeFriends = ["Ratul", "Rayhan"];
friends.push(...schoolFriends);
friends.push(...collegeFriends);
console.log(friends);
const user = {
    name: "Shuvo Saha",
    age: 32,
};
const otherInfo = {
    isMarried: true,
    hasBaby: true,
};
const userInfo = { ...user, ...otherInfo };
console.log(userInfo);
// Rest Operator
const sendInvite = (...friends) => {
    friends.forEach((friend) => {
        console.log(`Send invitation to the ${friend}`);
    });
};
sendInvite("Ankur", "Tuhin", "Shiv", "Shuvo", "Soro");
//# sourceMappingURL=spreadAndRest.js.map