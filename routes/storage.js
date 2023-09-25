const { Router } = require("express");
const route = Router();

route.get("/storage", (req, res) => {
  res.render("tables/storage", {
    page: "storage",
    title: "Storage",
  });
});

module.exports = route;
