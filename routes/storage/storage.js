const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/storage/:page?", async (req, res) => {
    const currentPage = req.params.page || 1;
    const productsPerPage = 2;
    // array indexes
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

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
    `).catch(err => {
        console.log("error: ", error);
        res.status(500).send("Server error");
    });

    const productMaxPages = products.length / productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex)
	// console.log(products);
    if (currentPage > productMaxPages || currentPage < 1) {
        res.status(404).send("That page is out of the allowed")
    } else {
        res.render("tables/storage", {
            page: "storage",
            title: "Storage",
            products: productsToShow,
            pagination: {
                currentPage,
                productMaxPages
            }
        });
    }

});

module.exports = route;
