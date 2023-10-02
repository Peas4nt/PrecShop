const mysql = require("mysql2/promise");

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

  сonnectToDB() {
    this.#pool = mysql.createPool({
      connectionLimit: 5,
      host: this.#host,
      user: this.#user,
      database: this.#db,
      password: this.#password,
      ssl: {},
    });
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
      .then((result) => {
        // output a sql injection result
		return {
			id: result[0].insertId,
			result: true
		}
      })
      .catch(function (err) {
        // output a sql injection error
        console.error(err.message);
        return {
			error: err.message,
			result: false
		};
      });
  }
}

module.exports = DBmysql;
