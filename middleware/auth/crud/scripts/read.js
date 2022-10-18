const db = require("../../../../db/db");

async function authRead(req, res) {
  let limit = (req.query.limit ?? 501) > 500 ? 5 : req.query.limit;
  let page = req.query.page ?? 0;
  let sql = `SELECT * FROM products
           ORDER BY id LIMIT ? OFFSET ?`;

  db.all(sql, [limit, limit * page], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
    let toMaps = { result: [] };
    rows.forEach((row) => {
      toMaps.result.push(row);
    });
    return res.status(200).json(toMaps);
  });
}
module.exports = authRead;
