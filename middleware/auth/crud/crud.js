const express = require("express");
const router = express.Router();
const authCreate = require("./scripts/create");
const authRead = require("./scripts/read");
const authUpdate = require("./scripts/update");
const authDelete = require("./scripts/delete");

router.post("/create", authCreate);
router.get("/read", authRead);
router.put("/update", authUpdate);
router.delete("/delete", authDelete);

module.exports = router;
