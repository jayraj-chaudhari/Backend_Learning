const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to our home page");
    res.end();
  } else if (req.url === "/about") {
    res.write("Here is our short history");
    res.end();
  } else {
    res.write(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href="/">back home</a>
    `);
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//blocking code - code that takes a long time to execute and blocks the event loop from handling other requests.
//here it is synchronous code that blocks the event loop from handling other requests until it is finished executing.
//hence all the other requests will have to wait until this code is finished executing before they can be handled by the event loop.
//for all pages except the home page, the event loop will be blocked until the for loop is finished executing,
//which will take a long time and will cause the server to be unresponsive to other requests during that time.
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to our home page");
    res.end();
  } else if (req.url === "/about") {
    for (let i = 0; i < 1000000000; i++) {
      // blocking code
    }
    res.write("Here is our short history");
    res.end();
  } else {
    res.write(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href="/">back home</a>
    `);
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
