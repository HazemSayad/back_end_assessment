const express = require("express");
const router = express.Router();
const POSTLogin = require("./scripts/post");

// /login router

router.post("/", POSTLogin);

module.exports = router;
