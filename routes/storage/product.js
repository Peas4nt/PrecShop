const { Router } = require("express");
const route = Router();
const db = require("../../db");

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
        ON storage.id = codes.id
    LEFT JOIN products_tips 
        ON products_tips.id = storage.product_tip
    LEFT JOIN users
        ON storage.user_id = users.id
   	WHERE storage.id=${prodId}
    `)
    

    res.render("storage/product", {
        page: "product",
        title: "Product",
        prod: product[0]
    })
})

module.exports = route;
