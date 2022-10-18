const express = require("express");
const router = express.Router();
const POSTRegister = require("./scripts/post");

// /login router

router.post("/", POSTRegister);

module.exports = router;
