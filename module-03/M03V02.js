// let count = 0;

// const counter = (amount) => {
//   count += amount;
//   return count;
// };

// console.log(counter(3));
// console.log(counter(2));

// Function closure
// const createCounter = () => {
//   let count = 0;

//   return (amount) => {
//     count += amount;
//     return count;
//   };
// };

// const counter = createCounter();

// console.log(counter(2));
// console.log(counter(3));

// stateful object class

class Counter {
  constructor(count) {
    this.count = count;
  }

  add(amount) {
    this.count += amount;
  }

  print() {
    console.log(this.count);
  }
}

const counter1 = new Counter(0);
counter1.add(2);
counter1.add(3);
counter1.print();

const counter2 = new Counter(10);
counter2.add(5);
counter2.add(2);
counter2.print();
