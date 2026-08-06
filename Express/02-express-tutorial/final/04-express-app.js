const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

//Above code is used to serve static files from the 'public' directory and to send the 'index.html' file located in the 'navbar-app' directory when the root URL is accessed.

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});

//app.use => The `app.use` method is used to mount middleware functions at a specified path. In this case, it is used to serve static files from the 'public' directory. This means that any files in the 'public' directory can be accessed directly via their URL without needing to define specific routes for them. For example, if there is a file named 'style.css' in the 'public' directory, it can be accessed at `http://localhost:5000/style.css`.
