const express = require("express");
const { addProductController } = require("../../controllers/productControllers");
const upload = require("../../controllers/imageUploadsController");
const router = express.Router();




router.post("/add-product", upload.single('thumbnail'), addProductController)








module.exports = router