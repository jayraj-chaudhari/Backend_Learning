const express = require("express");
const app = express();

//or const app = require('express')()

app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
//we have to place the app.listen at the end of the file because it starts the server and listens for incoming requests. If we place it before defining the routes, the server would start listening before the routes are set up, and any requests made to those routes would not be handled correctly. By placing app.listen at the end, we ensure that all routes are defined and ready to handle requests when the server starts listening.

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
