// Stateless vs Stateful

// Function is stateless
// const counter = (amount)=>{
//     let count = 0;
//     count += amount;
//     return count;
// }

// console.log(counter(3));
// console.log(counter(2));

// Object is stateful
const counter = {
  count: 0,

  add(amount) {
    this.count += amount;
  },

  print() {
    console.log(this.count);
  },
};

counter.add(3);
counter.add(2);
counter.print();
