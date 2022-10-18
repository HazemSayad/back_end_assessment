const db = require("../../../../db/db");
const responses = require("../../../../constants/responses");

async function authUpdate(req, res) {
  let productId = req.body.id ?? "";
  let productName = req.body.name ?? false;
  let productDescription = req.body.description ?? false;

  if (!(typeof productId === "number") || productId < 0) {
    return res.status(400).send(responses.InvalidProductId);
  }

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

  let data = [productName, productDescription, productId];
  let sql = `UPDATE products
            SET name = ?, description = ?
            WHERE id = ?`;

  db.run(sql, data, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send(responses.InternalError);
    }
    if (this.changes === 0) {
      return res.status(404).send(responses.InvalidProductId);
    }
    return res
      .status(200)
      .json({
        id: productId,
        name: productName,
        description: productDescription,
      });
  });
}
module.exports = authUpdate;
