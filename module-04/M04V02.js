// Problem statement
// You are given two large arrays, listA and listB. Each array contains user objects.
// A user object is guaranteed to have a unique id property (string) and may contain other data, such as a name.

// Your task is to write an efficient function that takes both list as input.
// and returns the total count of users that are present in the both lists.

//------------Data setup block------------//
const USER_COUNT = 50000;
const usersA = [];
const usersB = [];

const createUser = (id) => ({ id: `user_${id}`, name: `User ${id}` });

for (let i = 0; i < USER_COUNT; i++) {
  usersA.push(createUser(i));
  usersB.push(createUser(i + 25000));
}

// Users 25000 to 49999 are common
//------------Data setup block------------//

// ---ALGORITHMS--- //

const commonFriendsSlow = (usersA, usersB) => {
  const startTime = performance.now();
  const commonFriends = [];

  //* O(n^2)
  usersA.forEach((userA) => {
    //* O(n)
    usersB.forEach((userB) => {
      if (userA.id === userB.id) {
        commonFriends.push(userA);
      }
    });
  });

  const endTime = performance.now();

  return { count: commonFriends.length, timeTookToFinish: endTime - startTime };
};

// console.log(commonFriendsSlow(usersA, usersB));

const commonFriendsFast = (usersA, usersB) => {
  const startTime = performance.now();
  const commonFriends = [];

  //* O(n)
  const idListA = new Set(usersA.map((user) => user.id));

  //* O(n)
  usersB.forEach((userB) => {
    //* O(1) lookup
    if (idListA.has(userB.id)) {
      commonFriends.push(userB);
    }
  });

  const endTime = performance.now();

  return { count: commonFriends.length, timeTookToFinish: endTime - startTime };
};

console.log(commonFriendsFast(usersA, usersB));
