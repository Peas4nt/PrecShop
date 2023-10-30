const { Router } = require("express");

const route = Router();

// renderē main lapu
route.get("/", (req, res) => {
    res.render("pages/main", {
		session: req.session.user,
        page: "home",
        title: "Main Index",

    })
});

module.exports = route;