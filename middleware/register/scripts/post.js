const db = require("../../../db/db");
const responses = require("../../../constants/responses");
const bcrypt = require("bcrypt");
const REGEX_EMAIL = require("../../../constants/regex").EmailRegex;

async function post(req, res) {
  let userEmail = req.body.email + "";
  userEmail = userEmail.trim();
  userEmail = userEmail.toLowerCase();
  let userPassword = req.body.password;
  let userName = req.body.name;

  if (!REGEX_EMAIL.test(`${userEmail}`)) {
    return res.status(400).send(responses.InvalidEmail);
  }
  if (userPassword) {
    userPassword = userPassword + "";
  } else {
    return res.status(400).send(responses.InvalidPassword);
  }

  if (userName) {
    userName = userName + "";
  }

  userPassword = await bcrypt.hash(userPassword, 10);

  let sql = `INSERT INTO users (email, password, name)
VALUES( ?,	? , ?);`;

  db.serialize(() => {
    db.run(sql, [userEmail, userPassword, userName], function (err) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res.status(403).send(responses.AccountAlreadyExists);
        }
        console.error(err);
        return res.status(500).send(err.message);
      }
      if (this.lastID) {
        console.log(`A row has been inserted with id ${this.lastID}`);
        return res.status(200).send(responses.Success);
      }
    });
  });
}

module.exports = post;
