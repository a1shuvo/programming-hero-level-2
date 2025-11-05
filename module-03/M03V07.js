class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    // If the linked list is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the linked list is not empty
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);

    // If the linked list is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the linked list is not empty
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      console.log("Index out of bound.");
      return undefined;
    }

    // If insert at the start of the linked list
    if (index === 0) {
      return this.prepend(value);
    }

    // If insert at the end of the linked list
    if (index === this.length) {
      return this.append(value);
    }

    // If insert at the middle of the linked list
    // find the leading node
    const leadingNode = this._traverseToIndex(index - 1);
    const holdingNode = leadingNode.next;

    const newNode = new Node(value);

    leadingNode.next = newNode;
    newNode.next = holdingNode;

    this.length++;
  }

  remove(index) {
    // if removing the first element
    if (index === 0) {
      const removedItem = this.head.value;
      this.head = this.head.next;

      if (this.length === 1) {
        this.tail = null;
      }

      this.length--;
      return removedItem;
    }

    // finding the leading node
    const leadingNode = this._traverseToIndex(index - 1);
    const nodeToRemove = leadingNode.next;

    leadingNode.next = nodeToRemove.next;

    // if removing the last element
    if (leadingNode.next === null) {
      this.tail = leadingNode;
    }

    this.length--;
    return nodeToRemove.value;
  }

  // private helper method
  _traverseToIndex(index) {
    let count = 0;
    let currentNode = this.head;

    while (count !== index) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  print() {
    let currentNode = this.head;
    const arr = [];
    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(arr.join(" -> "), "-> null");
  }
}

const linkedList = new LinkedList();

// linkedList.append(1);
// linkedList.append(2);
// linkedList.append(3);
// linkedList.print();

// linkedList.prepend(10);
// linkedList.prepend(20);
// linkedList.prepend(30);
// linkedList.print();

// linkedList.insert(3, 100);
// linkedList.print();

// // by returning this after each operation we can chain the methods
// linkedList.append(10).append(20).append(30).prepend(0);
// linkedList.print();

linkedList.append("A");
// linkedList.append("B");
// linkedList.append("C");
linkedList.remove(2);
linkedList.print();
linkedList.remove(0);
linkedList.print();
console.log(linkedList.length);
