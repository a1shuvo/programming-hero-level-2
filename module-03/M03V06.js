// Simple linked list

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const head = new Node(10);
console.log(head);
head.next = new Node(20);
head.next.next = new Node(30);

console.log(head);

let temp = head;

while (temp !== null) {
  console.log(temp.value + " ");
  temp = temp.next;
}
