const { Router } = require("express");
const route = Router();

route.get("/table/exportedProducts", (req, res) => {
  res.render("tables/exportedProducts", {
    page: "exportedProducts",
    title: "exported Products",
  });
});

module.exports = route;
