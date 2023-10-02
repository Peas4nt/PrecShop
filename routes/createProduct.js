const { Router } = require("express");
const route = Router();
const db = require("../db");

route.get("/create/product", async (req, res) => {
  const types = await db.getData("SELECT id,name FROM products_tips");
  res.render("dataforms/product_create", {
    page: "product_create",
    title: "Create a new product",
    types: types,
  });
});

route.post("/create/product", async (req, res) => {
  const prodName = req.body.prod_name;
  const prodType = req.body.prod_type;
  const prodSerNum = req.body.serial_num;
  const importDate = req.body.import_date;
  const deliverer = req.body.deliverer;
  const prodQuantity = req.body.quantity;
  const prodPrice = req.body.price;

  res.redirect("/");
  // await db
  //   .insertData(
  //     "INSERT INTO imported_products (product_id,user_id,code_id,name,quantity,delivery_date) VALUES (?, ?, ?, ?, ?, ?)",
  //     [name, lastname, email, password]
  //   )
  //   .then((result) => {
  //     if (result.result) {
  //       console.log(result.id);
  //       console.log(`User ${name} was created`);
  //       res.status(200).redirect("/");
  //     } else {
  //       console.log(`User ${name} was not created`);
  //       res.status(500).redirect("/signup");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Create user: ", error);
  //     res.status(500).send("Server error");
  //   });
});

module.exports = route;
