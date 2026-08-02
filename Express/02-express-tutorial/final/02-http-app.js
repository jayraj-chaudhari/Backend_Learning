const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

//Here synch is used because we want to read the files before the server starts listening to requests. If we used asynchronous reading, the server might start before the files are fully read, leading to errors when trying to serve them.Also we just have to pass these files once not every time a request is made, so synchronous reading is acceptable in this case.

const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url;
  console.log(url);
  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  }

  //If we change content-type to text/plain, the browser will display the HTML code as plain text instead of rendering it as a webpage. This is because the browser relies on the content-type header to determine how to interpret and display the response content.

  // about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  // styles
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }

  //Browser also sends requests for other resources like images, scripts, and stylesheets that are linked in the HTML. If we don't handle these requests, the browser will receive a 404 response for those resources, leading to broken images or missing styles/scripts on the page.Hence we can treate these request same as we did for the home page and about page, by checking the URL and serving the appropriate file with the correct content-type header.

  // image/logo
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  }
  // logic
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
