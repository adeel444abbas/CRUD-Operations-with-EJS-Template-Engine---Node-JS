const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let users = [];

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// Create User API
app.post("/createUser", (req, res) => {
  let { name, password } = req.body;
  let id = Math.floor(Math.random() * 100000000 + 1);
  const formData = {
    name: name,
    password: password,
    id: id,
  };
  // console.log("formData==>", formData)
  users.push(formData);
  res.redirect("/users");
});

// Get All users API
app.get("/users", (re, res) => {
  res.render("users", { users: users });
});

// Delete User API
app.get("/users/:id", (req, res) => {
  console.log("Users:", users);
  let newId = req.params.id;
  // console.log("newID:", typeof newId);   // string
  users = users.filter((user) => user.id != newId);
  // console.log("Users Now:", users);
  res.redirect("/users");
});

// Edit User
app.post("/editUser/:id", (req, res) => {
  let id = req.params.id;
  let userToEdit = users.findIndex((user) => user.id == id);
  // console.log("userToEdit", userToEdit);
  let data = users[userToEdit];
  console.log("data==>", data);
  res.render("editUser", { data });
  console.log(data);
});

app.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let { name, password } = req.body;
  let newObj = {
    name: name,
    password: password,
    id: id,
  };
  console.log("newObj==>", newObj);
  users.forEach((user, idx) => {
    if (user.id == id) {
      users[idx] = newObj;
    }
  });
  console.log("users==>", users);
  res.redirect("/users");
});

app.listen(3002, () => {
  console.log("server is running");
});
