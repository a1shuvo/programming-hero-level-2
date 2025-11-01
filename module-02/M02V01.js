// const obj = {};

// obj[course2] = { courseId: "level2" };
// obj[course1] = { courseId: "level1" };

// console.log(obj);

const course1 = { name: "Programming Hero" };
const course2 = { name: "Next Level Web Development" };

const courses = [
  [course1, "Level 1"],
  [course2, "Level 2"],
];

const map = new Map(courses);

// map.set(course1, { courseId: "level1" });
// map.set(course2, { courseId: "level2" });

// map.forEach((value, key) => (key.name = "Shohoz Shorol Simple " + key.name));

// for (let key of map.keys()) {
//   key.name = "Shohoz Shorol Simple " + key.name;
// }

console.log(map);
