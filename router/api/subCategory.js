const express = require("express");
const { addSubCategory } = require("../../controllers/subCategoryController");
const router = express.Router();


 router.post("/add-subcategory",addSubCategory)



module.exports = router