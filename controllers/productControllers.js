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
async function getAllProductController(req, res) {

    try {

        const getAllProduct = await productModel.find({}).populate("variant")



        return res.status(200).json({
            success: true,
            message: "get all product successfully",
            data: getAllProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}





module.exports = { addProductController, getAllProductController }