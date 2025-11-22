const fs = require("fs");

const content1 = "This is a content \nnode.js is awesome!";

try {
  fs.writeFileSync("./output/test-sync.txt", content1);
  console.log("File written sync");
} catch (error) {
  console.error(error.message);
}

const content2 = "This is a content too \nasynchronous!";

fs.writeFile("./output/test-async.txt", content2, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("File written asynchronously!");
});
