const os = require("os");

console.log("System info : \n");
console.log("-".repeat(50));

console.log("\nPlatform details: ");
console.log("Platform: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("OS type: ", os.type());
console.log("OS release: ", os.release());
console.log("Hostname: ", os.hostname());

console.log("-".repeat(50));

console.log("CPU info: ");
const cpus = os.cpus();
console.log("CPU Model: ", cpus[0].model);
console.log("Number of cores: ", cpus.length);
console.log("CPU speed: ", cpus[0].speed);

console.log("-".repeat(50));

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(
  "Total Memory: ",
  (totalMemory / 1024 / 1024 / 1024).toFixed(2),
  "GB"
);
console.log(
  "Free Memory: ",
  (freeMemory / 1024 / 1024 / 1024).toFixed(2),
  "GB"
);

console.log("-".repeat(50));

const uptime = os.uptime();

const days = Math.floor(uptime / 86400);
const hours = Math.floor((uptime % 86400) / 3600);
const minutes = Math.floor((uptime % 3600) / 60);

console.log(`${days} days ${hours} hours ${minutes} minutes`);


