const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/check/code", (req, res) => {
	res.render("create product/check_code", {
		page: "product_create",
		title: "Create a new product",
	});
});

route.post("/check/code", async (req, res) => {
	const code = req.body.prod_code;

	await db
		.getData(
			"SELECT EXISTS(SELECT * FROM codes WHERE barcode = '" +
				code +
				"' ) as s",
		)
		.then((result) => {
			if (result[0].s === 1) {
				res.redirect("/add/product/" + code);
			} else {
				res.redirect("/create/product/" + code);
			}
		})
		.catch((error) => {
			console.log("error: ", error);
			res.status(500).send("Server error");
		});
});

module.exports = route;
