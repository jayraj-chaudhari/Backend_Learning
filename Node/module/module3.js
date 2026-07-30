//Built-in modules

//1. os

const os = require("os");
console.log(os.userInfo());
console.log(`The system uptime is ${os.uptime() / 3600} hours`);
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);

//2. path

const path = require("path");
console.log(path.sep); //separator => /

const filePath = path.join("/util", "first.txt");
console.log(filePath); // /util/first.txt
//  also removes any extra slashes
const base = path.basename(filePath);
console.log(base); // first.txt
const absolute = path.resolve(__dirname, "util", "first.txt");
console.log(absolute); // /Users/username/path/to/util/first.txt

//3. fs - synchronous

const fs = require("fs");
const { readFileSync, writeFileSync } = require("fs");
const first = readFileSync("./util/first.txt", "utf8");
const second = readFileSync("./util/second.txt", "utf8");
console.log(first, second);

writeFileSync(
  "./util/result.txt",
  `Here is the result : ${first}, ${second}`, //creates a new file if it doesn't exist, and overwrites the file if it does exist.
  { flag: "a" },
); //append to the file instead of overwriting it

//4. fs - asynchronous
const { readFile, writeFile } = require("fs");
readFile("./util/first.txt", "utf8", (err, result) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", result);
  readFile("./util/second.txt", "utf8", (err, result2) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File content:", result2);
  });
});
//here we are using the asynchronous version of readFile,
//which takes a callback function that is called when the file has been read.
// If there is an error, it will be passed to the callback as the first argument.
// If the file is read successfully, the content will be passed as the second argument.
// we can use async/await with promises to avoid callback hell and make the code more readable.

const util = require("util");
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);
