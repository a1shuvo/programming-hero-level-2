// Spread and Rest

const friends: string[] = ["Rahim", "Karim"];
const schoolFriends: string[] = ["Shimul", "Bulbul", "Kamal"];
const collegeFriends: string[] = ["Ratul", "Rayhan"];

friends.push(...schoolFriends);
friends.push(...collegeFriends);

console.log(friends);

const user = {
  name: "Shuvo Saha",
  age: 32,
};

const otherInfo = {
  isMarried: true,
  hasBaby: true,
};

const userInfo = { ...user, ...otherInfo };

console.log(userInfo);

// Rest Operator

const sendInvite = (...friends: string[]) => {
  friends.forEach((friend: string) => {
    console.log(`Send invitation to the ${friend}`);
  });
};

sendInvite("Ankur", "Tuhin", "Shiv", "Shuvo", "Soro"); 
