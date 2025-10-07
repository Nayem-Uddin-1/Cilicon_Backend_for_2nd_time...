const express = require("express");
const { addProductController, getAllProductController, getSignleProductController, deleteProductController } = require("../../controllers/productControllers");
const upload = require("../../controllers/imageUploadsController");
const { addVariantController, deleteVariantController, updateVariantController } = require("../../controllers/variantController");
const productModel = require("../../model/productModel");
const router = express.Router();



router.post("/add-product", upload.single('thumbnail'), addProductController)
router.get("/get-product", getAllProductController)// get all product
router.get("/getsingle-product/:id", getSignleProductController)// get single product
router.delete("/delete-product/:id",deleteProductController)// delete product




//==============================
    //=VARIANT_ROUTER=====
//==============================

router.post("/add-variant",upload.single("image"),addVariantController)
router.delete("/delete-variant/:id",deleteVariantController)
router.patch("/update-variant/:id", upload.single("image"),updateVariantController) 








module.exports = router