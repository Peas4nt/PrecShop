const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/add/product/:barcode", async (req, res) => {
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
  `,
		)
		.then((result) => {
			if (result.length === 0) {
				throw new Error("That code is not available");
			}
			res.render("dataforms/product_add", {
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

route.post("/add/product", async (req, res) => {
    // product_id
    // import_date'
    // quantity

});

module.exports = route;
