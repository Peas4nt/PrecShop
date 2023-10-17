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
        ON storage.code_id = codes.id
    LEFT JOIN products_tips 
        ON products_tips.id = storage.product_tip
    LEFT JOIN users
        ON storage.user_id = users.id
   	WHERE storage.id=${prodId}
    `);

  const exported_products = await db.getData(`
    SELECT
    storage.name AS "name",
    users.name AS "exporter",
    exported_products.quantity as quantity,
    DATE_FORMAT(remove_date, "%d/%m/%Y") AS "removedate"
    FROM exported_products 
    LEFT JOIN storage 
    ON exported_products.product_id = storage.id
    LEFT JOIN users
    ON exported_products.user_id = users.id
    WHERE storage.id = ${prodId}
    ORDER BY remove_date DESC`);

  const imported_products = await db.getData(`
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
  WHERE storage.id = ${prodId}
  ORDER BY delivery_date DESC`);

  res.render("storage/product", {
    page: "product",
    title: "Product",
    prod: product[0],
    exported_products,
    imported_products,
  });
});

route.post("/export/product/", async (req, res) => {
  const quantity = req.body.quantity;
  const date = req.body.date;
  const prodId = req.body.prod_id;
  const userId = 1;

  db.getData(
    `
    UPDATE storage 
	SET quantity = quantity - ${quantity}
	WHERE id = ${prodId}

    `
  ).catch((err) => {
    console.log("error: ", error);
    res.status(500).send("Server error");
  });

  db.insertData(
    `INSERT INTO exported_products 
    (quantity,product_id,user_id,remove_date) 
    VALUES (?,?,?,?)`,
    [quantity, prodId, userId, date]
  ).catch((err) => {
    console.log("error: ", error);
    res.status(500).send("Server error");
  });

  res.redirect(`/storage/product/${prodId}`);
});

route.put("/edit/product", (req, res) => {});
route.post("/delete/product", (req, res) => {
  const prodId = req.body.id;
  console.log("prodId: ", prodId);
  db.getData(`DELETE FROM storage WHERE id = ${prodId}`).catch((err) => {
    console.log("error: ", error);
    res.status(500).send("Server error");
  });
  res.redirect("/");
  console.log("Deleted");
});

module.exports = route;
