const fs = require("fs");

fs.writeFileSync("./output/app.log", "Application Started");
console.log("File created!");

const logEntry1 = `\n${new Date().toISOString()} user logged in`;
fs.appendFileSync("./output/app.log", logEntry1);

const logEntry2 = `\n${new Date().toISOString()} user fetched data`;
fs.appendFileSync("./output/app.log", logEntry2);

console.log("Task completed!");
