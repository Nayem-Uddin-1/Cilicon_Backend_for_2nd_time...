const express = require("express");
const { addcategoryController, getAllCategories, getSingleCategory, deleteCategoryController, updateCategoryController } = require("../../controllers/categoryControllers");
const router = express.Router();
const path = require("path");
const upload = require("../../controllers/imageUploadsController");




// ======add-Categories========
router.post('/addcategory', upload.single("image"), addcategoryController)

// ======get-Categories========
router.get('/get-allcategory', getAllCategories) // /getatecory

// ======get-single-Categories========
router.get('/get-single-category/:slug', getSingleCategory) // /singlecategory 

// ======delete-Categories========
router.get('/delete-category/:id', deleteCategoryController) // /deletecategory

// ======update-Categories========
router.patch('/updatecategory/:id',upload.single("image"),updateCategoryController) // /updatecategory




module.exports = router