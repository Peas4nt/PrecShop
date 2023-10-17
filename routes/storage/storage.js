const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/storage/", async (req, res) => {
	const search = req.query.query || "";
	const currentPage = parseInt(req.query.page, 10) || 1;

	let products;
	const sql = `
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
  `;
	if (search != "") {
		products = await db
			.getData(sql + `WHERE storage.name LIKE '%${search}%'`)
			.catch((error) => {
				console.log("error: ", error);
				res.status(500).send("Server error");
			});
	} else {
		products = await db.getData(sql).catch((error) => {
			console.log("error: ", error);
			res.status(500).send("Server error");
		});
	}

	const productsPerPage = 5;
	const productMaxPages = Math.ceil(products.length / productsPerPage);

	// array indexes
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const productsToShow = products.slice(startIndex, endIndex);

	// console.log(productMaxPages);

	res.render("storage/storage", {
		session: req.session.user,
		page: "storage",
		title: "Storage",
		products: productsToShow,
		pagination: {
			currentPage,
			productMaxPages,
			search,
		},
	});
});

module.exports = route;
