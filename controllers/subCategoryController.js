const { default: slugify } = require("slugify")
const subCategoryModel = require("../model/subCategoryModel")
const categoryModel = require("../model/categoryModel")
const { errorMonitor } = require("connect-mongo")

async function addSubCategoryController(req, res) {


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
        const updateCategory = await categoryModel.findOneAndUpdate({ _id: category }, { $push: { subcategory: subcategory.id } })

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

async function deleteSubcategoryController(req, res) {

    try {
        const { id } = req.params


        await subCategoryModel.findOneAndDelete({ _id: id })

        await categoryModel.findOneAndUpdate({ subcategory: id }, { $pull: { subcategory: id } }, { new: true })

        return res.status(200).json({
            success: true,
            message: "delete successfully"

        })


    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message || "subcategory not found"
        })
    }

}


async function updateSubcategoryController(req, res) {

    try {

        const { name, description } = req.body
        const { id } = req.params

        const slug = slugify(name, {
            replacement: '-',
            lower: true,
        })

        const oldSubcategory = await subCategoryModel.findById({ _id: id })


        if (!oldSubcategory) {
            console.log("error log");

        } else {

            const updateSubcategory = await subCategoryModel.findOneAndUpdate(
                { _id: id },
                {
                    name,
                    description,
                    slug,
                },
                { new: true }
            )


            return res.status(200).json({
                success: true,
                message: "subcategoryUpdate successfully",
                data: updateSubcategory
            })
        }



    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message || "subcategory not found"
        })
    }

}


async function getSubcategoryByCategoryController(req, res) {

    try {

        const { id } = req.params

        const getSubcategory = await subCategoryModel.find({ category: id })

        return res.status(200).json({
            success: true,
            message: "fetch subcategory by category successfull",
            data: getSubcategory

        })

    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message
        })
    }


}


module.exports = {
    addSubCategoryController,
    deleteSubcategoryController,
    updateSubcategoryController,
    getSubcategoryByCategoryController
}