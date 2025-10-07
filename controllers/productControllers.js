const { default: slugify } = require("slugify");
const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const subCategoryModel = require("../model/subCategoryModel");
const fs = require("fs")
const path = require("path")


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

async function getSignleProductController(req, res) {
    const { id } = req.params;


    try {

        const product = await productModel.findById(id).populate("variant category subcategory")
        return res.status(200).json({
            success: true,
            message: "Poduct fetch successfull",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}


async function deleteProductController(req, res) {

      try {
        const { id } = req.params;

        const product = await productModel.findOneAndDelete({ _id: id })


        if (!product) {
            return res.status(404).json({
                success: false,
                messege: "product is not found"
            })
        } else {

            const oldpath = path.join(__dirname, "../uploads")
            const fullimagepath = product.thumbnail?.split("/")
            const imagepath = fullimagepath[fullimagepath.length - 1]

            fs.unlink(`${oldpath}/${imagepath}`, async (error) => {

                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message || "something is wrong"
                    });
                } else {

                    return res.status(200).json({
                        success: true,
                        message: "product delete successfull"
                    });
                }

            })

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            messege: error.message || "Something went wrong"
        })
    }


}




module.exports = {
    addProductController,
    getAllProductController,
    getSignleProductController,
    deleteProductController
}