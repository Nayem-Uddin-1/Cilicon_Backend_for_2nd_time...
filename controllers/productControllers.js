const { default: slugify } = require("slugify");
const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const subCategoryModel = require("../model/subCategoryModel");


async function addProductController(req, res) {
    try {
        const { name, description, category, subcategory } = req.body;
        const { thumbnail } = req.file;

        const slug = slugify(name, {
            replacement: '-',
            lower: true,
        })

        const product = new productModel({
            name,
            slug,
            description,
            category,
            subcategory,
            thumbnail: process.env.URL_PORT + req.file.filename,
        })

        await product.save()

        const updatecategory = await categoryModel.findOneAndUpdate(
            { _id: category },
            { $push: { product: product._id } },
            { new: true }
        );

        const updatesubcategory = await subCategoryModel.findOneAndUpdate(
            { _id: subcategory },
            { $push: { product: product._id } },
            { new: true }
        );

        await updatecategory.save();
        await updatesubcategory.save();




        res.json({
            success: true,
            message: "proudct add successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}






module.exports = { addProductController }