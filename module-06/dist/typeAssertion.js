"use strict";
// Type assertion
Object.defineProperty(exports, "__esModule", { value: true });
let anything;
anything = 123;
anything.toString(); // type assertion
console.log(anything);
const KgToGmConverter = (input) => {
    if (typeof input === "number") {
        return input * 1000;
    }
    else if (typeof input === "string") {
        const [value] = input.split(" ");
        return `Converted output is: ${Number(value) * 1000}`;
    }
};
const result1 = KgToGmConverter(2); // type assertion
console.log(result1);
const result2 = KgToGmConverter("2 KG"); // type assertion
console.log(result2);
try {
}
catch (error) {
    console.log(error.message); // type assertion
}
//# sourceMappingURL=typeAssertion.js.map