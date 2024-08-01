const express = require("express");
const router = express.Router();
const {
  createCustomer,

} = require("../controllers/customerController");

router.post("/form/submit", createCustomer);


module.exports = router;
