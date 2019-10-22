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
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// app.use(cookie-bodyParser())
// app.use(cookieParser()) lolzzzz
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'user_id',
  keys: ['cat'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

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
  let templateVars = {user: req.session.user_id};
  res.render("index", templateVars)
});

app.get("/newArticles", (req, res) => {
  let templateVars = {user: req.session.user_id};
  res.render("addArticle", templateVars)
});

//logout
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect("/")
})
//load login page
app.get("/login", (req, res) => {
  console.log(db)
  let templateVars = {user: req.session.user_id};
  res.render("login", templateVars)
});
//req.session = null;
app.post('/login', (req, res) => {
  // console.log(req.body.username);
  // console.log(req.body.password);

  const userCheck = authenticateUser(req.body.username, req.body.password)
  .then(user => {
    if(user){
      // console.log("Successfully authenticated");
      // let cookVal = generateRandomString();
      req.session.user_id = req.body.username;
      res.redirect('/')
    } else{
      res.status(403).send("bad login")
    }
  })

  //console.log(req.body)
  //console.log(users)


  //1. To the username from the body as well as the password
  //2. Create a function to which we will pass this username and password
  //3. The function then checks with a query to the database like "
  //4 Select * from users where username = "+username and password = "password"
  //5 if you get something or the count of return of rows is 1? //then you say all good with the login
  //6 else if there was no return of the user row or count == 0 then give message, please check your username and password
});

//json
app.get('/users', function(res){
console.log(res)
  })

app.post("/register", (req, res) => {
  addUser(req.body)
  req.session.user_id = req.body.username;
  res.redirect('/')
 });


app.get("/viewArticle", (req, res) => {
    let templateVars = {user: req.session.user_id};
  res.render("viewArticle", templateVars)
});

function authenticateUser(username, password){
  return db.query("Select id, username, email from users where username = '"+username+"' and password='"+password+"'")
  .then((result)=>{
    console.log(result.rows);
    console.log(result.rows.length);
    return result.rows[0];
  });
}

// app.get('/users', dbQueries.getUsers);
// app.get('/users/:id', dbQueries.getUserById);
// app.post('/users', dbQueries.createUser);
// app.put('/users/:id', dbQueries.updateUser);
// app.delete('/users/:id', dbQueries.deleteUser);
// app.get('/articles', dbQueries.getArticles);
// app.get('/articles/:id', dbQueries.getArticlesById);
// app.post('/newArticles', dbQueries.createArticle);
// app.delete('/articles/:id', dbQueries.deleteArticle);


//database lolz
const addUser =  function(user) {
  console.log('addUser got called lmfao:')
  console.log(user)
  console.log(user.password)
  return db.query(`INSERT INTO users (username, email, password, profile_picture) VALUES ('${user.username}', 'example@example.com', 'password', 'http://ern-dubai.com/wp-content/uploads/2019/04/facebook-anonymous-app.jpg')
  RETURNING *;
  `)
  .then(res => res.rows[0]);
}

const addArticle = function(article) {
  console.log('addArticle was called kek:')
  console.log(article)
  console.log(article.title)
  return db.query(`INSERT INTO articles (title, description, thumbnail, url, topic) VALUES
  (${article.title}, ${article.description}, ${article.thumbnail}, ${article.url}, ${article.topic})
  `)
  .then(res => res.rows[0]);
}

function generateRandomString() {
  Math.random().toString(36).slice(-6);
  return Math.random().toString(36).slice(-6);
 };

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
