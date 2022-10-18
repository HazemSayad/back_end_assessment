const db = require("../../../../db/db");
const responses = require("../../../../constants/responses");

async function authDelete(req, res) {
  let productId = req.body.id ?? "";

  if (!(typeof productId === "number") || productId < 0) {
    return res.status(400).send(responses.InvalidProductId);
  }

  let data = [productId];
  let sql = `DELETE FROM products WHERE id = ?`;

  db.run(sql, data, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send(responses.InternalError);
    }
    if (this.changes === 0) {
      return res.status(404).send(responses.InvalidProductId);
    }
    return res.status(200).send(responses.Success);
  });
}
module.exports = authDelete;
