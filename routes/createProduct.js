const { Router } = require("express");
const route = Router();
const db = require("../db");

route.get("/create/product", async (req, res) => {
  const types = await db.getData("SELECT id,name FROM products_tips");
  console.log(types);
  res.render("dataforms/product_create", {
    page: "product_create",
    title: "Create a new product",
    types: types,
  });
});

route.post("/create/product", (req, res) => {
  const prodName = req.body.prod_name;
  const prodType = req.body.prod_type;
  const prodSerNum = req.body.serial_num;
  const importDate = req.body.import_date;
  const deliverer = req.body.deliverer;
  const prodQuantity = req.body.quantity;
  const prodPrice = req.body.price;

  console.log(prodName);
  res.redirect("/");
});

module.exports = route;
