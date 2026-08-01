//Async - Await

//Async - Await is a way to handle asynchronous operations in JavaScript.
// It allows you to write asynchronous code that looks and behaves like synchronous code,
// making it easier to read and understand.

// The async keyword is used to declare a function as asynchronous, which means it will return a promise.

// The await keyword is used to pause the execution of an async function until a promise is resolved or rejected.

//promises are a way to handle asynchronous operations in JavaScript,
// allowing you to write cleaner and more manageable code compared to traditional callback-based approaches.

const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const util = require("util");
const { readFile } = require("fs");
const readFileAsync = util.promisify(readFile);
// The readFileAsync function is now a promise-based version of the readFile function,
// allowing you to use async - await syntax to read files asynchronously.

//complete file reading asynchronously using async - await
const readData = async () => {
  try {
    const data = await readFileAsync("./module/util/first.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

// Call the readData function to read the file asynchronously
readData();

//Alternative of using util.promisify is to use the fs.promises API,
// which provides promise-based versions of the fs module's functions.
// Here's how you can read a file asynchronously using fs.promises:
const fs = require("fs").promises;
const first = async () => {
  try {
    const data = await fs.readFile("./module/util/first.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
};
first();
