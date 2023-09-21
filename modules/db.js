const mysql = require("mysql2");
// const fs = require('fs');

class DBmysql {
	#host = "";
	#user = "";
	#db = "";
	#password = "";

	#pool = "";
	constructor(host, user, db, password) {
		this.#host = host;
		this.#user = user;
		this.#db = db;
		this.#password = password;
	}

	connectToDB() {
			this.#pool = mysql
			.createPool({
				connectionLimit: 5,
				host: this.#host,
				user: this.#user,
				database: this.#db,
				password: this.#password,
				ssl : {
				}
			})
			.promise()
			console.log("Database connection established");

	}

	dbOff() {
		this.#pool
			.end()
			.then(() => {
				console.log("DB connection closed");
			})
			.catch(function (err) {
				console.error(err.message);
			});
	}

	getData(sql) {
		return this.#pool
			.execute(sql)
			.then((result) => {
				// output a sql injection result
				// console.log(result[0]);
				return result[0];
			})
			.catch(function (err) {
				// output a sql injection error
				console.error(err.message);
				return { error: err.message };
			});
	}

	insertData(sql, data) {
		return this.#pool
			.execute(sql, data)
			.then(() => {
				// output a sql injection result
				return true;
			})
			.catch(function (err) {
				// output a sql injection error
				console.error(err.message);
				return false;
			});
	}
}


module.exports = DBmysql;
// test connection
// const db = new DBmysql("aws.connect.psdb.cloud", "anu8qus46yoh5bo9iuc8", "peas4ntdb", "pscale_pw_pVQc0LEI1sBrQa8Bx7NE7D7px0j4Wm301KsWq21n6C3");

// db.connectToDB();

// async function startTest() {
	// const insertdata = await db.insertData(
	// 	"INSERT INTO  authors(name, surname, gender_id) VALUES (?, ?, ?)",
	// 	["TEST", "MAMA", 3],
	// );
	// console.log(insertdata);

// 	const getdata = await db.getData("SELECT * FROM users");
// 	console.table(getdata);
//     db.dbOff();
// }
// startTest();
