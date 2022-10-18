const sqlite3 = require("sqlite3").verbose();

class Database {
  static db;

  static {
    this.db = new sqlite3.Database(
      __dirname + "/database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Connected to SQlite database.");
      }
    );
  }
}

module.exports = Database.db;
