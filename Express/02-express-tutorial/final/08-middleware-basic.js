const express = require("express");
const app = express();

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); // If you are giving a response directly in the middleware, you don't need to call next(). However, if you want to pass control to the next middleware or route handler, you must call next() at the end of your middleware function.
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});
app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

//Now instead of writing the logger middleware for each route, we can use the app.use() method to apply it globally to all routes. This way, we don't have to repeat the middleware for every route, and it will be executed for every incoming request.

app.use(logger); // This will apply the logger middleware to all routes defined after this line. It will log the method, URL, and time for every incoming request before passing control to the next middleware or route handler.

app.use("/api", logger); // This will apply the logger middleware only to routes that start with '/api'. It will log the method, URL, and time for every incoming request to those routes before passing control to the next middleware or route handler.
