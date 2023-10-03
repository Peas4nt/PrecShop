const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/create/product/:barcode", async (req, res) => {
  const barcode = req.params.barcode;


  const types = await db.getData("SELECT id,name FROM products_tips");
  res.render("dataforms/product_create", {
    page: "product_create",
    title: "Create a new product",
    types: types,
    barcode: barcode,
  });
});


route.post("/add/product", async (req, res) => {
});

module.exports = route;
