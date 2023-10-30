const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

// renderē produkta lapu un kaut kādi sql query
route.get("/storage/product/:id?", async (req, res) => {
  const prodId = req.params.id ?? 1;

  const product = await db.getData(`
    SELECT 
    storage.id, 
    storage.name AS 'name', 
    storage.cost, 
    storage.quantity, 
    storage.serial_num, 
    codes.barcode, 
    products_tips.name AS 'type',
    users.name AS 'user'
    
    FROM storage 
    LEFT JOIN codes 
        ON storage.code_id = codes.id
    LEFT JOIN products_tips 
        ON products_tips.id = storage.product_tip
    LEFT JOIN users
        ON storage.user_id = users.id
   	WHERE storage.id=${prodId}
    `);

  const exported_products = await db.getData(`
    SELECT
    storage.name AS "name",
    users.name AS "exporter",
    exported_products.quantity as quantity,
    exported_products.object as object,
    DATE_FORMAT(remove_date, "%d/%m/%Y") AS "removedate"
    FROM exported_products 
    LEFT JOIN storage 
    ON exported_products.product_id = storage.id
    LEFT JOIN users
    ON exported_products.user_id = users.id
    WHERE storage.id = ${prodId}
    ORDER BY remove_date DESC`);

  const imported_products = await db.getData(`
  SELECT 
  storage.name AS "name",
  users.name AS "importer",
  imported_products.quantity as quantity,
  DATE_FORMAT(delivery_date, "%d/%m/%Y") AS "deliverydate"
  FROM imported_products 
  LEFT JOIN storage 
  ON imported_products.product_id = storage.id
  LEFT JOIN users
  ON imported_products.user_id = users.id
  WHERE storage.id = ${prodId}
  ORDER BY delivery_date DESC`);

	const types = await db.getData("SELECT id,name FROM products_tips");

	res.render("storage/product", {
		session: req.session.user,
		page: "product",
		title: "Product",
		types,
		prod: product[0],
		exported_products,
		imported_products,
	});
});

// apstrādā POST pieprasījumu
route.post("/export/product/", checkAuthentication, async (req, res) => {
  const quantity = req.body.quantity;
  const object = req.body.object;
  const date = req.body.date;
  const prodId = req.body.prod_id;

  const userId = req.session.user.id;

  // sql query 
  db.getData(
    `
    UPDATE storage 
	SET quantity = quantity - ${quantity}
	WHERE id = ${prodId}

    `
  ).catch((error) => {
    console.log("error: ", error);
    res.status(500).send("Server error");
  });

  // sql query 
  db.insertData(
    `INSERT INTO exported_products 
    (quantity,object,product_id,user_id,remove_date) 
    VALUES (?,?,?,?,?)`,
    [quantity, object, prodId, userId, date]
  ).catch((error) => {
    console.log("error: ", error);
    res.status(500).send("Server error");
  });
// novirza uz produkta lapu
  res.redirect(`/storage/product/${prodId}`);
});

// edit pieprasījuma apstrāde
route.put("/storage/product", checkAuthentication, async (req, res) => {
	const { id, name, serial_num, barcode, type, quantity, cost } = req.body;

	await db
		.getData(
			`SELECT codes.id AS code_id, codes.barcode AS code FROM storage 
			LEFT JOIN codes 
			ON storage.code_id = codes.id
			WHERE storage.id = ${id}`,
		)
		.then((result) => {
			const barcodeId = result[0].code_id;
			const barcodeOld = result[0].code
			db.getData(
				`SELECT EXISTS(SELECT * FROM codes WHERE barcode = "${barcode}" AND barcode <> "${barcodeOld}") as s`,
			)
				.then((result) => {
					if (result[0].s == 1) {
						res.status(400).json("That barcode is already in use");
					} else {
						db.getData(
							`UPDATE storage 
							SET 
							${type == "" ? "" : `product_tip = ${type},`}
							name = "${name}",
							cost = ${cost},
							quantity = ${quantity},
							serial_num = "${serial_num}"
							WHERE id = ${id}
							`,
						)
							.then(() => {
								db.getData(
									`UPDATE codes
										SET 
										barcode = "${barcode}"
										WHERE id = ${barcodeId}
									`,
								)
									.then(() => {
										res.status(200).json(1);
									})
									.catch((err) => {
										console.log("erorr: " + err);
										res.status(500).json("Server error");
									});
							})
							.catch((err) => {
								console.log("erorr: " + err);
								res.status(500).json("Server error");
							});
					}
					
				})
				.catch((err) => {
					console.log("erorr: " + err);
					res.status(500).json("Server error");
				});
		})
		.catch((err) => {
			console.log("erorr: " + err);
			res.status(500).json("Server error");
		});
});

// delete pieprasījuma apstrāde
route.delete("/storage/product", checkAuthentication, async (req, res) => {
	const prodId = req.body.id;
	await db
		.getData(`DELETE FROM storage WHERE id = ${prodId}`)
		.then(() => {
			res.status(200).json("1");
			console.log("Deleted");
		})
		.catch((err) => {
			console.log("error: ", err);
			res.status(500).json("Server error");
		});
});

module.exports = route;
