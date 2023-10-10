const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/storage/:page?", async (req, res) => {
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
        ON storage.code_id = codes.id
    LEFT JOIN products_tips 
        ON products_tips.id = storage.product_tip
    LEFT JOIN users
        ON storage.user_id = users.id
    `).catch(err => {
        console.log("error: ", error);
        res.status(500).send("Server error");
    });


    const productsPerPage = 5;
    const productMaxPages = Math.ceil(products.length / productsPerPage);
    // current page
    const currentPage = (!req.params.page || req.params.page > productMaxPages || req.params.page < 1)? 1 : req.params.page;

    // array indexes
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex)

	// console.log(productMaxPages);

        res.render("storage/storage", {
            page: "storage",
            title: "Storage",
            products: productsToShow,
            pagination: {
                currentPage,
                productMaxPages
            }
        });

});

module.exports = route;
