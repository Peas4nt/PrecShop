const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/storage", async (req, res) => {
	const products = await db.getData(`
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
        ON storage.id = codes.id
    LEFT JOIN products_tips 
        ON products_tips.id = storage.product_tip
    LEFT JOIN users
        ON storage.user_id = users.id
    `);

	// console.log(products);
	res.render("tables/storage", {
		page: "storage",
		title: "Storage",
		products: products,
	});
});

module.exports = route;
