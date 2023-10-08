const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/storage/product/:id?", async (req, res) => {
    const prodId = req.params.id ?? 1;
    
    res.render("storage/product", {
        page: "product",
        title: "Product",
        id: prodId
    })
})

module.exports = route;
