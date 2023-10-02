const { Router } = require("express");
const route = Router();
const db = require("../db");

route.get("/check/code", async (req, res) => {
  res.render("dataforms/check_code", {
    page: "check_code",
    title: "Create a new product",
  });
});
route.post("/check/code", (req, res) => {
  const code = req.body.prod_code;

  res.redirect("/create/product");
});
module.exports = route;
