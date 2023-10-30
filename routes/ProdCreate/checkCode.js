const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

// renderē check code lapu
route.get("/check/code", checkAuthentication, (req, res) => {
	res.render("create product/check_code", {
		session: req.session.user,
		page: "product_create",
		title: "Create a new product",
	});
});

// apstrādā POST pieprasījumu
route.post("/check/code", checkAuthentication, async (req, res) => {
	const code = req.body.prod_code;

	// sql query 
	await db
		.getData(
			"SELECT EXISTS(SELECT * FROM codes WHERE barcode = '" +
				code +
				"' ) as s",
		)
		.then((result) => {
			if (result[0].s === 1) {
				// novirza uz add product lapu, ja barcode jau ir DB
				res.redirect("/add/product/" + code);
			} else {
				// novirza uz create product lapu, ja barcode nav DB
				res.redirect("/create/product/" + code);
			}
		})
		.catch((error) => {
			console.log("error: ", error);
			res.status(500).send("Server error");
		});
});

module.exports = route;
