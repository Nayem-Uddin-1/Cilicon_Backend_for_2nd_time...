const express = require("express");
const { addProductController, getAllProductController } = require("../../controllers/productControllers");
const upload = require("../../controllers/imageUploadsController");
const { addVariantController, deleteVariantController } = require("../../controllers/variantController");
const router = express.Router();



router.post("/add-product", upload.single('thumbnail'), addProductController)
router.get("/get-product", getAllProductController)

//==============================
    //=VARIANT_ROUTER=====
//==============================

router.post("/add-variant",upload.single("image"),addVariantController)


router.delete("/delete-variant/:id",deleteVariantController)







module.exports = router