const { Router } = require("express");

const route = Router();

route.get("/about", (req, res) => {
    res.render("pages/aboutus", {
		session: req.session.user,
        page: "about",
        title: "About Us",

    })
});

module.exports = route;