"use strict";
// Normal function and Arrow function
Object.defineProperty(exports, "__esModule", { value: true });
function addNormal(num1, num2) {
    return num1 + num2;
}
const addArrow = (num1, num2) => {
    return num1 + num2;
};
// object -> function -> method
const user = {
    name: "Shuvo Saha",
    balance: 10000000,
    addBalance(value) {
        const totalBalance = this.balance + value;
        return totalBalance;
    },
};
user.addBalance(50000000);
const arr = [1, 2, 3];
const sqrArr = arr.map((elem) => {
    return elem * elem;
});
console.log(user.addBalance(500000000));
console.log(sqrArr);
//# sourceMappingURL=function.js.map