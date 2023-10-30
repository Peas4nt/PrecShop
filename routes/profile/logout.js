const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

// pabeidz sessiju
route.get("/logout", checkAuthentication, (req, res) => {
	if (req.session && req.session.user) {
		req.session.destroy(() => {
			// novirza uz main lapu
			res.redirect("/");
		});
	}
});

module.exports = route;
