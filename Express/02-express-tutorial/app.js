const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
app.use(express.static("./public"));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR
// })

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});

//Static assets are files that clients can access directly without any server-side processing. In this code, the `express.static` middleware is used to serve static files from the `./public` directory. This means that any files placed in the `public` folder can be accessed directly via their URL. For example, if there is an image file named `logo.png` in the `public` folder, it can be accessed at `http://localhost:5000/logo.png`.
