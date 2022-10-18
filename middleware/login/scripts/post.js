const db = require("../../../db/db");
const responses = require("../../../constants/responses");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const REGEX_EMAIL = require("../../../constants/regex").EmailRegex;
const token_expires_in = "14d";
const headers = require("../../../constants/headers");

async function post(req, res) {
  let userEmail = req.body.email + "";
  userEmail = userEmail.trim();
  userEmail = userEmail.toLowerCase();
  let userPassword = req.body.password;

  if (!REGEX_EMAIL.test(userEmail)) {
    return res.status(400).send(responses.InvalidEmail);
  }
  if (userPassword) {
    userPassword = userPassword + "";
  } else {
    return res.status(400).send(responses.InvalidPassword);
  }

  let sql = `SELECT *
           FROM users
           WHERE email  = ?`;

  db.serialize(() => {
    db.get(sql, [userEmail], async (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err.message);
      }
      if (!row) {
        return res
          .status(401)
          .send(`${responses.AccountNotFound} ${userEmail}`);
      }
      let id = "" + row.id;
      let hashedPassword = "" + row.password;

      if (await bcrypt.compare(userPassword, hashedPassword)) {
        let data = {
          id: id,
        };
        jwt.sign(
          data,
          JWT_PRIVATE_KEY,
          { expiresIn: token_expires_in },
          async (err, newToken) => {
            if (err) {
              console.log(err);
              return res.status(500).send(responses.InternalError);
            }
            res.append(headers.Authorization, newToken);
            return res
              .status(200)
              .send(responses.Success + "\nToken is now in Auth header");
          }
        );
      } else {
        return res.status(401).send(responses.Unauthorized);
      }
    });
  });
}

module.exports = post;
