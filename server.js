// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const dbQueries  = require('./lib/queries');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const newArticlesRoutes = require("./routes/newArticles");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/articles", articlesRoutes(db));
// app.use("/newArticles", newArticlesRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/newArticles", (req, res) => {
  res.render("addArticle");
});

app.get("/viewArticle", (req, res) => {
  res.render("viewArticle")
});



// app.get('/users', dbQueries.getUsers);
// app.get('/users/:id', dbQueries.getUserById);
// app.post('/users', dbQueries.createUser);
// app.put('/users/:id', dbQueries.updateUser);
// app.delete('/users/:id', dbQueries.deleteUser);
// app.get('/articles', dbQueries.getArticles);
// app.get('/articles/:id', dbQueries.getArticlesById);
// app.post('/articles', dbQueries.createArticle);
// app.delete('/articles/:id', dbQueries.deleteArticle);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
