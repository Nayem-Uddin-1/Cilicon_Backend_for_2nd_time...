
const categoryModel = require("../model/categoryModel")
const PORT = process.env.PORT || 3000
const slugify = require('slugify')
const fs = require("fs")
const path = require("path")



// add Category 
async function addcategoryController(req, res) {

   const { name, description } = req.body
   const { image } = req.file

   const slug = slugify(name, {
      replacement: '-',
      lower: true,
   })



   try {
      const category = new categoryModel({
         name,
         description,
         image: process.env.URL_PORT + req.file.filename,
         slug
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

// =====get-categories======= 
async function getAllCategories(req, res) {

   try {

      const allCategories = await categoryModel.find({}).sort({ createdAt: -1 }).populate("subcategory")

      console.log(allCategories);


      if (allCategories.length === 0) {
         return res.status(404).json({
            success: false,
            message: "category not found"
         });
      }

      res.status(200).json({
         success: true,
         message: "Fetched All Category",
         data: allCategories
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "categories not found"
      })

   }

}


// =====get-single-categories======= 
async function getSingleCategory(req, res) {
   const { slug } = req.params

   try {
      const slugName = slugify(slug, { lower: true, replacement: "-" })

      const getCategory = await categoryModel.findOne({ slug: slugName })

      if (!getCategory) {
         res.status(404).json({
            success: false,
            message: "category not found"
         })
      }

      res.status(200).json({
         success: true,
         message: "Fetched single Category",
         data: getCategory
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "category not found"
      })

   }
}

// =====delet-category======= 
async function deleteCategoryController(req, res) {
   const { id } = req.params
   try {

      const deleteCategory = await categoryModel.findOneAndDelete({ _id: id })

      if (!deleteCategory) {
         res.status(404).json({
            success: false,
            message: "category not found"
         })
      }
      //  ========made a proper path to delete image=========
      const oldPath = path.join(__dirname, "../uploads")
      const fullImagePath = deleteCategory.image.split("/")
      const imagePath = fullImagePath[fullImagePath.length - 1]
      //  ========made a proper path to delete image=========


      //  ========delete image using path=========
      fs.unlink(`${oldPath}/${imagePath}`, (err) => {
         if (err) {
            res.status(500).json({
               success: false,
               message: "category not found"
            })
         } else {
            res.status(200).json({
               success: true,
               message: "category deleted succefully",
            })
         }
      })
      //  ========delete image using path=========
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "something went wrong"
      })
   }
}

// =====update-categories======= 

async function updateCategoryController(req, res) {

   try {

      const { id } = req.params
      const { name, description } = req.body
      const { filename } = req.file
      const { image } = req.file

      const slug = slugify(name, {
         replacement: '-',
         lower: true,
      })


      if (filename) {
         //find existance category
         const oldCategory = await categoryModel.findById({ _id: id })
         // error message
         if (!oldCategory) {
            res.status(404).json({
               success: false,
               message: "category not found"
            })
         } else {

            const oldPath = path.join(__dirname, "../uploads")
            const fullImagePath = oldCategory.image.split("/")
            const imagePath = fullImagePath[fullImagePath.length - 1]

            fs.unlink(`${oldPath}/${imagePath}`, async (err) => {
               if (err) {
                  res.status(500).json({
                     success: false,
                     message: "category not found"
                  })
               } else {

                  const updatecategory = await categoryModel.findOneAndUpdate(
                     { _id: id },
                     { image: `${process.env.SERVER_URL}/${filename}`, name, description, slug },
                     { new: true }

                  );


                  res.status(200).json({
                     success: true,
                     message: "category updated succefully",
                  })
               }
            })



         }

      }

   } catch (error) {
      res.status(500).json({
         error,
         success: false,
         message: error.message || "category not found"
      })

   }


}


module.exports = {
   addcategoryController,
   getAllCategories,
   getSingleCategory,
   deleteCategoryController,
   updateCategoryController
}