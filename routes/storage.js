const { Router } = require("express");
const route = Router();

route.get("/storage", (req, res) => {
  res.render("storage", {
    page: "storage",
    title: "Storage",
  });
});

module.exports = route;
