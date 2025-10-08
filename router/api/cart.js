const express = require("express");
const { addToCartController } = require("../../controllers/cartController");
const router = express.Router();



 router.post("/add-to-cart",addToCartController)











module.exports = router