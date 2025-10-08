const express = require("express");
const { addToCartController, getCartByUserIdController } = require("../../controllers/cartController");
const router = express.Router();



 router.post("/add-to-cart",addToCartController)
 router.get("/get-cart/:id",getCartByUserIdController)











module.exports = router