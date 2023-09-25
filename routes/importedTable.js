const { Router } = require("express");
const route = Router();

route.get("/tables/importedProducts", (req, res) => {
  res.render("tables/importedProducts", {
    page: "importedProducts",
    title: "imported Products",
  });
});

module.exports = route;