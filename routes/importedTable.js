const { Router } = require("express");
const route = Router();

route.get("/table/importedProducts", (req, res) => {
  res.render("importedProducts", {
    page: "importedProducts",
    title: "imported Products",
  });
});

module.exports = route;