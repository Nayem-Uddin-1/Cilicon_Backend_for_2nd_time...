// add category controller

const categoryModel = require("../model/categoryModel")

const PORT = process.env.PORT || 3000

// add Category 
async function addcategoryController(req, res) {

   const { name, description } = req.body
   const { image } = req.file

   try {
      const category = new categoryModel({
         name,
         description,
         image: process.env.URL_PORT + req.file.filename,
      })
      await category.save();
      return res.status(200).json({ success: true, data: category, message: "category added successfully" })


   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error || "something went wrong"
      })
   }

}

// 8th  vid 1:19 min 


module.exports = { addcategoryController }