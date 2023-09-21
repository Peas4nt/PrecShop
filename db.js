const DBmysql = require("./modules/db");
require("dotenv").config();

const db = new DBmysql(
	process.env.DB_HOST,
	process.env.DB_USERNAME,
	process.env.DB_NAME,
	process.env.DB_PASSWORd,
);

db.сonnectToDB();
module.exports = db;
