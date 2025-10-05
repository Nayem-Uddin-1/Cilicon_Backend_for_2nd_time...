const express = require("express");

const { addSubCategoryController,
    deleteSubcategoryController,
    updateSubcategoryController, 
    getSubcategoryByCategoryController} = require("../../controllers/subCategoryController");


const router = express.Router();


router.post("/add-subcategory", addSubCategoryController)


router.delete("/delete-subcategory/:id", deleteSubcategoryController)


router.patch("/update-subcategory/:id", updateSubcategoryController)


router.get("/get-subcategory/:id", getSubcategoryByCategoryController)



module.exports = router