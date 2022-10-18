const db = require("../../../../db/db");
const responses = require("../../../../constants/responses");

async function authCreate(req, res) {
  let productName = req.body.name ?? false;
  let productDescription = req.body.description ?? false;

  if (
    !productName ||
    !(typeof productName === "string") ||
    productName.length > 60 ||
    productName.length < 1
  ) {
    return res.status(400).send(responses.InvalidProductName);
  }
  if (
    !productDescription ||
    !(typeof productDescription === "string") ||
    productDescription.length > 500
  ) {
    return res.status(400).send(responses.InvalidProductDescription);
  }

  let sql = `INSERT INTO products (name, description)
VALUES(?,	?);`;

  db.serialize(() => {
    db.run(sql, [productName, productDescription], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      if (this.lastID) {
        return res.status(200).json({
          id: this.lastID,
          name: productName,
          description: productDescription,
        });
      }
    });
  });
}
module.exports = authCreate;
