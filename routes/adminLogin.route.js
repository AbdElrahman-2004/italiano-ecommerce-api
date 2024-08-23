const express = require("express");
const adminLoginController = require("../controllers/adminLogin.controller");

const router = express.Router();

router.post("/", adminLoginController);

module.exports = router;
