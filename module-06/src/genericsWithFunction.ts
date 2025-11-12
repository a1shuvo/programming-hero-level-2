// Generic Function

// const createArrayWithString = (value: string) => [value];
// const createArrayWithNumber = (value: number) => [value];
// const createArrayWithUserObj = (value: { id: number; name: string }) => {
//   return [value];
// };

const createArrayWithGeneric = <T>(value: T) => {
  return [value];
};

const arrStr = createArrayWithGeneric("Apple");
const arrNum = createArrayWithGeneric(123);
const arrObj = createArrayWithGeneric({
  id: 123,
  name: "Mr. X",
});

// tuple with generics
const createArrayTupleWithGenerics = <X, Y>(param1: X, param2: Y) => {
  return [param1, param2];
};

const res1 = createArrayTupleWithGenerics("Shuvo", 32);
const res2 = createArrayTupleWithGenerics("Shuvo", true);
const res3 = createArrayTupleWithGenerics({ name: "Shuvo", age: 32 }, true);

//
const addStudentToCourse = <T>(studentInfo: T) => {
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

const result1 = addStudentToCourse(student1);
const result2 = addStudentToCourse(student2);
console.log(result1);
console.log(result2);
