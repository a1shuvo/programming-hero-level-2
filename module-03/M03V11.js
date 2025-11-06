//* Task 1: Implement Queue using Linked List
//* Task 2: Implement Stack using Linked List

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Implement Queue using linked list
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  // O(1)
  enqueue(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length++;
    return this;
  }

  // O(1)
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const nodeToRemove = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;

    this.length--;
    return nodeToRemove.value;
  }

  // O(1)
  peek() {
    return this.first ? this.first.value : undefined;
  }

  // O(1)
  isEmpty() {
    return this.length === 0;
  }

  // O(1)
  size() {
    return this.length;
  }

  // O(n)
  print() {
    const array = [];
    let currentNode = this.first;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log("Front -> " + array.join(" -> ") + " -> Back");
  }
}

const queue = new Queue(1);

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.dequeue();
queue.print();
