const { default: slugify } = require("slugify");
const productModel = require("../model/productModel");


async function addProductController(req, res) {
    try {
        const { name, description, category, subcategory } = req.body;
        const { thumbnail } = req.file;

        const slug = slugify(name, {
            replacement: '-',
            lower: true,
        })

        const Product = new productModel({
            name,
            slug,
            description,
            category,
            subcategory,
            thumbnail: process.env.URL_PORT + req.file.filename,
        })

       await Product.save()



        res.json({
            success: true,
            message: "proudct add successfully",
            data: Product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}






module.exports = { addProductController }