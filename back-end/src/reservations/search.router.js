
// search.router.js
const express = require("express");
const router = express.Router();
const controller = require("./reservations.controller");

router.get("/", controller.searchByPhoneNumber);

module.exports = router;
