const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
app.use(express.static("./public"));
const { people } = require("./data");

// Example API: return 1..N pages of `people` in one request
app.get("/api/people", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  let pages = Math.max(1, parseInt(req.query.pages) || 1);
  const MAX_PAGES = 5;
  pages = Math.min(pages, MAX_PAGES);

  const totalLimit = limit * pages;
  const offset = (page - 1) * limit;

  const items = people.slice(offset, offset + totalLimit);

  // split into page-sized buckets for frontend convenience
  const pagesArray = [];
  for (let i = 0; i < pages; i++) {
    pagesArray.push(items.slice(i * limit, (i + 1) * limit));
  }

  res.json({
    page,
    limit,
    pagesRequested: pages,
    returnedItems: items.length,
    pages: pagesArray,
  });
});

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
