const crypto = require("crypto");

console.log("\nMD5 Hash: ");
const md5Hash = crypto.createHash("md5").update("password123").digest("hex"); // not recommended for security
console.log("Input:", "password123");
console.log("MD5 hashed password:", md5Hash);

console.log("\nSHA256 Hash: ");
const sha256Hash = crypto
  .createHash("sha256")
  .update("password123")
  .digest("hex");
console.log("Input:", "password123");
console.log("SHA256 hashed password:", sha256Hash);

console.log("\nSHA512 Hash: ");
const sha512Hash = crypto
  .createHash("sha512")
  .update("password123")
  .digest("hex");
console.log("Input:", "password123");
console.log("SHA512 hashed password:", sha512Hash);
