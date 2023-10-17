const {
	Router
} = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");


route.get("/add/product/:barcode", checkAuthentication, async (req, res) => {
	const code = req.params.barcode;

	await db
		.getData(
			`
  SELECT storage.id, storage.name, storage.cost, storage.quantity, storage.serial_num, products_tips.name AS tip
  FROM storage
  LEFT JOIN codes 
  ON storage.code_id = codes.id 
  LEFT JOIN products_tips
  ON products_tips.id = storage.product_tip
  WHERE codes.barcode = '${code}';
  `
		)
		.then((result) => {
			if (result.length === 0) {
				throw new Error("That code is not available");
			}
			res.render("create product/product_add", {
				session: req.session.user,
				page: "product_create",
				title: "Add a product",
				barcode: code,
				product: result[0],
			});
		})
		.catch((err) => {
			res.status(500).send(err.message);
		});
});

route.post("/add/product", checkAuthentication, async (req, res) => {
	const userId = req.session.user.id;
	const product_id = req.body.product_id;
	const import_date = req.body.import_date;
	const quantity = req.body.quantity;
	console.log(product_id);

	await db.getData(
		`
	UPDATE storage 
	SET quantity = quantity + ${quantity}
	WHERE id = ${product_id}`
	);
	await db.insertData(
		"INSERT INTO imported_products (product_id, user_id, quantity, delivery_date) VALUES (?,?,?,?)",
		[product_id, userId, quantity, import_date]
	);
	res.redirect(`/storage/product/${product_id}`);
});

module.exports = route;