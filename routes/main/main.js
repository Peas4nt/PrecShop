const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
    res.render("pages/main", {
        page: "home",
        title: "Main Index",

    })
});

module.exports = route;