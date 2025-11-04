// Stack implementation using array
class Stack {
  constructor() {
    this.items = [];
  }

  // O(1)
  push(value) {
    this.items.push(value);
  }

  // O(1)
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // O(n)
  print() {
    console.log(this.items.slice().reverse().join(" -> "));
  }
}

const stack = new Stack();

console.log(stack.isEmpty());
console.log(stack.items);
console.log(stack.pop());

stack.push(10);
stack.push(20);
stack.push(30);

stack.print();

console.log(stack.pop());
console.log(stack.peek());
