const express = require("express"); 
const { addcategoryController } = require("../../controllers/categoryControllers");
const router = express.Router();


router.post('/addcategory',addcategoryController)



module.exports = router