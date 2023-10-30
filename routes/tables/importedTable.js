const { Router } = require("express");
const route = Router();
const db = require("../../db");

// renderē imported products lapu un izvada visus produktus tabulā
route.get("/tables/importedProducts/:page?", async (req, res) => {
	// current page
	const currentPage = parseInt(req.query.page, 10) || 1;

	const products = await db.getData(`
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
  ORDER BY delivery_date DESC`);

	const productsPerPage = 10;
	const productMaxPages = Math.ceil(products.length / productsPerPage);

	// array indexes
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const productsToShow = products.slice(startIndex, endIndex);

	res.render("tables/importedProducts", {
		session: req.session.user,
		page: "importedProducts",
		title: "imported Products",
		imported_products: productsToShow,
		pagination: {
			currentPage,
			productMaxPages,
		},
	});
});

module.exports = route;
