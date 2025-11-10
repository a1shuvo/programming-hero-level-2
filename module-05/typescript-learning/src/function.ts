// Normal function and Arrow function

function addNormal(num1: number, num2: number): number {
  return num1 + num2;
}

const addArrow = (num1: number, num2: number): number => {
  return num1 + num2;
};

// object -> function -> method

const user = {
  name: "Shuvo Saha",
  balance: 10000000,
  addBalance(value: number): number {
    const totalBalance = this.balance + value;
    return totalBalance;
  },
};

user.addBalance(50000000);

const arr: number[] = [1, 2, 3];
const sqrArr = arr.map((elem: number): number => {
  return elem * elem;
});

console.log(user.addBalance(500000000));
console.log(sqrArr);
