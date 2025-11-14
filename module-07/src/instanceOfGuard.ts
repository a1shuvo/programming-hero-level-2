// OOP: instanceof type guard or type narrowing

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getSleep(numOfHours: number) {
    console.log(`${this.name} sleeps ${numOfHours} hours daily.`);
  }
}

class Student extends Person {
  doStudy(numOfHours: number) {
    console.log(`${this.name} study ${numOfHours} hours daily`);
  }
}

class Teacher extends Person {
  takeClass(numOfClass: number) {
    console.log(`${this.name} takes ${numOfClass} classes daily`);
  }
}

const isStudent = (user: Person) => {
  return user instanceof Student;
};

const isTeacher = (user: Person) => {
  return user instanceof Teacher;
};

const getUserInfo = (user: Person) => {
  if (isStudent(user)) {
    user.doStudy(6);
  } else if (isTeacher(user)) {
    user.takeClass(3);
  } else {
    user.getSleep(8);
  }
};

const person1 = new Person("Shrija");
const student1 = new Student("Shuvo");
const teacher1 = new Teacher("Soro");

getUserInfo(person1);
getUserInfo(student1);
getUserInfo(teacher1);
