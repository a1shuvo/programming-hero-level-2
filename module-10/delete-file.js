const fs = require("fs");

fs.writeFileSync("./output/temp.txt", "This is a temp file.");
console.log("Temp file created!");

if (fs.existsSync("./output/temp.txt")) {
  console.log("file exists");

  fs.unlinkSync("./output/temp.txt");
  console.log("file deleted");
}

try {
  fs.unlinkSync("./output/temp.txt");
} catch (error) {
  console.error("Error :", error.message);
}

fs.writeFile("./output/temp2.txt", "Another temp file", (err) => {
  if (err) return console.error(err.message);

  console.log("Another temp file created!");

  fs.unlink("./output/temp2.txt", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("temp2 deleted.");
    }
  });
});
