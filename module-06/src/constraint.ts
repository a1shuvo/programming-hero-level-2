// constraint: set strict rules

type Student = { id: number; name: string };

// Student must have id and name properties
const addStudentToCourse = <T extends Student>(studentInfo: T) => {
  return {
    course: "Next Level Web Development",
    ...studentInfo,
  };
};

const student1 = {
  id: 123,
  name: "Shuvo",
  hasPen: true,
};

const student2 = {
  id: 234,
  name: "Jhankar",
  hasCar: true,
  isMarried: true,
};

const student3 = {
  id: 456,
  name: "Mr. X",
  hasCar: false,
};

const result1 = addStudentToCourse(student1);
const result2 = addStudentToCourse(student2);
const result3 = addStudentToCourse(student3);
console.log(result1);
console.log(result2);
console.log(result3);
