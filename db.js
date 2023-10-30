const DBmysql = require("./modules/db");
require("dotenv").config();

// izveido DB savienojumu
const db = new DBmysql(
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_NAME,
  process.env.DB_PASSWORd
);

module.exports = db;
