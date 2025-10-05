const { default: slugify } = require("slugify")
const subCategoryModel = require("../model/subCategoryModel")
const categoryModel = require("../model/categoryModel")

async function addSubCategory(req, res) {


    try {
        const { name, description, category } = req.body

        //=======slug======
        const slug = slugify(name, {
            replacement: '-',
            lower: true,
        })

        //=======Sub category Model======
        const subcategory = new subCategoryModel({
            name,
            description,
            slug,
            category
        })
        subcategory.save()

        //=======Update category Model======
        const updateCategory = await categoryModel.findOneAndUpdate({_id:category},{$push:{subcategory:subcategory.id}})

        updateCategory.save();


        //=======Success Message======
        return res.status(200).json({
            success: true,
            message: "sub category added successfully",
            data: subcategory
        })

        //=======Error Message======
    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message || "sub category not added"
        })
    }

}







module.exports = { addSubCategory }