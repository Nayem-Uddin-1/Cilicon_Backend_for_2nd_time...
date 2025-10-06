const productModel = require("../model/productModel")
const variantModel = require("../model/variantModel")



async function addVariantController(req, res) {

    try {

        const { product, color, size, stock } = req.body


        const variant = new variantModel({
            product,
            color,
            size,
            stock,
            image: req.file && process.env.URL_PORT + "/" + req.file.filename
        })

        await variant.save()

// ====When we update any data it's dosen't need any demo.save() to save ======
// ====================only we need to add await before model name =============
//  ==========example await productModel.findOneAndUpdate===============
        const updateProduct = await productModel.findOneAndUpdate(
            { _id: product },
            { $push: { variant: variant._id } },
            { new: true }
        )         
// =================succes message==============/
        return res.status(200).json({
            success: true,
            message: "variant added successfully",
            data: variant,
        })

    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message || "variant not added"
        })
    }

}




module.exports = { addVariantController }