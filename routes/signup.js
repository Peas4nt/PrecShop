const { Router } = require("express");
const route = Router();
const db = require("../db");

route.get("/signup", (req, res) => {
  res.render("signup", {
    page: "signup",
    title: "signup",
  });
});

route.post("/signup", async (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  console.log(name, lastname, email, password);
  console.log(
    await db.insertData(
      "INSERT INTO users(name,lastname,email,password) VALUES (?, ?, ?, ?)",
      [name, lastname, email, password]
    )
  );

  res.redirect("/");
});

module.exports = route;
