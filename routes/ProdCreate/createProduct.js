const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/create/product/:barcode", async (req, res) => {
	const barcode = req.params.barcode;

	const types = await db.getData("SELECT id,name FROM products_tips");
	res.render("create product/product_create", {
		page: "product_create",
		title: "Create a new product",
		types: types,
		barcode: barcode,
	});
});

route.post("/create/product", async (req, res) => {
	const code = req.body.prod_code;
	const userId = 1;

	const name = req.body.prod_name;
	const typeId = req.body.prod_type;
	const serNum = req.body.serial_num;
	const quantity = req.body.quantity;
	const price = req.body.price;

	const imDate = req.body.import_date;

	await db
		.getData(
			"SELECT EXISTS(SELECT * FROM codes WHERE barcode = '" +
				code +
				"' ) as s",
		)
		.then((result) => {
			if (result[0].s === 1) {
				res.status(400).send("Barcode " + code + " already exists");
			} else {
				db.insertData("INSERT INTO codes(barcode) VALUES (?)", [code])
					.then((result) => {
						const codeId = result.id;
						db.insertData(
							"INSERT INTO storage (code_id, product_tip, user_id, name, cost, quantity, serial_num) VALUES (?,?,?,?,?,?,?)",
							[
								codeId,
								typeId,
								userId,
								name,
								price,
								quantity,
								serNum,
							],
						)
							.then((result) => {
								const prodId = result.id;
								db.insertData(
									"INSERT INTO imported_products (product_id, user_id, quantity, delivery_date) VALUES (?,?,?,?)",
									[prodId, userId, quantity, imDate],
								)
									.then((result) => {
										console.log(
											"Product was created successfully",
										);
									})
									.catch((err) => {
										console.log("error: ", error);
										res.status(500).send("Server error");
									});
							})
							.catch((err) => {
								console.log("error: ", error);
								res.status(500).send("Server error");
							});
					})
					.catch((err) => {
						console.log("error: ", error);
						res.status(500).send("Server error");
					});
			}
		})
		.catch((error) => {
			console.log("error: ", error);
			res.status(500).send("Server error");
		});

	// console.log({
	// 	code,
	// 	name,
	// 	typeId,
	// 	serNum,
	// 	quantity,
	// 	price,
	// 	imDate
	// })

	res.redirect("/");
});

module.exports = route;
