const express = require("express");
const router = express.Router();
const headers = require("../../constants/headers");
const responses = require("../../constants/responses");
const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const crud = require("./crud/crud");

async function authorize(req, res, next) {
  let token = (req.headers[headers.Authorization] + "").split(" ")[1];

  if (!(token ?? false)) {
    return res.status(401).send(responses.Unauthorized);
  }

  jwt.verify(token, JWT_PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        return res.status(401).send(responses.TokenExpiredError);
      }
      return res.status(401).send(responses.Unauthorized);
    }
    next();
  });
}

router.use(authorize);
router.use(crud);

module.exports = router;
