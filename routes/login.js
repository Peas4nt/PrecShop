const { Router } = require("express");
const route = Router();

route.get("/login", (req, res) => {
  res.render("login/login", {
    page: "login",
    title: "login",
  });
});

module.exports = route;
