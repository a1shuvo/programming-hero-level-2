class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  takeSleep(numOfHrs: number) {
    return `${this.name} takes ${numOfHrs} hours of sleep.`;
  }
}

class Student extends Person {
  rollNo: number;
  constructor(name: string, age: number, rollNo: number) {
    super(name, age);
    this.rollNo = rollNo;
  }
}

class Teacher extends Person {
  takeClass(numOfClass: number) {
    return `${this.name} takes ${numOfClass} classes.`;
  }
}

const student1 = new Student("Shuvo Saha", 32, 10);
console.log(student1.takeSleep(8));
console.log(student1.age);
console.log(student1.rollNo);

const teacher1 = new Teacher("Soroswati Saha", 27);
console.log(teacher1.takeClass(3));
