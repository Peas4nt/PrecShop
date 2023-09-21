const { Router } = require("express");
const route = Router();

route.get("/login", (req, res) => {
  res.render("login", {
    page: "login",
    title: "login",
  });
});

module.exports = route;
